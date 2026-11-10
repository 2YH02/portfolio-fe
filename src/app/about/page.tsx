import type { Metadata } from "next";
import { serializeJsonLd } from "@/lib/content/jsonLd";
import AboutClient from "./AboutClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Yonghun - About",
  alternates: { canonical: "https://www.yonghun.me/about" },
  description:
    "사용자에게 필요한 경험을 고민하고 웹·모바일 제품으로 구현하는 개발자 이용훈입니다.",
  keywords: "웹개발자,모바일개발,프론트엔드,React Native,이용훈,포트폴리오,소개",
  openGraph: {
    type: "profile",
    url: "https://www.yonghun.me/about",
    title: "Yonghun - About",
    description:
      "사용자에게 필요한 경험을 고민하고 웹·모바일 제품으로 구현하는 개발자 이용훈입니다.",
    images: "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonghun - About",
    description:
      "사용자에게 필요한 경험을 고민하고 웹·모바일 제품으로 구현하는 개발자 이용훈입니다.",
    images: "/metaimg.png",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "이용훈",
  url: "https://www.yonghun.me",
  jobTitle: "웹·모바일 개발자",
  description: "사용자에게 필요한 경험을 고민하고 웹·모바일 제품으로 구현하는 개발자입니다.",
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
