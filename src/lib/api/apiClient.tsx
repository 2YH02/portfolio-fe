export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export interface NextFetchOptions {
  revalidate?: false | 0 | number;
  tags?: string[];
}

export async function apiClient<T>(
  url: string,
  options: RequestInit = {},
  next: NextFetchOptions = {}
): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
    ...next,
  });

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  return res.json();
}
