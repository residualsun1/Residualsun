/* Shared quote-card behavior; prose and metadata inherit the site's typography. */
((root) => {
  const mediaURL = value => {
    try {
      const url = new URL(value);
      return /^https?:$/.test(url.protocol) && !url.username && !url.password ? url.href : "";
    } catch { return ""; }
  };
  function cyclic(records, target, source) {
    const seen = new Set(source ? [source] : []);
    while (target) {
      if (seen.has(target)) return true;
      seen.add(target);
      target = records.get(target)?.quoted;
    }
    return false;
  }
  function momentSlug(value, siteURL, localOrigin) {
    try {
      const url = new URL(value);
      if (![new URL(siteURL).origin, localOrigin].includes(url.origin)) return "";
      return decodeURIComponent(/^\/moments\/([^/]+)\/?$/.exec(url.pathname)?.[1] || "");
    } catch { return ""; }
  }
  const hideMedia = event => { const media = event.target?.closest?.(".moment-quote-media"); if (media) media.hidden = true; };
  function locate(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target?.closest?.(".moment-quote-link");
    if (!link || link.target || link.hasAttribute("download")) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !url.hash) return;
    let id;
    try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target?.matches(".note-card")) return;
    event.preventDefault();
    history.pushState(null, "", url.pathname + url.search + url.hash);
    target.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    target.focus({ preventScroll: true });
  }
  function render(h, record) {
    if (!record) return h("aside", { className: "moment-quote moment-quote-unavailable" }, "引用的思绪暂不可用。");
    const media = record.media || {}, src = mediaURL(media.src);
    return h("aside", { className: "moment-quote" },
      h("a", { className: "moment-quote-link", href: record.listURL || record.url, "aria-label": `定位原思绪：${record.meta}` },
        h("div", { className: "note-meta" }, record.meta),
        record.text ? h("div", { className: "moment-quote-text" }, record.text) : null),
      src ? h("div", { className: "moment-quote-media" }, media.kind === "video"
        ? h("video", { src, poster: mediaURL(media.poster) || undefined, controls: true, playsInline: true, preload: "metadata", onError: hideMedia })
        : h("img", { src, alt: "", loading: "lazy", decoding: "async", onError: hideMedia })) : null);
  }
  root.ResidualMomentQuotes = { cyclic, momentSlug, render };
  if (typeof document !== "undefined") {
    document.addEventListener("click", locate);
    document.addEventListener("error", event => {
      if (event.target?.matches?.(".moment-quote-media img, .moment-quote-media video")) hideMedia(event);
    }, true);
    const checkImages = () => document.querySelectorAll(".moment-quote-media img").forEach(img => {
      if (img.complete && !img.naturalWidth) hideMedia({ target: img });
    });
    document.addEventListener("DOMContentLoaded", checkImages);
    new MutationObserver(checkImages).observe(document.documentElement, { childList: true, subtree: true });
  }
})(typeof window === "undefined" ? globalThis : window);
