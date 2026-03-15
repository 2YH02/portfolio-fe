import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Yonghun - 프로젝트",
  description:
    "개발 프로젝트 목록입니다. Next.js, React, Rust 등 다양한 기술 스택을 활용한 프로젝트를 확인해 보세요.",
  keywords: "웹개발,프론트엔드,프로젝트,포트폴리오,Next.js,React,Rust",
  openGraph: {
    type: "website",
    url: "https://www.yonghun.me/projects",
    title: "Yonghun - 프로젝트",
    description:
      "개발 프로젝트 목록입니다. Next.js, React, Rust 등 다양한 기술 스택을 활용한 프로젝트를 확인해 보세요.",
    images: "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonghun - 프로젝트",
    description:
      "개발 프로젝트 목록입니다. Next.js, React, Rust 등 다양한 기술 스택을 활용한 프로젝트를 확인해 보세요.",
    images: "/metaimg.png",
  },
};

export default function Projects() {
  return <ProjectsClient />;
}
