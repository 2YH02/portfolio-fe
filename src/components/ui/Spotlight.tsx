"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type SpotlightProps = {
  className?: string;
};

export const Spotlight = ({ className }: SpotlightProps) => {
  const pathname = usePathname();

  const [lightColor, setLightColor] = useState("#a8a8a8");

  const changeColor = useCallback((color: string) => {
    setTimeout(() => {
      setLightColor(color);
    }, 500);
  }, []);

  useEffect(() => {
    if (pathname.includes("/projects")) {
      changeColor("yellow");
    } else if (pathname.includes("/about")) {
      changeColor("purple");
    } else if (pathname.includes("/posts")) {
      changeColor("red");
    } else {
      changeColor("white");
    }
  }, [pathname]);
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute left-1/3 h-[169%] w-[138%] lg:w-[84%] opacity-0 -z-10",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          className="transition-colors duration-500 ease-in-out"
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={lightColor}
          fillOpacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};
