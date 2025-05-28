import Nav from "@/components/common/Nav";
import QuillCodeRenderer from "@/components/common/QuillCodeRenderer";
import { type Post } from "@/lib/api/blog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function PostDetailClient({ post }: { post: Post }) {
  return (
    <div className="relative h-dvh overflow-auto">
      <Nav className="bg-black/40" />
      <div className="absolute top-0 left-0 w-full h-96">
        <Image
          src={post.thumbnail}
          alt="post thumbnail"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={post.thumbnail_blur}
        />
      </div>

      <div className="blog-post absolute top-96 left-1/2 -translate-x-1/2 w-full max-w-[1020px] p-6">
        <h1 className="text-4xl mb-2 hover:drop-shadow-glow transition duration-300">
          {post.title}
        </h1>
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-sm flex gap-2 text-indigo-200">
            {post.tags.join(", ")}
          </p>
          <p className="text-gray-400 text-xs">{formatDate(post.created_at)}</p>
        </div>
        <div className="p-2 mt-8">
          <QuillCodeRenderer htmlString={post.body} />
        </div>
      </div>
    </div>
  );
}
