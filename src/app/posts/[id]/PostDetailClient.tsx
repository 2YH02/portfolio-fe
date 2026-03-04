"use client";

import Nav from "@/components/common/Nav";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import QuillCodeRenderer from "@/components/common/QuillCodeRenderer";
import { GlassBox } from "@/components/ui/GlassBox";
import { getMe, type User } from "@/lib/api/auth";
import { deletePost, viewPost, type Post } from "@/lib/api/blog";
import { isKnownAnimatedSupabaseImage } from "@/lib/image";
import { formatDate } from "@/lib/utils";
import useImageStore from "@/store/useImageStore";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { BsEye, BsTrash, BsWrenchAdjustable } from "react-icons/bs";

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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const trapTabKey = (event: ReactKeyboardEvent<HTMLElement>) => {
  if (event.key !== "Tab") return;

  const focusables = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  );

  if (focusables.length === 0) {
    event.preventDefault();
    return;
  }

  const firstEl = focusables[0];
  const lastEl = focusables[focusables.length - 1];
  const activeEl = document.activeElement as HTMLElement | null;

  if (event.shiftKey && activeEl === firstEl) {
    event.preventDefault();
    lastEl.focus();
    return;
  }

  if (!event.shiftKey && activeEl === lastEl) {
    event.preventDefault();
    firstEl.focus();
  }
};

const focusDialog = (dialog: HTMLDivElement | null) => {
  if (!dialog) return;
  const firstFocusable = dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
  (firstFocusable ?? dialog).focus();
};

export default function PostDetailClient({ post }: { post: Post }) {
  const router = useRouter();
  const { curImage, setCurImage } = useImageStore();
  const isAnimatedThumbnail = isKnownAnimatedSupabaseImage(post.thumbnail);
  const deleteDialogRef = useRef<HTMLDivElement>(null);
  const imageDialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const [role, setRole] = useState<User>("Guest");
  const [viewDelete, setViewDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewCount, setViewCount] = useState(post.view_count);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await viewPost(post.id);
        if (data?.view_count !== undefined) setViewCount(data.view_count);
      } catch {}
    }

    fetch();
  }, [post.id]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMe();
        if (data?.role === "Admin") setRole("Admin");
      } catch {}
    };

    fetch();
  }, []);

  useEffect(() => {
    getMe()
      .then((data) => {
        if (data?.role === "Admin") setRole("Admin");
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const nodeList =
      document.querySelectorAll<HTMLImageElement>(".blog-post img");
    const handleClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLImageElement;
      setCurImage(target.src);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const target = event.currentTarget as HTMLImageElement;
      setCurImage(target.src);
    };

    nodeList.forEach((imgEl) => {
      if (imgEl.closest("a, button")) return;
      imgEl.setAttribute("tabindex", "0");
      imgEl.setAttribute("role", "button");
      if (!imgEl.getAttribute("aria-label")) {
        imgEl.setAttribute("aria-label", "이미지 확대 보기");
      }
      imgEl.classList.add("cursor-zoom-in");
      imgEl.addEventListener("click", handleClick);
      imgEl.addEventListener("keydown", handleKeyDown);
    });

    return () => {
      setCurImage(null);
      nodeList.forEach((imgEl) => {
        imgEl.removeEventListener("click", handleClick);
        imgEl.removeEventListener("keydown", handleKeyDown);
      });
    };
  }, [setCurImage]);

  useEffect(() => {
    const isDialogOpen = viewDelete || Boolean(curImage);

    if (isDialogOpen) {
      if (!lastFocusedElementRef.current) {
        lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
      }

      if (viewDelete) {
        focusDialog(deleteDialogRef.current);
        return;
      }

      if (curImage) {
        focusDialog(imageDialogRef.current);
      }

      return;
    }

    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
      lastFocusedElementRef.current = null;
    }
  }, [viewDelete, curImage]);

  const handleDelete = async () => {
    if (isDeleting) return;
    setMessage("");
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      setViewDelete(false);
      router.replace("/posts");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative h-dvh overflow-auto">
      <Nav className="bg-black/40" />
      <main aria-label="게시글 상세" className="relative">
        <div className="absolute top-0 left-0 w-full h-96">
          <Image
            src={post.thumbnail}
            alt={`${post.title} 대표 이미지`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            fetchPriority="high"
            loading="eager"
            unoptimized={isAnimatedThumbnail}
            placeholder="blur"
            blurDataURL={post.thumbnail_blur}
          />
        </div>

        <article className="absolute blog-post top-96 left-1/2 -translate-x-1/2 w-full max-w-[1020px] p-6">
          <h1 className="text-4xl mb-2 hover:drop-shadow-glow transition duration-300">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <p className="shrink-0 text-sm flex gap-2 text-indigo-200">
              {post.tags.join(", ")}
            </p>
            <time
              className="text-gray-400 text-xs"
              dateTime={new Date(post.created_at).toISOString()}
            >
              {formatDate(post.created_at)}
            </time>
            {role === "Admin" && (
              <span className="flex items-center gap-1 text-gray-400 text-xs">
                <BsEye size={13} />
                {viewCount.toLocaleString()}
              </span>
            )}
          </div>
          <div className="p-2 mt-8">
            {post.body.trimStart().startsWith("<") ? (
              <QuillCodeRenderer htmlString={post.body} />
            ) : (
              <MarkdownRenderer markdown={post.body} />
            )}
          </div>

          {role === "Admin" && (
            <div className="flex gap-2">
              <GlassBox className="w-10 h-10 p-1 flex items-center justify-center">
                <button
                  className="w-full h-full flex items-center justify-center"
                  onClick={() => {
                    setMessage("");
                    setViewDelete(true);
                  }}
                  aria-label="게시글 삭제"
                >
                  <BsTrash color="white" size={20} />
                </button>
              </GlassBox>
              <GlassBox className="w-10 h-10 p-1 flex items-center justify-center">
                <button
                  className="w-full h-full flex items-center justify-center"
                  onClick={() => setMessage("수정 기능은 준비 중입니다.")}
                  aria-label="게시글 수정"
                >
                  <BsWrenchAdjustable color="white" size={20} />
                </button>
              </GlassBox>
            </div>
          )}
          {message ? (
            <p className="mt-4 text-sm text-red-300" aria-live="polite">
              {message}
            </p>
          ) : null}
        </article>
      </main>

      {viewDelete && (
        <div
          className="fixed w-screen h-screen bg-black/70 z-50"
          onClick={() => setViewDelete(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
          tabIndex={-1}
          ref={deleteDialogRef}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setViewDelete(false);
              return;
            }
            trapTabKey(event);
          }}
        >
          <DeleteModal
            close={() => setViewDelete(false)}
            onSuccess={handleDelete}
            isLoading={isDeleting}
            titleId="delete-dialog-title"
            descriptionId="delete-dialog-description"
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-dialog-title"
            tabIndex={-1}
            ref={imageDialogRef}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setCurImage(null);
                return;
              }
              trapTabKey(event);
            }}
          >
            <h2 id="image-dialog-title" className="sr-only">
              이미지 확대 보기
            </h2>
            <button
              type="button"
              className="absolute top-4 right-4 px-3 py-2 rounded-md bg-black/50 text-white"
              onClick={() => setCurImage(null)}
              aria-label="이미지 확대 보기 닫기"
            >
              닫기
            </button>
            <motion.div
              layoutId={`img-${curImage}`}
              className="relative w-full h-full"
            >
              <Image
                src={curImage}
                alt={`${post.title} 본문 이미지 확대`}
                fill
                className="object-contain"
                unoptimized={isKnownAnimatedSupabaseImage(curImage)}
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
  isLoading,
  titleId,
  descriptionId,
}: {
  close: VoidFunction;
  onSuccess: VoidFunction;
  isLoading: boolean;
  titleId?: string;
  descriptionId?: string;
}) {
  return (
    <motion.div
      className="w-full max-w-sm mx-auto mt-32 p-6 backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl space-y-6"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 id={titleId} className="text-2xl font-bold text-center">
        삭제하기
      </h2>

      <p id={descriptionId} className="text-center">
        정말 삭제하시겠습니까?
      </p>

      <div className="flex gap-3 justify-center">
        <GlassBox className="p-0 rounded-md" withAction>
          <motion.button
            className="w-full py-2 px-4 font-semibold"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={close}
            disabled={isLoading}
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
            disabled={isLoading}
          >
            {isLoading ? "삭제 중..." : "삭제"}
          </motion.button>
        </GlassBox>
      </div>
    </motion.div>
  );
}
