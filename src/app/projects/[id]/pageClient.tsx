"use client";

import DelayedLink from "@/components/common/DelayedLink";
import { GlassBox } from "@/components/ui/GlassBox";
import type { Members, Project } from "@/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function DetailClient({ project }: { project: Project }) {
  const [curImage, setCurImage] = useState<string | null>(null);

  return (
    <main className="relative w-screen h-screen font-mono overflow-auto">
      {/* 상단 링크 */}
      <motion.nav
        initial={{ top: -300 }}
        animate={{ top: 40 }}
        transition={{
          duration: 0.3,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-10"
      >
        <GlassBox className="py-0 rounded-full bg-black/40">
          <ul className="flex">
            <li className="shrink-0">
              <DelayedLink className="py-4 px-8" href="/projects">
                PROJECTS
              </DelayedLink>
            </li>
            <li className="shrink-0">
              <DelayedLink className="py-4 px-8" href="/">
                HOME
              </DelayedLink>
            </li>
            <li className="shrink-0">
              <DelayedLink className="py-4 px-8" href="/about">
                ABOUT
              </DelayedLink>
            </li>
            <li className="shrink-0">
              <DelayedLink className="py-4 px-8" href="/posts">
                POSTS
              </DelayedLink>
            </li>
          </ul>
        </GlassBox>
      </motion.nav>

      {/* 메인 이미지 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[80%] w-[90%] rounded-bl-4xl rounded-br-4xl overflow-hidden">
        <img
          src={project.thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover object-center scale-110"
        />
      </div>

      {/* 프로젝트 정보 */}
      <motion.div
        className="absolute top-[85%] w-[90%] left-1/2 -translate-x-1/2 pb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 기본 정보 */}
        <div className="mb-10">
          <motion.h2
            className="text-4xl font-bold text-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {project.title}
          </motion.h2>
          <hr className="border-gray-300 my-6" />
          <div className="space-y-4">
            {project.period && (
              <DetailRow label="개발 기간">{project.period}</DetailRow>
            )}
            <DetailRow label="개발 인원">
              {formatMembers(project.members)}
            </DetailRow>
            <DetailRow label="담당 역할">{project.role}</DetailRow>
            <DetailRow label="깃허브 저장소">
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(0,123,255,0.7)] hover:underline"
              >
                {project.repository}
              </a>
            </DetailRow>
            {project.deployUrl && (
              <DetailRow label="배포 주소">
                <a
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(0,123,255,0.7)] hover:underline"
                >
                  {project.deployUrl}
                </a>
              </DetailRow>
            )}
            <DetailRow label="사용 기술">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((stack) => (
                  <span
                    key={stack}
                    className="bg-indigo-200 text-indigo-700 px-2 py-1 rounded-full text-sm"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </DetailRow>
            <DetailRow label="프로젝트 설명">
              <p className="leading-relaxed">{project.description}</p>
            </DetailRow>
          </div>
        </div>

        {/* 성과 */}
        <div className="mb-10">
          <h3 className="text-left text-2xl text-indigo-400 font-bold my-6">
            핵심 기능 및 성과
          </h3>
          <div className="flex gap-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.sections?.map((sec) => (
                <GlassBox
                  withAction
                  key={sec.title}
                  className="transform transition-transform duration-300 ease-in-out hover:z-10
                            hover:[transform:perspective(800px)_rotateX(4deg)_rotateY(-4deg)_scale(1.05)] 
                            relative border border-solid w-full rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-indigo-200 mb-4">
                    {sec.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-400  group-hover:text-white">
                    {sec.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </GlassBox>
              ))}
            </div>
          </div>
        </div>

        {/* 회고 */}
        <div className="mb-10">
          <h3 className="text-left text-2xl text-indigo-400 font-bold my-6">
            회고
          </h3>
          <div className="whitespace-pre-wrap text-gray-300">{project.reflection}</div>
        </div>

        {/* 이미지 */}
        <div className="mb-10">
          <h3 className="text-left text-2xl text-indigo-400 font-bold my-6">
            이미지
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((src) => (
              <div
                key={src}
                className={cn(
                  "relative w-full rounded-lg overflow-hidden aspect-[4/3] cursor-zoom-in"
                )}
                onClick={() => setCurImage(src)}
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot`}
                  fill
                  className={cn("object-cover")}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 이미지 모달 */}
      <AnimatePresence>
        {curImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setCurImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`img-${curImage}`}
              className="relative w-full h-full"
            >
              <Image
                src={curImage}
                alt="enlarged screenshot"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <motion.div
    className="flex justify-between items-start"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <span className="font-medium text-indigo-200 w-1/3">{label}</span>
    <div className="flex-1 text-gray-300">{children}</div>
  </motion.div>
);

function formatMembers(members: Members = {}): string {
  const labelMap = {
    fe: "FE",
    be: "BE",
    ui: "UI/UX",
    pm: "PM",
  };

  const order: (keyof Members)[] = ["fe", "be", "ui", "pm"];

  let total = 0;
  const parts: string[] = [];

  for (const key of order) {
    const cnt = members[key] ?? 0;
    if (cnt > 0) {
      total += cnt;
      parts.push(`${labelMap[key]}: ${cnt}`);
    }
  }

  if (total === 0) {
    return "0명";
  }

  return `${total}명 (${parts.join(", ")})`;
}
