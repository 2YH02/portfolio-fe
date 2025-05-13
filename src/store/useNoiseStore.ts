import { create } from "zustand";

interface NoiseState {
  baseFrequency: number;
  numOctaves: number;
  opacity: number;
  setBaseFrequency: (v: number) => void;
  setNumOctaves: (v: number) => void;
  setOpacity: (v: number) => void;
}

export const useNoiseStore = create<NoiseState>((set) => ({
  baseFrequency: 0.80,
  numOctaves: 4,
  opacity: 0.1,
  setBaseFrequency: (v) => set({ baseFrequency: v }),
  setNumOctaves: (v) => set({ numOctaves: v }),
  setOpacity: (v) => set({ opacity: v }),
}));
