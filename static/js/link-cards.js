/* Shared, dependency-free card data and rendering for the writing studio. */
((root) => {
  const MAX_CARDS = 4;
  const marker = () => /(?:\r?\n\r?\n)?{{<\s*linkcard\s+data="([A-Za-z0-9+/=]+)"\s*>}}/g;
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
    const text = value.replace(marker(), (source, encoded) => {
      const card = decode(encoded);
      if (!card) return source;
      cards.set(card.url, card);
      return "";
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
      value = value.slice(0, item.end) + `\n\n{{< linkcard data="${encode(cards.get(item.url))}" >}}` + value.slice(item.end);
    });
    return value;
  }
  function pieces(value) {
    const result = [];
    let last = 0;
    for (const match of value.matchAll(marker())) {
      const card = decode(match[1]);
      if (!card) continue;
      result.push({ text: value.slice(last, match.index) });
      if (!card.disabled) result.push({ card });
      last = match.index + match[0].length;
    }
    result.push({ text: value.slice(last) });
    return result;
  }
  function render(h, card) {
    const url = urlKey(card.url);
    if (!url || card.disabled) return null;
    const image = urlKey(card.image);
    return h("figure", { className: "rlc" },
      h("a", { className: "rlc-card", href: url, target: "_blank", rel: "noopener noreferrer" },
        image ? h("img", { className: "rlc-image", src: image, alt: "", loading: "lazy", decoding: "async", referrerPolicy: "no-referrer",
          onError: event => { event.currentTarget.hidden = true; } }) : null,
        h("div", { className: "rlc-info" }, h("div", { className: "rlc-title" }, card.title || new URL(url).hostname),
          card.description ? h("p", { className: "rlc-description" }, card.description) : null)),
      h("figcaption", { className: "rlc-source" }, `来自 ${new URL(url).hostname}`));
  }
  root.ResidualLinkCards = { MAX_CARDS, urlKey, encode, decode, read, standalone, write, pieces, render };
  // Capture failures for cards loaded initially or appended by the public pagination.
  if (typeof document !== "undefined") {
    document.addEventListener("error", event => {
      if (event.target?.matches?.("img.rlc-image")) event.target.hidden = true;
    }, true);
  }
})(typeof window === "undefined" ? globalThis : window);
