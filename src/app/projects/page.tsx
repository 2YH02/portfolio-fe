import Nav from "@/components/common/Nav";
import { GlassBox } from "@/components/ui/GlassBox";
import { projects } from "@/data";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";

export const dynamic = "force-static";

const description =
  "개발 프로젝트 목록입니다. Next.js, React, Rust 등 다양한 기술 스택을 활용한 프로젝트를 확인해 보세요.";

export const metadata: Metadata = {
  title: "Yonghun - 프로젝트",
  description,
  keywords: "웹개발,프론트엔드,프로젝트,포트폴리오,Next.js,React,Rust",
  alternates: {
    canonical: "https://www.yonghun.me/projects",
  },
  openGraph: {
    type: "website",
    url: "https://www.yonghun.me/projects",
    title: "Yonghun - 프로젝트",
    description,
    images: "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonghun - 프로젝트",
    description,
    images: "/metaimg.png",
  },
};

export default function Projects() {
  return (
    <main className="relative w-screen h-screen overflow-y-auto overflow-x-hidden">
      <Nav />

      <section className="mx-auto max-w-6xl px-6 pt-32 pb-24 sm:pt-36">
        <h1 className="text-xl mb-2">Projects</h1>
        <p className="text-sm text-gray-400 mb-16">
          직접 기획하고 개발하며 문제를 풀어본 프로젝트들입니다.
        </p>

        <ol className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => (
            <li key={project.id}>
              <Link href={`/projects/${project.id}`} className="group w-full">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                  <GlassBox
                    withAction
                    className={cn(
                      "relative aspect-video p-0",
                      i % 2 === 1 && "md:order-2",
                    )}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} 대표 이미지`}
                      fill
                      sizes="(min-width: 768px) 560px, 100vw"
                      priority={i === 0}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </GlassBox>

                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-sm text-blue-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl font-bold md:text-3xl group-hover:drop-shadow-glow">
                      {project.title}
                    </h2>
                    <p className="text-gray-300">{project.tagline}</p>
                    <ul className="flex flex-col gap-1.5 text-sm text-gray-400">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span className="text-blue-500">—</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-indigo-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center text-sm text-[#7c86ff] group-hover:text-white">
                      자세히 보기
                      <BsArrowRightShort
                        size={22}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
