"use client";

import Button from "@/components/common/Button";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(() => import("@/components/ui/Editor"), {
  ssr: false,
});

export default function AddPostPage() {
  const [html, setHtml] = useState("");

  const savePost = () => {
    console.log(JSON.stringify(html));
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="max-w-[1280px] h-full p-10 mx-auto flex flex-col">
        <h1 className="text-2xl mb-4">새 글 작성</h1>
        <Editor initialHTML={html} onChange={setHtml} />
        <Button onClick={savePost} className=" mt-8">
          저장하기
        </Button>
      </div>
    </div>
  );
}
