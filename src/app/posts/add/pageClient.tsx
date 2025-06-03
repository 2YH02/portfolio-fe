"use client";

import Button from "@/components/common/Button";
import { GlassBox } from "@/components/ui/GlassBox";
import { User } from "@/lib/api/auth";
import { type AddPostsRequest } from "@/lib/api/blog";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import AddPostForm from "../components/AddPostForm";
import AuthForm from "../components/AuthForm";

const Editor = dynamic(() => import("@/components/ui/Editor"), {
  ssr: false,
});

export default function AddPostClient() {
  const [role, setRole] = useState<User>("Guest");

  const [data, setData] = useState<AddPostsRequest>({
    title: "",
    description: "",
    body: "",
    tags: [""],
    thumbnail: "/placeholder_image.png",
    thumbnail_blur: "/placeholder_image.png",
  });

  const [preview, setPreview] = useState(false);

  const tagInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const lastIndex = data.tags.length - 1;
    const lastInput = tagInputRefs.current[lastIndex];
    if (lastInput) {
      lastInput.focus();
    }
  }, [data.tags.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTags = [...data.tags];
    newTags[index] = e.target.value;
    setData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentValue = data.tags[index].trim();
      if (currentValue !== "" && index === data.tags.length - 1) {
        setData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
      }
    }
  };

  const handleBlur = (index: number) => {
    const currentValue = data.tags[index].trim();
    if (currentValue !== "" && index === data.tags.length - 1) {
      setData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
    }
  };

  const removeTag = (index: number) => {
    const filteredTag = data.tags.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, tags: filteredTag }));
  };

  const changeBody = (html: string) => {
    setData((prev) => ({ ...prev, body: html }));
  };
  const changeThumbnailBlur = (thumbnailBlur: string) => {
    setData((prev) => ({ ...prev, thumbnail_blur: thumbnailBlur }));
  };
  const changeDescription = (description: string) => {
    setData((prev) => ({ ...prev, description }));
  };

  const changeRole = (role: User) => {
    setRole(role);
  };

  const savePost = () => {
    changeDescription(stripHtml(data.body));

    setPreview(true);
  };

  if (role === "Guest") {
    return <AuthForm setRole={changeRole} />;
  } else if (role === "Admin") {
    return (
      <div className="h-screen overflow-auto">
        <div className="max-w-[1280px] h-full p-10 mx-auto flex flex-col">
          <h1 className="text-2xl mb-4">새 글 작성</h1>
          <div className="border-b border-solid border-gray-500 mb-6">
            <input
              type="text"
              id="text"
              placeholder="제목을 입력하세요"
              required
              value={data.title}
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="block w-full text-3xl py-2 outline-none"
            />
          </div>
          <Editor initialHTML={data.body} onChange={changeBody} />
          <div className="flex items-center flex-wrap gap-2 p-4 pb-32 text-sm">
            {data.tags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span>#</span>
                <input
                  type="text"
                  value={tag}
                  size={10}
                  ref={(el) => {
                    tagInputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onBlur={() => handleBlur(index)}
                  placeholder="태그 입력 후 Enter"
                  className="border-b border-gray-300 px-1 py-1 outline-none"
                />
                {index !== 0 && (
                  <button onClick={() => removeTag(index)}>
                    <BsX />
                  </button>
                )}
              </div>
            ))}
          </div>
          <GlassBox className="px-10 py-4 fixed bottom-0 left-0 w-full rounded-none">
            <Button onClick={savePost} className="w-full">
              저장하기
            </Button>
          </GlassBox>
        </div>

        <AddPostForm
          isOpen={preview}
          onClose={() => setPreview(false)}
          data={data}
          changeThumbnailBlur={changeThumbnailBlur}
        />
      </div>
    );
  }
}

function stripHtml(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return doc.body.textContent || "";
}
