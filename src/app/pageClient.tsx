"use client";

import DelayedLink from "@/components/common/DelayedLink";
import { MaskContainer } from "@/components/ui/MaskContainer";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

export default function HomeClient() {
  const [active, setActive] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{
        opacity: active ? 0 : 1,
        transition: {
          duration: 0.5,
        },
      }}
      className="w-screen h-screen"
    >
      <MaskContainer
        revealSize={370}
        revealText={
          <div className="w-full flex flex-col">
            <h1 className="mx-auto max-w-4xl text-center font-bold text-slate-500 dark:text-white text-sm md:text-2xl lg:text-4xl">
              최적화된 코드로, 인터랙티브한 경험을 만들고,
              <br />
              사용자 중심의 웹을 고민합니다.
            </h1>
            <div className="flex gap-8 justify-center text-white text-base mt-3">
              <span>projects</span>
              <span>about me</span>
              <span>post</span>
            </div>
          </div>
        }
        className="h-full w-full text-white dark:text-black hidden md:block"
      >
        <div className="w-dvw text-center font-nanum text-2xl md:text-4xl lg:text-[44px]">
          <span className="text-blue-500">퍼포먼스 최적화</span>와{" "}
          <span className="text-blue-500">인터랙션</span>을 사랑하는
          <br />
          <span className="text-blue-500">웹 개발자</span> 이용훈입니다.
          <nav className="flex gap-8 justify-center text-white mt-3 text-lg md:text-xl lg:text-2xl">
            <DelayedLink
              href="/projects"
              ms={1100}
              className="hover:animate-shake-rotate"
              onClick={() => setActive(true)}
            >
              projects
            </DelayedLink>
            <Link href="/projects" className="hover:animate-shake-rotate">
              about me
            </Link>
            <Link href="/projects" className="hover:animate-shake-rotate">
              post
            </Link>
          </nav>
        </div>
      </MaskContainer>

      <div className="absolute top-1/2 left-1/2 w-full -translate-1/2 text-center text-white dark:text-black">
        <div className="font-nanum text-2xl md:text-4xl lg:text-[44px] md:hidden lg:hidden">
          <span className="text-blue-500">퍼포먼스 최적화</span>와{" "}
          <span className="text-blue-500">인터랙션</span>을 사랑하는
          <br />
          <span className="text-blue-500">프론트엔드 개발자</span> 이용훈입니다.
          <nav className="flex gap-8 justify-center text-white mt-3 text-lg md:text-xl lg:text-2xl">
            <Link href="/projects" className="active:animate-shake-rotate">
              projects
            </Link>
            <Link href="/projects" className="active:animate-shake-rotate">
              about me
            </Link>
            <Link href="/projects" className="active:animate-shake-rotate">
              post
            </Link>
          </nav>
        </div>
      </div>
    </motion.main>
  );
}
