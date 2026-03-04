"use client";

import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import { optimizeImage } from "@/lib/imageOptimizer";
import { supabase } from "@/lib/supabase/supabasClient";
import { useRef, useState } from "react";

export type MarkdownEditorProps = {
  value: string;
  onChange: (markdown: string) => void;
};

type ToolbarItem =
  | { type: "divider" }
  | {
      label: string;
      before: string;
      after: string;
      placeholder: string;
      bold?: boolean;
      italic?: boolean;
    };

const TOOLBAR_ITEMS: ToolbarItem[] = [
  { label: "H1", before: "# ", after: "", placeholder: "제목" },
  { label: "H2", before: "## ", after: "", placeholder: "제목" },
  { label: "H3", before: "### ", after: "", placeholder: "제목" },
  { type: "divider" },
  { label: "B", before: "**", after: "**", placeholder: "텍스트", bold: true },
  { label: "I", before: "*", after: "*", placeholder: "텍스트", italic: true },
  { label: "~~", before: "~~", after: "~~", placeholder: "텍스트" },
  { type: "divider" },
  { label: "`코드`", before: "`", after: "`", placeholder: "code" },
  { label: "코드블록", before: "```\n", after: "\n```", placeholder: "코드" },
  { label: "인용", before: "> ", after: "", placeholder: "인용문" },
  { label: "링크", before: "[", after: "](url)", placeholder: "텍스트" },
];

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const insertSnippet = (before: string, after: string, placeholder: string) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const newValue = value.slice(0, start) + before + selected + after + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const uploadImage = async (file: File) => {
    setMessage("");
    setIsUploading(true);

    try {
      const fileType = file.type.toLowerCase();
      if (fileType === "image/gif") throw new Error("GIF는 지원하지 않습니다.");

      const optimizedFile =
        fileType === "image/svg+xml" ? file : await optimizeImage(file, 1600);
      const filePath = `yonghunblog/${Date.now()}`;

      const { error } = await supabase.storage
        .from("blog-img")
        .upload(filePath, optimizedFile, { contentType: optimizedFile.type, upsert: false });

      if (error) throw new Error("이미지 업로드에 실패했습니다.");

      const { data: urlData } = supabase.storage.from("blog-img").getPublicUrl(filePath);

      const el = textareaRef.current;
      const pos = el ? el.selectionStart : value.length;
      const imgMd = `\n![이미지](${urlData.publicUrl})\n`;
      onChange(value.slice(0, pos) + imgMd + value.slice(pos));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "업로드 실패");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const file = Array.from(e.clipboardData.items)
      .find((item) => item.type.startsWith("image/"))
      ?.getAsFile();

    if (file) {
      e.preventDefault();
      await uploadImage(file);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex gap-1 pb-2 border-b border-white/10 mb-2 flex-wrap items-center">
        {TOOLBAR_ITEMS.map((item, i) =>
          "type" in item ? (
            <div key={i} className="w-px h-5 bg-white/20 mx-1" />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => insertSnippet(item.before, item.after, item.placeholder)}
              className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20 transition-colors"
              style={{
                fontWeight: item.bold ? "bold" : undefined,
                fontStyle: item.italic ? "italic" : undefined,
              }}
            >
              {item.label}
            </button>
          )
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-40"
        >
          {isUploading ? "업로드 중..." : "이미지"}
        </button>
      </div>

      <div className="flex flex-1 gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <span className="text-xs text-gray-400 mb-1">Markdown</span>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            className="flex-1 resize-none bg-black/20 rounded-lg p-4 font-mono text-sm outline-none border border-white/10 focus:border-white/30 transition-colors"
            placeholder="마크다운으로 작성하세요..."
            spellCheck={false}
          />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <span className="text-xs text-gray-400 mb-1">Preview</span>
          <div className="blog-post flex-1 overflow-auto rounded-lg p-4 bg-black/10 border border-white/10 glass-scroll">
            <MarkdownRenderer markdown={value} />
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadImage(file);
          e.target.value = "";
        }}
      />
      {message && <p className="mt-2 text-sm text-red-300">{message}</p>}
    </div>
  );
};

export default MarkdownEditor;
