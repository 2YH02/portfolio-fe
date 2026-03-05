"use client";

import Nav from "@/components/common/Nav";
import { GlassBox } from "@/components/ui/GlassBox";
import { getMe } from "@/lib/api/auth";
import { type PostListItem, type PostsResponse } from "@/lib/api/blog";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import RecentSection from "./components/RecentSection";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  body: React.RefObject<HTMLElement | null>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "useLoading은 LoadingProvider 안에서만 호출될 수 있습니다."
    );
  }
  return context;
}

export default function PostClient({
  data,
  popularPosts,
  tags,
  page,
}: {
  data: PostsResponse;
  popularPosts: PostListItem[];
  tags: string[];
  page: number;
}) {
  console.log(popularPosts);
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getMe()
      .then((data) => {
        if (data?.role === "Admin") setIsAdmin(true);
      })
      .catch(() => {});
  }, []);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setLoading: setIsLoading, body: mainRef }}
    >
      <main
        ref={mainRef}
        className="relative w-screen h-screen font-mono overflow-auto pb-20"
      >
        <Nav className="bg-black/40" />
        <h1 className="sr-only">Yonghun 개발 블로그 글 목록</h1>

        <RecentSection
          data={data}
          popularPosts={popularPosts}
          tags={tags}
          isAdmin={isAdmin}
          currentPage={Number(page)}
          totalPages={Math.ceil(data.total_count / 8)}
        />

        <div className="flex justify-center items-center mt-10 gap-4 font-bold text-indigo-400">
          2YH02
          <div className="flex gap-2">
            <GlassBox className="w-10 h-10 p-1">
              <a
                href="https://github.com/2YH02"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full"
                aria-label="깃허브 프로필 새 창에서 열기"
              >
                <Image
                  src="/github-mark-white.png"
                  alt="깃허브 프로필 아이콘"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </a>
            </GlassBox>
            <GlassBox className="w-10 h-10 p-1 flex items-center justify-center">
              <button
                className="w-full h-full flex items-center justify-center"
                onClick={() => router.push("/posts/add")}
                aria-label="새 글 작성 페이지로 이동"
              >
                <BsPencilSquare color="white" size={26} />
              </button>
            </GlassBox>
          </div>
        </div>
      </main>
    </LoadingContext.Provider>
  );
}
