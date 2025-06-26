import { getPostById } from "@/lib/api/blog";
import { notFound } from "next/navigation";
import PostDetailClient from "./pageClient";

export const dynamic = "force-static";
export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const data = await getPostById(Number(id));

  if (!data) {
    return {
      title: `Yonghun - 개발 블로그`,
    };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.tags.join(", "),
    openGraph: {
      type: "website",
      url: `https://www.yonghun.me/posts/${id}`,
      title: data.title,
      description: data.description,
      images: data.thumbnail,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: data.thumbnail,
    },
  };
};

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getPostById(Number(id));

  if (!data) notFound();

  return <PostDetailClient post={data} />;
}
