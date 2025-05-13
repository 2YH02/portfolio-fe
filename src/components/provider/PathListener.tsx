"use client";

import { usePathStore } from "@/store/usePathStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PathListener = () => {
  const pathname = usePathname();
  const { onPathChange } = usePathStore();

  useEffect(() => {
    onPathChange(pathname);
  }, [pathname, onPathChange]);

  return null;
};

export default PathListener;
