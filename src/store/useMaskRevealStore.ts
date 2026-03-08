import { create } from "zustand";

interface MaskRevealState {
  isHover: boolean;
  setIsHover: (isHover: boolean) => void;
  spotlightColor: string | null;
  setSpotlightColor: (color: string | null) => void;
  spotlightOpacity: number;
  setSpotlightOpacity: (opacity: number) => void;
}

const useMaskRevealStore = create<MaskRevealState>((set) => ({
  isHover: false,
  setIsHover: (isHover) => set({ isHover }),
  spotlightColor: null,
  setSpotlightColor: (color) => set({ spotlightColor: color }),
  spotlightOpacity: 0.21,
  setSpotlightOpacity: (opacity) => set({ spotlightOpacity: opacity }),
}));

export default useMaskRevealStore;
