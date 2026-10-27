import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import MarkdownRenderer from "../src/components/common/MarkdownRenderer";
import QuillCodeRenderer from "../src/components/common/QuillCodeRenderer";
import { createSitemap } from "../src/lib/seo/sitemap";
import sitemap from "../src/app/sitemap";

test("blog bodies exist before client JavaScript runs and remain sanitized", () => {
  const markdown = renderToStaticMarkup(createElement(MarkdownRenderer, { markdown: "## 검색 가능한 본문\n\n내용입니다. <script>alert(1)</script>" }));
  const quill = renderToStaticMarkup(createElement(QuillCodeRenderer, { htmlString: '<p>이전 글 본문</p><div class="ql-code-block" data-language="js">const value = 1;</div><img src="x" onerror="alert(1)">' }));
  assert.match(markdown, /<h2>검색 가능한 본문<\/h2>/);
  assert.match(quill, /<p>이전 글 본문<\/p>/);
  assert.match(quill, /const value = 1;/);
  assert.doesNotMatch(markdown + quill, /<script|onerror/);
});

test("sitemap preserves public pages without blog data and sanitizes dates and IDs", () => {
  const empty = createSitemap([{ id: 7 }], []);
  for (const path of ["", "/projects", "/games", "/projects/7"]) {
    assert.ok(empty.some(entry => entry.url === `https://www.yonghun.me${path}`));
  }
  const entries = createSitemap([], [
    { id: 1, created_at: "2026-10-26" }, { id: 1, created_at: "invalid" },
    { id: 2, created_at: "invalid" }, { id: -1, created_at: "invalid" },
  ]).filter(entry => /\/posts\/\d+$/.test(entry.url));
  assert.equal(entries.length, 2);
  assert.ok(entries[0].lastModified instanceof Date);
  assert.equal(entries[1].lastModified, undefined);
});

test("sitemap route survives API failure and retains pages fetched before a later failure", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => { throw new Error("API offline"); };
    const offline = await sitemap();
    assert.ok(offline.some(entry => entry.url.endsWith("/games")));
    assert.ok(offline.some(entry => entry.url.endsWith("/projects/7")));
    let calls = 0;
    globalThis.fetch = async () => {
      if (++calls > 1) throw new Error("later page failed");
      return Response.json({ total_count: 2, posts: [{ id: 100, created_at: "2026-01-01" }] });
    };
    const partial = await sitemap();
    assert.equal(calls, 2);
    assert.ok(partial.some(entry => entry.url.endsWith("/posts/100")));
    assert.ok(partial.some(entry => entry.url.endsWith("/projects")));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
