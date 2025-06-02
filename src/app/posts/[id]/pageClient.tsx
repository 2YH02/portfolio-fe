"use client";

import Nav from "@/components/common/Nav";
import QuillCodeRenderer from "@/components/common/QuillCodeRenderer";
import { type Post } from "@/lib/api/blog";
import { formatDate } from "@/lib/utils";
import useImageStore from "@/store/useImageStore";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

export default function PostDetailClient({ post }: { post: Post }) {
  const { curImage, setCurImage } = useImageStore();

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
      </div>

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
