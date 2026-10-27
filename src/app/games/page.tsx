import Nav from "@/components/common/Nav";
import { GlassBox } from "@/components/ui/GlassBox";
import { ProjectLike } from "@/components/ui/ProjectLike";
import { games } from "@/data/games";
import type { Metadata } from "next";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";

export const dynamic = "force-static";

const description =
  "직접 만든 웹 게임 모음입니다. 브라우저에서 바로 플레이해 보세요.";

export const metadata: Metadata = {
  title: "Yonghun - 게임",
  description,
  keywords: "웹게임,인디게임,브라우저게임,Three.js,WebGL,포트폴리오",
  alternates: {
    canonical: "https://www.yonghun.me/games",
  },
  openGraph: {
    type: "website",
    url: "https://www.yonghun.me/games",
    title: "Yonghun - 게임",
    description,
    images: games[0]?.thumbnail ?? "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonghun - 게임",
    description,
    images: games[0]?.thumbnail ?? "/metaimg.png",
  },
};

export default function Games() {
  return (
    <main className="relative w-screen h-screen overflow-y-auto overflow-x-hidden">
      <Nav />

      <section className="mx-auto max-w-5xl px-6 pt-32 pb-20 sm:pt-36">
        <h1 className="text-xl mb-2">Games</h1>
        <p className="text-sm text-gray-400 mb-8">
          개인 프로젝트로 만든 게임들입니다. 이미지나 플레이를 누르면 새 탭에서 바로
          플레이할 수 있어요.
        </p>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {games.map((game, i) => (
            <li key={game.slug}>
              <GlassBox withAction className="h-full p-0">
                <div className="relative">
                <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${game.title} 플레이하기 (새 탭)`}
                className="block w-full rounded-t-2xl focus-visible:outline focus-visible:outline-indigo-300"
              >
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <Image
                      src={game.thumbnail}
                      alt={game.thumbnailAlt}
                      fill
                      sizes="(min-width: 768px) 512px, 100vw"
                      priority={i === 0}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {game.status === "developing" && (
                      <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-indigo-200">
                        개발 중
                      </span>
                    )}
                  </div>
                </a>
                  <ProjectLike projectId={game.projectId} compact />
                </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-lg font-semibold group-hover:drop-shadow-glow">
                        {game.title}
                      </h2>
                      <a href={game.url} target="_blank" rel="noopener noreferrer" aria-label={`${game.title} 플레이하기 (새 탭)`} className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2 py-2 text-sm text-blue-500 hover:text-white focus-visible:outline focus-visible:outline-indigo-300">
                        <span className="inline-flex items-center gap-1">
                          플레이
                          <BsArrowUpRight className="shrink-0" />
                        </span>
                      </a>
                    </div>
                    <p className="text-sm text-gray-300">{game.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {game.genres.map((genre) => (
                        <span key={genre} className="text-indigo-200">
                          #{genre}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {game.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
              </GlassBox>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
