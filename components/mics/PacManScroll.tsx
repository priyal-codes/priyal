"use client";

import { useEffect, useRef } from "react";

const PAC_COLOR = "#FFE135";
const GHOST_COLORS = ["#FF0000", "#FFB8FF", "#00FFFF", "#FFB852"];
const DOT_COLOR = "rgba(255, 255, 255, 0.3)";
const DOT_SPACING = 16;

export function PacManScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const prevScrollRef = useRef(0);
  const mouthRef = useRef({ open: 0, dir: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      const { width, height } = canvas;
      const scroll = scrollRef.current;
      const prevScroll = prevScrollRef.current;
      const scrollDelta = scroll - prevScroll;
      const isScrollingDown = scrollDelta >= 0;
      prevScrollRef.current = scroll;

      ctx.clearRect(0, 0, width, height);

      // ── Pac-Man path: left side of screen ──
      const pathX = 32;
      const pacSize = 14;
      const ghostSize = 13;
      const gap = 28;

      // Pac-Man's Y position: stays fixed at center of viewport
      const pacY = height / 2;

      // Draw dot trail ahead of pac-man
      const dotStartY = isScrollingDown ? pacY + 30 : pacY - 30;
      const dotEndY = isScrollingDown ? height + 20 : -20;
      const dotStep = isScrollingDown ? DOT_SPACING : -DOT_SPACING;

      for (let y = dotStartY; isScrollingDown ? y < dotEndY : y > dotEndY; y += dotStep) {
        ctx.beginPath();
        ctx.arc(pathX, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = DOT_COLOR;
        ctx.fill();
      }

      // Mouth animation (animate when scrolling)
      if (Math.abs(scrollDelta) > 0.5) {
        mouthRef.current.open += 0.2 * mouthRef.current.dir;
        if (mouthRef.current.open > 1) { mouthRef.current.open = 1; mouthRef.current.dir = -1; }
        if (mouthRef.current.open < 0.1) { mouthRef.current.open = 0.1; mouthRef.current.dir = 1; }
      }

      // ── Draw Pac-Man ──
      const mouthAngle = mouthRef.current.open * 0.35;
      const baseAngle = isScrollingDown ? Math.PI / 2 : -Math.PI / 2; // face down or up
      ctx.beginPath();
      ctx.arc(pathX, pacY, pacSize, baseAngle + mouthAngle, baseAngle + Math.PI * 2 - mouthAngle);
      ctx.lineTo(pathX, pacY);
      ctx.fillStyle = PAC_COLOR;
      ctx.shadowColor = PAC_COLOR;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // ── Draw Ghosts following behind ──
      GHOST_COLORS.forEach((color, i) => {
        const ghostY = isScrollingDown
          ? pacY - gap * (i + 1)
          : pacY + gap * (i + 1);

        drawGhost(ctx, pathX, ghostY, ghostSize, color, isScrollingDown);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[999] pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

function drawGhost(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  facingDown: boolean
) {
  // Ghost body
  ctx.beginPath();
  ctx.arc(x, y - 2, size, Math.PI, 0);
  ctx.lineTo(x + size, y + size - 2);

  // Wavy bottom
  const wave = 3;
  for (let i = 0; i < 3; i++) {
    const wx = x + size - (i * size * 2) / 3;
    ctx.quadraticCurveTo(wx - size / 6, y + size + wave, wx - size / 3, y + size - 2);
    ctx.quadraticCurveTo(wx - size / 2, y + size - wave - 2, wx - (size * 2) / 3, y + size - 2);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Eyes
  const eyeOffsetY = facingDown ? 1 : -3;
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x - 4, y + eyeOffsetY, 3, 0, Math.PI * 2);
  ctx.arc(x + 4, y + eyeOffsetY, 3, 0, Math.PI * 2);
  ctx.fill();

  // Pupils (looking in scroll direction)
  const pupilY = facingDown ? eyeOffsetY + 1 : eyeOffsetY - 1;
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(x - 4, y + pupilY, 1.5, 0, Math.PI * 2);
  ctx.arc(x + 4, y + pupilY, 1.5, 0, Math.PI * 2);
  ctx.fill();
}
