"use client";

import AuthForm from "@/app/posts/components/AuthForm";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();

  return <AuthForm onSuccess={() => router.push("/posts")} />;
}
