"use client";

import { addPost, type AddPostsRequest } from "@/lib/api/blog";
import { generateBlurDataUrl, optimizeImage } from "@/lib/imageOptimizer";
import { supabase } from "@/lib/supabase/supabasClient";
import { AnimatePresence, motion } from "motion/react";
import NextImage from "next/image";
import { useEffect, useState } from "react";

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { type: "tween", duration: 0.3 } },
  exit: { y: "100%", transition: { type: "tween", duration: 0.2 } },
};

interface AddPostFormProps {
  data: AddPostsRequest;
  changeThumbnailBlur: (url: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AddPostForm = ({
  data,
  isOpen,
  onClose,
  changeThumbnailBlur,
}: AddPostFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blurPreviewUrl, setBlurPreviewUrl] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPreviewUrl(null);
      setFile(null);
    }
  }, [isOpen]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) return;

    setMessage("");
    try {
      const optimizedFile = await optimizeImage(selected, 1280);
      setFile(optimizedFile);

      const objectUrl = URL.createObjectURL(optimizedFile);
      setPreviewUrl(objectUrl);

      const blurDataUrl = await generateBlurDataUrl(optimizedFile);
      changeThumbnailBlur(blurDataUrl);
      setBlurPreviewUrl(blurDataUrl);
    } catch (error) {
      console.error(error);
      setMessage("이미지 최적화에 실패했습니다. 다른 이미지를 시도해주세요.");
      setFile(null);
      setPreviewUrl(null);
      setBlurPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || isSubmitting) {
      if (!file) {
        setMessage("대표 이미지를 선택해주세요.");
      }
      return;
    }

    setMessage("");
    setIsSubmitting(true);

    const filePath = `yonghunblog/${Date.now()}`;

    const imageUrl = await addFileToStorage(file, filePath);

    if (!imageUrl) {
      setMessage("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    const payload: AddPostsRequest = {
      ...data,
      tags: data.tags.filter((tag) => tag.trim() !== ""),
      thumbnail: imageUrl,
    };

    try {
      await addPost(payload);
      onClose();
    } catch (error) {
      console.error(error);
      await deleteFileFromStorage(filePath);
      setMessage("게시글 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={() => {
              if (!isSubmitting) onClose();
            }}
          />
          <motion.div
            className="fixed left-0 bottom-0 w-full backdrop-blur-lg bg-white/10 border border-white/10 rounded-t-2xl shadow-xl p-4 flex flex-col"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

            <form
              className="flex-1 flex flex-col justify-between"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <h1 className="text-4xl mb-1 hover:drop-shadow-glow transition duration-300">
                  {data.title}
                </h1>
                <div className="flex items-center gap-3">
                  <p className="shrink-0 text-sm flex gap-2 text-indigo-200">
                    {data.tags.filter((tag) => tag.trim() !== "").join(", ")}
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  대표 이미지를 선택하세요
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-300 mb-2 file:mr-4 file:py-2 file:px-4 file:cursor-pointer file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {message ? (
                  <p className="text-xs text-red-300" aria-live="polite">
                    {message}
                  </p>
                ) : null}

                {previewUrl && blurPreviewUrl ? (
                  <div className="shrink-0 mt-2 flex gap-3">
                    <NextImage
                      src={previewUrl}
                      alt="selected preview"
                      unoptimized
                      width={160}
                      height={160}
                      className="mt-1 w-40 h-40 rounded-lg object-cover border border-gray-200"
                    />
                    <NextImage
                      src={blurPreviewUrl}
                      alt="selected preview"
                      unoptimized
                      width={160}
                      height={160}
                      className="mt-1 w-40 h-40 rounded-lg object-cover border border-gray-200"
                    />
                  </div>
                ) : (
                  <div className="shrink-0 mt-2 flex gap-3">
                    <div className="shrink-0 w-40 h-40 flex flex-col justify-center items-center border border-dashed rounded-2xl">
                      대표 이미지
                    </div>
                    <div className="shrink-0 w-40 h-40 flex flex-col justify-center items-center border border-dashed rounded-2xl">
                      블러 이미지
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="shrink-0 mt-6 w-full py-2 font-semibold rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "업로드 중..." : "업로드"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

async function addFileToStorage(file: File, filePath: string) {
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
}

async function deleteFileFromStorage(filePath: string) {
  const { error } = await supabase.storage.from("blog-img").remove([filePath]);

  if (error) {
    console.error("이미지 삭제 중 에러:", error);
    return false;
  }

  return true;
}

export default AddPostForm;
