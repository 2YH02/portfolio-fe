import { useEffect } from "react";

const useImagePreload = (images: string[]) => {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
};

export default useImagePreload;
