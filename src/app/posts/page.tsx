import Nav from "@/components/common/Nav";
import RecentSection from "./components/RecentSection";
import { getAllPosts } from "@/lib/api/blog";
import { notFound } from "next/navigation";
// import Preparing from "./components/Preparing";

export default async function Posts() {
  const data = await getAllPosts();

  if (data.posts.length === 0 || !data) {
    notFound();
  }

  return (
    <main className="relative w-screen h-screen font-mono overflow-auto">
      <Nav className="bg-black/40" />

      <RecentSection data={data} />
      {/* <Preparing /> */}
    </main>
  );
}
