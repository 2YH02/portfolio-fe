import { create } from "zustand";

interface SelectedImage {
  src: string;
  rect: DOMRect;
}

interface ImageState {
  curImage: SelectedImage | null;
  setCurImage: (img: SelectedImage | null) => void;
}

const useImageStore = create<ImageState>((set) => ({
  curImage: null,
  setCurImage: (img) => set({ curImage: img }),
}));

export default useImageStore;
