"use client";

import AuthForm from "@/components/common/AuthForm";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();

  return <AuthForm onSuccess={() => router.push("/posts")} />;
}
