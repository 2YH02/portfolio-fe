"use client";

import hljs from "@/lib/highlight/hljs";
import { sanitizePostHtml } from "@/lib/content/sanitizeHtml";
import { marked } from "marked";
import { useEffect, useRef } from "react";

marked.use({ gfm: true });

interface MarkdownRendererProps {
  markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const html = marked.parse(markdown) as string;

    const div = document.createElement("div");
    div.innerHTML = sanitizePostHtml(html);

    div.querySelectorAll("img").forEach((img) => {
      if (!img.getAttribute("alt")) img.setAttribute("alt", "");
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      img.setAttribute("fetchpriority", "low");
    });

    containerRef.current.innerHTML = div.innerHTML;

    containerRef.current.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [markdown]);

  return <div ref={containerRef} />;
}
