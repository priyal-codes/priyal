"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { profile } from "@/constant";

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<"brief" | "edu" | "quote">("brief");

  const tabs = [
    { id: "brief", label: "01 BRIEF" },
    { id: "edu", label: "02 EDU" },
    { id: "quote", label: "03 QUOTE" },
  ] as const;

  return (
    <section id="about" className="relative w-full select-none px-2 sm:px-4 md:px-6 py-8 sm:py-14">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-pixel text-retro-green text-lg sm:text-2xl tracking-wider">
            About Me
          </h2>
          <p className="font-pixel text-xs sm:text-sm text-retro-pink mt-2 tracking-wider">
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
            className="lg:col-span-2 retro-window-yellow flex flex-col justify-between p-6 sm:p-8 min-h-[380px]"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between border-b border-retro-yellow/20 pb-4 mb-6">
              <span className="font-pixel text-xs text-retro-cyan tracking-widest">
                // DEVELOPER PROFILE
              </span>
              <span className="font-pixel text-xs text-muted-foreground">
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
                    <h3 className="font-pixel text-base text-retro-yellow">
                      {profile.name.full}
                    </h3>
                    <p className="font-pixel text-xs text-retro-green">
                      {profile.work.title} — {profile.curr_location.city}, {profile.curr_location.state}
                    </p>
                    <div className="space-y-3 pt-2">
                      {profile.about.slice(0, 3).map((text, i) => (
                        <p key={i} className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans font-medium flex items-start gap-2.5">
                          <span className="font-pixel text-xs text-retro-yellow mt-1 shrink-0">▸</span>
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
                    <span className="font-pixel text-xs text-retro-pink tracking-wider block">
                      EDUCATION & ACADEMICS
                    </span>
                    <h3 className="font-pixel text-sm sm:text-base text-white">
                      {profile.education.uni}
                    </h3>
                    <p className="font-pixel text-xs text-retro-yellow">
                      {profile.education.degree} in {profile.education.major}
                    </p>
                    <p className="font-pixel text-xs text-muted-foreground">
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
                    <span className="font-pixel text-xs text-retro-green tracking-wider block">
                      DEVELOPER MOTTO
                    </span>
                    <p className="font-pixel text-sm sm:text-base text-retro-green leading-relaxed italic">
                      &ldquo;{profile.quote}&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Tab Pill Controls */}
            <div className="flex items-center gap-2 flex-wrap pt-6 border-t border-retro-yellow/20 mt-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-pixel text-xs px-3.5 py-2 border transition-all ${
                      isActive
                        ? "border-retro-cyan text-retro-cyan bg-retro-cyan/15 font-bold shadow-[0_0_12px_rgba(0,255,255,0.3)]"
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
            className="retro-window relative overflow-hidden flex flex-col items-center justify-center p-3 group min-h-[380px]"
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 text-retro-cyan font-pixel text-xs pointer-events-none z-10">┌</div>
            <div className="absolute top-2 right-2 text-retro-cyan font-pixel text-xs pointer-events-none z-10">┐</div>
            <div className="absolute bottom-2 left-2 text-retro-cyan font-pixel text-xs pointer-events-none z-10">└</div>
            <div className="absolute bottom-2 right-2 text-retro-cyan font-pixel text-xs pointer-events-none z-10">┘</div>

            {/* Image Container */}
            <div className="relative w-full h-full min-h-[340px] rounded-none overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
              <Image
                src="/images/me.png"
                alt={profile.name.full}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectPosition: "center 82%" }}
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
