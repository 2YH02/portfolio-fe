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

export async function getAllPosts({
  page,
  tag,
  pageSize,
}: { page?: number; tag?: string; pageSize?: number } = {}) {
  const params = new URLSearchParams();
  if (page) params.set("page", String(page));
  if (tag) params.set("tag", tag);
  if (pageSize) params.set("pageSize", String(pageSize));
  const query = params.toString();
  return apiClient<PostsResponse>(
    `${BASE_URL}/posts${query ? `?${query}` : ""}`,
    query ? {} : { cache: "no-store" }
  );
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

export async function viewPost(id: number): Promise<{ view_count: number } | null> {
  return apiClient(`/api/posts/${id}/view`, { method: "POST" });
}

export async function getPopularPosts() {
  return apiClient<PostListItem[]>(`${BASE_URL}/posts/popular`);
}

export async function getTags() {
  return apiClient<string[]>(`${BASE_URL}/tags`);
}

export async function likePost(id: number): Promise<{ like_count: number } | null> {
  return apiClient(`/api/posts/${id}/like`, { method: "POST" });
}
