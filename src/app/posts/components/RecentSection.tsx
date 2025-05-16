"use client";

import { GlassBox } from "@/components/ui/GlassBox";
import { motion } from "motion/react";

const RecentSection = () => {
  return (
    <section className="max-w-[1280px] p-10 mx-auto py-40">
      {/* 블로그 이전 안내 */}
      <motion.div
        className="max-w-[804px] p-10 mx-auto py-40 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassBox className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-indigo-400">
            블로그 기능을 현재 개발 중입니다.
          </h2>
          <p className="text-gray-300">
            아래 버튼을 누르시면 기존 블로그로 안내해 드립니다.
          </p>
          <a
            href="https://2yh-develop4jeon.tistory.com"
            target="_blank"
            className="inline-block py-3 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 transition"
          >
            블로그 이동
          </a>
        </GlassBox>
      </motion.div>
    </section>
  );
};

export default RecentSection;
