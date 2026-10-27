"use client";

import { useEffect, useState } from "react";
import { LikeButton } from "./LikeButton";

type Likes = { like_count: number; liked: boolean };

async function request(id: number, method = "GET"): Promise<Likes> {
  const response = await fetch(`/api/projects/${id}/${method === "GET" ? "likes" : "like"}`, {
    method, credentials: "include", cache: "no-store",
  });
  if (!response.ok) throw new Error("좋아요를 불러오지 못했어요");
  return response.json();
}

export function ProjectLike({ projectId, compact = false }: { projectId: number; compact?: boolean }) {
  const [initial, setInitial] = useState<Likes | null>(null);

  useEffect(() => {
    let active = true;
    setInitial(null);
    try {
      if (!document.cookie.split("; ").some(cookie => cookie.startsWith("portfolio_like_client="))) {
        document.cookie = `portfolio_like_client=${crypto.randomUUID()}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
      }
      request(projectId).then(result => { if (active) setInitial(result); })
        .catch(() => { /* Unavailable likes stay hidden. */ });
    } catch { /* Cookie access may be unavailable; keep the UI hidden. */ }
    return () => { active = false; };
  }, [projectId]);

  if (!initial) return null;

  return (
    <div className={compact ? "absolute right-3 top-3 z-10 flex h-11 w-11 flex-col items-center justify-center rounded-xl border border-white/15 bg-black/65 shadow-lg backdrop-blur-md" : "project-detail-copy mb-12 border-t border-white/10 pt-8 text-center"} aria-label="프로젝트 좋아요">
      {!compact && <p className="mb-3 text-sm text-gray-400">이 프로젝트가 마음에 들었다면</p>}
      <div className={compact ? "" : "flex min-h-32 flex-col items-center justify-center px-4 py-5"}>
        <LikeButton key={projectId} compact={compact} prompt={compact ? "좋아요" : "마음에 들었나요?"} initialDone={initial.liked}
          onLike={() => request(projectId, "POST")} onUnlike={() => request(projectId, "DELETE")} />
      </div>
    </div>
  );
}
