import assert from "node:assert/strict";
import test from "node:test";
import { marked } from "marked";
import { sanitizePostHtml } from "../src/lib/content/sanitizeHtml";
import { serializeJsonLd } from "../src/lib/content/jsonLd";

test("removes executable elements, event handlers and embedded documents", () => {
  const html = sanitizePostHtml(`
    <p>본문</p><script>alert(1)</script><style>body{display:none}</style>
    <iframe srcdoc="<script>alert(1)</script>"></iframe>
    <object data="https://example.com"></object><embed src="https://example.com">
    <img src="https://example.com/image.webp" onerror="alert(1)">
    <svg><g onload="alert(1)"></g></svg><math><mtext>bad</mtext></math>
  `);
  assert.match(html, /<p>본문<\/p>/);
  assert.match(html, /src="https:\/\/example.com\/image.webp"/);
  assert.doesNotMatch(html, /<\/?(?:script|style|iframe|object|embed|svg|math)\b|onerror|onload|srcdoc/i);
});

for (const href of [
  "javascript:alert(1)", "JaVaScRiPt:alert(1)", "java\nscript:alert(1)",
  "java\tscript:alert(1)", "jav&#x61;script:alert(1)", "javascript&#58;alert(1)",
  "data:text/html,<script>alert(1)</script>",
]) {
  test(`blocks unsafe link protocol: ${JSON.stringify(href)}`, () => {
    assert.equal(sanitizePostHtml(`<a href="${href}">링크</a>`), "<a>링크</a>");
  });
}

test("retains ordinary external, relative, fragment, email and phone links", () => {
  for (const href of ["https://example.com/path", "/posts/1", "#section", "mailto:hello@example.com", "tel:+821012345678"]) {
    assert.match(sanitizePostHtml(`<a href="${href}">링크</a>`), /<a href=/);
  }
});

test("keeps Markdown headings, tables, code, images and display-only task lists", () => {
  const markdown = [
    "## 제목", "", "**강조**와 [링크](/posts/1)", "",
    "| 이름 | 값 |", "| --- | --- |", "| 테스트 | 1 |", "",
    "```typescript", 'const html = "<script>";', "```", "",
    "![설명](https://example.com/image.webp)", "", "- [x] 완료", "- [ ] 예정",
  ].join("\n");
  const html = sanitizePostHtml(marked.parse(markdown, { async: false, gfm: true }));
  assert.match(html, /<h2>제목<\/h2>/);
  assert.match(html, /<strong>강조<\/strong>/);
  assert.match(html, /<table>/);
  assert.match(html, /class="language-typescript"/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /alt="설명"/);
  assert.equal((html.match(/<input/g) ?? []).length, 2);
  assert.equal((html.match(/disabled/g) ?? []).length, 2);
  assert.match(html, /checked/);
});

test("keeps Quill new-tab links while protecting the opener and removing named targets", () => {
  const html = sanitizePostHtml('<a href="https://example.com" target="_blank" rel="nofollow opener">링크</a>');
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="nofollow noopener noreferrer"/);
  assert.doesNotMatch(sanitizePostHtml('<a href="/posts" target="admin-window">글</a>'), /target=/);
});

test("preserves Quill code metadata and safe inline formatting", () => {
  const html = sanitizePostHtml(`
    <div class="ql-code-block-container" spellcheck="false">
      <select class="ql-ui"><option value="rust" selected>Rust</option></select>
      <div class="ql-code-block" data-language="rust">fn main() {}</div>
    </div>
    <ol><li data-list="bullet" class="ql-indent-1">항목</li></ol>
    <span style="color: rgb(230, 0, 0); background-color: #fff; text-align: center">서식</span>
  `);
  assert.match(html, /class="ql-code-block" data-language="rust"/);
  assert.match(html, /value="rust" selected/);
  assert.match(html, /data-list="bullet" class="ql-indent-1"/);
  assert.match(html, /color: rgb\(230, 0, 0\)/);
  assert.match(html, /background-color: #fff/);
  assert.match(html, /text-align: center/);
});

test("prevents layout overlays, CSS URL loads and DOM clobbering attributes", () => {
  const html = sanitizePostHtml(`<p id="location" name="attributes" class="fixed inset-0 ql-align-center"
    style="position:fixed;inset:0;background-image:url(https://example.com/tracker);color:expression(alert(1));background-color:#fff">본문</p>`);
  assert.match(html, /class="ql-align-center"/);
  assert.match(html, /background-color:#fff/);
  assert.doesNotMatch(html, /id=|name=|position|inset|fixed|background-image|expression|tracker/);
});

test("removes active form controls while retaining inert task checkboxes", () => {
  const html = sanitizePostHtml('<form action="https://example.com"><input type="password"><input type="checkbox" checked></form>');
  assert.doesNotMatch(html, /<form|type="password"|action=/);
  assert.match(html, /type="checkbox"/);
  assert.match(html, /disabled/);
});

test("allows raster data images but rejects embedded SVG and HTML data", () => {
  assert.match(sanitizePostHtml('<img src="data:image/png;base64,aGVsbG8=" alt="미리보기">'), /src="data:image\/png;base64,/);
  for (const src of ["data:image/svg+xml;base64,PHN2Zz4=", "data:text/html;base64,PHNjcmlwdD4=", "javascript:alert(1)"]) {
    assert.doesNotMatch(sanitizePostHtml(`<img src="${src}">`), /src=/);
  }
});

test("sanitizes malformed mixed HTML and remains safe across repeated calls", () => {
  const malformed = '<math><mtext><table><mglyph><style><!--</style><img title="--><img src=x onerror=alert(1)>">';
  for (let i = 0; i < 3; i++) {
    assert.doesNotMatch(sanitizePostHtml(malformed), /<\/?(?:math|style|script)\b|onerror=/i);
    assert.equal(sanitizePostHtml('<p class="ql-align-center">정상</p>'), '<p class="ql-align-center">정상</p>');
  }
});

test("JSON-LD cannot terminate its script and round-trips the original content", () => {
  const data = {
    "@type": "BlogPosting",
    headline: '</script><img src=x onerror="alert(1)">',
    description: "한글 & 기호 < >, 줄바꿈\n, 유니코드\u2028\u2029",
    nested: { text: "<!-- <script> </ScRiPt>" },
  };
  const serialized = serializeJsonLd(data);
  assert.doesNotMatch(serialized, /</);
  assert.deepEqual(JSON.parse(serialized), data);
  assert.match(serialized, /\\u003c\/script>/);
});
