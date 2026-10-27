"use client";

import hljs from "@/lib/highlight/hljs";
import { sanitizePostHtml } from "@/lib/content/sanitizeHtml";
import React, { useEffect, useMemo, useRef } from "react";

interface QuillCodeRendererProps {
  htmlString: string;
}

function QuillCodeRenderer({
  htmlString,
}: QuillCodeRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const html = useMemo(() => sanitizePostHtml(htmlString), [htmlString]);

  useEffect(() => {
    if (containerRef.current) {
      const prevEl = document.createElement("div");
      prevEl.innerHTML = html;
      prevEl
        .querySelectorAll(".ql-ui, .ql-picker, .ql-picker-options, option")
        .forEach((el) => el.remove());

      prevEl.querySelectorAll(".ql-code-block").forEach((div) => {
        const codeText = div.textContent || "\n";
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = codeText;

        const container = div.closest(".ql-code-block-container");
        const select = container?.querySelector("select");
        const lang =
          (select as HTMLSelectElement)?.value ||
          div.getAttribute("data-language") ||
          "plaintext";

        if (lang !== "plain" && hljs.getLanguage(lang)) {
          code.classList.add(`language-${lang}`);
        }

        pre.appendChild(code);
        div.replaceWith(pre);
      });

      prevEl.querySelectorAll("img").forEach((img) => {
        if (!img.hasAttribute("alt")) {
          img.setAttribute("alt", "");
        }
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
        img.setAttribute("fetchpriority", "low");
      });

      containerRef.current.innerHTML = prevEl.innerHTML;

      containerRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [html]);

  return <div ref={containerRef} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default React.memo(QuillCodeRenderer);
