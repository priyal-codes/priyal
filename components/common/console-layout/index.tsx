"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  WorkSection,
  ContactSection,
} from "@/components/sections";


// ── Tab Definitions ──
export type TabId = "home" | "about" | "skills" | "experience" | "work" | "contact";

interface Tab {
  id: TabId;
  label: string;
  shortcut: string;
}

const TABS: Tab[] = [
  { id: "home", label: "HOME", shortcut: "1" },
  { id: "about", label: "ABOUT", shortcut: "2" },
  { id: "skills", label: "SKILLS", shortcut: "3" },
  { id: "experience", label: "EXPERIENCE", shortcut: "4" },
  { id: "work", label: "PROJECTS", shortcut: "5" },
  { id: "contact", label: "CONTACT", shortcut: "6" },
];

// ── Context for tab switching (used by Menu) ──
interface ConsoleContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const ConsoleContext = createContext<ConsoleContextType>({
  activeTab: "home",
  setActiveTab: () => {},
});

export const useConsole = () => useContext(ConsoleContext);

// ── Tab content map ──
const TAB_CONTENT: Record<TabId, React.ReactNode> = {
  home: <HeroSection />,
  about: <AboutSection />,
  skills: <SkillsSection />,
  experience: <ExperienceSection />,
  work: <WorkSection />,
  contact: <ContactSection />,
};

// ── Console Layout Component ──
export function ConsoleLayout() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const tab = TABS.find((t) => t.shortcut === e.key);
      if (tab) {
        setActiveTab(tab.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTabClick = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
    // Scroll to top when switching tabs
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <ConsoleContext.Provider value={{ activeTab, setActiveTab: handleTabClick }}>
      <div className="min-h-screen flex flex-col relative">
        {/* ── Tab Bar ── */}
        <div className="sticky top-[48px] sm:top-[52px] z-40 bg-black/95 backdrop-blur-md border-b-2 border-retro-green/30">
          <div className="max-w-7xl mx-auto px-1 sm:px-4">
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-hide gap-0.5 sm:gap-2 py-1 sm:py-1.5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      relative shrink-0 font-pixel text-[9px] sm:text-[10px] md:text-xs tracking-wider px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5
                      transition-all duration-200 border-b-2
                      ${
                        isActive
                          ? "text-retro-green border-retro-green bg-retro-green/10"
                          : "text-white/50 border-transparent hover:text-white/80 hover:bg-white/5"
                      }
                    `}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-retro-green"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Tab Content ── */}
        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {TAB_CONTENT[activeTab]}
            </motion.div>
          </AnimatePresence>
        </main>


      </div>
    </ConsoleContext.Provider>
  );
}
