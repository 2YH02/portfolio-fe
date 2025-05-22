import { GlassBox } from "@/components/ui/GlassBox";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative w-screen h-screen flex items-center justify-center flex-col">
      <div>
        <h2>Not Found</h2>
        <p>페이지를 찾을 수 없습니다.</p>
        <GlassBox className="p-0 mt-2 rounded-sm" withAction>
          <Link href="/" className="w-full px-4 py-1 text-center">
            Return Home
          </Link>
        </GlassBox>
      </div>
    </main>
  );
}
