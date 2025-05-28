"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

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
  const pages = useMemo(
    () => getSurrounding(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );
  const showLeftEllipsis = currentPage > siblingCount + 1;
  const showRightEllipsis = currentPage < totalPages - siblingCount;

  return (
    <nav className="flex justify-center mt-6 space-x-2">
      <Link
        href={`/posts?page=1`}
        className={cn(
          glassBtn,
          currentPage === 1 && "opacity-50 pointer-events-none"
        )}
      >
        «
      </Link>

      {showLeftEllipsis && (
        <>
          <Link href={`/posts?page=1`} className={glassBtn}>
            1
          </Link>
          <span className="px-3 py-1 text-white">…</span>
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`/posts?page=${page}`}
          className={cn(
            glassBtn,
            page === currentPage
              ? "bg-white/20 border-white text-white"
              : "hover:bg-white/10"
          )}
        >
          {page}
        </Link>
      ))}

      {showRightEllipsis && (
        <>
          <span className="px-3 py-1 text-white">…</span>
          <Link href={`/posts?page=${totalPages}`} className={glassBtn}>
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={`/posts?page=${totalPages}`}
        className={cn(
          glassBtn,
          currentPage === totalPages && "opacity-50 pointer-events-none"
        )}
      >
        »
      </Link>
    </nav>
  );
}

function getSurrounding(page: number, max: number, offset: number): number[] {
  const start = Math.max(1, page - offset);
  const end = Math.min(max, page + offset);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
