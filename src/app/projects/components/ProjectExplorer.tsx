"use client";

import { Children, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BsGrid, BsController, BsCodeSlash } from "react-icons/bs";
import type { Project } from "@/data/projects";

type Filter = "all" | Project["kind"];
const filters = [
  { id: "all", label: "전체", icon: BsGrid },
  { id: "service", label: "서비스·라이브러리", icon: BsCodeSlash },
  { id: "game", label: "게임", icon: BsController },
] as const;

const descriptions = {
  all: "필요해서 만든 도구부터, 즐기기 위해 만든 게임까지.",
  service: "일상의 문제를 해결하는 서비스와 개발 도구.",
  game: "직접 만든 세계, 조작, 그리고 플레이 경험.",
};

export function ProjectExplorer({ items, children }: {
  items: Pick<Project, "id" | "kind">[];
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<Filter>("all");
  const reducedMotion = useReducedMotion();
  const cards = Children.toArray(children);
  const count = items.filter(item => selected === "all" || item.kind === selected).length;

  // Keep the chosen collection when returning from a project detail.
  useEffect(() => {
    const restore = () => {
      const filter = new URLSearchParams(window.location.search).get("type");
      setSelected(filter === "game" || filter === "service" ? filter : "all");
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  function select(filter: Filter) {
    setSelected(filter);
    const url = new URL(window.location.href);
    if (filter === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", filter);
    window.history.replaceState(null, "", url);
  }

  return (
    <>
      <div className="mb-12 md:mb-16">
        <div role="group" aria-label="프로젝트 분류" className="inline-flex max-w-full gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-lg">
          {filters.map(({ id, label, icon: Icon }) => {
            const active = selected === id;
            const total = id === "all" ? items.length : items.filter(item => item.kind === id).length;
            return (
              <button key={id} type="button" aria-pressed={active} aria-controls="project-results" onClick={() => select(id)}
                className={`relative isolate flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-3 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300 sm:gap-2 sm:px-5 sm:text-sm ${active ? "text-white" : "text-gray-400 hover:text-white"}`}>
                {active && <motion.span layoutId="project-filter-indicator" transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-0 -z-10 rounded-xl border border-indigo-300/20 bg-indigo-400/15 shadow-[0_0_24px_rgba(129,140,248,0.08)]" />}
                <Icon aria-hidden="true" className="hidden text-base min-[375px]:block" />
                <span>{label}</span>
                <span className={`font-mono text-[10px] sm:text-xs ${active ? "text-indigo-200" : "text-gray-500"}`}>{String(total).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 text-xs text-gray-400 sm:text-sm">
          <p>{descriptions[selected]}</p>
          <span role="status" className="shrink-0 font-mono text-indigo-200/70">{count} projects</span>
        </div>
      </div>

      <ol id="project-results" className="flex flex-col gap-20 md:gap-28">
        {items.map((item, index) => {
          const visible = selected === "all" || item.kind === selected;
          return (
            <li key={item.id} hidden={!visible}>
              {visible && <motion.div key={selected} initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>{cards[index]}</motion.div>}
            </li>
          );
        })}
      </ol>
    </>
  );
}
