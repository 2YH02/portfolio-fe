"use client";

import { createContext, useContext } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  body: React.RefObject<HTMLElement | null>;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading은 LoadingProvider 안에서만 호출될 수 있습니다.");
  }
  return context;
}
