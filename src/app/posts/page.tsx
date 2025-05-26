import Nav from "@/components/common/Nav";
import { getAllPosts } from "@/lib/api/blog";
import { notFound } from "next/navigation";
import Pagination from "./components/Pagination";
import RecentSection from "./components/RecentSection";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Posts(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  const data = await getAllPosts(page);

  if (data.posts.length === 0 || !data) {
    notFound();
  }

  return (
    <main className="relative w-screen h-screen font-mono overflow-auto pb-20">
      <Nav className="bg-black/40" />

      <RecentSection data={data} />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(data.total_count / 12)}
      />
    </main>
  );
}
