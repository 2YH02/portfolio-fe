import { post_detail_list } from "@/data";
import PostClient from "./pageClient";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = post_detail_list.find((post) => post.id === ~~id);

  if (!post) return <div>asd</div>;

  return <PostClient post={post} />;
}
