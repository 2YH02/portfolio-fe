"use client";

import Nav from "@/components/common/Nav";
import { type PostsResponse } from "@/lib/api/blog";
import { useEffect, useRef } from "react";
import Pagination from "./components/Pagination";
import RecentSection from "./components/RecentSection";

export default function PostClient({
  data,
  page,
}: {
  data: PostsResponse;
  page: number;
}) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, mainRef.current]);

  return (
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
  );
}
