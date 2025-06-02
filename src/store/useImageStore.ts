import { create } from "zustand";

interface ImageState {
  curImage: string | null;
  setCurImage: (img: string | null) => void;
}

const useImageStore = create<ImageState>((set) => ({
  curImage: null,
  setCurImage: (img) => set({ curImage: img }),
}));

export default useImageStore;
