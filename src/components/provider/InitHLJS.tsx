/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
import hljs from "highlight.js/lib/core";

import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import rust from "highlight.js/lib/languages/rust";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";

import "highlight.js/styles/github-dark.css";

export default function InitHLJS() {
  useEffect(() => {
    hljs.registerLanguage("javascript", js);
    hljs.registerLanguage("typescript", ts);
    hljs.registerLanguage("rust", rust);
    hljs.registerLanguage("html", html);
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("json", json);

    if (typeof window !== "undefined") {
      (window as any).hljs = hljs;
    }
  }, []);

  return null;
}
