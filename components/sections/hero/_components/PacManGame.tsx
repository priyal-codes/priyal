"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Pac-Man game constants ───────────────────────────────────────────
const CELL = 20;
const COLS = 28;
const ROWS = 31;
const PAC_SPEED = 2;
const GHOST_SPEED = 1.5;
const DOT_SIZE = 3;
const POWER_DOT_SIZE = 6;

// Pac-Man yellow
const PAC_COLOR = "#FFE135";
// Ghost colors
const GHOST_COLORS = ["#FF0000", "#FFB8FF", "#00FFFF", "#FFB852"];
const GHOST_SCARED_COLOR = "#2121DE";

// Simplified maze layout (1=wall, 0=path, 2=power pellet, 3=empty/no dot)
const MAZE_TEMPLATE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,2,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,2,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,3,1,1,3,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,3,1,1,3,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,3,3,3,3,3,3,3,3,3,3,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,3,1,1,1,3,3,1,1,1,3,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,3,3,3,1,3,3,3,3,3,3,1,3,3,3,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,3,1,3,3,3,3,3,3,1,3,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,3,1,1,1,1,1,1,1,1,3,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,3,3,3,3,3,3,3,3,3,3,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,2,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

interface Ghost {
  x: number;
  y: number;
  dir: number;
  color: string;
  scared: boolean;
  scaredTimer: number;
}

export function PacManGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const stateRef = useRef({
    pacman: { x: 14 * CELL, y: 17 * CELL, dir: 0, nextDir: 0, mouthOpen: 0, mouthDir: 1 },
    ghosts: [] as Ghost[],
    dots: [] as { x: number; y: number; power: boolean }[],
    score: 0,
    gameOver: false,
  });
  const keysRef = useRef<Set<string>>(new Set());

  const initGame = useCallback(() => {
    const dots: { x: number; y: number; power: boolean }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (MAZE_TEMPLATE[r]?.[c] === 0) {
          dots.push({ x: c * CELL + CELL / 2, y: r * CELL + CELL / 2, power: false });
        } else if (MAZE_TEMPLATE[r]?.[c] === 2) {
          dots.push({ x: c * CELL + CELL / 2, y: r * CELL + CELL / 2, power: true });
        }
      }
    }

    const ghosts: Ghost[] = GHOST_COLORS.map((color, i) => ({
      x: (12 + i * 2) * CELL,
      y: 14 * CELL,
      dir: Math.floor(Math.random() * 4),
      color,
      scared: false,
      scaredTimer: 0,
    }));

    stateRef.current = {
      pacman: { x: 14 * CELL, y: 23 * CELL, dir: 0, nextDir: 0, mouthOpen: 0, mouthDir: 1 },
      ghosts,
      dots,
      score: 0,
      gameOver: false,
    };
  }, []);

  const isWall = (px: number, py: number): boolean => {
    const col = Math.floor(px / CELL);
    const row = Math.floor(py / CELL);
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return true;
    return MAZE_TEMPLATE[row]?.[col] === 1;
  };

  const canMove = (x: number, y: number, dir: number, speed: number): boolean => {
    const half = CELL / 2 - 2;
    let nx = x, ny = y;
    if (dir === 0) nx += speed;
    else if (dir === 1) ny += speed;
    else if (dir === 2) nx -= speed;
    else ny -= speed;

    // Check corners
    return !isWall(nx - half, ny - half) &&
           !isWall(nx + half, ny - half) &&
           !isWall(nx - half, ny + half) &&
           !isWall(nx + half, ny + half);
  };

  const snapToGrid = (val: number): number => {
    return Math.round(val / CELL) * CELL + CELL / 2;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;

    initGame();

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      const s = stateRef.current;
      if (s.gameOver) {
        initGame();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "d") s.pacman.nextDir = 0;
      else if (e.key === "ArrowDown" || e.key === "s") s.pacman.nextDir = 1;
      else if (e.key === "ArrowLeft" || e.key === "a") s.pacman.nextDir = 2;
      else if (e.key === "ArrowUp" || e.key === "w") s.pacman.nextDir = 3;
    };
    const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const animate = () => {
      const s = stateRef.current;
      const { pacman, ghosts, dots } = s;

      // ── Update ──
      if (!s.gameOver) {
        // Try next direction first
        const centerX = snapToGrid(pacman.x - CELL / 2);
        const centerY = snapToGrid(pacman.y - CELL / 2);
        const nearCenter = Math.abs(pacman.x - centerX) < PAC_SPEED + 1 && Math.abs(pacman.y - centerY) < PAC_SPEED + 1;

        if (nearCenter && canMove(centerX, centerY, pacman.nextDir, PAC_SPEED)) {
          pacman.dir = pacman.nextDir;
          pacman.x = centerX;
          pacman.y = centerY;
        }

        if (canMove(pacman.x, pacman.y, pacman.dir, PAC_SPEED)) {
          if (pacman.dir === 0) pacman.x += PAC_SPEED;
          else if (pacman.dir === 1) pacman.y += PAC_SPEED;
          else if (pacman.dir === 2) pacman.x -= PAC_SPEED;
          else pacman.y -= PAC_SPEED;
        }

        // Mouth animation
        pacman.mouthOpen += 0.15 * pacman.mouthDir;
        if (pacman.mouthOpen > 1) { pacman.mouthOpen = 1; pacman.mouthDir = -1; }
        if (pacman.mouthOpen < 0) { pacman.mouthOpen = 0; pacman.mouthDir = 1; }

        // Eat dots
        for (let i = dots.length - 1; i >= 0; i--) {
          const d = dots[i];
          const dist = Math.hypot(pacman.x - d.x, pacman.y - d.y);
          if (dist < CELL / 2) {
            if (d.power) {
              s.score += 50;
              ghosts.forEach(g => { g.scared = true; g.scaredTimer = 300; });
            } else {
              s.score += 10;
            }
            dots.splice(i, 1);
          }
        }

        // Update ghosts
        ghosts.forEach(g => {
          if (g.scared) {
            g.scaredTimer--;
            if (g.scaredTimer <= 0) g.scared = false;
          }

          // Try to change direction randomly at intersections
          const gcx = snapToGrid(g.x - CELL / 2);
          const gcy = snapToGrid(g.y - CELL / 2);
          const gNearCenter = Math.abs(g.x - gcx) < GHOST_SPEED + 1 && Math.abs(g.y - gcy) < GHOST_SPEED + 1;

          if (gNearCenter) {
            g.x = gcx;
            g.y = gcy;
            // Find possible directions (exclude reverse)
            const reverse = (g.dir + 2) % 4;
            const possible = [0, 1, 2, 3].filter(d => d !== reverse && canMove(g.x, g.y, d, GHOST_SPEED));

            if (possible.length > 0) {
              if (!g.scared) {
                // Simple chase: prefer direction toward pacman
                const dx = pacman.x - g.x;
                const dy = pacman.y - g.y;
                let preferred = 0;
                if (Math.abs(dx) > Math.abs(dy)) preferred = dx > 0 ? 0 : 2;
                else preferred = dy > 0 ? 1 : 3;

                if (possible.includes(preferred) && Math.random() > 0.3) {
                  g.dir = preferred;
                } else {
                  g.dir = possible[Math.floor(Math.random() * possible.length)];
                }
              } else {
                // Run away randomly
                g.dir = possible[Math.floor(Math.random() * possible.length)];
              }
            }
          }

          const speed = g.scared ? GHOST_SPEED * 0.6 : GHOST_SPEED;
          if (canMove(g.x, g.y, g.dir, speed)) {
            if (g.dir === 0) g.x += speed;
            else if (g.dir === 1) g.y += speed;
            else if (g.dir === 2) g.x -= speed;
            else g.y -= speed;
          } else {
            // Pick a new random direction
            const possible = [0, 1, 2, 3].filter(d => canMove(g.x, g.y, d, speed));
            if (possible.length > 0) g.dir = possible[Math.floor(Math.random() * possible.length)];
          }

          // Collision with pacman
          const dist = Math.hypot(pacman.x - g.x, pacman.y - g.y);
          if (dist < CELL * 0.8) {
            if (g.scared) {
              // Eat ghost — reset to center
              g.x = 14 * CELL;
              g.y = 14 * CELL;
              g.scared = false;
              s.score += 200;
            } else {
              s.gameOver = true;
            }
          }
        });
      }

      // ── Draw ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw maze walls
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (MAZE_TEMPLATE[r]?.[c] === 1) {
            ctx.fillStyle = "rgba(33, 33, 222, 0.15)";
            ctx.fillRect(c * CELL, r * CELL, CELL, CELL);

            // Draw wall borders
            ctx.strokeStyle = "rgba(33, 33, 222, 0.35)";
            ctx.lineWidth = 1;
            // Only draw borders adjacent to non-wall cells
            if (r > 0 && MAZE_TEMPLATE[r - 1]?.[c] !== 1) {
              ctx.beginPath(); ctx.moveTo(c * CELL, r * CELL); ctx.lineTo((c + 1) * CELL, r * CELL); ctx.stroke();
            }
            if (r < ROWS - 1 && MAZE_TEMPLATE[r + 1]?.[c] !== 1) {
              ctx.beginPath(); ctx.moveTo(c * CELL, (r + 1) * CELL); ctx.lineTo((c + 1) * CELL, (r + 1) * CELL); ctx.stroke();
            }
            if (c > 0 && MAZE_TEMPLATE[r]?.[c - 1] !== 1) {
              ctx.beginPath(); ctx.moveTo(c * CELL, r * CELL); ctx.lineTo(c * CELL, (r + 1) * CELL); ctx.stroke();
            }
            if (c < COLS - 1 && MAZE_TEMPLATE[r]?.[c + 1] !== 1) {
              ctx.beginPath(); ctx.moveTo((c + 1) * CELL, r * CELL); ctx.lineTo((c + 1) * CELL, (r + 1) * CELL); ctx.stroke();
            }
          }
        }
      }

      // Draw dots
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.power ? POWER_DOT_SIZE : DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = d.power ? "#FFB8FF" : "rgba(255, 255, 255, 0.5)";
        ctx.fill();
      });

      // Draw Pac-Man
      const mouthAngle = pacman.mouthOpen * 0.35;
      const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
      const baseAngle = angles[pacman.dir] || 0;
      ctx.beginPath();
      ctx.arc(pacman.x, pacman.y, CELL / 2 - 1, baseAngle + mouthAngle, baseAngle + Math.PI * 2 - mouthAngle);
      ctx.lineTo(pacman.x, pacman.y);
      ctx.fillStyle = PAC_COLOR;
      ctx.fill();
      ctx.shadowColor = PAC_COLOR;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw ghosts
      ghosts.forEach(g => {
        const gx = g.x;
        const gy = g.y;
        const size = CELL / 2 - 1;
        const color = g.scared ? GHOST_SCARED_COLOR : g.color;

        // Ghost body
        ctx.beginPath();
        ctx.arc(gx, gy - 2, size, Math.PI, 0);
        ctx.lineTo(gx + size, gy + size - 2);
        // Wavy bottom
        for (let i = 0; i < 3; i++) {
          const wx = gx + size - (i * size * 2) / 3;
          ctx.quadraticCurveTo(wx - size / 6, gy + size + 2, wx - size / 3, gy + size - 2);
          ctx.quadraticCurveTo(wx - size / 2, gy + size - 6, wx - (size * 2) / 3, gy + size - 2);
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        // Eyes
        if (!g.scared) {
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(gx - 3, gy - 3, 3, 0, Math.PI * 2);
          ctx.arc(gx + 3, gy - 3, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#111";
          ctx.beginPath();
          ctx.arc(gx - 2, gy - 2, 1.5, 0, Math.PI * 2);
          ctx.arc(gx + 4, gy - 2, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(gx - 3, gy - 3, 2, 0, Math.PI * 2);
          ctx.arc(gx + 3, gy - 3, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Score
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "12px monospace";
      ctx.fillText(`Score: ${s.score}`, 10, ROWS * CELL - 8);

      // Game over
      if (s.gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = PAC_COLOR;
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "12px monospace";
        ctx.fillText("Press any key to restart", canvas.width / 2, canvas.height / 2 + 15);
        ctx.textAlign = "start";
      }

      // Win
      if (dots.length === 0 && !s.gameOver) {
        ctx.fillStyle = PAC_COLOR;
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
        ctx.textAlign = "start";
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [initGame]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto max-h-[360px] sm:max-h-[400px] object-contain rounded bg-black/90 border border-retro-yellow/30 shadow-inner"
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
}
