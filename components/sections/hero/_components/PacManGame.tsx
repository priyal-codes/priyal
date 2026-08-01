"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Maze setup ──────────────────────────────────────────────────────────────
const COLS = 28;
const ROWS = 31;
const CELL = 16; // px per cell
const PW = COLS * CELL; // 448
const PH = ROWS * CELL; // 496

// prettier-ignore
const MAZE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,7,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,7,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,1,1,2,2,1,1,1,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,2,2,2,2,2,2,1,2,1,1,0,1,1,1,1,1,1],
  [2,2,2,2,2,2,0,2,2,2,1,2,2,2,2,2,2,1,2,2,2,0,2,2,2,2,2,2],
  [1,1,1,1,1,1,0,1,1,2,1,2,2,2,2,2,2,1,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,7,0,0,1,1,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,1,0,0,7,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

type Dir = { x: number; y: number };
type Phase = "idle" | "playing" | "game_over" | "win";

interface Entity { x: number; y: number; dir: Dir; }
interface PacState extends Entity { nextDir: Dir; mouth: number; mouthDir: 1 | -1; }
interface GhostState extends Entity {
  color: string; fright: number; dead: number; home: boolean; homeTimer: number;
}

const GHOST_COLORS = ["#FF0000", "#FFB8FF", "#00FFFF", "#FFB852"];
const PAC_SPEED    = 1.75;
const GHOST_SPEED  = 1.4;
const FRIGHT_SPD   = 0.9;
const FRIGHT_DUR   = 280;

const GHOST_HOME_COL = 13;
const GHOST_HOME_ROW = 14;
const PAC_START_COL  = 13;
const PAC_START_ROW  = 23;

const tileAt = (map: number[][], col: number, row: number): number => {
  if (row < 0 || row >= ROWS) return 2;
  if (col < 0) col += COLS;
  if (col >= COLS) col -= COLS;
  return map[row][col];
};

const isWall = (map: number[][], col: number, row: number): boolean =>
  tileAt(map, col, row) === 1;

const tileCX = (col: number) => col * CELL + CELL / 2;
const tileCY = (row: number) => row * CELL + CELL / 2;

const colOf = (px: number) => Math.floor(px / CELL);
const rowOf = (py: number) => Math.floor(py / CELL);

const TURN_TOL = PAC_SPEED * 3;
const aligned = (px: number): boolean => {
  const off = ((px % CELL) + CELL) % CELL;
  return Math.abs(off - CELL / 2) <= TURN_TOL;
};

const snap = (px: number): number => {
  const col = Math.round((px - CELL / 2) / CELL);
  return col * CELL + CELL / 2;
};

function canGo(map: number[][], px: number, py: number, d: Dir, spd = PAC_SPEED): boolean {
  const S = 4;
  if (d.x !== 0) {
    const fx      = px + d.x * (CELL / 2 + spd);
    const rowTop  = rowOf(py - CELL / 2 + S);
    const rowBot  = rowOf(py + CELL / 2 - S);
    return !isWall(map, colOf(fx), rowTop) && !isWall(map, colOf(fx), rowBot);
  } else {
    const fy      = py + d.y * (CELL / 2 + spd);
    const colLeft  = colOf(px - CELL / 2 + S);
    const colRight = colOf(px + CELL / 2 - S);
    return !isWall(map, colLeft, rowOf(fy)) && !isWall(map, colRight, rowOf(fy));
  }
}

function wrapPx(px: number): number {
  if (px < -CELL) return PW + CELL / 2;
  if (px > PW + CELL) return CELL / 2;
  return px;
}

const DIRS: Dir[] = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
const OPP = (d: Dir): Dir => ({ x: -d.x, y: -d.y });

function countPellets(map: number[][]): number {
  return map.flat().filter(v => v === 0 || v === 7).length;
}

function makePac(): PacState {
  return {
    x: tileCX(PAC_START_COL), y: tileCY(PAC_START_ROW),
    dir: { x: -1, y: 0 }, nextDir: { x: -1, y: 0 },
    mouth: 5, mouthDir: 1,
  };
}

function makeGhosts(): GhostState[] {
  return [
    { x: tileCX(13), y: tileCY(11), dir: { x: 1, y: 0 }, color: GHOST_COLORS[0], fright: 0, dead: 0, home: false, homeTimer: 0 },
    { x: tileCX(11), y: tileCY(14), dir: { x: 1, y: 0 }, color: GHOST_COLORS[1], fright: 0, dead: 0, home: true,  homeTimer: 60 },
    { x: tileCX(13), y: tileCY(14), dir: { x: 1, y: 0 }, color: GHOST_COLORS[2], fright: 0, dead: 0, home: true,  homeTimer: 120 },
    { x: tileCX(15), y: tileCY(14), dir: { x: -1, y: 0 }, color: GHOST_COLORS[3], fright: 0, dead: 0, home: true,  homeTimer: 200 },
  ];
}

function chooseGhostDir(g: GhostState, pac: PacState, map: number[][], idx: number): Dir {
  if (g.dead > 0) {
    const tx = tileCX(GHOST_HOME_COL), ty = tileCY(GHOST_HOME_ROW);
    const opts = DIRS.filter(d => canGo(map, g.x, g.y, d, GHOST_SPEED));
    if (opts.length === 0) return OPP(g.dir);
    return opts.reduce((b, d) => {
      const da = (g.x + d.x * CELL - tx) ** 2 + (g.y + d.y * CELL - ty) ** 2;
      const db = (g.x + b.x * CELL - tx) ** 2 + (g.y + b.y * CELL - ty) ** 2;
      return da < db ? d : b;
    });
  }
  if (g.fright > 0) {
    const opts = DIRS.filter(d =>
      !(d.x === -g.dir.x && d.y === -g.dir.y) &&
      canGo(map, g.x, g.y, d, FRIGHT_SPD)
    );
    return opts.length ? opts[Math.floor(Math.random() * opts.length)] : OPP(g.dir);
  }
  const targets: Dir[] = [
    { x: pac.x, y: pac.y },
    { x: pac.x + pac.dir.x * CELL * 2, y: pac.y + pac.dir.y * CELL * 2 },
    { x: pac.x + pac.dir.x * CELL * 4, y: pac.y + pac.dir.y * CELL * 4 },
    { x: PW * 0.75, y: PH * 0.9 },
  ];
  const t = targets[idx % 4];
  const opts = DIRS.filter(d =>
    !(d.x === -g.dir.x && d.y === -g.dir.y) &&
    canGo(map, g.x, g.y, d, GHOST_SPEED)
  );
  if (!opts.length) return OPP(g.dir);
  return opts.reduce((b, d) => {
    const da = (g.x + d.x * CELL - t.x) ** 2 + (g.y + d.y * CELL - t.y) ** 2;
    const db = (g.x + b.x * CELL - t.x) ** 2 + (g.y + b.y * CELL - t.y) ** 2;
    return da < db ? d : b;
  });
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  map: number[][],
  pac: PacState,
  ghosts: GhostState[],
  tick: number,
  phase: Phase,
  score: number
) {
  ctx.clearRect(0, 0, PW, PH);

  // Background
  ctx.fillStyle = "#03030a";
  ctx.fillRect(0, 0, PW, PH);

  // Maze Walls
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (map[r][c] === 1) {
        ctx.fillStyle = "rgba(33, 33, 222, 0.25)";
        ctx.fillRect(c * CELL, r * CELL, CELL, CELL);

        ctx.strokeStyle = "#2121DE";
        ctx.lineWidth = 1.5;
        if (r > 0 && map[r - 1][c] !== 1) {
          ctx.beginPath(); ctx.moveTo(c * CELL, r * CELL); ctx.lineTo((c + 1) * CELL, r * CELL); ctx.stroke();
        }
        if (r < ROWS - 1 && map[r + 1][c] !== 1) {
          ctx.beginPath(); ctx.moveTo(c * CELL, (r + 1) * CELL); ctx.lineTo((c + 1) * CELL, (r + 1) * CELL); ctx.stroke();
        }
        if (c > 0 && map[r][c - 1] !== 1) {
          ctx.beginPath(); ctx.moveTo(c * CELL, r * CELL); ctx.lineTo(c * CELL, (r + 1) * CELL); ctx.stroke();
        }
        if (c < COLS - 1 && map[r][c + 1] !== 1) {
          ctx.beginPath(); ctx.moveTo((c + 1) * CELL, r * CELL); ctx.lineTo((c + 1) * CELL, (r + 1) * CELL); ctx.stroke();
        }
      }
    }
  }

  // Dots & Pellets
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const val = map[r][c];
      if (val === 0) {
        ctx.fillStyle = "#ffb8ae";
        ctx.beginPath();
        ctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (val === 7) {
        if (Math.floor(tick / 12) % 2 === 0) {
          ctx.fillStyle = "#ffb8ae";
          ctx.beginPath();
          ctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // Pac-Man
  const startAng = (pac.dir.x === 1 ? 0 : pac.dir.x === -1 ? Math.PI : pac.dir.y === 1 ? Math.PI / 2 : -Math.PI / 2);
  const mRad = (pac.mouth * Math.PI) / 180;

  ctx.fillStyle = "#FFE135";
  ctx.beginPath();
  ctx.arc(pac.x, pac.y, CELL / 2 - 1, startAng + mRad, startAng + Math.PI * 2 - mRad);
  ctx.lineTo(pac.x, pac.y);
  ctx.fill();
  ctx.shadowColor = "#FFE135";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Ghosts
  ghosts.forEach(g => {
    const color = g.fright > 0 ? (g.fright < 60 && Math.floor(g.fright / 8) % 2 === 0 ? "#FFFFFF" : "#2121DE") : g.color;
    const r = CELL / 2 - 1;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(g.x, g.y - 2, r, Math.PI, 0);
    ctx.lineTo(g.x + r, g.y + r - 2);
    for (let i = 0; i < 3; i++) {
      const wx = g.x + r - (i * r * 2) / 3;
      ctx.quadraticCurveTo(wx - r / 6, g.y + r + 2, wx - r / 3, g.y + r - 2);
      ctx.quadraticCurveTo(wx - r / 2, g.y + r - 6, wx - (r * 2) / 3, g.y + r - 2);
    }
    ctx.closePath();
    ctx.fill();

    // Eyes
    if (g.fright === 0) {
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(g.x - 3, g.y - 3, 3, 0, Math.PI * 2);
      ctx.arc(g.x + 3, g.y - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0000FF";
      ctx.beginPath();
      ctx.arc(g.x - 3 + g.dir.x * 1.5, g.y - 3 + g.dir.y * 1.5, 1.5, 0, Math.PI * 2);
      ctx.arc(g.x + 3 + g.dir.x * 1.5, g.y - 3 + g.dir.y * 1.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Bottom Canvas Score Text
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "11px monospace";
  ctx.fillText(`SCORE: ${score}`, 12, PH - 10);
}

export function PacManGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState<number>(0);
  const [activeKey, setActiveKey] = useState<number | null>(null);

  const G = useRef({
    map: MAZE.map(r => [...r]),
    pac: makePac(),
    ghosts: makeGhosts(),
    eaten: 0,
    total: countPellets(MAZE),
    tick: 0,
    score: 0,
    phase: "idle" as Phase,
  });

  const startGame = useCallback(() => {
    const g = G.current;
    g.map = MAZE.map(r => [...r]);
    g.pac = makePac();
    g.ghosts = makeGhosts();
    g.eaten = 0;
    g.total = countPellets(MAZE);
    g.tick = 0;
    g.score = 0;
    g.phase = "playing";
    setPhase("playing");
    setScore(0);
  }, []);

  const endGame = useCallback(() => {
    const g = G.current;
    g.phase = "idle";
    setPhase("idle");
  }, []);

  const queueDir = useCallback((d: Dir, num: number) => {
    const g = G.current;
    g.pac.nextDir = d;
    setActiveKey(num);
    if (g.phase !== "playing") {
      startGame();
    }
  }, [startGame]);

  // Keyboard controls
  useEffect(() => {
    const MAP: Record<string, { d: Dir; num: number }> = {
      ArrowRight: { d: { x: 1, y: 0 }, num: 0 }, d: { d: { x: 1, y: 0 }, num: 0 }, D: { d: { x: 1, y: 0 }, num: 0 },
      ArrowDown:  { d: { x: 0, y: 1 }, num: 1 }, s: { d: { x: 0, y: 1 }, num: 1 }, S: { d: { x: 0, y: 1 }, num: 1 },
      ArrowLeft:  { d: { x: -1, y: 0 }, num: 2 }, a: { d: { x: -1, y: 0 }, num: 2 }, A: { d: { x: -1, y: 0 }, num: 2 },
      ArrowUp:    { d: { x: 0, y: -1 }, num: 3 }, w: { d: { x: 0, y: -1 }, num: 3 }, W: { d: { x: 0, y: -1 }, num: 3 },
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const match = MAP[e.key];
      if (match) {
        e.preventDefault();
        queueDir(match.d, match.num);
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [queueDir]);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const loop = (ts: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (ts - lastRef.current < 1000 / 60) return;
      lastRef.current = ts;

      const g = G.current;
      g.tick++;

      // ── IDLE Phase ──
      if (g.phase === "idle") {
        drawScene(ctx, MAZE, makePac(), [], g.tick, "idle", 0);
        return;
      }

      // ── GAME OVER Phase ──
      if (g.phase === "game_over") {
        drawScene(ctx, g.map, g.pac, g.ghosts, g.tick, "game_over", g.score);
        return;
      }

      // ── WIN Phase ──
      if (g.phase === "win") {
        drawScene(ctx, g.map, g.pac, g.ghosts, g.tick, "win", g.score);
        return;
      }

      // ── PLAYING Phase ──
      const p = g.pac;
      const nd = p.nextDir;

      // Turn Pac-Man when aligned to grid tile center
      if (aligned(p.x) && aligned(p.y)) {
        if (canGo(g.map, p.x, p.y, nd, PAC_SPEED)) {
          if (nd.x !== p.dir.x || nd.y !== p.dir.y) {
            p.x = snap(p.x);
            p.y = snap(p.y);
          }
          p.dir = { ...nd };
        }
      }

      // Move Pac-Man forward
      if (canGo(g.map, p.x, p.y, p.dir, PAC_SPEED)) {
        p.x += p.dir.x * PAC_SPEED;
        p.y += p.dir.y * PAC_SPEED;
        p.x = wrapPx(p.x);
      } else {
        p.x = snap(p.x);
        p.y = snap(p.y);
      }

      // Mouth animation
      p.mouth += p.mouthDir * 4;
      if (p.mouth >= 42) p.mouthDir = -1;
      if (p.mouth <= 2)  p.mouthDir = 1;

      // Eat pellets & power dots
      const pc = colOf(p.x), pr = rowOf(p.y);
      if (pc >= 0 && pc < COLS && pr >= 0 && pr < ROWS) {
        const tv = g.map[pr][pc];
        if (tv === 0) {
          g.map[pr][pc] = 2; g.score += 10; g.eaten++;
          setScore(g.score);
        } else if (tv === 7) {
          g.map[pr][pc] = 2; g.score += 50; g.eaten++;
          setScore(g.score);
          g.ghosts.forEach(gh => { gh.fright = FRIGHT_DUR; });
        }
      }

      // Win check
      if (g.eaten >= g.total) {
        g.phase = "win";
        setPhase("win");
      }

      // Update Ghosts
      g.ghosts.forEach((gh, idx) => {
        if (gh.home) {
          gh.homeTimer--;
          if (gh.homeTimer <= 0) {
            gh.home = false;
            gh.x = tileCX(GHOST_HOME_COL); gh.y = tileCY(GHOST_HOME_ROW);
            gh.dir = { x: 0, y: -1 };
          }
          return;
        }

        if (gh.fright > 0) gh.fright--;

        const spd = gh.fright > 0 ? FRIGHT_SPD : GHOST_SPEED;

        if (aligned(gh.x) && aligned(gh.y)) {
          const newDir = chooseGhostDir(gh, p, g.map, idx);
          if (newDir.x !== gh.dir.x || newDir.y !== gh.dir.y) {
            gh.x = snap(gh.x); gh.y = snap(gh.y);
          }
          gh.dir = newDir;
        }

        if (canGo(g.map, gh.x, gh.y, gh.dir, spd)) {
          gh.x += gh.dir.x * spd; gh.y += gh.dir.y * spd; gh.x = wrapPx(gh.x);
        } else {
          gh.x = snap(gh.x); gh.y = snap(gh.y);
          const opts = DIRS.filter(d =>
            !(d.x === -gh.dir.x && d.y === -gh.dir.y) &&
            canGo(g.map, gh.x, gh.y, d, spd)
          );
          if (opts.length) gh.dir = opts[Math.floor(Math.random() * opts.length)];
        }

        // Collision with Pac-Man
        if (g.phase !== "playing") return;
        if (Math.hypot(gh.x - p.x, gh.y - p.y) < CELL * 0.75) {
          if (gh.fright > 0) {
            gh.fright = 0;
            gh.x = tileCX(GHOST_HOME_COL); gh.y = tileCY(GHOST_HOME_ROW);
            g.score += 200; setScore(g.score);
          } else {
            g.phase = "game_over";
            setPhase("game_over");
          }
        }
      });

      drawScene(ctx, g.map, g.pac, g.ghosts, g.tick, g.phase, g.score);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Game Canvas Container with Overlays */}
      <div className="relative w-full overflow-hidden rounded border border-retro-yellow/30 bg-black/90 shadow-inner flex justify-center items-center">
        <canvas
          ref={canvasRef}
          width={PW}
          height={PH}
          className="w-full h-auto max-h-[300px] object-contain focus:outline-none"
          tabIndex={0}
          style={{ imageRendering: "pixelated" }}
        />

        {/* Start Overlay */}
        {phase === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/75 backdrop-blur-xs p-4">
            <p className="font-pixel text-retro-yellow text-sm tracking-widest animate-pulse">
              PAC-MAN ARCADE
            </p>
            <button
              onClick={startGame}
              className="font-pixel text-xs px-5 py-2.5 bg-retro-yellow hover:bg-yellow-300 text-black rounded font-bold transition-all shadow-[0_0_12px_rgba(255,225,53,0.5)] active:scale-95 cursor-pointer"
            >
              ▶ START GAME
            </button>
            <p className="font-pixel text-retro-cyan/70 text-[9px] tracking-wider text-center">
              USE WASD / ARROW KEYS OR ON-SCREEN D-PAD
            </p>
          </div>
        )}

        {/* Game Over Overlay */}
        {phase === "game_over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/85 backdrop-blur-xs p-4">
            <p className="font-pixel text-red-500 text-base tracking-widest animate-pulse">
              GAME OVER
            </p>
            <p className="font-pixel text-white text-xs">FINAL SCORE: {score}</p>
            <button
              onClick={startGame}
              className="font-pixel text-xs px-5 py-2.5 bg-retro-yellow hover:bg-yellow-300 text-black rounded font-bold transition-all active:scale-95 cursor-pointer"
            >
              ▶ PLAY AGAIN
            </button>
          </div>
        )}

        {/* Victory Overlay */}
        {phase === "win" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/85 backdrop-blur-xs p-4">
            <p className="font-pixel text-retro-green text-base tracking-widest animate-pulse">
              YOU WIN!
            </p>
            <p className="font-pixel text-white text-xs">FINAL SCORE: {score}</p>
            <button
              onClick={startGame}
              className="font-pixel text-xs px-5 py-2.5 bg-retro-yellow hover:bg-yellow-300 text-black rounded font-bold transition-all active:scale-95 cursor-pointer"
            >
              ▶ PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Control Console Footer: Start/End Buttons & D-Pad */}
      <div className="w-full flex flex-col gap-2.5 pt-1 border-t border-retro-blue/30">
        {/* Action Buttons & Score Row */}
        <div className="w-full flex items-center justify-between gap-2 px-1 font-pixel text-xs">
          <div className="flex items-center gap-2">
            {/* START Button */}
            <button
              onClick={startGame}
              className="px-3 py-1.5 bg-retro-green/20 hover:bg-retro-green/30 text-retro-green border border-retro-green/60 rounded text-[11px] font-bold tracking-wider transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-[0_0_8px_rgba(57,255,20,0.2)]"
            >
              <span>▶</span> START
            </button>

            {/* END Button */}
            <button
              onClick={endGame}
              disabled={phase === "idle"}
              className={`px-3 py-1.5 border rounded text-[11px] font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                phase === "idle"
                  ? "bg-neutral-800/40 text-neutral-500 border-neutral-700/50 cursor-not-allowed opacity-50"
                  : "bg-retro-pink/20 hover:bg-retro-pink/30 text-retro-pink border-retro-pink/60 active:scale-95 cursor-pointer shadow-[0_0_8px_rgba(255,105,180,0.2)]"
              }`}
            >
              <span>⏹</span> END
            </button>
          </div>

          {/* Score display */}
          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 border border-retro-yellow/30 rounded text-[11px]">
            <span className="text-neutral-400">SCORE:</span>
            <span className="text-retro-yellow font-bold">{score}</span>
          </div>
        </div>

        {/* D-Pad Directional Controls */}
        <div className="w-full flex items-center justify-between bg-black/40 p-2 border border-retro-cyan/20 rounded">
          {/* Controls Label */}
          <div className="flex flex-col gap-0.5 font-pixel text-[9px] text-retro-cyan/70">
            <span>[D-PAD CONTROLS]</span>
            <span className="text-[8px] text-neutral-400">WASD / ARROW KEYS</span>
          </div>

          {/* Directional Buttons Cross */}
          <div className="flex flex-col items-center gap-1">
            {/* UP (3) */}
            <button
              onPointerDown={() => queueDir({ x: 0, y: -1 }, 3)}
              onPointerUp={() => setActiveKey(null)}
              className={`w-9 h-8 rounded border flex items-center justify-center font-pixel text-xs transition-all touch-none cursor-pointer ${
                activeKey === 3
                  ? "bg-retro-cyan text-black border-retro-cyan shadow-[0_0_10px_#00FFFF] scale-95"
                  : "bg-black/60 text-retro-cyan border-retro-cyan/40 hover:bg-retro-cyan/20 hover:border-retro-cyan"
              }`}
              title="Move Up"
            >
              ▲
            </button>
            <div className="flex gap-1">
              {/* LEFT (2) */}
              <button
                onPointerDown={() => queueDir({ x: -1, y: 0 }, 2)}
                onPointerUp={() => setActiveKey(null)}
                className={`w-9 h-8 rounded border flex items-center justify-center font-pixel text-xs transition-all touch-none cursor-pointer ${
                  activeKey === 2
                    ? "bg-retro-cyan text-black border-retro-cyan shadow-[0_0_10px_#00FFFF] scale-95"
                    : "bg-black/60 text-retro-cyan border-retro-cyan/40 hover:bg-retro-cyan/20 hover:border-retro-cyan"
                }`}
                title="Move Left"
              >
                ◄
              </button>
              {/* DOWN (1) */}
              <button
                onPointerDown={() => queueDir({ x: 0, y: 1 }, 1)}
                onPointerUp={() => setActiveKey(null)}
                className={`w-9 h-8 rounded border flex items-center justify-center font-pixel text-xs transition-all touch-none cursor-pointer ${
                  activeKey === 1
                    ? "bg-retro-cyan text-black border-retro-cyan shadow-[0_0_10px_#00FFFF] scale-95"
                    : "bg-black/60 text-retro-cyan border-retro-cyan/40 hover:bg-retro-cyan/20 hover:border-retro-cyan"
                }`}
                title="Move Down"
              >
                ▼
              </button>
              {/* RIGHT (0) */}
              <button
                onPointerDown={() => queueDir({ x: 1, y: 0 }, 0)}
                onPointerUp={() => setActiveKey(null)}
                className={`w-9 h-8 rounded border flex items-center justify-center font-pixel text-xs transition-all touch-none cursor-pointer ${
                  activeKey === 0
                    ? "bg-retro-cyan text-black border-retro-cyan shadow-[0_0_10px_#00FFFF] scale-95"
                    : "bg-black/60 text-retro-cyan border-retro-cyan/40 hover:bg-retro-cyan/20 hover:border-retro-cyan"
                }`}
                title="Move Right"
              >
                ►
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
