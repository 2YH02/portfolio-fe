import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginClient from "./pageClient";

export default async function LoginPage() {
  const cookieStore = await cookies();
  if (cookieStore.has("admin_token")) {
    redirect("/posts");
  }

  return <LoginClient />;
}
