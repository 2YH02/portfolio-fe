"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

interface GlassBoxProps {
  children?: React.ReactNode;
  className?: string;
  withAction?: boolean;
}

export const GlassBox = ({
  children,
  withAction = false,
  className,
}: GlassBoxProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const animateIn = () => {
    if (!overlayRef.current) return;

    overlayRef.current.style.transition = "none";
    overlayRef.current.style.backgroundPosition = "-100% -100%, 0 0";
    overlayRef.current.style.transition = "650ms ease";
    overlayRef.current.style.backgroundPosition = "100% 100%, 0 0";
  };

  const animateOut = () => {
    if (!overlayRef.current) return;

    overlayRef.current.style.transition = "none";
    overlayRef.current.style.backgroundPosition = "-100% -100%, 0 0";
  };

  return (
    <div
      className={cn(
        "relative backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl",
        "rounded-2xl",
        "p-6",
        withAction && "overflow-hidden group transition-all duration-200",
        className
      )}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      {withAction && (
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(-45deg,
            hsla(0,0%,0%,0) 60%,
          rgba(200,200,200,0.5) 70%,
            hsla(0,0%,0%,0) 100%)`,
            backgroundSize: `250% 250%, 100% 100%`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-100% -100%, 0 0",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </div>
  );
};
