// Local CI data only. Never used by the deployed application.
import { createServer } from "node:http";

const post = {
  id: 100, title: "웹 서비스 성능 개선과 구현 기록",
  description: "웹 서비스의 구현 과정과 성능 개선을 기록하는 개발 글입니다. 검색엔진이 제목과 본문을 첫 HTML에서 읽을 수 있는지 확인합니다.",
  body: "## 서버에서 읽을 수 있는 개발 기록\n\nSEO 검증용 본문입니다.\n\n```js\nconst ready = true;\n```",
  tags: ["개발"], thumbnail: "/metaimg.png", thumbnail_blur: "",
  view_count: 0, like_count: 0, created_at: "2026-01-01T00:00:00Z",
};

const server = createServer((request, response) => {
  const path = new URL(request.url, "http://localhost").pathname;
  response.setHeader("Content-Type", "application/json");
  if (request.method !== "GET") {
    response.writeHead(405).end(JSON.stringify({ error: "Read-only SEO fixture" }));
    return;
  }
  const data = path === "/posts" ? { total_count: 1, posts: [post] }
    : path === "/posts/popular" ? [post]
    : path === "/posts/100" ? post
    : path === "/tags" ? ["개발"] : null;
  if (data === null) response.statusCode = 404;
  response.end(JSON.stringify(data ?? { error: "Not found" }));
});
server.listen(8086, "127.0.0.1", () => console.log("SEO fixture ready on 127.0.0.1:8086"));
