import { create } from "zustand";

interface MaskRevealState {
  isHover: boolean;
  setIsHover: (isHover: boolean) => void;
  spotlightColor: string | null;
  setSpotlightColor: (color: string | null) => void;
}

const useMaskRevealStore = create<MaskRevealState>((set) => ({
  isHover: false,
  setIsHover: (isHover) => set({ isHover }),
  spotlightColor: null,
  setSpotlightColor: (color) => set({ spotlightColor: color }),
}));

export default useMaskRevealStore;
