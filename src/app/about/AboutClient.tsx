"use client";

import Nav from "@/components/common/Nav";
import { GlassBox } from "@/components/ui/GlassBox";
import { about } from "@/data";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import type { Project } from "@/data/projects";

type FeaturedProject = Pick<Project, "id" | "title" | "category" | "thumbnail" | "thumbnailAlt" | "tagline">;

export default function AboutClient({ featuredProjects }: { featuredProjects: FeaturedProject[] }) {
  return (
    <main className="relative w-screen h-screen font-mono overflow-y-auto overflow-x-hidden">
      {/* 상단 링크 */}
      <Nav />

      {/* 소개 */}
      <motion.div
        className="mx-auto max-w-5xl px-6 pt-32 pb-24 sm:px-10 sm:pt-36"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-center items-center gap-4 text-4xl font-bold text-indigo-400">
          <h1>{about.name}</h1>
          <a href="https://github.com/2YH02" target="_blank" rel="noopener noreferrer"
            aria-label="이용훈 GitHub 프로필 열기"
            className="relative h-10 w-10 rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-indigo-300/40 hover:bg-indigo-400/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300">
            <BsGithub aria-hidden="true" size={21} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </a>
        </div>
        <div className="mb-16">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-blue-400">About me</p>
          <h2 className="mb-5 text-xl font-bold text-indigo-300 sm:text-3xl">개발자 이용훈</h2>
          <p className="max-w-3xl whitespace-pre-wrap leading-8 text-gray-300">{about.text}</p>
        </div>

        <section className="mb-16" aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="mb-6 text-2xl font-bold text-blue-500">일하는 방식</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {about.approach.map((item) => (
              <li key={item.title}>
                <GlassBox className="h-full">
                  <h3 className="mb-3 font-semibold text-indigo-200">{item.title}</h3>
                  <p className="text-sm leading-6 text-gray-300">{item.description}</p>
                </GlassBox>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16" aria-labelledby="featured-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 id="featured-heading" className="text-2xl font-bold text-blue-500">만든 제품</h2>
              <p className="mt-2 text-sm text-gray-400">직접 개발하고 출시한 서비스와 라이브러리입니다.</p>
            </div>
            <Link href="/projects" className="shrink-0 text-sm text-indigo-300 hover:text-white">전체 프로젝트 →</Link>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <li key={project.id}>
                <Link href={`/projects/${project.id}`} className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300">
                  <GlassBox withAction className="h-full p-0">
                    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                      <Image src={project.thumbnail} alt={project.thumbnailAlt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <p className="mb-2 text-xs text-indigo-200">{project.category}</p>
                      <h3 className="text-lg font-semibold group-hover:text-indigo-200">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">{project.tagline}</p>
                    </div>
                  </GlassBox>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="mb-6 text-2xl font-bold text-blue-500">기술과 도구</h2>
          <motion.ul
            className="grid gap-4 sm:grid-cols-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {},
            }}
          >
            {about.skills.map((skill, index) => (
              <motion.li
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-gray-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <strong className="mb-2 block text-indigo-200">{skill.title}</strong>
                <span>{skill.description}</span>
              </motion.li>
            ))}
          </motion.ul>
        </section>

      </motion.div>
    </main>
  );
}
