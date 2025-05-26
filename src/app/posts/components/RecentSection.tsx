import { GlassBox } from "@/components/ui/GlassBox";
import type { PostsResponse } from "@/lib/api/blog";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const RecentSection = ({ data }: { data: PostsResponse }) => {
  return (
    <section className="max-w-[1280px] p-10 mx-auto pt-40 pb-10">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.posts.map((post) => {
            return (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className="text-left"
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
                      alt={`thumbnail`}
                      fill
                      className={cn("object-cover")}
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
                    <div className="text-gray-400 text-xs">
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

export default RecentSection;
