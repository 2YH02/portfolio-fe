/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import ImageUploader from "@/lib/quill/ImageUploader";
import { supabase } from "@/lib/supabase/supabasClient";
import hljs from "highlight.js";
import Quill from "quill";
import { useEffect, useRef } from "react";

import "quill/dist/quill.snow.css";

Quill.register("modules/imageUploader", ImageUploader);

const Syntax = Quill.import("modules/syntax") as {
  DEFAULTS: {
    languages: { key: string; label: string }[];
  };
};

Syntax.DEFAULTS.languages = [
  { key: "plain", label: "Plain" },
  { key: "javascript", label: "JavaScript" },
  { key: "typescript", label: "TypeScript" },
  { key: "jsx", label: "JSX" },
  { key: "tsx", label: "TSX" },
  { key: "rust", label: "Rust" },
  { key: "bash", label: "Bash" },
  { key: "cpp", label: "C++" },
  { key: "cs", label: "C#" },
  { key: "css", label: "CSS" },
  { key: "xml", label: "HTML/XML" },
];

export type EditorProps = {
  initialHTML?: string;
  onChange?: (html: string) => void;
};

const Editor = ({ initialHTML = "", onChange }: EditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    if (containerRef.current?.innerHTML !== "") return;

    let quill: null | Quill = null;
    let editorContainer: null | HTMLDivElement = null;

    if (quill || editorContainer) return;

    editorContainer = containerRef.current!.appendChild(
      containerRef.current!.ownerDocument.createElement("div")
    );

    quill = new Quill(editorContainer, {
      theme: "snow",
      modules: {
        uploader: { handler: () => {} },
        syntax: { hljs },
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
          ],
        },
        imageUploader: {
          upload: async (file: File) => {
            const filePath = `yonghunblog/${Date.now()}`;

            const { error: uploadError } = await supabase.storage
              .from("blog-img")
              .upload(filePath, file);

            if (uploadError) {
              console.error("이미지 업로드 에러: ", uploadError);
              return;
            }

            const { data: urlData } = supabase.storage
              .from("blog-img")
              .getPublicUrl(filePath);

            const publicUrl = urlData.publicUrl;

            return publicUrl;
          },
        },
      },
      formats: [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "color",
        "background",
        "code-block",
        "link",
        "image",
        "imageBlot",
        "blockquote",
      ],
    });

    if (initialHTML) {
      quill.clipboard.dangerouslyPasteHTML(initialHTML);
    }

    quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta) => {
      onChangeRef.current?.(quill.root.innerHTML);
      let index = 0;
      delta.ops.forEach((op: any) => {
        if (op.retain) {
          index += op.retain;
        } else if (op.insert) {
          index += typeof op.insert === "string" ? op.insert.length : 1;
        } else if (op.delete) {
          let pos = 0;
          oldDelta.ops.forEach(async (oldOp: any) => {
            if (oldOp.retain) {
              pos += oldOp.retain;
            } else if (oldOp.insert && typeof oldOp.insert !== "string") {
              if (pos >= index && oldOp.insert.image) {
                const url: string = oldOp.insert.image;
                const match = url.match(
                  /\/storage\/v1\/object\/public\/[^\/]+\/(.+)$/
                );
                if (!match) {
                  quill.insertEmbed(index, "image", url, "user");
                  throw new Error("파일 경로 파싱 실패");
                }

                const filePath = match[1];

                const { error } = await supabase.storage
                  .from("blog-img")
                  .remove([filePath]);

                if (error) {
                  quill.insertEmbed(index, "image", url, "user");
                }
              }
              pos += typeof oldOp.insert === "string" ? oldOp.insert.length : 1;
            } else if (oldOp.delete) {
              pos -= oldOp.delete;
            }
          });
          index += op.delete;
        }
      });
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full" />;
};

export default Editor;
