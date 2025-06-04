import { apiClient, BASE_URL } from "./apiClient";

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

export type AddPostsRequest = {
  title: string;
  description: string;
  body: string;
  tags: string[];
  thumbnail: string;
  thumbnail_blur: string;
};

export async function getAllPosts(page: number) {
  return apiClient<PostsResponse>(`${BASE_URL}/posts?page=${page}`);
}

export async function getPostById(id: number) {
  return apiClient<Post>(`${BASE_URL}/posts/${id}`);
}

export async function addPost(payload: AddPostsRequest) {
  return apiClient<PostsResponse>(`/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function deletePost(id: number) {
  return apiClient<Post>(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
}
