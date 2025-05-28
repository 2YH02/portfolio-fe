import { apiClient } from "./apiClient";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export type Post = {
  id: number;
  title: string;
  description: string;
  body: string;
  tags: string[];
  thumbnail: string;
  thumbnail_blur: string;
  created_at: string;
};

export type PostsResponse = {
  total_count: number;
  posts: Post[];
};

export async function getAllPosts(page: number) {
  return apiClient<PostsResponse>(`${BASE_URL}/posts?page=${page}`);
}

export async function getPostById(id: number) {
  return apiClient<Post>(`${BASE_URL}/posts/${id}`);
}
