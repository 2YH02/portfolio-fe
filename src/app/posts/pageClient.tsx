"use client";

import Nav from "@/components/common/Nav";
import { GlassBox } from "@/components/ui/GlassBox";
import { type PostsResponse } from "@/lib/api/blog";
import { useRouter } from "next/navigation";
import { createContext, useContext, useRef, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import Pagination from "./components/Pagination";
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
  page,
}: {
  data: PostsResponse;
  page: number;
}) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setLoading: setIsLoading, body: mainRef }}
    >
      <main
        ref={mainRef}
        className="relative w-screen h-screen font-mono overflow-auto pb-20"
      >
        <Nav className="bg-black/40" />

        <RecentSection data={data} />
        <Pagination
          currentPage={Number(page)}
          totalPages={Math.ceil(data.total_count / 12)}
        />

        <div className="flex justify-center items-center mt-10 gap-4 font-bold text-indigo-400">
          2YH02
          <div className="flex gap-2">
            <GlassBox className="w-10 h-10 p-1">
              <a
                href="https://github.com/2YH02"
                target="_blank"
                className="w-full h-full"
              >
                <img src="/github-mark-white.png" alt="github button" />
              </a>
            </GlassBox>
            <GlassBox className="w-10 h-10 p-1 flex items-center justify-center">
              <button
                className="w-full h-full flex items-center justify-center"
                onClick={() => router.push("/posts/add")}
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
