"use client";

import hljs from "@/lib/highlight/hljs";
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
    div.innerHTML = sanitizeHtml(html);

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

function sanitizeHtml(input: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");

  doc
    .querySelectorAll("script, style, iframe, object, embed, form, link, meta, base")
    .forEach((node) => node.remove());

  doc.body.querySelectorAll("*").forEach((el) => {
    [...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();

      const isEventHandler = name.startsWith("on");
      const isUnsafeUrl =
        (name === "href" || name === "src" || name === "xlink:href") &&
        (value.startsWith("javascript:") || value.startsWith("data:text/html"));

      if (isEventHandler || isUnsafeUrl) el.removeAttribute(attr.name);
    });
  });

  return doc.body.innerHTML;
}
