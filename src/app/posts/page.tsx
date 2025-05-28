import { getAllPosts } from "@/lib/api/blog";
import { notFound } from "next/navigation";
import PostClient from "./pageClient";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Posts(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  const data = await getAllPosts(page);

  if (data.posts.length === 0 || !data) {
    notFound();
  }

  return <PostClient data={data} page={page} />;
}
