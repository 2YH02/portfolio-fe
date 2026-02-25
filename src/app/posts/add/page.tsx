import { type User } from "@/lib/api/auth";
import { cookies } from "next/headers";
import AddPostClient from "./pageClient";

export default async function AddPostPage() {
  const cookieStore = await cookies();
  const initialRole: User = cookieStore.has("admin_token") ? "Admin" : "Guest";

  return <AddPostClient initialRole={initialRole} />;
}
