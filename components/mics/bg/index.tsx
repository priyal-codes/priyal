"use client";

import { useEffect, useRef } from "react";

export const Background = () => {
  return (
    <>
      <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden pointer-events-none bg-black pixel-grid-bg" />
      <PixelStars />
    </>
  );
};

/* Floating pixel stars scattered across the viewport */
function PixelStars() {
  const starsRef = useRef<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() > 0.7 ? 3 : 2,
        delay: Math.random() * 3,
      });
    }
    starsRef.current = stars;
  }, []);

  return (
    <div className="fixed inset-0 -z-40 pointer-events-none overflow-hidden">
      {Array.from({ length: 40 }, (_, i) => {
        const seed = (i * 7 + 13) % 100;
        const seedY = (i * 11 + 7) % 100;
        const size = i % 5 === 0 ? 3 : 2;
        const delay = (i * 0.3) % 3;
        return (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${seed}%`,
              top: `${seedY}%`,
              width: size,
              height: size,
              backgroundColor: i % 3 === 0 ? "#FFE135" : i % 3 === 1 ? "#FF69B4" : "#fff",
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
