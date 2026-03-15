import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Yonghun - About",
  description:
    "기억에 남는 순간을 만들고 싶은 웹 개발자 이용훈입니다. JavaScript, TypeScript, React, Next.js, Rust 등을 다룹니다.",
  keywords: "웹개발자,프론트엔드,이용훈,포트폴리오,소개",
  openGraph: {
    type: "profile",
    url: "https://www.yonghun.me/about",
    title: "Yonghun - About",
    description:
      "기억에 남는 순간을 만들고 싶은 웹 개발자 이용훈입니다. JavaScript, TypeScript, React, Next.js, Rust 등을 다룹니다.",
    images: "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonghun - About",
    description:
      "기억에 남는 순간을 만들고 싶은 웹 개발자 이용훈입니다. JavaScript, TypeScript, React, Next.js, Rust 등을 다룹니다.",
    images: "/metaimg.png",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "이용훈",
  url: "https://www.yonghun.me",
  jobTitle: "웹 개발자",
  description: "기억에 남는 순간을 만들고 싶은 웹 개발자입니다.",
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
