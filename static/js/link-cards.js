/* Shared, dependency-free card data and rendering for the writing studio. */
((root) => {
  if (root.ResidualLinkCards) return;
  const MAX_CARDS = 4;
  const marker = () => /(\r?\n\r?\n)?{{<\s*linkcard\s+data="([A-Za-z0-9+/=]+)"\s*>}}/g;
  const urlKey = value => {
    try {
      const url = new URL(value);
      return /^https?:$/.test(url.protocol) && !url.username && !url.password ? url.href : "";
    } catch { return ""; }
  };
  const encode = card => btoa(Array.from(new TextEncoder().encode(JSON.stringify(card)), byte => String.fromCharCode(byte)).join(""));
  const decode = encoded => {
    try {
      const card = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(encoded), char => char.charCodeAt(0))));
      if (!urlKey(card.url)) return null;
      return { ...card, url: urlKey(card.url), domain: new URL(card.url).hostname };
    } catch { return null; }
  };
  function read(value = "") {
    const cards = new Map();
    const text = value.replace(marker(), (source, gap, encoded) => {
      const card = decode(encoded);
      if (!card) return source;
      cards.set(card.url, card);
      return card.embedded ? (gap || "") + (card.originalUrl || card.url) : "";
    });
    return { text, cards };
  }
  function standalone(text) {
    const lines = text.split("\n");
    const found = [];
    let fence = null, html = null, offset = 0;
    lines.forEach((raw, index) => {
      const line = raw.replace(/\r$/, "");
      const start = offset;
      offset += raw.length + 1;
      if (html) {
        if (html === "comment" ? line.includes("-->") : new RegExp(`</${html}\\s*>`, "i").test(line)) html = null;
        return;
      }
      const delimiter = /^ {0,3}(`{3,}|~{3,})/.exec(line)?.[1];
      if (fence) {
        if (delimiter?.[0] === fence[0] && delimiter.length >= fence.length && /^ {0,3}(`+|~+)\s*$/.test(line)) fence = null;
        return;
      }
      if (delimiter) { fence = delimiter; return; }
      if (/^\s*<!--/.test(line)) { if (!line.includes("-->")) html = "comment"; return; }
      const tag = /^\s*<(script|style|pre|textarea|div|table|details|section|article|iframe)\b/i.exec(line)?.[1];
      if (tag) { if (!new RegExp(`</${tag}\\s*>`, "i").test(line)) html = tag; return; }
      if (line !== line.trim() || !/^https?:\/\/\S+$/i.test(line)) return;
      if ((index && lines[index - 1].trim()) || (index < lines.length - 1 && lines[index + 1].trim())) return;
      const key = urlKey(line);
      if (key) found.push({ url: key, original: line, start, end: start + line.length });
    });
    return found;
  }
  function write(text, cards) {
    const seen = new Set();
    const positions = standalone(text).filter(item => {
      if (seen.has(item.url) || !cards.has(item.url)) return false;
      seen.add(item.url); return true;
    });
    let value = text;
    positions.reverse().forEach(item => {
      const card = cards.get(item.url);
      const embedded = !card.disabled && !card.keepUrl;
      const shortcode = `{{< linkcard data="${encode({ ...card, embedded, originalUrl: item.original })}" >}}`;
      value = embedded ? value.slice(0, item.start) + shortcode + value.slice(item.end)
        : value.slice(0, item.end) + `\n\n${shortcode}` + value.slice(item.end);
    });
    return value;
  }
  function pieces(value) {
    const result = [];
    let last = 0;
    for (const match of value.matchAll(marker())) {
      const card = decode(match[2]);
      if (!card) continue;
      let text = value.slice(last, match.index);
      // Legacy notes stored a naked URL immediately before their shortcode.
      if (!card.disabled && !card.keepUrl && !card.embedded) {
        const lines = text.split(/\r?\n/);
        if (urlKey(lines.at(-1)) === card.url && (lines.length === 1 || !lines.at(-2).trim())) {
          lines.pop(); text = lines.join("\n");
        }
      }
      result.push({ text });
      if (!card.disabled) result.push({ card });
      last = match.index + match[0].length;
    }
    result.push({ text: value.slice(last) });
    return result;
  }
  function layout(card) {
    if (!urlKey(card.image) || card.cardType === "summary") return "summary";
    if (card.cardType === "summary_large_image") return "large";
    return card.imageWidth > 0 && card.imageHeight > 0 && card.imageWidth / card.imageHeight < 1.5 ? "summary" : "large";
  }
  function imageLoaded(image) {
    const figure = image.closest(".rlc");
    if (!figure) return;
    if (figure.dataset.rlcAuto === "true" && image.naturalWidth / image.naturalHeight < 1.5) {
      figure.classList.remove("rlc-large"); figure.classList.add("rlc-summary");
    }
  }
  function imageFailed(image) {
    const figure = image.closest(".rlc");
    if (!figure) return;
    figure.classList.remove("rlc-large");
    figure.classList.add("rlc-summary", "rlc-image-failed");
  }
  function render(h, card) {
    const url = urlKey(card.url);
    if (!url || card.disabled) return null;
    const image = urlKey(card.image);
    const domain = new URL(url).hostname;
    return h("figure", { key: `${url}:${image}:${card.fetchedAt || ""}`, className: `rlc rlc-${layout(card)}${image ? " rlc-has-image" : ""}`,
      "data-rlc-auto": !["summary", "summary_large_image"].includes(card.cardType) },
      h("a", { className: "rlc-card", href: url, target: "_blank", rel: "noopener noreferrer" },
        h("div", { className: "rlc-media" },
          image ? h("img", { className: "rlc-image", src: image, alt: "", loading: "lazy", decoding: "async", referrerPolicy: "no-referrer",
            onLoad: event => imageLoaded(event.currentTarget), onError: event => imageFailed(event.currentTarget) }) : null,
          h("img", { className: "rlc-document", src: "/images/link-card-document.svg", alt: "", "aria-hidden": true })),
        h("div", { className: "rlc-info" }, h("div", { className: "rlc-domain" }, domain),
          h("div", { className: "rlc-title" }, card.title || domain),
          card.description ? h("p", { className: "rlc-description" }, card.description) : null)),
      h("figcaption", { className: "rlc-source" }, `From ${domain}`));
  }
  root.ResidualLinkCards = { MAX_CARDS, urlKey, encode, decode, read, standalone, write, pieces, layout, render, imageLoaded, imageFailed };
  // Public pages use the same image behavior, including cards added by pagination.
  if (typeof document !== "undefined") {
    document.addEventListener("error", event => {
      if (event.target?.matches?.("img.rlc-image")) imageFailed(event.target);
    }, true);
    document.addEventListener("load", event => {
      if (event.target?.matches?.("img.rlc-image")) imageLoaded(event.target);
    }, true);
    const enhance = () => document.querySelectorAll(".rlc[data-rlc-url]").forEach(figure => {
      if (figure.dataset.rlcKeepUrl !== "true") {
        let previous = figure.previousElementSibling;
        while (previous?.matches("link,script")) previous = previous.previousElementSibling;
        if (previous?.tagName === "P" && urlKey(previous.textContent.trim()) === figure.dataset.rlcUrl && previous.children.length <= 1) previous.hidden = true;
      }
      const image = figure.querySelector(".rlc-image");
      if (image?.complete) image.naturalWidth ? imageLoaded(image) : imageFailed(image);
    });
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true });
    else enhance();
    new MutationObserver(enhance).observe(document.documentElement, { childList: true, subtree: true });
  }
})(typeof window === "undefined" ? globalThis : window);
