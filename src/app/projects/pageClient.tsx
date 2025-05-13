"use client";

import DelayedLink from "@/components/common/DelayedLink";
import { GlassBox } from "@/components/ui/GlassBox";
import { projects } from "@/data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";

export default function ProjectsClient() {
  const router = useRouter();

  const [curData, setCurData] = useState(projects[0]);
  const [prevImg, setPrevImg] = useState<null | string>(null);

  const [clickDetail, setClickDetail] = useState(false);

  return (
    <main className="relative w-screen h-screen font-mono">
      {/* 상단 링크 */}
      <motion.nav
        initial={{ top: 40 }}
        animate={{ top: clickDetail ? -300 : 40 }}
        transition={{
          duration: 0.3,
        }}
        className="absolute left-1/2 top-10 -translate-x-1/2"
      >
        <GlassBox className="py-0 rounded-full">
          <ul className="flex">
            <li className="shrink-0">
              <DelayedLink className="py-4 px-8" href="/">
                HOME
              </DelayedLink>
            </li>
            <li className="shrink-0">
              <DelayedLink ms={1100} className="py-4 px-8" href="/">
                ABOUT
              </DelayedLink>
            </li>
            <li className="shrink-0">
              <DelayedLink ms={1100} className="py-4 px-8" href="/">
                POST
              </DelayedLink>
            </li>
          </ul>
        </GlassBox>
      </motion.nav>

      {/* 이미지 */}
      <motion.section
        initial={{
          opacity: 0,
          bottom: 0,
          left: 0,
          borderTopRightRadius: "2rem",
          height: "70%",
          width: "65%",
          transition: {
            duration: 0.4,
          },
        }}
        animate={{
          top: clickDetail ? 0 : "auto",
          left: clickDetail ? "50%" : 0,
          x: clickDetail ? "-50%" : 0,
          borderBottomLeftRadius: clickDetail ? "2rem" : 0,
          borderBottomRightRadius: clickDetail ? "2rem" : 0,
          borderTopRightRadius: clickDetail ? 0 : "2rem",
          height: clickDetail ? "80%" : "70%",
          width: clickDetail ? "90%" : "65%",
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        }}
        className="absolute bottom-0 left-0 overflow-hidden"
      >
        <motion.img
          key={curData.thumbnail}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{
            duration: 0.5,
          }}
          src={curData.thumbnail}
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          alt="project thumbnail"
        />
        {prevImg && prevImg !== curData.thumbnail && (
          <motion.img
            key={prevImg + "prev"}
            initial={{ opacity: 1, scale: 1.1 }}
            animate={{ opacity: 0, scale: 1 }}
            transition={{
              duration: 0.5,
            }}
            src={prevImg}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            alt="prev project thumbnail"
          />
        )}
      </motion.section>

      {/* 프로젝트 리스트 */}
      <motion.section
        initial={{
          x: 0,
          transition: {
            duration: 0.4,
          },
        }}
        animate={{
          x: clickDetail ? 600 : 0,
          transition: {
            duration: 0.4,
          },
        }}
        className="absolute bottom-0 right-4 w-[30%] h-[70%]"
      >
        <h1 className="text-xl mb-6">Projects</h1>
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => {
            return (
              <motion.button
                key={project.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: i * 0.1,
                }}
                onMouseEnter={() => {
                  setPrevImg(curData.thumbnail);
                  setCurData(project);
                }}
                onClick={() => {
                  setClickDetail(true);
                  setTimeout(() => {
                    router.push(`/projects/${project.id}`);
                  }, 500);
                }}
              >
                <GlassBox
                  className={cn(
                    "flex items-center h-[70px]",
                    curData.title === project.title && "h-20"
                  )}
                  withAction
                >
                  {curData.title === project.title && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: curData.title === project.title ? 1 : 0,
                      }}
                      transition={{
                        duration: 1,
                      }}
                    >
                      <BsArrowRightShort size={26} />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: curData.title === project.title ? 16 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      bounce: 0.3,
                    }}
                    className={cn(
                      "group-hover:text-xl",
                      curData.title === project.title && "text-xl"
                    )}
                  >
                    {project.title}
                  </motion.div>
                </GlassBox>
              </motion.button>
            );
          })}
        </div>
      </motion.section>
    </main>
  );
}
