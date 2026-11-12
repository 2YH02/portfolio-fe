import { getPostById } from "@/lib/api/blog";
import { serializeJsonLd } from "@/lib/content/jsonLd";
import { isQuillBody, renderPostBodyHtml } from "@/lib/content/sanitizeHtml.server";
import { notFound } from "next/navigation";
import PostDetailClient from "./PostDetailClient";

export const dynamic = "force-static";
export const revalidate = 3600;

const DEFAULT_DESCRIPTION = "개발자 이용훈이 구현 과정과 기술 경험을 기록하는 개발 블로그입니다.";

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
      title: "이용훈 개발 블로그 | Yonghun",
      description: DEFAULT_DESCRIPTION,
    };
  }

  const metaDescription = createMetaDescription(data.description, data.body);

  return {
    title: `${data.title} | 이용훈 개발 블로그`,
    description: metaDescription,
    keywords: data.tags.join(", "),
    alternates: {
      canonical: `https://www.yonghun.me/posts/${id}`,
    },
    openGraph: {
      type: "article",
      url: `https://www.yonghun.me/posts/${id}`,
      title: `${data.title} | 이용훈 개발 블로그`,
      description: metaDescription,
      images: data.thumbnail,
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | 이용훈 개발 블로그`,
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.yonghun.me/posts/${id}`,
    },
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
    publisher: {
      "@type": "Person",
      name: "이용훈",
      url: "https://www.yonghun.me",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <PostDetailClient
        post={data}
        bodyHtml={renderPostBodyHtml(data.body)}
        bodyFormat={isQuillBody(data.body) ? "quill" : "markdown"}
      />
    </>
  );
}
