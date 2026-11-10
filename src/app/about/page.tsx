import type { Metadata } from "next";
import { projects } from "@/data";
import { serializeJsonLd } from "@/lib/content/jsonLd";
import AboutClient from "./AboutClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이용훈 소개 | Yonghun",
  alternates: { canonical: "https://www.yonghun.me/about" },
  description:
    "서비스 기획과 구현부터 출시·운영 개선, 개발 도구와 자동화 환경 구축까지 경험한 개발자 이용훈입니다.",
  keywords: "웹개발자,모바일개발,프론트엔드,React Native,이용훈,포트폴리오,소개",
  openGraph: {
    type: "profile",
    url: "https://www.yonghun.me/about",
    title: "이용훈 소개 | Yonghun",
    description:
      "서비스 기획과 구현부터 출시·운영 개선, 개발 도구와 자동화 환경 구축까지 경험한 개발자 이용훈입니다.",
    images: "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "이용훈 소개 | Yonghun",
    description:
      "서비스 기획과 구현부터 출시·운영 개선, 개발 도구와 자동화 환경 구축까지 경험한 개발자 이용훈입니다.",
    images: "/metaimg.png",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "이용훈",
  alternateName: "Yonghun",
  url: "https://www.yonghun.me",
  jobTitle: "개발자",
  sameAs: ["https://github.com/2YH02"],
  description: "서비스 기획과 구현부터 출시·운영 개선, 개발 도구와 자동화 환경 구축까지 경험한 개발자입니다.",
};

export default function About() {
  const featuredProjects = [8, 1, 4]
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined)
    .map(({ id, title, category, thumbnail, thumbnailAlt, tagline }) => ({
      id, title, category, thumbnail, thumbnailAlt, tagline,
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
      />
      <AboutClient featuredProjects={featuredProjects} />
    </>
  );
}
