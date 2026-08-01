"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { profile } from "@/constant";

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<"brief" | "edu" | "quote">("brief");

  const tabs = [
    { id: "brief", label: "01 OVERVIEW" },
    { id: "edu", label: "02 EDUCATION" },
    { id: "quote", label: "03 QUOTE" },
  ] as const;

  return (
    <section id="about" className="relative w-full px-2 sm:px-4 md:px-6 py-8 sm:py-14">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-retro-green uppercase tracking-wide">
            About Me
          </h2>
          <p className="font-mono text-xs sm:text-sm text-retro-pink font-medium tracking-wider mt-1.5">
            Profile & Developer Overview
          </p>
        </motion.div>

        {/* Bento Grid: Left Tabbed Window + Right Photo Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Left: Tabbed Card (2 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 retro-window-yellow flex flex-col justify-between p-4 sm:p-6 md:p-8 min-h-[320px] sm:min-h-[380px]"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between border-b border-retro-yellow/20 pb-4 mb-6">
              <span className="font-mono font-bold text-xs sm:text-sm text-retro-cyan tracking-wider">
                {activeTab === "brief" && "// DEVELOPER PROFILE"}
                {activeTab === "edu" && "// ACADEMIC BACKGROUND"}
                {activeTab === "quote" && "// DEVELOPER MOTTO"}
              </span>
              <span className="font-mono font-semibold text-xs text-muted-foreground">
                {activeTab === "brief" && "01 / 03"}
                {activeTab === "edu" && "02 / 03"}
                {activeTab === "quote" && "03 / 03"}
              </span>
            </div>

            {/* Tab Body Content */}
            <div className="flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "brief" && (
                  <motion.div
                    key="brief"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-retro-yellow tracking-wide">
                      {profile.name.full}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-retro-green font-semibold">
                      {profile.work.title} — {profile.curr_location.city}, {profile.curr_location.state}
                    </p>
                    <div className="space-y-3 pt-2">
                      {profile.about.slice(0, 3).map((text, i) => (
                        <p key={i} className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans font-medium flex items-start gap-2.5">
                          <span className="font-mono text-xs text-retro-yellow mt-1 shrink-0">▸</span>
                          <span>{text}</span>
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "edu" && (
                  <motion.div
                    key="edu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <span className="font-mono font-bold text-xs sm:text-sm text-retro-pink tracking-wider block">
                      EDUCATION & ACADEMICS
                    </span>
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                      {profile.education.uni}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-retro-yellow font-medium">
                      {profile.education.degree} in {profile.education.major}
                    </p>
                    <p className="font-mono text-xs sm:text-sm text-muted-foreground font-medium">
                      Batch: {profile.education.batch} — {profile.education.location.city}, {profile.education.location.state}
                    </p>
                  </motion.div>
                )}

                {activeTab === "quote" && (
                  <motion.div
                    key="quote"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 text-center py-4"
                  >
                    
                    <p className="font-mono text-sm sm:text-base text-retro-green leading-relaxed italic font-medium">
                      &ldquo;{profile.quote}&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Tab Pill Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-6 border-t border-retro-yellow/20 mt-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 border transition-all ${
                      isActive
                        ? "border-retro-cyan text-retro-cyan bg-retro-cyan/15 shadow-[0_0_12px_rgba(0,255,255,0.3)]"
                        : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Photo Frame Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="retro-window relative overflow-hidden flex flex-col items-center justify-center p-3 group min-h-[280px] sm:min-h-[380px]"
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 text-retro-cyan font-pixel text-xs pointer-events-none z-10">┌</div>
            <div className="absolute top-2 right-2 text-retro-cyan font-pixel text-xs pointer-events-none z-10">┐</div>
            <div className="absolute bottom-2 left-2 text-retro-cyan font-pixel text-xs pointer-events-none z-10">└</div>
            <div className="absolute bottom-2 right-2 text-retro-cyan font-pixel text-xs pointer-events-none z-10">┘</div>

            {/* Image Container */}
            <div className="relative w-full h-full min-h-[240px] sm:min-h-[340px] rounded-none overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
              <Image
                src="/images/me.png"
                alt={profile.name.full}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectPosition: "center 82%" }}
                className="object-cover grayscale-0 sm:grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
