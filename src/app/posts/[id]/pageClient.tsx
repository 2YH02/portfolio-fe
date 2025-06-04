"use client";

import Nav from "@/components/common/Nav";
import QuillCodeRenderer from "@/components/common/QuillCodeRenderer";
import { GlassBox } from "@/components/ui/GlassBox";
import { type Post } from "@/lib/api/blog";
import { formatDate } from "@/lib/utils";
import useImageStore from "@/store/useImageStore";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsTrash, BsWrenchAdjustable } from "react-icons/bs";
import AuthForm from "../components/AuthForm";

const modalVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const buttonVariants = {
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

export default function PostDetailClient({ post }: { post: Post }) {
  const { curImage, setCurImage } = useImageStore();

  const [viewAuth, setViewAuth] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);

  useEffect(() => {
    const nodeList =
      document.querySelectorAll<HTMLImageElement>(".blog-post img");
    const handleClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLImageElement;
      setCurImage(target.src);
    };

    nodeList.forEach((imgEl) => {
      imgEl.addEventListener("click", handleClick);
    });

    return () => {
      setCurImage(null);
      nodeList.forEach((imgEl) => {
        imgEl.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <div className="relative h-dvh overflow-auto">
      <Nav className="bg-black/40" />
      <div className="absolute top-0 left-0 w-full h-96">
        <Image
          src={post.thumbnail}
          alt="post thumbnail"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={post.thumbnail_blur}
        />
      </div>

      <div className="absolute blog-post top-96 left-1/2 -translate-x-1/2 w-full max-w-[1020px] p-6">
        <h1 className="text-4xl mb-2 hover:drop-shadow-glow transition duration-300">
          {post.title}
        </h1>
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-sm flex gap-2 text-indigo-200">
            {post.tags.join(", ")}
          </p>
          <p className="text-gray-400 text-xs">{formatDate(post.created_at)}</p>
        </div>
        <div className="p-2 mt-8">
          <QuillCodeRenderer htmlString={post.body} />
        </div>

        <div className="flex gap-2">
          <GlassBox className="w-10 h-10 p-1 flex items-center justify-center">
            <button
              className="w-full h-full flex items-center justify-center"
              onClick={() => setViewAuth(true)}
            >
              <BsTrash color="white" size={20} />
            </button>
          </GlassBox>
          <GlassBox className="w-10 h-10 p-1 flex items-center justify-center">
            <button
              className="w-full h-full flex items-center justify-center"
              onClick={() => setViewAuth(true)}
            >
              <BsWrenchAdjustable color="white" size={20} />
            </button>
          </GlassBox>
        </div>
      </div>

      {viewAuth && (
        <div
          className="fixed w-screen h-screen bg-black/70 z-50"
          onClick={() => setViewAuth(false)}
        >
          <AuthForm
            onSuccess={() => {
              setViewAuth(false);
              setViewDelete(true);
            }}
          />
        </div>
      )}
      {viewDelete && (
        <div
          className="fixed w-screen h-screen bg-black/70 z-50"
          onClick={() => setViewDelete(false)}
        >
          <DeleteModal
            close={() => setViewDelete(false)}
            onSuccess={() => {}}
          />
        </div>
      )}

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
    </div>
  );
}

function DeleteModal({
  close,
  onSuccess,
}: {
  close: VoidFunction;
  onSuccess: VoidFunction;
}) {
  return (
    <motion.div
      className="w-full max-w-sm mx-auto mt-32 p-6 backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl space-y-6"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-center">삭제하기</h2>

      <p className="text-center">정말 삭제하시겠습니까?</p>

      <div className="flex gap-3 justify-center">
        <GlassBox className="p-0 rounded-md" withAction>
          <motion.button
            className="w-full py-2 px-4 font-semibold"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={close}
          >
            취소
          </motion.button>
        </GlassBox>
        <GlassBox className="p-0 rounded-md" withAction>
          <motion.button
            className="w-full py-2 px-4 font-semibold"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onSuccess}
          >
            삭제
          </motion.button>
        </GlassBox>
      </div>
    </motion.div>
  );
}
