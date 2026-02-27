import { getAllPosts } from "@/lib/api/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostClient from "./PostClient";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const DEFAULT_DESCRIPTION =
  "프론트엔드/백엔드 개발 경험, 성능 최적화, 프로젝트 회고를 기록하는 개발 블로그입니다.";

const parsePage = (value: string | string[] | undefined) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
};

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const params = await searchParams;
  const page = parsePage(params.page);

  const canonicalPath = page === 1 ? "/posts" : `/posts?page=${page}`;
  const title =
    page === 1 ? "Yonghun - 개발 블로그" : `Yonghun - 개발 블로그 | ${page}페이지`;
  const description =
    page === 1
      ? DEFAULT_DESCRIPTION
      : `${DEFAULT_DESCRIPTION} 현재 ${page}페이지입니다.`;
  const url = `https://www.yonghun.me${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: "/metaimg.png",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: "/metaimg.png",
    },
  };
};

export default async function Posts(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = parsePage(searchParams.page);

  const data = await getAllPosts(page);

  if (!data || data.posts.length === 0) {
    notFound();
  }

  const optimizedData = {
    total_count: data.total_count,
    posts: data.posts.map((post, index) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      tags: post.tags,
      thumbnail: post.thumbnail,
      thumbnail_blur: index < 3 ? post.thumbnail_blur : "",
      view_count: post.view_count,
      created_at: post.created_at,
    })),
  };

  return <PostClient data={optimizedData} page={page} />;
}
