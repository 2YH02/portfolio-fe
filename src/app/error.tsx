"use client";

import { GlassBox } from "@/components/ui/GlassBox";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center flex-col">
      <div>
        <h2>무언가 잘못됐어요!</h2>
        <p>잠시 후 다시 시도해주세요.</p>
        <GlassBox className="p-0 mt-2 rounded-sm" withAction>
          <button
            className="w-full px-4 py-1 text-center"
            onClick={() => reset()}
          >
            Try again
          </button>
        </GlassBox>
      </div>
    </main>
  );
}
