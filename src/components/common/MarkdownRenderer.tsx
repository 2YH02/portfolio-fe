"use client";

import hljs from "@/lib/highlight/hljs";
import React, { useEffect, useRef } from "react";

interface MarkdownRendererProps {
  /** HTML converted from Markdown and already sanitized. */
  html: string;
}

function MarkdownRenderer({ html }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
