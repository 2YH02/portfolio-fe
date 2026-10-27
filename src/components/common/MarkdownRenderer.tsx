"use client";

import hljs from "@/lib/highlight/hljs";
import { sanitizePostHtml } from "@/lib/content/sanitizeHtml";
import { marked } from "marked";
import React, { useEffect, useMemo, useRef } from "react";

marked.use({ gfm: true });

interface MarkdownRendererProps {
  markdown: string;
}

function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const html = useMemo(() => sanitizePostHtml(marked.parse(markdown, { async: false })), [markdown]);

  useEffect(() => {
    if (!containerRef.current) return;

    const div = document.createElement("div");
    div.innerHTML = html;

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
  }, [html]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default React.memo(MarkdownRenderer);
