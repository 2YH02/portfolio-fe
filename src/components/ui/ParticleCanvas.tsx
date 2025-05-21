"use client";

import Particle from "@/lib/Particle";
import { useEffect, useRef } from "react";

const PARTICLE_NUM = 800;
const INTERVAL = 1000 / 60;
const DELAY = 300;

const ParticleCanvas = ({
  x = window.innerWidth / 2,
  y = window.innerHeight / 2,
}: {
  x?: number;
  y?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;

    ctx.scale(dpr, dpr);
  };

  const createParticles = () => {
    particlesRef.current = [];
    for (let i = 0; i < PARTICLE_NUM; i++) {
      particlesRef.current.push(new Particle(x, y));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let then = Date.now();
    let animationFrameId: number;

    initCanvas();

    const frame = () => {
      animationFrameId = requestAnimationFrame(frame);
      const now = Date.now();
      const delta = now - then;
      if (delta < INTERVAL) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].opacity < 0) particles.splice(i, 1);
      }

      then = now - (delta % INTERVAL);
    };

    const delayId = setTimeout(() => {
      createParticles();
      animationFrameId = requestAnimationFrame(frame);
    }, DELAY);

    window.addEventListener("resize", initCanvas);

    return () => {
      clearTimeout(delayId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", initCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1]"
    />
  );
};

export default ParticleCanvas;
