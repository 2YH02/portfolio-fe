import { projects } from "@/data";
import { getAllPosts } from "@/lib/api/blog";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const result = await getAllPosts({ pageSize: 1000 });
  const posts = result?.posts ?? []; 

  const postsMap = posts.map((post) => ({
    url: `https://www.yonghun.me/posts/${post.id}`,
    lastModified: new Date(post.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectsMap = projects.map((project) => ({
    url: `https://www.yonghun.me/projects/${project.id}`,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const routesMap = ["", "/about", "/posts"].map((route) => ({
    url: `https://www.yonghun.me${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  return [...postsMap, ...projectsMap, ...routesMap];
};

export default sitemap;
