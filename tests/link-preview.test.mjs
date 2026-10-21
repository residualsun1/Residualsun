import test from "node:test";
import assert from "node:assert/strict";
import { getPreview, publicTarget, parseMetadata } from "../netlify/lib/link-preview.mjs";
import "../static/js/link-cards.js";

const links = globalThis.ResidualLinkCards;
const publicDNS = async () => [{ address: "93.184.215.14", family: 4 }];

test("metadata priority, entity decoding, relative image and trusted source", () => {
  const card = parseMetadata(`<title>Fallback</title><meta property='og:title' content='文学 &amp; Web'><meta name='twitter:title' content='Twitter'><meta property='og:image' content='../cover.jpg'><meta property='og:description' content='一页札记'><meta property='og:site_name' content='Fake source'><meta property='og:url' content='/canonical'>`, "https://example.com/notes/one");
  assert.equal(card.title, "Twitter");
  assert.equal(parseMetadata(`<meta property='og:title' content='文学 &amp; Web'>`, "https://example.com/").title, "文学 & Web");
  assert.equal(card.image, "https://example.com/cover.jpg");
  assert.equal(card.domain, "example.com");
  assert.equal(card.siteName, "Fake source");
  assert.equal(card.canonicalUrl, "https://example.com/canonical");
  const fallback = parseMetadata(`<title>Small page</title><meta name='description' content='Plain text'><meta name='twitter:image' content='javascript:alert(1)'>`, "https://example.com/");
  assert.equal(fallback.image, "");
  assert.equal(fallback.title, "Small page");
  assert.equal(parseMetadata("<p>No metadata</p>", "https://example.com").title, "example.com");
});

test("reject private, local, mapped, metadata and mixed DNS addresses", async () => {
  for (const url of ["http://127.0.0.1", "http://2130706433", "http://10.1.1.1", "http://169.254.169.254", "http://100.100.100.200", "http://[::1]", "http://[::ffff:127.0.0.1]", "http://localhost.", "http://metadata.google.internal", "ftp://example.com", "https://user:pass@example.com", "http://example.com:8080"]) {
    await assert.rejects(publicTarget(url, publicDNS), undefined, url);
  }
  await assert.rejects(publicTarget("https://example.com", async () => [{ address: "8.8.8.8", family: 4 }, { address: "192.168.0.1", family: 4 }]));
  assert.equal((await publicTarget("https://example.com", publicDNS)).address.address, "93.184.215.14");
});

test("revalidate every redirect before opening a socket", async () => {
  let reads = 0;
  await assert.rejects(getPreview("https://example.com", { resolver: publicDNS, read: async () => { reads++; return { redirect: "http://169.254.169.254/latest/meta-data/" }; } }));
  assert.equal(reads, 1);
  const card = await getPreview("https://example.com/a", { resolver: publicDNS, read: async ({ url }) => url.pathname === "/a" ? { redirect: "/b" } : { html: "<title>Redirected page</title>" } });
  assert.equal(card.url, "https://example.com/a");
  assert.equal(card.title, "Redirected page");
});

test("standalone URLs exclude prose, links, fenced/indented code and HTML", () => {
  const body = "https://one.example/\n\n文字 https://two.example/\n\n[link](https://three.example/)\n\n```md\n\nhttps://four.example/\n\n```\n\n    https://five.example/\n\n<div>\n\nhttps://six.example/\n\n</div>\n\nhttps://seven.example/";
  assert.deepEqual(links.standalone(body).map(item => item.url), ["https://one.example/", "https://seven.example/"]);
  assert.equal(links.standalone("https://clash-jichang.com")[0].url, "https://clash-jichang.com/");
  assert.equal(links.standalone("  https://clash-jichang.com  ")[0].original, "https://clash-jichang.com");
  assert.equal(links.standalone("    https://clash-jichang.com").length, 0, "indented code remains excluded");
  assert.equal(links.standalone("普通段落 https://clash-jichang.com").length, 0);
  const spaced = "文字。\n\n  https://clash-jichang.com  \n\n后文。";
  const saved = links.write(spaced, new Map([["https://clash-jichang.com/", { url: "https://clash-jichang.com/", title: "Preview" }]]));
  assert.equal(links.read(saved).text, spaced, "preview round trip preserves surrounding spaces");
});

test("saved cards round trip with Unicode, removal, body edits and duplicate URLs", () => {
  const body = "此刻的光。\n\nhttps://example.com/\n\n下一段。\n\nhttps://example.com/";
  const cards = new Map([["https://example.com/", { url: "https://example.com/", title: '繁體 简体 <script> & "', description: "一页札记", image: "", fetchedAt: "2026-10-21T00:00:00Z" }]]);
  const stored = links.write(body, cards);
  assert.equal(links.read(stored).text, body);
  assert.equal(links.read(stored).cards.get("https://example.com/").title, cards.get("https://example.com/").title);
  assert.equal(links.pieces(stored).filter(part => part.card).length, 1);
  const removed = links.write(body, new Map([["https://example.com/", { url: "https://example.com/", disabled: true }]]));
  assert.equal(links.read(removed).text, body);
  assert.equal(links.pieces(removed).filter(part => part.card).length, 0);
  assert.equal(links.read(removed).cards.get("https://example.com/").disabled, true);
  assert.equal(links.write("No URL remains", cards), "No URL remains");
  assert.ok(!stored.startsWith(body), "active cards replace their bare URL in saved Markdown");
  const shown = links.write(body, new Map([["https://example.com/", { ...cards.get("https://example.com/"), keepUrl: true }]]));
  assert.ok(shown.includes("https://example.com/\n\n{{< linkcard"));
  assert.equal(links.read(shown).text, body);
  const legacy = `https://example.com/\n\n{{< linkcard data="${links.encode(cards.get("https://example.com/"))}" >}}`;
  assert.equal(links.read(legacy).text, "https://example.com/");
  assert.equal(links.pieces(legacy).find(part => part.text !== undefined).text, "");
});

test("X card declarations, image dimensions and empty metadata", async () => {
  const image = "https://example.com/og.jpg";
  assert.equal(links.layout({ image, cardType: "summary" }), "summary");
  assert.equal(links.layout({ image, cardType: "summary_large_image", imageWidth: 100, imageHeight: 100 }), "large");
  assert.equal(links.layout({ image, imageWidth: 800, imageHeight: 800 }), "summary");
  assert.equal(links.layout({ image, imageWidth: 1200, imageHeight: 630 }), "large");
  assert.equal(links.layout({ title: "A page" }), "summary");
  const card = parseMetadata(`<meta name='twitter:card' content='summary'><meta name='twitter:title' content='Title'><meta name='twitter:image' content='/twitter.jpg'><meta property='og:image' content='/og.jpg'>`, "https://example.com/");
  assert.equal(card.cardType, "summary");
  assert.equal(card.image, "https://example.com/twitter.jpg");
  await assert.rejects(getPreview("https://example.com", { resolver: publicDNS, read: async () => ({ html: "<p>No metadata</p>" }) }));
});
