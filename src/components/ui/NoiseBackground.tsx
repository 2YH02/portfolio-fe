"use client";

import { useNoiseStore } from "@/store/useNoiseStore";

interface Props {
  width?: number;
  height?: number;
}

const NoiseBackground: React.FC<Props> = ({ width = 100, height = 100 }) => {
  const { baseFrequency, numOctaves, opacity } = useNoiseStore();

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none -z-10"
      style={{ width: `${width}%`, height: `${height}%` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise">
        <feTurbulence
          className="transition-all duration-1000 ease-in-out"
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves={numOctaves}
          stitchTiles="stitch"
        />
      </filter>
      <rect
        className="transition-opacity duration-1000 ease-in-out"
        width="100%"
        height="100%"
        filter="url(#noise)"
        style={{ opacity }}
      />
    </svg>
  );
};

export default NoiseBackground;
