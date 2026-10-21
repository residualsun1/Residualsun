import { lookup } from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import { isIP } from "node:net";
import { createGunzip, createBrotliDecompress, createInflate } from "node:zlib";
import { Parser } from "htmlparser2";
import ipaddr from "ipaddr.js";

const MAX_BYTES = 1024 * 1024;
const clean = (value, length) => String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, length);

export function webUrl(value, base) {
  const url = new URL(value, base);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.href.length > 4096 || url.port) {
    throw new Error("仅支持标准 HTTP / HTTPS 网页链接");
  }
  return url;
}

export async function publicTarget(value, resolver = lookup) {
  const url = webUrl(value);
  const host = url.hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (!host || /(^|\.)(localhost|local|internal|home\.arpa|invalid|test)$/.test(host)) throw new Error("不支持此地址");
  const addresses = isIP(host) ? [{ address: host, family: isIP(host) }] : await resolver(host, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(item => !ipaddr.isValid(item.address) || ipaddr.process(item.address).range() !== "unicast")) {
    throw new Error("不支持本机、内网或保留地址");
  }
  return { url, address: addresses.find(item => item.family === 4) || addresses[0] };
}

function readPage({ url, address }, signal) {
  return new Promise((resolve, reject) => {
    const request = (url.protocol === "https:" ? https : http).get(url, {
      signal, agent: false,
      headers: { Accept: "text/html,application/xhtml+xml", "Accept-Encoding": "gzip, br, deflate", "User-Agent": "Residualsun-LinkPreview/1.0" },
      // Pin the validated address for this connection, including after DNS rebinding.
      lookup: (_host, options, callback) => options.all ? callback(null, [address]) : callback(null, address.address, address.family),
    }, response => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
        response.destroy();
        resolve({ redirect: response.headers.location });
        return;
      }
      if (response.statusCode < 200 || response.statusCode >= 300 || !/^(text\/html|application\/xhtml\+xml)\b/i.test(response.headers['content-type'] || "")) {
        response.destroy(); reject(new Error("网页暂时无法预览")); return;
      }
      const encoding = response.headers['content-encoding'];
      const decoder = encoding === "gzip" ? createGunzip() : encoding === "br" ? createBrotliDecompress() : encoding === "deflate" ? createInflate() : null;
      const stream = decoder ? response.pipe(decoder) : response;
      const chunks = [];
      let bytes = 0, received = 0, done = false;
      const fail = error => { if (!done) { done = true; reject(error); } stream.destroy(); response.destroy(); };
      const finish = () => {
        if (done) return;
        done = true;
        const buffer = Buffer.concat(chunks);
        const charset = /charset\s*=\s*["']?([\w-]+)/i.exec(response.headers['content-type'] || "")?.[1]
          || /<meta[^>]+charset\s*=\s*["']?([\w-]+)/i.exec(buffer.subarray(0, 8192).toString("latin1"))?.[1] || "utf-8";
        let html;
        try { html = new TextDecoder(charset).decode(buffer); } catch { html = buffer.toString("utf8"); }
        resolve({ html });
        stream.destroy(); response.destroy();
      };
      response.on("error", fail);
      stream.on("error", fail);
      response.on("data", chunk => { received += chunk.length; if (received > MAX_BYTES * 2) fail(new Error("网页过大")); });
      stream.on("data", chunk => {
        if (done) return;
        bytes += chunk.length;
        if (bytes > MAX_BYTES) { fail(new Error("网页过大")); return; }
        chunks.push(chunk);
        // Metadata lives in the head; avoid downloading the rest of large pages.
        if (Buffer.concat(chunks).includes(Buffer.from("</head>"))) finish();
      });
      stream.on("end", finish);
    });
    request.on("error", reject);
  });
}

export function parseMetadata(html, originalUrl, finalUrl = originalUrl) {
  const meta = new Map();
  let title = "", inTitle = false, base = finalUrl;
  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === "meta") {
        const key = (attributes.property || attributes.name || "").toLowerCase();
        if (key && !meta.has(key) && attributes.content?.trim()) meta.set(key, attributes.content);
      }
      if (name === "title") inTitle = true;
      if (name === "base" && attributes.href) { try { base = webUrl(attributes.href, finalUrl).href; } catch { /* Ignore invalid bases. */ } }
    },
    ontext(value) { if (inTitle) title += value; },
    onclosetag(name) { if (name === "title") inTitle = false; },
  }, { decodeEntities: true });
  parser.end(html);
  const source = webUrl(originalUrl);
  const absolute = value => { try { return value ? webUrl(value, base).href : ""; } catch { return ""; } };
  return {
    url: source.href,
    title: clean(meta.get("og:title") || meta.get("twitter:title") || title || source.hostname, 200),
    description: clean(meta.get("og:description") || meta.get("twitter:description") || meta.get("description"), 360),
    image: absolute(meta.get("og:image") || meta.get("og:image:url") || meta.get("twitter:image") || meta.get("twitter:image:src")),
    siteName: clean(meta.get("og:site_name"), 100),
    canonicalUrl: absolute(meta.get("og:url")),
    domain: source.hostname,
    fetchedAt: new Date().toISOString(),
  };
}

export async function getPreview(value, { resolver = lookup, read = readPage, signal = AbortSignal.timeout(8000) } = {}) {
  const original = webUrl(value);
  const resolveTarget = async url => {
    signal.throwIfAborted();
    let abort;
    try {
      return await Promise.race([
        publicTarget(url, resolver),
        new Promise((_, reject) => { abort = () => reject(signal.reason); signal.addEventListener("abort", abort, { once: true }); }),
      ]);
    } finally { if (abort) signal.removeEventListener("abort", abort); }
  };
  let next = original.href;
  for (let count = 0; count <= 4; count++) {
    signal.throwIfAborted();
    // DNS resolution, redirects and the request all share one deadline.
    const target = await resolveTarget(next);
    const result = await read(target, signal);
    if (result.redirect !== undefined) {
      if (!result.redirect || count === 4) throw new Error("网页跳转过多");
      next = webUrl(result.redirect, target.url).href;
      continue;
    }
    const card = parseMetadata(result.html, original.href, target.url.href);
    if (card.image) {
      // Persist only public image addresses; never fetch images through this endpoint.
      try { await resolveTarget(card.image); } catch { card.image = ""; }
    }
    return card;
  }
}
