"use client";

import DelayedLink from "@/components/common/DelayedLink";
import { GlassBox } from "@/components/ui/GlassBox";
import { about } from "@/data";
import { motion } from "motion/react";

export default function AboutClient() {
  return (
    <main className="relative w-screen h-screen font-mono overflow-auto">
      {/* 상단 링크 */}
      <nav className="fixed left-1/2 top-10 -translate-x-1/2">
        <GlassBox className="py-0 rounded-full">
          <ul className="flex">
            <li className="shrink-0">
              <DelayedLink className="py-4 px-8" href="/">
                HOME
              </DelayedLink>
            </li>
            <li className="shrink-0">
              <DelayedLink className="py-4 px-8" href="/projects">
                PROJECTS
              </DelayedLink>
            </li>
            <li className="shrink-0">
              <DelayedLink className="py-4 px-8" href="/post">
                POST
              </DelayedLink>
            </li>
          </ul>
        </GlassBox>
      </nav>

      {/* 소개 */}
      <motion.div
        className="max-w-[804px] p-10 mx-auto py-40"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-center items-center gap-4 text-4xl font-bold text-indigo-400">
          {about.name}
          <GlassBox className="w-12 h-12 p-1">
            <a
              href="https://github.com/2YH02"
              target="_blank"
              className="w-full h-full"
            >
              <img src="/github-mark-white.png" alt="github button" />
            </a>
          </GlassBox>
        </div>
        <div className="mb-10">
          <h3 className="text-left text-2xl text-indigo-400 font-bold my-6">
            About Me
          </h3>
          <div className="whitespace-pre-wrap text-gray-300">{about.text}</div>
        </div>

        <div className="mb-10">
          <h3 className="text-left text-2xl text-indigo-400 font-bold my-6">
            My Skills
          </h3>
          <motion.ul
            className="space-y-4 text-gray-300"
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
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <strong className="text-indigo-300">{skill.title}:</strong>{" "}
                {skill.description}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </main>
  );
}
