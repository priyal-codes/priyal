"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { profile } from "@/constant";
import { useConsole } from "@/components/common/console-layout";

export const HeroSection = () => {
  let consoleCtx: ReturnType<typeof useConsole> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    consoleCtx = useConsole();
  } catch {
    consoleCtx = null;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.75], [0, 40]);

  const currentYear = new Date().getFullYear();

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex flex-col min-h-[calc(100vh-104px)] w-full items-center justify-between bg-transparent overflow-hidden"
    >
      <motion.main
        style={{ opacity, scale, y }}
        className="relative w-full min-h-[calc(100vh-104px)] flex flex-col items-center justify-between pt-12 pb-0 overflow-hidden"
      >


        {/* ── Decorative Pixel Stars ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[15%] left-[8%] text-retro-yellow text-2xl animate-pixel-float" style={{ animationDelay: "0s" }}>✦</div>
          <div className="absolute top-[25%] right-[12%] text-retro-yellow text-lg animate-pixel-float" style={{ animationDelay: "0.5s" }}>★</div>
          <div className="absolute bottom-[30%] left-[15%] text-retro-pink text-xl animate-pixel-float" style={{ animationDelay: "1s" }}>✦</div>
          <div className="absolute bottom-[20%] right-[8%] text-retro-yellow text-2xl animate-pixel-float" style={{ animationDelay: "1.5s" }}>★</div>
          <div className="absolute top-[40%] left-[4%] text-retro-cyan text-sm animate-twinkle" style={{ animationDelay: "0.3s" }}>✦</div>
          <div className="absolute top-[60%] right-[5%] text-retro-pink text-sm animate-twinkle" style={{ animationDelay: "0.8s" }}>✦</div>

          <div className="absolute top-[10%] left-[20%] opacity-25">
            <PixelCloud color="#B24BF3" />
          </div>
          <div className="absolute top-[8%] right-[15%] opacity-20">
            <PixelCloud color="#FF69B4" />
          </div>
          <div className="absolute bottom-[15%] left-[5%] opacity-20">
            <PixelCloud color="#B24BF3" />
          </div>
          <div className="absolute bottom-[10%] right-[20%] opacity-25">
            <PixelCloud color="#FF69B4" />
          </div>
        </div>

        {/* ── Main Title Frame ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center px-4 my-auto"
        >
          {/* Title border frame */}
          <div className="retro-window-green px-8 sm:px-16 py-10 sm:py-14 relative scanlines text-center max-w-3xl">
            <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-pixel text-retro-yellow text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-retro-green animate-pulse" />
                SYSTEM ONLINE — DEVELOPER CONSOLE
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-pixel text-white text-center text-3xl sm:text-5xl md:text-6xl tracking-wider leading-relaxed"
              >
                {profile.name.first.toUpperCase()}
              </motion.h1>

              {/* Action Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => {
                  if (consoleCtx) {
                    consoleCtx.setActiveTab("about");
                  } else {
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="mt-4 retro-btn border-retro-green text-retro-green bg-retro-green/10 hover:bg-retro-green/20 text-xs sm:text-sm px-6 py-3 animate-retro-blink"
                style={{ animationDuration: "1.5s" }}
              >
                ▶ EXPLORE PORTFOLIO
              </motion.button>
            </div>
          </div>

          {/* Dynamic Rotating Name & Role below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="font-pixel text-xs sm:text-sm text-retro-pink mt-6 tracking-widest text-center flex items-center justify-center gap-2"
          >
            <span>{profile.name.full.toUpperCase()}</span>
            <span>—</span>
            <RotatingRoles />
          </motion.div>
        </motion.div>

        {/* ── Retro Pixel Ground with Traveling Pac-Man & Ghosts ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-20 flex flex-col items-center w-full mt-auto"
        >
          {/* Pac-Man Track Area */}
          <div className="w-full h-12 bg-black/70 border-t border-retro-yellow/40 relative overflow-hidden flex items-center">
            {/* Traveling Pac-Man & Ghosts */}
            <div className="absolute left-0 animate-pacman-crawl flex items-center gap-3.5 pointer-events-none">
              {/* Pac-Man */}
              <div className="w-7 h-7 relative flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="#FFE135" />
                  <polygon points="10,10 20,4 20,16" fill="#000" className="animate-pulse" />
                </svg>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-retro-yellow" />
                <div className="w-2 h-2 rounded-full bg-retro-yellow" />
                <div className="w-2 h-2 rounded-full bg-retro-yellow" />
              </div>

              {/* Ghost 1 - Red (Blinky) */}
              <PixelGhost color="#FF0000" />
              {/* Ghost 2 - Pink (Pinky) */}
              <PixelGhost color="#FFB8FF" />
              {/* Ghost 3 - Cyan (Inky) */}
              <PixelGhost color="#00FFFF" />
              {/* Ghost 4 - Orange (Clyde) */}
              <PixelGhost color="#FFB852" />
            </div>
          </div>

          {/* Pixel Block Platform Strip */}
          <div className="w-full h-3 bg-retro-yellow flex items-center justify-around opacity-90 overflow-hidden">
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-full"
                style={{
                  backgroundColor: i % 2 === 0 ? "#eab308" : "#ca8a04",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.main>
    </section>
  );
};

/* Simple CSS pixel cloud */
function PixelCloud({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center" style={{ fontSize: 0 }}>
      <div className="flex">
        <div style={{ width: 8, height: 8, background: color }} />
        <div style={{ width: 8, height: 8, background: color }} />
        <div style={{ width: 8, height: 8, background: color }} />
      </div>
      <div className="flex">
        <div style={{ width: 8, height: 8, background: color }} />
        <div style={{ width: 8, height: 8, background: color }} />
        <div style={{ width: 8, height: 8, background: color }} />
        <div style={{ width: 8, height: 8, background: color }} />
        <div style={{ width: 8, height: 8, background: color }} />
      </div>
    </div>
  );
}

/* Retro Pixel Ghost SVG */
function PixelGhost({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      {/* Ghost Dome Head & Body */}
      <rect x="4" y="1" width="8" height="11" fill={color} />
      <rect x="2" y="3" width="12" height="9" fill={color} />
      <rect x="1" y="5" width="14" height="7" fill={color} />
      
      {/* Wavy Feet */}
      <rect x="1" y="12" width="3" height="3" fill={color} />
      <rect x="6" y="12" width="4" height="3" fill={color} />
      <rect x="12" y="12" width="3" height="3" fill={color} />

      {/* Eyes */}
      <rect x="3" y="4" width="3" height="4" fill="#FFFFFF" />
      <rect x="9" y="4" width="3" height="4" fill="#FFFFFF" />

      {/* Pupils (looking right) */}
      <rect x="4" y="5" width="2" height="2" fill="#0000FF" />
      <rect x="10" y="5" width="2" height="2" fill="#0000FF" />
    </svg>
  );
}

const ROLES = [
  "FULL STACK DEVELOPER",
  "MERN STACK ENGINEER",
  "WEB APPLICATION DEVELOPER",
  "SOFTWARE ENGINEER",
];

function RotatingRoles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block min-w-[210px] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-retro-green font-bold inline-block"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

