import { apiClient } from "./apiClient";

export type User = "Admin" | "Guest";

export type AuthResponse = {
  username: string;
  role: User;
};

export async function Auth(user: string, password: string) {
  return apiClient<AuthResponse>(`/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, password }),
  });
}
