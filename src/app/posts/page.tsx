import Nav from "@/components/common/Nav";
// import RecentSection from "./components/RecentSection";
import Preparing from "./components/Preparing";

export default function Posts() {
  return (
    <main className="relative w-screen h-screen font-mono overflow-auto">
      <Nav className="bg-black/40" />

      {/* <RecentSection /> */}
      <Preparing />
    </main>
  );
}
