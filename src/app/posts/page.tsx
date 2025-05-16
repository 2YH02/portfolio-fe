import Nav from "./components/Nav";
import RecentSection from "./components/RecentSection";

export default function Posts() {
  return (
    <main className="relative w-screen h-screen font-mono overflow-auto">
      <Nav />
      <RecentSection />
    </main>
  );
}
