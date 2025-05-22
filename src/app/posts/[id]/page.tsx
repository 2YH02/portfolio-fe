import { getPostById } from "@/lib/api/blog";
import { notFound } from "next/navigation";
import PostClient from "./pageClient";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getPostById(Number(id));

  if (!data) notFound();

  return <PostClient post={data} />;
}
