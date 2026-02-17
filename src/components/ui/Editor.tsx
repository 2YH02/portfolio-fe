/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import ImageUploader from "@/lib/quill/ImageUploader";
import { supabase } from "@/lib/supabase/supabasClient";
import hljs from "highlight.js";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";

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
  const isInitializedRef = useRef(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (containerRef.current?.innerHTML !== "") return;
    if (isInitializedRef.current) return;
    let quill: null | Quill = null;
    let editorContainer: null | HTMLDivElement = null;

    if (quill || editorContainer) return;

    const container = containerRef.current;
    if (!container) return;
    isInitializedRef.current = true;

    editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
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
            setMessage("");
            const optimizedFile = await optimizeEditorImage(file);
            const filePath = `yonghunblog/${Date.now()}`;

            const { error: uploadError } = await supabase.storage
              .from("blog-img")
              .upload(filePath, optimizedFile, {
                contentType: optimizedFile.type,
                upsert: false,
              });

            if (uploadError) {
              console.error("이미지 업로드 에러: ", uploadError);
              throw new Error("이미지 업로드에 실패했습니다.");
            }

            const { data: urlData } = supabase.storage
              .from("blog-img")
              .getPublicUrl(filePath);

            const publicUrl = urlData.publicUrl;

            return publicUrl;
          },
          onError: (error: Error) => {
            setMessage(error.message);
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
      container.innerHTML = "";
      isInitializedRef.current = false;
    };
  }, [initialHTML]);

  return (
    <div>
      <div ref={containerRef} />
      {message ? <p className="mt-2 text-sm text-red-300">{message}</p> : null}
    </div>
  );
};

export default Editor;

async function optimizeEditorImage(file: File): Promise<File> {
  const fileType = file.type.toLowerCase();

  if (fileType === "image/gif") {
    throw new Error(
      "GIF 업로드는 지원하지 않습니다. mp4/webm 또는 정적 이미지로 업로드해주세요."
    );
  }

  if (fileType === "image/svg+xml") {
    return file;
  }

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const maxWidth = 1600;
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const width = Math.max(1, Math.round(img.naturalWidth * scale));
      const height = Math.max(1, Math.round(img.naturalHeight * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("이미지 최적화 처리에 실패했습니다."));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);
          if (!blob) {
            reject(new Error("이미지 최적화 처리에 실패했습니다."));
            return;
          }

          resolve(
            new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
              type: "image/webp",
            })
          );
        },
        "image/webp",
        0.82
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("이미지 로드에 실패했습니다."));
    };

    img.src = objectUrl;
  });
}
