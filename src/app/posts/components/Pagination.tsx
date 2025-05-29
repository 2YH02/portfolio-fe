"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useLoading } from "../pageClient";

export const glassBtn =
  "px-3 py-1 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm hover:bg-white/10 ";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  siblingCount = 3,
}: PaginationProps) {
  const router = useRouter();
  const { setLoading, body } = useLoading();

  const pages = useMemo(
    () => getSurrounding(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );

  const goToPage = (page: number) => {
    setLoading(true);
    body.current?.scrollTo({ top: 0, behavior: "smooth" });
    router.push(`/posts?page=${page}`);
  };

  const showLeftEllipsis = currentPage > siblingCount + 1;
  const showRightEllipsis = currentPage < totalPages - siblingCount;

  return (
    <nav className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => goToPage(1)}
        className={cn(
          glassBtn,
          currentPage === 1 && "opacity-50 pointer-events-none"
        )}
      >
        «
      </button>

      {showLeftEllipsis && (
        <>
          <button onClick={() => goToPage(1)} className={glassBtn}>
            1
          </button>
          <span className="px-3 py-1 text-white">…</span>
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={cn(
            glassBtn,
            page === currentPage
              ? "bg-white/20 border-white text-white"
              : "hover:bg-white/10"
          )}
        >
          {page}
        </button>
      ))}

      {showRightEllipsis && (
        <>
          <span className="px-3 py-1 text-white">…</span>
          <button onClick={() => goToPage(totalPages)} className={glassBtn}>
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => goToPage(totalPages)}
        className={cn(
          glassBtn,
          currentPage === totalPages && "opacity-50 pointer-events-none"
        )}
      >
        »
      </button>
    </nav>
  );
}

function getSurrounding(page: number, max: number, offset: number): number[] {
  const start = Math.max(1, page - offset);
  const end = Math.min(max, page + offset);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
