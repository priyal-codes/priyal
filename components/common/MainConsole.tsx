"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar, Footer } from "@/components/common";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  WorkSection,
  ContactSection,
} from "@/components/sections";

export type TabType = "home" | "about" | "skills" | "experience" | "work" | "contact";

const navTabs: { id: TabType; label: string; number: string; color: string; activeBorder: string }[] = [
  { id: "home", label: "HOME", number: "01", color: "text-retro-green bg-retro-green/15", activeBorder: "border-retro-green" },
  { id: "about", label: "ABOUT", number: "02", color: "text-retro-yellow bg-retro-yellow/15", activeBorder: "border-retro-yellow" },
  { id: "skills", label: "SKILLS", number: "03", color: "text-retro-pink bg-retro-pink/15", activeBorder: "border-retro-pink" },
  { id: "experience", label: "EXPERIENCE", number: "04", color: "text-retro-cyan bg-retro-cyan/15", activeBorder: "border-retro-cyan" },
  { id: "work", label: "PROJECTS", number: "05", color: "text-retro-green bg-retro-green/15", activeBorder: "border-retro-green" },
  { id: "contact", label: "CONTACT", number: "06", color: "text-retro-yellow bg-retro-yellow/15", activeBorder: "border-retro-yellow" },
];

export const MainConsole = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace("#", "").toLowerCase();
      const validHash = rawHash === "hero" ? "home" : rawHash;
      if (["home", "about", "skills", "experience", "work", "contact"].includes(validHash)) {
        setActiveTab(validHash as TabType);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.history.pushState(null, "", `#${tab}`);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-transparent text-white select-none">
      <Navbar />

      {/* Main Single Page View Container */}
      <main className="flex-1 flex flex-col items-center justify-start w-full max-w-[1600px] mx-auto px-3 sm:px-6 pt-24 pb-8">
        {/* Top Control Bar / Tab Switcher */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap py-3 px-4 bg-black/85 border border-white/20 rounded-2xl backdrop-blur-md shadow-2xl mb-6 z-30 sticky top-20">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`font-pixel text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? `${tab.color} ${tab.activeBorder} font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105`
                    : "border-white/15 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5"
                }`}
              >
                <span className="text-[10px] opacity-70 font-mono">{tab.number}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Screen Area */}
        <div className="w-full flex-1 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {activeTab === "home" && <HeroSection />}
              {activeTab === "about" && <AboutSection />}
              {activeTab === "skills" && <SkillsSection />}
              {activeTab === "experience" && <ExperienceSection />}
              {activeTab === "work" && <WorkSection />}
              {activeTab === "contact" && <ContactSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};
