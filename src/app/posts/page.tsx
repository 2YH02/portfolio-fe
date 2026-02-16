import { getAllPosts } from "@/lib/api/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostClient from "./pageClient";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const generateMetadata = (): Metadata => ({
  title: "Yonghun - 개발 블로그",
  description:
    "프론트엔드/백엔드 개발 경험, 성능 최적화, 프로젝트 회고를 기록하는 개발 블로그입니다.",
  alternates: {
    canonical: "https://www.yonghun.me/posts",
  },
  openGraph: {
    type: "website",
    url: "https://www.yonghun.me/posts",
    title: "Yonghun - 개발 블로그",
    description:
      "프론트엔드/백엔드 개발 경험, 성능 최적화, 프로젝트 회고를 기록하는 개발 블로그입니다.",
    images: "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonghun - 개발 블로그",
    description:
      "프론트엔드/백엔드 개발 경험, 성능 최적화, 프로젝트 회고를 기록하는 개발 블로그입니다.",
    images: "/metaimg.png",
  },
});

export default async function Posts(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  const data = await getAllPosts(page);

  if (!data || data.posts.length === 0) {
    notFound();
  }

  const optimizedData = {
    total_count: data.total_count,
    posts: data.posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      tags: post.tags,
      thumbnail: post.thumbnail,
      thumbnail_blur: post.thumbnail_blur,
      created_at: post.created_at,
    })),
  };

  return <PostClient data={optimizedData} page={page} />;
}
