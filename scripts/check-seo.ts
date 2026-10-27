import assert from "node:assert/strict";
import { projects } from "../src/data/projects";
import { games } from "../src/data/games";

const origin = process.env.SEO_BASE_URL || "http://localhost:3000";
const canonicalOrigin = "https://www.yonghun.me";
const paths = ["/", "/about", "/posts", "/projects", "/games", ...projects.map(project => `/projects/${project.id}`)];

async function html(path: string) {
  const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path}: HTTP status`);
  return response.text();
}

async function main() {
  for (const path of paths) {
    const source = await html(path);
    const canonical = `${canonicalOrigin}${path === "/" ? "" : path}`;
    assert.ok(source.includes(`<link rel="canonical" href="${canonical}"`), `${path}: canonical`);
    assert.match(source, /<title>[^<]+<\/title>/, `${path}: title`);
    assert.match(source, /<meta name="description" content="[^"]+"/, `${path}: description`);
    assert.match(source, /<meta property="og:image" content="https:\/\//, `${path}: absolute OG image`);
    assert.doesNotMatch(source, /<meta name="robots" content="[^"]*noindex/, `${path}: indexable`);
    const body = source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.equal((body.match(/<h1\b/g) ?? []).length, 1, `${path}: one H1`);
    for (const match of source.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
    if (path === "/projects") for (const project of projects) assert.ok(body.includes(`href="/projects/${project.id}"`), `SSR project link ${project.id}`);
    if (path === "/games") for (const game of games) {
      assert.ok(body.includes(game.description), `SSR game description ${game.slug}`);
      assert.ok(body.includes(`href="/projects/${game.projectId}"`), `game detail link ${game.slug}`);
    }
    console.log(`PASS ${path}`);
  }
  const sitemap = await html("/sitemap.xml");
  for (const path of paths) assert.ok(sitemap.includes(`<loc>${canonicalOrigin}${path === "/" ? "" : path}</loc>`), `sitemap ${path}`);
  const robots = await html("/robots.txt");
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  for (const path of ["/projects/not-a-project", "/projects/999", "/projects/07", "/projects/7abc"]) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 404, `${path}: invalid project must return 404`);
  }
  if (process.env.SEO_FIXTURE === "1") {
    const source = await html("/posts/100");
    const body = source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.ok(body.includes("SEO 검증용 본문입니다."), "blog body in initial HTML");
  }
  console.log("PASS sitemap, robots, invalid routes and initial HTML");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
