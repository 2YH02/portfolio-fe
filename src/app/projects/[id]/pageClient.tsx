"use client";

import Nav from "@/components/common/Nav";
import { GlassBox } from "@/components/ui/GlassBox";
import type { Members, Project } from "@/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function DetailClient({ project }: { project: Project }) {
  const [curImage, setCurImage] = useState<string | null>(null);
  const [curCard, setCurCard] = useState<number | null>(null);

  const cardTitleRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-screen h-screen overflow-auto">
      {/* 상단 링크 */}
      <Nav className="bg-black/40" />

      {/* 메인 이미지 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40%] md:h-[80%] w-[90%] rounded-bl-4xl rounded-br-4xl overflow-hidden">
        <img
          src={project.thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover object-center scale-110"
        />
      </div>

      {/* 프로젝트 정보 */}
      <motion.div
        className="absolute top-[45%] md:top-[85%] w-[90%] max-w-[1280px] left-1/2 -translate-x-1/2 pb-20"
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
              {project.repository.map((url) => {
                return (
                  <div key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[rgb(0,123,255)] hover:underline"
                    >
                      {url}
                    </a>
                  </div>
                );
              })}
            </DetailRow>
            {project.deployUrl && (
              <DetailRow label="배포 주소">
                <a
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(0,123,255)] hover:underline"
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
          <h3
            className="text-left text-2xl text-indigo-400 font-bold my-6 scroll-m-6"
            ref={cardTitleRef}
          >
            핵심 기능 및 성과
          </h3>
          <div className="flex gap-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.sections?.map((sec, i) => (
                <motion.div
                  key={sec.title}
                  onClick={() => {
                    if (window.innerWidth >= 768 && cardTitleRef.current) {
                      cardTitleRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                    setCurCard(curCard === i ? null : i);
                  }}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`col-span-1 ${
                    curCard === i
                      ? "md:col-span-2 md:row-end-1 md:row-start-3 cursor-zoom-out"
                      : "cursor-zoom-in"
                  }`}
                >
                  <GlassBox
                    withAction
                    className={`transform transition-transform duration-300 ease-in-out hover:z-10
                              ${
                                curCard !== i &&
                                "md:hover:[transform:perspective(800px)_rotateX(4deg)_rotateY(-4deg)_scale(1.05)]"
                              }
                              relative border border-solid rounded-lg w-full h-full`}
                  >
                    <h3 className="text-lg font-semibold text-indigo-200 mb-4">
                      {curCard === i ? sec.title : sec.titleSum || sec.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-white md:text-gray-300 md:group-hover:text-white">
                      {curCard === i ? (
                        <>
                          {sec.content.text ? (
                            <>
                              {sec.content.text?.map((b, j) => (
                                <li key={j} className="my-2">
                                  {b}
                                </li>
                              ))}
                            </>
                          ) : (
                            <>
                              <p className="text-lg font-bold text-white">
                                문제
                              </p>
                              {sec.content.problem?.map((b, j) => (
                                <li key={j} className="my-2">
                                  {b}
                                </li>
                              ))}
                              <div className="my-4" />
                              <p className="text-lg font-bold text-white">
                                해결
                              </p>
                              {sec.content.solution?.map((b, j) => (
                                <li key={j} className="my-2">
                                  {b}
                                </li>
                              ))}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {sec.summary.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </>
                      )}
                    </ul>
                  </GlassBox>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 회고 */}
        <div className="mb-10">
          <h3 className="text-left text-2xl text-indigo-400 font-bold my-6">
            회고
          </h3>
          <div className="whitespace-pre-wrap text-gray-300">
            {project.reflection}
          </div>
        </div>

        {/* 아키텍처 */}
        {project.architecture && (
          <div className="mb-10">
            <h3 className="text-left text-2xl text-indigo-400 font-bold my-6">
              아키텍처
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.architecture.map((imageUrl) => {
                return (
                  <div
                    key={imageUrl}
                    className={cn(
                      "relative w-full rounded-lg overflow-hidden aspect-[4/3] cursor-zoom-in bg-white"
                    )}
                    onClick={() => setCurImage(imageUrl)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`architecture`}
                      fill
                      className={cn("object-contain")}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 이미지 */}
        <div className="mb-10">
          <h3 className="text-left text-2xl text-indigo-400 font-bold my-6">
            구현 이미지
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

function formatMembers(members: Members | null = {}): string {
  if (!members) return "1명";

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
