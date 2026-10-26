"use client";

import { animate } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

type ImageTransition = {
  href: string;
  overlay: HTMLDivElement;
  source: HTMLElement;
  sourceVisibility: string;
  frames: number[];
  timeout: ReturnType<typeof setTimeout>;
  target?: HTMLElement;
  stop?: () => void;
};

const TransitionContext = createContext<{
  begin: (href: string, link: HTMLAnchorElement) => boolean;
  arrive: (href: string, target: HTMLElement) => void;
} | null>(null);

export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pending = useRef<ImageTransition | null>(null);
  const listScroll = useRef<number | null>(null);

  const finish = useCallback(() => {
    const transition = pending.current;
    if (!transition) return;

    pending.current = null;
    clearTimeout(transition.timeout);
    transition.frames.forEach(cancelAnimationFrame);
    transition.stop?.();
    transition.source.style.visibility = transition.sourceVisibility;
    // Reveal the real image and content in the same frame that the clone leaves.
    delete document.documentElement.dataset.projectTransition;
    transition.overlay.remove();
  }, []);

  const begin = useCallback((href: string, link: HTMLAnchorElement) => {
    if (pending.current) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

    const source = link.querySelector<HTMLElement>("[data-project-image]");
    const image = source?.querySelector("img");
    if (!source || !image?.complete || !image.naturalWidth) return true;

    const rect = source.getBoundingClientRect();
    if (!rect.width || !rect.height) return true;

    listScroll.current = source.closest("main")?.scrollTop ?? 0;
    const overlay = document.createElement("div");
    overlay.dataset.projectImageOverlay = "";
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
      position: "fixed",
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      borderRadius: "16px",
      overflow: "hidden",
      background: "#0a0a0a",
      boxShadow: "0 20px 60px rgb(0 0 0 / 0.2)",
      transformOrigin: "0 0",
      pointerEvents: "none",
      zIndex: "80",
      willChange: "transform",
    });

    // Reuse the already decoded image; the destination can load its larger size
    // while this copy moves, without a blank frame or another React image tree.
    const copy = image.cloneNode() as HTMLImageElement;
    copy.removeAttribute("srcset");
    copy.removeAttribute("sizes");
    copy.removeAttribute("id");
    copy.src = image.currentSrc || image.src;
    copy.loading = "eager";
    copy.alt = "";
    copy.className = "";
    Object.assign(copy.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: getComputedStyle(image).transform,
    });
    overlay.appendChild(copy);
    document.body.appendChild(overlay);

    pending.current = {
      href,
      overlay,
      source,
      sourceVisibility: source.style.visibility,
      frames: [],
      // A failed/interrupted navigation must never leave the page hidden.
      timeout: setTimeout(finish, 3000),
    };
    source.style.visibility = "hidden";
    document.documentElement.dataset.projectTransition = "pending";
    return true;
  }, [finish]);

  const arrive = useCallback((href: string, target: HTMLElement) => {
    const transition = pending.current;
    if (!transition || transition.href !== href || transition.target) return;
    transition.target = target;
    const main = target.closest("main");
    if (main) main.scrollTop = 0;

    // Measure after the server-rendered destination has committed its layout.
    transition.frames.push(requestAnimationFrame(() => {
      transition.frames.push(requestAnimationFrame(async () => {
        if (pending.current !== transition) return;
        const from = transition.overlay.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        if (!to.width || !to.height) return finish();

        document.documentElement.dataset.projectTransition = "moving";
        const options = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };
        const controls = animate(transition.overlay, {
          x: to.left - from.left,
          y: to.top - from.top,
          scaleX: to.width / from.width,
          scaleY: to.height / from.height,
          borderRadius: `${16 * from.width / to.width}px`,
        }, options);
        const copy = transition.overlay.querySelector("img");
        const imageControls = copy ? animate(copy, { transform: "none" }, options) : null;
        transition.stop = () => {
          controls.stop();
          imageControls?.stop();
        };

        const image = target.querySelector("img");
        await Promise.all([controls, image?.decode().catch(() => undefined)]);
        if (pending.current !== transition) return;
        finish();

        // Preserve keyboard reading order without stealing focus after a user
        // has already moved to a destination control during navigation.
        if (document.activeElement === document.body) {
          const heading = main?.querySelector("h1");
          heading?.setAttribute("tabindex", "-1");
          heading?.focus({ preventScroll: true });
        }
      }));
    }));
  }, [finish]);

  useLayoutEffect(() => {
    if (pathname === "/projects" && listScroll.current !== null) {
      const main = document.querySelector<HTMLElement>("[data-project-list]");
      if (main) main.scrollTop = listScroll.current;
    } else if (pending.current && pending.current.href !== pathname) {
      finish();
    }
  }, [pathname, finish]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("popstate", finish);
    window.addEventListener("resize", finish);
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchmove", finish, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", finish);
    return () => {
      window.removeEventListener("popstate", finish);
      window.removeEventListener("resize", finish);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
      window.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", finish);
      finish();
    };
  }, [finish]);

  const value = useMemo(() => ({ begin, arrive }), [begin, arrive]);
  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

export function ProjectTransitionLink({ href, children, className }: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const transition = useContext(TransitionContext);
  return (
    <Link href={href} scroll={false} className={className} onClick={(event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (transition && !transition.begin(href, event.currentTarget)) event.preventDefault();
    }}>
      {children}
    </Link>
  );
}

export function ProjectImageTarget({ id, children }: { id: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const transition = useContext(TransitionContext);
  useLayoutEffect(() => {
    if (ref.current) transition?.arrive(`/projects/${id}`, ref.current);
  }, [id, transition]);

  return <div ref={ref} data-project-image-target className="rounded-2xl">{children}</div>;
}
