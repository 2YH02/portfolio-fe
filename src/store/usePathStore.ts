import { create } from "zustand";

interface PathState {
  currentPath: string;
  previousPath: string | null;
  onPathChange: (newPath: string) => void;
}

export const usePathStore = create<PathState>((set) => ({
  currentPath: "",
  previousPath: null,
  onPathChange: (newPath) =>
    set((state) => ({
      previousPath: state.currentPath,
      currentPath: newPath,
    })),
}));
