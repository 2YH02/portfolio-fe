import { projects } from "@/data";
import { getAllPosts } from "@/lib/api/blog";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { posts } = await getAllPosts();

  const postsMap = posts.map((post) => ({
    url: `https://www.yonghun.me/posts/${post.id}`,
  }));

  const projectsMap = projects.map((project) => ({
    url: `https://www.yonghun.me/projects/${project.id}`,
  }));

  const routesMap = ["", "/about"].map((route) => ({
    url: `https://www.yonghun.me${route}`,
  }));

  return [...postsMap, ...projectsMap, ...routesMap];
};

export default sitemap;
