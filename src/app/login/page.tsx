import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LoginPage() {
  const cookieStore = await cookies();
  if (cookieStore.has("admin_token")) {
    redirect("/posts");
  }

  return <LoginClient />;
}
