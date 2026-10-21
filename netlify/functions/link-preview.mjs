import { getPreview, webUrl } from "../lib/link-preview.mjs";

const cache = new Map();
const TTL = 30 * 60 * 1000;
export const config = { rateLimit: { action: "rate_limit", aggregateBy: ["ip"], windowLimit: 30, windowSize: 60 } };
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
});

export default async request => {
  if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "不支持跨站请求" }, 403);
  try {
    const url = webUrl(new URL(request.url).searchParams.get("url")).href;
    const refresh = new URL(request.url).searchParams.get("refresh") === "1";
    const cached = cache.get(url);
    if (!refresh && cached?.expires > Date.now()) return json(cached.card);
    const card = await getPreview(url);
    if (cache.size >= 100) cache.delete(cache.keys().next().value);
    cache.set(url, { card, expires: Date.now() + TTL });
    return json(card);
  } catch {
    return json({ error: "暂时无法获取预览，可重试或保留原始链接。" }, 422);
  }
};
