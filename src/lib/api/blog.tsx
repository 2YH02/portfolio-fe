import { apiClient, BASE_URL } from "./apiClient";

export type Post = {
  id: number;
  title: string;
  description: string;
  body: string;
  tags: string[];
  thumbnail: string;
  thumbnail_blur: string;
  view_count: number;
  created_at: string;
};

export type PostListItem = Omit<Post, "body">;

export type PostsResponse = {
  total_count: number;
  posts: PostListItem[];
};

export type AddPostsRequest = {
  title: string;
  description: string;
  body: string;
  tags: string[];
  thumbnail: string;
  thumbnail_blur: string;
};

export async function getAllPosts(page?: number) {
  if (page) {
    return apiClient<PostsResponse>(`${BASE_URL}/posts?page=${page}`);
  } else {
    return apiClient<PostsResponse>(`${BASE_URL}/posts`, {
      cache: "no-store",
    });
  }
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
  return apiClient<Post>(`/api/posts/${id}`, {
    method: "DELETE",
  });
}
