"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Project } from "@/constant";

interface CartridgeCardProps {
  project: Project;
  index: number;
}

export function CartridgeCard({ project, index }: CartridgeCardProps) {
  const stickerThemes = [
    {
      border: "border-retro-pink",
      titleBg: "bg-retro-pink text-black",
      badgeText: "text-retro-pink",
      badgeBorder: "border-retro-pink/40",
      badgeBg: "bg-retro-pink/10",
      btnText: "text-retro-pink border-retro-pink hover:bg-retro-pink/20",
      glow: "hover:shadow-[0_0_25px_rgba(255,105,180,0.3)]",
    },
    {
      border: "border-retro-cyan",
      titleBg: "bg-retro-cyan text-black",
      badgeText: "text-retro-cyan",
      badgeBorder: "border-retro-cyan/40",
      badgeBg: "bg-retro-cyan/10",
      btnText: "text-retro-cyan border-retro-cyan hover:bg-retro-cyan/20",
      glow: "hover:shadow-[0_0_25px_rgba(0,255,255,0.3)]",
    },
    {
      border: "border-retro-green",
      titleBg: "bg-retro-green text-black",
      badgeText: "text-retro-green",
      badgeBorder: "border-retro-green/40",
      badgeBg: "bg-retro-green/10",
      btnText: "text-retro-green border-retro-green hover:bg-retro-green/20",
      glow: "hover:shadow-[0_0_25px_rgba(57,255,20,0.3)]",
    },
    {
      border: "border-retro-yellow",
      titleBg: "bg-retro-yellow text-black",
      badgeText: "text-retro-yellow",
      badgeBorder: "border-retro-yellow/40",
      badgeBg: "bg-retro-yellow/10",
      btnText: "text-retro-yellow border-retro-yellow hover:bg-retro-yellow/20",
      glow: "hover:shadow-[0_0_25px_rgba(255,225,53,0.3)]",
    },
  ];

  const theme = stickerThemes[index % stickerThemes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative w-full rounded-t-lg bg-[#252830] border-4 border-[#3a3f4d] shadow-2xl transition-all duration-300 ${theme.glow} flex flex-col justify-between overflow-hidden group`}
    >
      {/* ── Cartridge Top Ridge / Plastic Details ── */}
      <div className="w-full bg-[#1b1d24] px-4 py-2.5 border-b-4 border-[#3a3f4d] flex items-center justify-between">
        {/* Plastic Grip Lines */}
        <div className="flex gap-1">
          <div className="w-8 h-1.5 bg-[#3a3f4d] rounded-sm" />
          <div className="w-8 h-1.5 bg-[#3a3f4d] rounded-sm" />
          <div className="w-8 h-1.5 bg-[#3a3f4d] rounded-sm" />
        </div>
        <span className="font-pixel text-[8px] sm:text-[9px] text-gray-400 tracking-widest">
          CARTRIDGE #{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── Game Label Sticker Area ── */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div className={`w-full border-2 ${theme.border} bg-[#12141a] p-4 sm:p-5 relative`}>
          {/* Official Seal Badge */}
          <div className="absolute top-3 right-3 hidden sm:flex flex-col items-center justify-center w-10 h-10 border border-retro-yellow/60 rounded-full bg-retro-yellow/10 p-1 text-center">
            <span className="font-pixel text-[5px] text-retro-yellow leading-none">OFFICIAL</span>
            <span className="font-pixel text-[6px] text-white leading-none mt-0.5">SEAL</span>
          </div>

          {/* Sticker Header */}
          <div className={`inline-block px-3 py-1 font-pixel text-xs font-bold ${theme.titleBg} mb-3 tracking-wider`}>
            {project.name.toUpperCase()}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans font-medium mb-4">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`font-pixel text-xs px-2.5 py-1 border ${theme.badgeBorder} ${theme.badgeText} ${theme.badgeBg} tracking-wider`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex items-center gap-3 pt-5">
          {project.links.live && (
            <Link
              href={project.links.live}
              target="_blank"
              className={`retro-btn ${theme.btnText} text-xs px-4 py-2 font-bold flex items-center gap-1.5`}
            >
              ▶ PLAY DEMO
            </Link>
          )}
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              className="retro-btn text-white/80 border-white/40 text-xs px-4 py-2 hover:bg-white/10 hover:text-white flex items-center gap-1.5"
            >
              ◆ REPO
            </Link>
          )}
        </div>
      </div>

      {/* ── Cartridge Bottom Metallic Pins Strip ── */}
      <div className="w-full h-3 bg-[#17181c] border-t-2 border-[#3a3f4d] flex items-center justify-around px-4">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="w-1.5 h-full bg-[#d4af37] opacity-80" />
        ))}
      </div>
    </motion.div>
  );
}
