import { projects } from "@/data";
import { BASE_URL } from "@/lib/api/apiClient";
import type { PostListItem, PostsResponse } from "@/lib/api/blog";
import { createSitemap } from "@/lib/seo/sitemap";

export const revalidate = 3600;

export default async function sitemap() {
  const posts: PostListItem[] = [];
  try {
    // Keep public routes discoverable even when the blog API is unavailable.
    for (let page = 1; page <= 50; page++) {
      const response = await fetch(`${BASE_URL}/posts?page=${page}&pageSize=1000`, {
        signal: AbortSignal.timeout(8000), next: { revalidate: 3600 },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result: PostsResponse = await response.json();
      if (!Array.isArray(result.posts)) throw new Error("Invalid posts response");
      posts.push(...result.posts);
      if (!result.posts.length || posts.length >= result.total_count) break;
    }
  } catch {
    console.warn("Sitemap: blog API unavailable; retaining public routes and fetched posts");
  }
  return createSitemap(projects, posts);
}
