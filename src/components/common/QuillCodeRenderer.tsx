"use client";

import hljs from "highlight.js";
import { useEffect, useRef } from "react";

interface QuillCodeRendererProps {
  htmlString: string;
}

export default function QuillCodeRenderer({
  htmlString,
}: QuillCodeRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const prevEl = document.createElement("div");
      prevEl.innerHTML = htmlString;
      prevEl
        .querySelectorAll(".ql-ui, .ql-picker, .ql-picker-options, option")
        .forEach((el) => el.remove());

      prevEl.querySelectorAll(".ql-code-block").forEach((div) => {
        const codeText = div.textContent || "";
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = codeText;

        const container = div.closest(".ql-code-block-container");
        const select = container?.querySelector("select");
        const lang =
          (select as HTMLSelectElement)?.value ||
          div.getAttribute("data-language") ||
          "plaintext";

        if (lang && lang !== "plain") {
          code.classList.add(`language-${lang}`);
        }

        pre.appendChild(code);
        div.replaceWith(pre);
      });

      containerRef.current.innerHTML = prevEl.innerHTML;

      containerRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [htmlString]);

  return <div ref={containerRef} className="whitespace-pre-wrap" />;
}
