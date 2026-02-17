"use client";

import { cn } from "@/lib/utils";
import useMaskRevealStore from "@/store/useMaskRevealStore";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const { setIsHover } = useMaskRevealStore();

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{
    x: null | number;
    y: null | number;
  }>({ x: null, y: null });
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  const updateRect = useCallback(() => {
    if (!containerRef.current) return;
    rectRef.current = containerRef.current.getBoundingClientRect();
  }, []);

  const flushMousePosition = useCallback(() => {
    const rect = rectRef.current;
    const pointer = pointerRef.current;
    if (!rect || !pointer) {
      rafRef.current = null;
      return;
    }

    setMousePosition({ x: pointer.x - rect.left, y: pointer.y - rect.top });
    rafRef.current = null;
  }, []);

  const updateMousePosition = useCallback(
    (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(flushMousePosition);
    },
    [flushMousePosition]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    updateRect();

    const onEnter = () => updateRect();
    const onScroll = () => updateRect();
    const onResize = () => updateRect();

    container.addEventListener("mousemove", updateMousePosition);
    container.addEventListener("mouseenter", onEnter);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      container.removeEventListener("mousemove", updateMousePosition);
      container.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition, updateRect]);

  useEffect(() => {
    setIsHover(isHovered);
  }, [isHovered, setIsHover]);

  const maskSize = isHovered ? revealSize : size;

  return (
    <>
      {isHovered && (
        <ParticleCanvas
          x={mousePosition?.x || undefined}
          y={mousePosition?.y || undefined}
        />
      )}
      <motion.div
        ref={containerRef}
        className={cn("relative h-screen", className)}
        transition={{
          backgroundColor: { duration: 0.3 },
        }}
      >
        <motion.div
          className={cn(
            `absolute flex h-full w-full items-center justify-center text-6xl 
            backdrop-blur-sm bg-white/10 border border-white shadow-2xl 
            [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px]`
          )}
          animate={{
            maskPosition: `${(mousePosition?.x || 0) - maskSize / 2}px ${
              (mousePosition?.y || 0) - maskSize / 2
            }px`,
            maskSize: `${maskSize}px`,
          }}
          transition={{
            maskSize: { duration: 0.3, ease: "easeInOut" },
            maskPosition: { duration: 0.15, ease: "linear" },
          }}
        >
          <div className="absolute inset-0 z-0 h-full w-full bg-transparent" />
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
