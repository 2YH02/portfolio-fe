import type { MetadataRoute } from "next";

export function createSitemap(
  projects: { id: number }[],
  posts: { id: number; created_at: string }[],
): MetadataRoute.Sitemap {
  const base = "https://www.yonghun.me";
  const entries: MetadataRoute.Sitemap = [
    ...["", "/about", "/posts", "/projects", "/games"].map(route => ({ url: `${base}${route}` })),
    ...projects.map(project => ({ url: `${base}/projects/${project.id}` })),
  ];
  const seen = new Set<number>();
  for (const post of posts) {
    if (!Number.isSafeInteger(post.id) || post.id < 1 || seen.has(post.id)) continue;
    seen.add(post.id);
    const date = new Date(post.created_at);
    entries.push({ url: `${base}/posts/${post.id}`, ...(Number.isNaN(date.getTime()) ? {} : { lastModified: date }) });
  }
  return entries;
}
