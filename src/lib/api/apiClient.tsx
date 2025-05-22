export async function apiClient<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  return res.json();
}
