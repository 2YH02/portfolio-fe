"use client";

import { GlassBox } from "@/components/ui/GlassBox";
import { type PostsResponse } from "@/lib/api/blog";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLoading } from "../pageClient";

const RecentSection = ({ data }: { data: PostsResponse }) => {
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [data, setLoading]);

  if (isLoading) return <Skeleton />;

  return (
    <section
      className="max-w-[1280px] p-10 mx-auto pt-40 pb-10"
      aria-label="최신 게시글 목록"
    >
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.posts.map((post, index) => {
            const isLcpCandidate = index === 0;
            const useBlurPlaceholder = Boolean(post.thumbnail_blur);
            return (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className="text-left"
                aria-label={`${post.title} 게시글 상세 보기`}
              >
                <GlassBox
                  className="h-96 p-0 transform transition-transform duration-300 ease-in-out hover:z-10
                            hover:[transform:perspective(800px)_rotateX(4deg)_rotateY(-4deg)_scale(1.05)]
                            relative border border-solid w-full rounded-lg"
                  withAction
                >
                  <div className={cn("relative w-full overflow-hidden h-1/2")}>
                    <Image
                      src={post.thumbnail}
                      alt={`${post.title} 썸네일`}
                      fill
                      className={cn("object-cover")}
                      quality={45}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      priority={isLcpCandidate}
                      fetchPriority={isLcpCandidate ? "high" : "auto"}
                      loading={isLcpCandidate ? "eager" : "lazy"}
                      placeholder={useBlurPlaceholder ? "blur" : "empty"}
                      blurDataURL={
                        useBlurPlaceholder ? post.thumbnail_blur : undefined
                      }
                    />
                  </div>

                  <div className="w-full h-1/2 p-4 flex flex-col justify-center">
                    <p className="shrink-0 text-xs flex gap-2 text-indigo-200">
                      {post.tags.join(", ")}
                    </p>
                    <p className="shrink-0 text-xl mb-1 truncate">
                      {post.title}
                    </p>
                    <div>
                      <p className="shrink-0 grow text-gray-400 text-sm line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    <div className="grow" />
                    <div className="text-gray-400 text-xs text-right">
                      {formatDate(post.created_at)}
                    </div>
                  </div>
                </GlassBox>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function Skeleton() {
  return (
    <section className="max-w-[1280px] p-10 mx-auto pt-40 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="h-96 rounded-lg overflow-hidden bg-gray-200/20 animate-pulse backdrop-blur-2xl"
          >
            {/* 이미지 영역 */}
            <div className="w-full h-1/2 bg-gray-300/20" />
            {/* 텍스트 영역 */}
            <div className="p-4 flex flex-col justify-between h-1/2">
              <div className="space-y-2">
                <div className="w-1/4 h-3 bg-gray-300/20 rounded" />
                <div className="w-3/4 h-6 bg-gray-300/20 rounded" />
                <div className="h-4 bg-gray-300/20 rounded w-full" />
                <div className="h-4 bg-gray-300/20 rounded w-5/6" />
              </div>
              <div className="w-1/6 h-3 bg-gray-300/20 rounded self-end" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentSection;
