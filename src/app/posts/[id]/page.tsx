import { getPostById } from "@/lib/api/blog";
import { notFound } from "next/navigation";
import PostDetailClient from "./PostDetailClient";

export const dynamic = "force-static";
export const revalidate = 3600;

const DEFAULT_DESCRIPTION = "Yonghun 개발 블로그의 게시글 상세 페이지입니다.";

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

const createMetaDescription = (description?: string, body?: string) => {
  const preferred = description?.trim();
  if (preferred) return preferred;

  const bodyText = body ? stripHtml(body) : "";
  if (bodyText) return bodyText.slice(0, 160);

  return DEFAULT_DESCRIPTION;
};

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
      description: DEFAULT_DESCRIPTION,
    };
  }

  const metaDescription = createMetaDescription(data.description, data.body);

  return {
    title: data.title,
    description: metaDescription,
    keywords: data.tags.join(", "),
    openGraph: {
      type: "website",
      url: `https://www.yonghun.me/posts/${id}`,
      title: data.title,
      description: metaDescription,
      images: data.thumbnail,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: metaDescription,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: createMetaDescription(data.description, data.body),
    image: data.thumbnail,
    datePublished: data.created_at,
    keywords: data.tags.join(", "),
    url: `https://www.yonghun.me/posts/${id}`,
    author: {
      "@type": "Person",
      name: "이용훈",
      url: "https://www.yonghun.me",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetailClient post={data} />
    </>
  );
}
