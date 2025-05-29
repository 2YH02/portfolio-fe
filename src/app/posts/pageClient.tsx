"use client";

import Nav from "@/components/common/Nav";
import { type PostsResponse } from "@/lib/api/blog";
import { createContext, useContext, useRef, useState } from "react";
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
      </main>
    </LoadingContext.Provider>
  );
}
