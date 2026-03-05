"use client";

import { GlassBox } from "@/components/ui/GlassBox";
import { type PostListItem, type PostsResponse } from "@/lib/api/blog";

import { isKnownAnimatedSupabaseImage } from "@/lib/image";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BsEye } from "react-icons/bs";
import { useLoading } from "../PostClient";
import Pagination from "./Pagination";

interface RecentSectionProps {
  data: PostsResponse;
  popularPosts: PostListItem[];
  tags: string[];
  isAdmin?: boolean;
  currentPage: number;
  totalPages: number;
}

const RecentSection = ({
  data,
  popularPosts,
  tags,
  isAdmin,
  currentPage,
  totalPages,
}: RecentSectionProps) => {
  const { isLoading, setLoading } = useLoading();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const TAG_LIMIT = 8;

  useEffect(() => {
    setLoading(false);
  }, [data, setLoading]);

  useEffect(() => {
    setActiveTag(null);
  }, [data]);

  const displayPosts = useMemo(() => {
    if (!activeTag) return data.posts;
    return data.posts.filter((post) => post.tags.includes(activeTag));
  }, [data.posts, activeTag]);

  if (isLoading) return <Skeleton />;

  return (
    <section
      className="max-w-[1000px] px-8 mx-auto pt-36 pb-10"
      aria-label="최신 게시글 목록"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-white">Posts</h2>
        <p className="text-sm text-gray-500 mt-1">{data.total_count}개의 글</p>
      </div>

      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "px-3 py-1 text-xs rounded-full border transition-colors duration-200",
              !activeTag
                ? "bg-white/20 border-white/40 text-white"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            )}
          >
            All
          </button>
          {(showAllTags ? tags : tags.slice(0, TAG_LIMIT)).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "px-3 py-1 text-xs rounded-full border transition-colors duration-200",
                activeTag === tag
                  ? "bg-white/20 border-white/40 text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              )}
            >
              {tag}
            </button>
          ))}
          {tags.length > TAG_LIMIT && (
            <button
              onClick={() => setShowAllTags((v) => !v)}
              className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-colors duration-200"
            >
              {showAllTags ? "접기" : `+${tags.length - TAG_LIMIT}개 더보기`}
            </button>
          )}
        </div>
      )}

      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          {displayPosts.length === 0 ? (
            <div className="py-20 text-center text-gray-500 text-sm">
              해당 태그의 글이 없습니다.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {displayPosts.map((post, index) => {
                const useBlurPlaceholder = Boolean(post.thumbnail_blur);
                const isAnimatedLegacyImage = isKnownAnimatedSupabaseImage(
                  post.thumbnail
                );
                const isFirst = index === 0 && !activeTag;
                return (
                  <Link
                    href={`/posts/${post.id}`}
                    key={post.id}
                    aria-label={`${post.title} 게시글 상세 보기`}
                  >
                    <GlassBox
                      className="p-0 w-full h-36 flex overflow-hidden transform transition-transform duration-300 ease-in-out hover:z-10
                                hover:[transform:perspective(800px)_rotateX(3deg)_rotateY(-2deg)_scale(1.02)]"
                      withAction
                    >
                      <div className="relative w-44 shrink-0 h-full">
                        <Image
                          src={post.thumbnail}
                          alt={`${post.title} 썸네일`}
                          fill
                          className="object-cover"
                          quality={isFirst ? 75 : 45}
                          sizes="160px"
                          priority={isFirst}
                          fetchPriority={isFirst ? "high" : "auto"}
                          loading={isFirst ? "eager" : "lazy"}
                          unoptimized={isAnimatedLegacyImage}
                          placeholder={useBlurPlaceholder ? "blur" : "empty"}
                          blurDataURL={
                            useBlurPlaceholder
                              ? post.thumbnail_blur
                              : undefined
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-1 mb-1.5">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-xs rounded-full bg-white/10 border border-white/20 text-indigo-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm font-medium text-white line-clamp-1 leading-snug">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                            {post.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-gray-500 text-xs">
                          {isAdmin && (
                            <span className="flex items-center gap-1">
                              <BsEye size={11} />
                              {post.view_count.toLocaleString()}
                            </span>
                          )}
                          <span className={cn(!isAdmin && "ml-auto")}>
                            {formatDate(post.created_at)}
                          </span>
                        </div>
                      </div>
                    </GlassBox>
                  </Link>
                );
              })}
            </div>
          )}

          {!activeTag && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </div>

        {popularPosts.length > 0 && (
          <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start">
            <GlassBox className="p-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                인기글
              </h3>
              <div className="flex flex-col gap-4">
                {popularPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.id}`}
                    className="group flex gap-3 items-start"
                    aria-label={`${post.title} 게시글 상세 보기`}
                  >
                    <span className="text-lg font-bold text-gray-700 w-6 shrink-0 leading-none mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white line-clamp-2 leading-snug group-hover:text-indigo-200 transition-colors duration-200">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                        <BsEye size={10} />
                        {post.view_count.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </GlassBox>
          </aside>
        )}
      </div>
    </section>
  );
};

function Skeleton() {
  return (
    <section className="max-w-[1000px] px-8 mx-auto pt-36 pb-10">
      <div className="mb-6">
        <div className="w-24 h-8 bg-gray-300/20 rounded animate-pulse mb-2" />
        <div className="w-16 h-4 bg-gray-300/20 rounded animate-pulse" />
      </div>
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-6 bg-gray-300/20 rounded-full animate-pulse"
          />
        ))}
      </div>
      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-36 rounded-2xl overflow-hidden bg-gray-200/20 animate-pulse backdrop-blur-2xl flex"
            >
              <div className="w-44 h-full bg-gray-300/20 shrink-0" />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-1/4 h-3 bg-gray-300/20 rounded" />
                  <div className="w-3/4 h-4 bg-gray-300/20 rounded" />
                </div>
                <div className="w-1/6 h-3 bg-gray-300/20 rounded self-end" />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block w-64 shrink-0">
          <div className="rounded-2xl bg-gray-200/20 animate-pulse backdrop-blur-2xl p-4 space-y-4">
            <div className="w-16 h-3 bg-gray-300/20 rounded" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-5 bg-gray-300/20 rounded shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-gray-300/20 rounded w-full" />
                  <div className="h-3 bg-gray-300/20 rounded w-4/5" />
                  <div className="h-2.5 bg-gray-300/20 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentSection;
