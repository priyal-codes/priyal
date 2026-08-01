"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Maze ─────────────────────────────────────────────────────────────────────
// Each row MUST be 28 cells wide. 1=wall 0=dot 7=power-pellet 2=empty
// This is the classic Pac-Man maze layout (28×31)
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

// ─── Types ────────────────────────────────────────────────────────────────────
type Dir = { x: number; y: number };
type Phase = "idle" | "ready" | "playing" | "dying" | "win" | "over";

interface Entity { x: number; y: number; dir: Dir; }
interface PacState extends Entity { nextDir: Dir; mouth: number; mouthDir: 1 | -1; }
interface GhostState extends Entity {
  color: string; fright: number; dead: number; home: boolean; homeTimer: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const GHOST_COLORS = ["#FF0000", "#FFB8FF", "#00FFFF", "#FFAA00"];
const PAC_SPEED    = 1.75;
const GHOST_SPEED  = 1.4;
const FRIGHT_SPD   = 0.9;
const FRIGHT_DUR   = 280; // ticks
const READY_TICKS  = 120;
const DEATH_TICKS  = 90;

// Ghost house exit col/row
const GHOST_HOME_COL = 13;
const GHOST_HOME_ROW = 14;
const PAC_START_COL  = 13;
const PAC_START_ROW  = 23;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const tileAt = (map: number[][], col: number, row: number): number => {
  if (row < 0 || row >= ROWS) return 2; // tunnel
  if (col < 0) col += COLS;
  if (col >= COLS) col -= COLS;
  return map[row][col];
};

const isWall = (map: number[][], col: number, row: number): boolean =>
  tileAt(map, col, row) === 1;

// Pixel center of a tile
const tileCX = (col: number) => col * CELL + CELL / 2;
const tileCY = (row: number) => row * CELL + CELL / 2;

// Tile indices from pixel center
const colOf = (px: number) => Math.floor(px / CELL);
const rowOf = (py: number) => Math.floor(py / CELL);

// Is a pixel coordinate snapped to a tile center (within tolerance)?
const TURN_TOL = PAC_SPEED * 3;
const aligned = (px: number): boolean => {
  const off = ((px % CELL) + CELL) % CELL; // 0..CELL
  return Math.abs(off - CELL / 2) <= TURN_TOL;
};

// Snap to nearest tile center
const snap = (px: number): number => {
  const col = Math.round((px - CELL / 2) / CELL);
  return col * CELL + CELL / 2;
};

// Can entity at pixel center (px,py) take a step of `spd` in direction d?
// Uses a shrunken hitbox (S px) so Pac-Man fits through corridors cleanly.
function canGo(map: number[][], px: number, py: number, d: Dir, spd = PAC_SPEED, _r = 0): boolean {
  const S = 4; // hitbox shrink — smaller = more forgiving corners
  if (d.x !== 0) {
    const fx      = px + d.x * (CELL / 2 + spd); // leading edge x after step
    const rowTop  = rowOf(py - CELL / 2 + S);
    const rowBot  = rowOf(py + CELL / 2 - S);
    return !isWall(map, colOf(fx), rowTop) && !isWall(map, colOf(fx), rowBot);
  } else {
    const fy      = py + d.y * (CELL / 2 + spd); // leading edge y after step
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

const DIRS: Dir[] = [{ x:1,y:0 },{ x:-1,y:0 },{ x:0,y:1 },{ x:0,y:-1 }];
const OPP = (d: Dir): Dir => ({ x: -d.x, y: -d.y });

function countPellets(map: number[][]): number {
  return map.flat().filter(v => v === 0 || v === 7).length;
}

// ─── Initial state builders ───────────────────────────────────────────────────
function makePac(): PacState {
  return {
    x: tileCX(PAC_START_COL), y: tileCY(PAC_START_ROW),
    dir: { x: -1, y: 0 }, nextDir: { x: -1, y: 0 },
    mouth: 5, mouthDir: 1,
  };
}

function makeGhosts(): GhostState[] {
  return [
    { x: tileCX(13), y: tileCY(11), dir: { x:1, y:0 }, color: GHOST_COLORS[0], fright:0, dead:0, home:false, homeTimer:0 },
    { x: tileCX(11), y: tileCY(14), dir: { x:1, y:0 }, color: GHOST_COLORS[1], fright:0, dead:0, home:true,  homeTimer:60 },
    { x: tileCX(13), y: tileCY(14), dir: { x:1, y:0 }, color: GHOST_COLORS[2], fright:0, dead:0, home:true,  homeTimer:120 },
    { x: tileCX(15), y: tileCY(14), dir: { x:-1,y:0 }, color: GHOST_COLORS[3], fright:0, dead:0, home:true,  homeTimer:200 },
  ];
}

// ─── Ghost AI ─────────────────────────────────────────────────────────────────
function chooseGhostDir(g: GhostState, pac: PacState, map: number[][], idx: number): Dir {
  if (g.dead > 0) {
    // Head home
    const tx = tileCX(GHOST_HOME_COL), ty = tileCY(GHOST_HOME_ROW);
    const opts = DIRS.filter(d => canGo(map, g.x, g.y, d, GHOST_SPEED, 5));
    if (opts.length === 0) return OPP(g.dir);
    return opts.reduce((b, d) => {
      const da = (g.x+d.x*CELL-tx)**2+(g.y+d.y*CELL-ty)**2;
      const db = (g.x+b.x*CELL-tx)**2+(g.y+b.y*CELL-ty)**2;
      return da < db ? d : b;
    });
  }
  if (g.fright > 0) {
    const opts = DIRS.filter(d =>
      !(d.x === -g.dir.x && d.y === -g.dir.y) &&
      canGo(map, g.x, g.y, d, FRIGHT_SPD, 5)
    );
    return opts.length ? opts[Math.floor(Math.random() * opts.length)] : OPP(g.dir);
  }
  // Chase targets per ghost
  const targets: Dir[] = [
    { x: pac.x,                          y: pac.y },
    { x: pac.x + pac.dir.x*CELL*2,       y: pac.y + pac.dir.y*CELL*2 },
    { x: pac.x + pac.dir.x*CELL*4,       y: pac.y + pac.dir.y*CELL*4 },
    { x: PW*0.75,                         y: PH*0.9 },
  ];
  const t = targets[idx % 4];
  const opts = DIRS.filter(d =>
    !(d.x === -g.dir.x && d.y === -g.dir.y) &&
    canGo(map, g.x, g.y, d, GHOST_SPEED, 5)
  );
  if (!opts.length) return OPP(g.dir);
  return opts.reduce((b, d) => {
    const da = (g.x+d.x*CELL-t.x)**2+(g.y+d.y*CELL-t.y)**2;
    const db = (g.x+b.x*CELL-t.x)**2+(g.y+b.y*CELL-t.y)**2;
    return da < db ? d : b;
  });
}

// ─── Canvas drawing ───────────────────────────────────────────────────────────
function drawScene(
  ctx: CanvasRenderingContext2D,
  map: number[][],
  pac: PacState,
  ghosts: GhostState[],
  tick: number,
  phase: Phase,
  score: number,
  lives: number
) {
  // Background
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, PW, PH);

  // Maze tiles
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const v = map[r][c];
      const x = c * CELL, y = r * CELL;
      if (v === 1) {
        ctx.fillStyle = "#1a1aff";
        ctx.fillRect(x, y, CELL, CELL);
        ctx.strokeStyle = "#4444ff";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
      } else if (v === 0) {
        ctx.fillStyle = "#ffb897";
        ctx.beginPath();
        ctx.arc(x + CELL/2, y + CELL/2, 2.5, 0, Math.PI*2);
        ctx.fill();
      } else if (v === 7) {
        const pulse = 0.5 + 0.5 * Math.sin(tick * 0.12);
        ctx.fillStyle = `rgba(255, 100, 255, ${pulse})`;
        ctx.beginPath();
        ctx.arc(x + CELL/2, y + CELL/2, 6, 0, Math.PI*2);
        ctx.fill();
      }
    }
  }

  // Ghosts
  for (const g of ghosts) {
    if (g.home && g.homeTimer > 0) continue;
    const gx = g.x, gy = g.y;
    const r = CELL/2 - 1;

    if (g.dead > 0) {
      // Only eyes
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(gx-4, gy-3, 3.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(gx+4, gy-3, 3.5, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#00f";
      ctx.beginPath(); ctx.arc(gx-3+g.dir.x*2, gy-3+g.dir.y*2, 2, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(gx+5+g.dir.x*2, gy-3+g.dir.y*2, 2, 0, Math.PI*2); ctx.fill();
      continue;
    }

    let col = g.color;
    if (g.fright > 0) {
      col = (g.fright < 80 && Math.floor(tick/8)%2===0) ? "#fff" : "#0000bb";
    }

    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(gx, gy - r*0.1, r, Math.PI, 0);
    ctx.lineTo(gx + r, gy + r*0.9);
    for (let i = 0; i < 3; i++) {
      const wx = gx + r - (2*r/3)*(i+0.5);
      ctx.quadraticCurveTo(wx + r/3*0.5, gy+r*0.9+(i%2===0?-4:4), wx, gy+r*0.9);
    }
    ctx.lineTo(gx - r, gy + r*0.9);
    ctx.closePath();
    ctx.fill();

    if (g.fright === 0) {
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(gx-4, gy-3, 4, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(gx+4, gy-3, 4, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#00f";
      ctx.beginPath(); ctx.arc(gx-3+g.dir.x*2, gy-3+g.dir.y*2, 2, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(gx+5+g.dir.x*2, gy-3+g.dir.y*2, 2, 0, Math.PI*2); ctx.fill();
    }
  }

  // Pac-Man (skip draw during dying flash)
  if (phase !== "dying" || Math.floor(tick/6)%2===0) {
    const a  = Math.atan2(pac.dir.y, pac.dir.x);
    const mo = (pac.mouth * Math.PI) / 180;
    ctx.fillStyle = "#ffe000";
    ctx.shadowColor = "#ffe000";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(pac.x, pac.y);
    ctx.arc(pac.x, pac.y, CELL/2 - 1, a + mo, a + Math.PI*2 - mo);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Score & lives strip at bottom
  ctx.fillStyle = "#000";
  ctx.fillRect(0, PH - CELL + 2, PW, CELL - 2);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 11px monospace";
  ctx.fillText(`SCORE: ${score}`, 8, PH - 4);
  // Life icons
  for (let i = 0; i < lives; i++) {
    const lx = PW - 20 - i*18, ly = PH - CELL/2 + 2;
    ctx.fillStyle = "#ffe000";
    ctx.beginPath(); ctx.moveTo(lx, ly);
    ctx.arc(lx, ly, 6, 0.35, Math.PI*2-0.35);
    ctx.closePath(); ctx.fill();
  }

  // Ready / overlay text
  if (phase === "ready") {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, CELL*12, PW, CELL*4);
    ctx.fillStyle = "#ff0";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText("READY!", PW/2, CELL*15);
    ctx.textAlign = "left";
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export const PacManGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // All mutable game state lives in a single ref — no stale closure issues
  const G = useRef({
    phase:      "idle" as Phase,
    map:        MAZE.map(r => [...r]),
    pac:        makePac(),
    ghosts:     makeGhosts(),
    score:      0,
    lives:      3,
    total:      countPellets(MAZE),
    eaten:      0,
    tick:       0,
    phaseTimer: 0,
  });

  const rafRef  = useRef(0);
  const lastRef = useRef(0);

  // React state only drives overlay rendering
  const [uiPhase, setUiPhase] = useState<Phase>("idle");
  const [uiScore, setUiScore] = useState(0);
  const [uiLives, setUiLives] = useState(3);

  // ── Reset helpers ────────────────────────────────────────────────────────
  const resetLevel = useCallback((fresh: boolean) => {
    const g = G.current;
    g.map    = MAZE.map(r => [...r]);
    g.pac    = makePac();
    g.ghosts = makeGhosts();
    g.eaten  = 0;
    g.total  = countPellets(MAZE);
    g.tick   = 0;
    if (fresh) { g.score = 0; g.lives = 3; }
    g.phase  = "ready";
    g.phaseTimer = READY_TICKS;
    setUiPhase("ready");
    setUiScore(g.score);
    setUiLives(g.lives);
  }, []);

  const startGame = useCallback(() => { resetLevel(true); }, [resetLevel]);

  const endGame = useCallback(() => {
    const g = G.current;
    g.phase = "idle";
    setUiPhase("idle");
  }, []);

  // ── Direction input ──────────────────────────────────────────────────────
  const queueDir = useCallback((d: Dir) => {
    const g = G.current;
    g.pac.nextDir = d;
    if (g.phase === "idle") startGame();
  }, [startGame]);

  // ── Keyboard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const MAP: Record<string, Dir> = {
      ArrowUp:{x:0,y:-1}, w:{x:0,y:-1}, W:{x:0,y:-1},
      ArrowDown:{x:0,y:1}, s:{x:0,y:1}, S:{x:0,y:1},
      ArrowLeft:{x:-1,y:0}, a:{x:-1,y:0}, A:{x:-1,y:0},
      ArrowRight:{x:1,y:0}, d:{x:1,y:0}, D:{x:1,y:0},
    };
    const h = (e: KeyboardEvent) => {
      const dir = MAP[e.key];
      if (!dir) return;
      e.preventDefault();
      queueDir(dir);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [queueDir]);

  // ── Game loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const loop = (ts: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (ts - lastRef.current < 1000 / 62) return;
      lastRef.current = ts;

      const g = G.current;
      g.tick++;

      // ── Idle: just draw static maze ──────────────────────────────────────
      if (g.phase === "idle") {
        drawScene(ctx, MAZE, makePac(), [], g.tick, "idle", 0, 3);
        return;
      }

      // ── Ready countdown ──────────────────────────────────────────────────
      if (g.phase === "ready") {
        drawScene(ctx, g.map, g.pac, g.ghosts, g.tick, "ready", g.score, g.lives);
        g.phaseTimer--;
        if (g.phaseTimer <= 0) {
          g.phase = "playing";
          setUiPhase("playing");
        }
        return;
      }

      // ── Dying animation ──────────────────────────────────────────────────
      if (g.phase === "dying") {
        drawScene(ctx, g.map, g.pac, g.ghosts, g.tick, "dying", g.score, g.lives);
        g.phaseTimer--;
        if (g.phaseTimer <= 0) {
          g.lives--;
          setUiLives(g.lives);
          if (g.lives <= 0) {
            g.phase = "over";
            setUiPhase("over");
          } else {
            resetLevel(false);
          }
        }
        return;
      }

      // ── Win flash ────────────────────────────────────────────────────────
      if (g.phase === "win") {
        const flash = Math.floor(g.tick / 10) % 2 === 0;
        if (flash) {
          ctx.fillStyle = "#000"; ctx.fillRect(0, 0, PW, PH);
          // draw flashing maze borders
          ctx.strokeStyle = "#0ff"; ctx.lineWidth = 3;
          ctx.strokeRect(2, 2, PW-4, PH-4);
        } else {
          drawScene(ctx, g.map, g.pac, g.ghosts, g.tick, "win", g.score, g.lives);
        }
        g.phaseTimer--;
        if (g.phaseTimer <= 0) resetLevel(false);
        return;
      }

      if (g.phase === "over") {
        drawScene(ctx, g.map, g.pac, g.ghosts, g.tick, "over", g.score, g.lives);
        return;
      }

      // ── PLAYING ──────────────────────────────────────────────────────────
      const p  = g.pac;
      const nd = p.nextDir;

      // Try queued direction when aligned to grid
      if (aligned(p.x) && aligned(p.y)) {
        if (canGo(g.map, p.x, p.y, nd, PAC_SPEED)) {
          // Snap to exact center before turning so there's no drift
          if (nd.x !== p.dir.x || nd.y !== p.dir.y) {
            p.x = snap(p.x);
            p.y = snap(p.y);
          }
          p.dir = { ...nd };
        }
      }

      // Move in current direction
      if (canGo(g.map, p.x, p.y, p.dir, PAC_SPEED)) {
        p.x += p.dir.x * PAC_SPEED;
        p.y += p.dir.y * PAC_SPEED;
        p.x = wrapPx(p.x);
      } else {
        // Snap to tile center when blocked so future turns register cleanly
        p.x = snap(p.x);
        p.y = snap(p.y);
      }

      // Mouth chomping
      p.mouth += p.mouthDir * 4;
      if (p.mouth >= 42) p.mouthDir = -1;
      if (p.mouth <= 2)  p.mouthDir =  1;

      // Eat pellet
      const pc = colOf(p.x), pr = rowOf(p.y);
      if (pc >= 0 && pc < COLS && pr >= 0 && pr < ROWS) {
        const tv = g.map[pr][pc];
        if (tv === 0) {
          g.map[pr][pc] = 2; g.score += 10; g.eaten++;
          setUiScore(g.score);
        } else if (tv === 7) {
          g.map[pr][pc] = 2; g.score += 50; g.eaten++;
          setUiScore(g.score);
          g.ghosts.forEach(gh => { gh.fright = FRIGHT_DUR; });
        }
      }

      // Win check
      if (g.eaten >= g.total) {
        g.phase = "win"; setUiPhase("win"); g.phaseTimer = 160;
      }

      // Ghost logic
      g.ghosts.forEach((gh, idx) => {
        // Home timer — stagger ghost release
        if (gh.home) {
          gh.homeTimer--;
          if (gh.homeTimer <= 0) {
            gh.home = false;
            gh.x = tileCX(GHOST_HOME_COL); gh.y = tileCY(GHOST_HOME_ROW);
            gh.dir = { x: 0, y: -1 };
          }
          return;
        }

        if (gh.dead > 0) {
          gh.dead--;
          if (gh.dead === 0) { gh.x = tileCX(13); gh.y = tileCY(11); gh.dir = { x:1,y:0 }; }
          // Move towards home
          const spd = GHOST_SPEED * 2;
          if (aligned(gh.x) && aligned(gh.y)) gh.dir = chooseGhostDir(gh, p, g.map, idx);
          if (canGo(g.map, gh.x, gh.y, gh.dir, spd, 5)) {
            gh.x += gh.dir.x * spd; gh.y += gh.dir.y * spd; gh.x = wrapPx(gh.x);
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

        if (canGo(g.map, gh.x, gh.y, gh.dir, spd, 5)) {
          gh.x += gh.dir.x * spd; gh.y += gh.dir.y * spd; gh.x = wrapPx(gh.x);
        } else {
          gh.x = snap(gh.x); gh.y = snap(gh.y);
          // Unstick: pick any valid dir
          const opts = DIRS.filter(d =>
            !(d.x === -gh.dir.x && d.y === -gh.dir.y) &&
            canGo(g.map, gh.x, gh.y, d, spd, 5)
          );
          if (opts.length) gh.dir = opts[Math.floor(Math.random()*opts.length)];
        }

        // Collision
        if (g.phase !== "playing") return;
        if (Math.hypot(gh.x - p.x, gh.y - p.y) < CELL * 0.75) {
          if (gh.fright > 0) {
            gh.fright = 0; gh.dead = 120;
            g.score += 200; setUiScore(g.score);
          } else {
            g.phase = "dying"; setUiPhase("dying"); g.phaseTimer = DEATH_TICKS;
          }
        }
      });

      drawScene(ctx, g.map, g.pac, g.ghosts, g.tick, g.phase, g.score, g.lives);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // mount-once intentional

  // ─── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="bg-black border-2 border-cyan-400 rounded-lg overflow-hidden"
        style={{ boxShadow: "0 0 24px rgba(0,200,255,0.4)" }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-black border-b border-cyan-400/60">
          <span className="font-pixel text-cyan-400 text-[8px] tracking-widest">↑ PAC-MAN ARCADE</span>
          <span className="font-pixel text-yellow-300 text-[8px] tracking-widest">● PLAYABLE</span>
        </div>

        {/* Canvas wrapper */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={PW}
            height={PH}
            className="block"
            style={{ imageRendering: "pixelated", maxWidth: "100%" }}
          />

          {/* START overlay */}
          {uiPhase === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/70">
              <p className="font-pixel text-yellow-300 text-xs tracking-widest animate-pulse">PAC-MAN</p>
              <div className="flex gap-1.5 text-lg">
                <span>👻</span><span>👻</span><span>👻</span><span>👻</span>
              </div>
              <button
                onClick={startGame}
                className="font-pixel text-[10px] px-7 py-3 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-black rounded-sm transition-all cursor-pointer"
              >
                ▶ START GAME
              </button>
              <p className="font-pixel text-cyan-400/70 text-[7px] tracking-wider">WASD / ARROW KEYS / D-PAD</p>
            </div>
          )}

          {/* GAME OVER overlay */}
          {uiPhase === "over" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/80">
              <p className="font-pixel text-red-500 text-sm tracking-widest animate-pulse">GAME OVER</p>
              <p className="font-pixel text-white text-[10px]">SCORE: {uiScore}</p>
              <button
                onClick={startGame}
                className="font-pixel text-[10px] px-7 py-3 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-black rounded-sm transition-all cursor-pointer"
              >
                ▶ PLAY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Score + lives + action buttons bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-black border-t border-cyan-400/30">
          <div className="flex items-center gap-2">
            <button
              onClick={startGame}
              className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/50 rounded font-pixel text-[8px] tracking-wider cursor-pointer active:scale-95 flex items-center gap-1"
            >
              ▶ START
            </button>
            <button
              onClick={endGame}
              disabled={uiPhase === "idle"}
              className={`px-2.5 py-1 rounded font-pixel text-[8px] tracking-wider flex items-center gap-1 ${
                uiPhase === "idle"
                  ? "bg-neutral-800/40 text-neutral-600 border border-neutral-700/40 cursor-not-allowed opacity-50"
                  : "bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/50 cursor-pointer active:scale-95"
              }`}
            >
              ⏹ END
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-neutral-500 text-[7px]">SCORE</span>
              <span className="font-pixel text-yellow-400 text-[10px]">{uiScore}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-neutral-500 text-[7px]">LIVES</span>
              {Array.from({ length: Math.max(0, uiLives) }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-[11px] leading-none">●</span>
              ))}
            </div>
          </div>
        </div>

        {/* D-pad — always visible */}
        <div className="bg-black border-t border-cyan-400/20 px-4 py-3 flex flex-col items-center gap-1.5">
          <button
            onPointerDown={() => queueDir({ x:0, y:-1 })}
            className="w-12 h-10 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 border border-white/15 rounded text-white text-base flex items-center justify-center touch-none cursor-pointer"
          >▲</button>
          <div className="flex gap-1.5">
            <button onPointerDown={() => queueDir({ x:-1, y:0 })} className="w-12 h-10 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 border border-white/15 rounded text-white text-base flex items-center justify-center touch-none cursor-pointer">◄</button>
            <button onPointerDown={() => queueDir({ x:0,  y:1 })} className="w-12 h-10 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 border border-white/15 rounded text-white text-base flex items-center justify-center touch-none cursor-pointer">▼</button>
            <button onPointerDown={() => queueDir({ x:1,  y:0 })} className="w-12 h-10 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 border border-white/15 rounded text-white text-base flex items-center justify-center touch-none cursor-pointer">►</button>
          </div>
          <p className="font-pixel text-cyan-400/40 text-[7px] tracking-widest mt-0.5">
            [CONTROLS: WASD / ARROWS]&nbsp;RETRO ARCADE v3
          </p>
        </div>
      </div>
    </div>
  );
};
