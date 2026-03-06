"use client";

import { motion, AnimatePresence, useAnimationControls } from "motion/react";
import { useEffect, useId, useState } from "react";

const MAX_CLICKS = 7;

const HEART_PATH =
  "M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z";

const POKE_MESSAGES = [
  "이미 눌렀잖아요",
  "벌써 눌렀는데요?",
  "한 번이면 충분해요",
  "그만 좀 눌러요...",
  "진짜예요",
  "...",
  "🫠",
];

const ERROR_PARTICLES = Array.from({ length: 8 }, (_, i) => {
  const angle = ((i * 45 - 90) * Math.PI) / 180;
  const dist = 32 + (i % 2) * 12;
  const colors = ["#ef4444", "#f97316", "#dc2626", "#fb923c"];
  return {
    id: i,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist,
    size: 3 + (i % 2) * 2,
    color: colors[i % colors.length],
    delay: (i % 3) * 0.03,
  };
});

// 12 particles, spread 360°, stable (no Math.random at render)
const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = ((i * 30 - 90) * Math.PI) / 180;
  const dist = 44 + (i % 3) * 14;
  const colors = ["#818cf8", "#a78bfa", "#c084fc", "#f472b6", "#fb7185"];
  return {
    id: i,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist,
    size: 3 + (i % 3) * 2,
    color: colors[i % colors.length],
    delay: (i % 4) * 0.025,
  };
});

interface LikeButtonProps {
  onLike?: () => Promise<unknown>;
  initialDone?: boolean;
}

export function LikeButton({ onLike, initialDone }: LikeButtonProps) {
  const uid = useId();
  const gradId = `lk-grad${uid}`;
  const clipId = `lk-clip${uid}`;

  const [clicks, setClicks] = useState(0);
  const [burst, setBurst] = useState(false);
  const [errorBurst, setErrorBurst] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);
  const [isPoked, setIsPoked] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    if (initialDone && !done) {
      setClicks(MAX_CLICKS);
      setDone(true);
    }
  }, [initialDone]);

  // clipPath rect: y=24 → empty, y=0 → full (SVG viewBox 0 0 24 24)
  const clipY = (1 - clicks / MAX_CLICKS) * 24;

  const handleClick = async () => {
    if (done) {
      const next = pokeCount + 1;
      setPokeCount(next);
      setIsPoked(true);
      const intensity = Math.min(next, 6);
      controls.start({
        scale: [1, 1.15 + intensity * 0.04, 0.88, 1.08, 1],
        rotate: [0, -(4 + intensity * 2), (4 + intensity * 2), -2, 0],
        transition: { duration: 0.35 + intensity * 0.02, ease: "easeInOut" },
      });
      setTimeout(() => setIsPoked(false), 700);
      return;
    }
    const next = clicks + 1;
    setClicks(next);

    if (next === MAX_CLICKS) {
      setBurst(true);
      setDone(true);
      try {
        await onLike?.();
      } catch {
        setBurst(false);
        setError(true);
        setErrorBurst(true);
        controls.start({
          x: [0, -9, 9, -6, 6, -3, 3, 0],
          transition: { duration: 0.5, ease: "easeInOut" },
        });
        setTimeout(() => {
          setError(false);
          setErrorBurst(false);
          setDone(false);
          setClicks(0);
        }, 900);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <motion.button
        onClick={handleClick}
        aria-label={done ? "이미 좋아요 누름" : `좋아요 ${clicks}/${MAX_CLICKS}`}
        className="relative w-14 h-14 cursor-pointer focus-visible:outline-none overflow-visible"
        animate={controls}
        whileHover={{ scale: done ? 1.05 : 1.1 }}
        whileTap={{ scale: 0.82 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* radial glow when complete */}
        <AnimatePresence>
          {done && !error && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.45) 0%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 2.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* radial glow on poke */}
        <AnimatePresence>
          {isPoked && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(251,${Math.max(100 - pokeCount * 12, 30)},${Math.max(80 - pokeCount * 10, 20)},${0.3 + pokeCount * 0.08}) 0%, transparent 70%)`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* radial glow on error */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,68,68,0.5) 0%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 2.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* error particle burst */}
        <AnimatePresence>
          {errorBurst &&
            ERROR_PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 5px ${p.color}`,
                  top: "50%",
                  left: "50%",
                }}
                initial={{ x: "-50%", y: "-50%", scale: 1.4, opacity: 1 }}
                animate={{
                  x: `calc(-50% + ${p.tx}px)`,
                  y: `calc(-50% + ${p.ty}px)`,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: p.delay,
                }}
              />
            ))}
        </AnimatePresence>

        {/* particle burst */}
        <AnimatePresence>
          {burst &&
            PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 5px ${p.color}`,
                  top: "50%",
                  left: "50%",
                }}
                initial={{ x: "-50%", y: "-50%", scale: 1.4, opacity: 1 }}
                animate={{
                  x: `calc(-50% + ${p.tx}px)`,
                  y: `calc(-50% + ${p.ty}px)`,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                  delay: p.delay,
                }}
              />
            ))}
        </AnimatePresence>

        {/* SVG heart */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          overflow="visible"
          style={
            error
              ? { filter: "drop-shadow(0 0 6px rgba(239,68,68,0.9)) drop-shadow(0 0 12px rgba(249,115,22,0.6))" }
              : isPoked
              ? { filter: `drop-shadow(0 0 ${4 + pokeCount * 2}px rgba(251,${Math.max(100 - pokeCount * 12, 30)},50,0.9))` }
              : done
              ? { filter: "drop-shadow(0 0 6px rgba(167,139,250,0.85)) drop-shadow(0 0 12px rgba(236,72,153,0.5))" }
              : undefined
          }
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <clipPath id={clipId}>
              <rect
                x={0}
                y={clipY}
                width={24}
                height={24}
                style={{ transition: "y 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              />
            </clipPath>

          </defs>

          {/* glass base heart */}
          <path
            d={HEART_PATH}
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.5"
          />

          {/* inner specular highlight (top-left lobe) */}
          <path
            d="M5.5 8 Q6.5 5.5 8.5 6.5"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.75"
            strokeLinecap="round"
          />

          {/* gradient fill, clipped bottom-to-top */}
          <path
            d={HEART_PATH}
            fill={`url(#${gradId})`}
            clipPath={`url(#${clipId})`}
          />
        </svg>
      </motion.button>

      {/* label */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.span
            key="error"
            className="text-xs text-red-400"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            다시 시도해 주세요
          </motion.span>
        ) : isPoked ? (
          <motion.span
            key={`poke-${pokeCount}`}
            className="text-xs text-orange-400"
            initial={{ opacity: 0, y: -6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            {POKE_MESSAGES[Math.min(pokeCount - 1, POKE_MESSAGES.length - 1)]}
          </motion.span>
        ) : done ? (
          <motion.span
            key="done"
            className="text-xs text-indigo-300"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            감사합니다 ♥
          </motion.span>
        ) : (
          <motion.span
            key="count"
            className="text-xs text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {clicks === 0 ? "글이 도움됐나요?" : `${clicks} / ${MAX_CLICKS}`}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
