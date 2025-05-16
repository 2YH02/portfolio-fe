"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ParticleCanvas from "./ParticleCanvas";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{
    x: null | number;
    y: null | number;
  }>({ x: null, y: null });
  const containerRef = useRef<HTMLDivElement>(null);
  const updateMousePosition = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mousemove",
          updateMousePosition
        );
      }
    };
  }, []);

  const maskSize = isHovered ? revealSize : size;

  if (!mousePosition.x || !mousePosition.y) return;

  return (
    <>
      {isHovered && <ParticleCanvas x={mousePosition.x} y={mousePosition.y} />}
      <motion.div
        ref={containerRef}
        className={cn("relative h-screen", className)}
        transition={{
          backgroundColor: { duration: 0.3 },
        }}
      >
        <motion.div
          className={cn(
            "absolute flex h-full w-full items-center justify-center text-6xl bg-black [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] dark:bg-white"
          )}
          animate={{
            maskPosition: `${mousePosition.x - maskSize / 2}px ${
              mousePosition.y - maskSize / 2
            }px`,
            maskSize: `${maskSize}px`,
          }}
          transition={{
            maskSize: { duration: 0.3, ease: "easeInOut" },
            maskPosition: { duration: 0.15, ease: "linear" },
          }}
        >
          <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
          <div
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            className="relative z-20 mx-auto text-center text-4xl font-bold"
          >
            {children}
          </div>
        </motion.div>

        <div className="flex h-full w-full items-center justify-center">
          {revealText}
        </div>
      </motion.div>
    </>
  );
};
