import { create } from "zustand";

interface MaskRevealState {
  isHover: boolean;
  setIsHover: (isHover: boolean) => void;
}

const useMaskRevealStore = create<MaskRevealState>((set) => ({
  isHover: false,
  setIsHover: (isHover) => set({ isHover }),
}));

export default useMaskRevealStore;
