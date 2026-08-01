"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CardTile } from "./types";
import { ICON_POOL } from "./constants";
import { GoBackButton } from "./_components/GoBackButton";
import { GameHeader } from "./_components/GameHeader";
import { GameStats } from "./_components/GameStats";
import { TileGrid } from "./_components/TileGrid";
import { VictoryModal } from "./_components/VictoryModal";
import { PacManGame } from "./_components/PacManGame";

type ActiveGame = "memory" | "pacman";

export const NotFoundGame: React.FC = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>("memory");

  // ── Memory match state ──────────────────────────────────────────────────────
  const [tiles, setTiles] = useState<CardTile[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const initializeGame = useCallback(() => {
    const cards: CardTile[] = [];
    ICON_POOL.forEach((iconData) => {
      cards.push({ instanceId: `${iconData.id}-1-${Math.random()}`, pairId: iconData.id, iconData });
      cards.push({ instanceId: `${iconData.id}-2-${Math.random()}`, pairId: iconData.id, iconData });
    });
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    setTiles(cards);
    setFlippedIndices([]);
    setMatchedIndices(new Set());
    setMoves(0);
    setTimeSeconds(0);
    setIsChecking(false);
    setIsGameActive(false);
    setIsCompleted(false);
  }, []);

  useEffect(() => { initializeGame(); }, [initializeGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGameActive && !isCompleted) {
      interval = setInterval(() => setTimeSeconds((p) => p + 1), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isGameActive, isCompleted]);

  const handleStart = () => setIsGameActive(true);

  const handleTileClick = (index: number) => {
    if (!isGameActive || isChecking || isCompleted) return;
    if (matchedIndices.has(index) || flippedIndices.includes(index)) return;
    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else if (flippedIndices.length === 1) {
      const first = flippedIndices[0];
      setFlippedIndices([first, index]);
      setMoves((p) => p + 1);
      setIsChecking(true);
      if (tiles[first].pairId === tiles[index].pairId) {
        setTimeout(() => {
          setMatchedIndices((prev) => {
            const next = new Set(prev);
            next.add(first); next.add(index);
            if (next.size === 20) { setIsCompleted(true); setIsGameActive(false); }
            return next;
          });
          setFlippedIndices([]); setIsChecking(false);
        }, 350);
      } else {
        setTimeout(() => { setFlippedIndices([]); setIsChecking(false); }, 800);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center relative overflow-x-hidden p-4 sm:p-6 md:p-8">
      <GoBackButton />

      {/* Stats bar only for memory match */}
      {activeGame === "memory" && (
        <GameStats moves={moves} timeSeconds={timeSeconds} matchedPairsCount={matchedIndices.size / 2} />
      )}

      <main className="flex flex-col items-center justify-center text-center my-auto py-12 max-w-4xl w-full">
        <GameHeader />

        {/* ── Game selector tabs ── */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveGame("memory")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeGame === "memory"
                ? "bg-emerald-500 border-emerald-500 text-neutral-950"
                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            }`}
          >
            🃏 Memory Match
          </button>
          <button
            onClick={() => setActiveGame("pacman")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeGame === "pacman"
                ? "bg-yellow-400 border-yellow-400 text-neutral-950"
                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            }`}
          >
            👾 Pac-Man
          </button>
        </div>

        {/* ── Active game ── */}
        {activeGame === "memory" ? (
          <TileGrid
            tiles={tiles}
            flippedIndices={flippedIndices}
            matchedIndices={matchedIndices}
            isGameActive={isGameActive}
            isCompleted={isCompleted}
            onTileClick={handleTileClick}
            onReset={initializeGame}
            onStart={handleStart}
          />
        ) : (
          <PacManGame />
        )}
      </main>

      <VictoryModal
        isOpen={isCompleted && activeGame === "memory"}
        moves={moves}
        timeSeconds={timeSeconds}
        onPlayAgain={initializeGame}
      />
    </div>
  );
};
