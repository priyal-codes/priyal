"use client";

import { motion } from "motion/react";
import { profile } from "@/constant";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-black border-t-2 border-retro-green/30 pt-10 pb-8 px-4 sm:px-8 md:px-12"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Game Over / End Title */}
        <h2 className="font-pixel text-retro-yellow text-base sm:text-lg tracking-widest text-center">
          THANKS FOR VISITING!
        </h2>

        {/* Pixel divider */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5"
              style={{
                backgroundColor: i % 3 === 0 ? "#FF69B4" : i % 3 === 1 ? "#39FF14" : "#FFE135",
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Credits */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-pixel text-xs text-muted-foreground tracking-wider">
            DESIGNED & DEVELOPED BY
          </p>
          <p className="font-pixel text-sm sm:text-base text-retro-green tracking-widest">
            {profile.name.full.toUpperCase()}
          </p>
        </div>

        {/* Copyright */}
        <p className="font-pixel text-xs text-muted-foreground/80 tracking-wider">
          © {currentYear} {profile.name.full} — ALL RIGHTS RESERVED
        </p>

        {/* Blinking cursor */}
        <span className="font-pixel text-retro-green text-sm animate-retro-blink">▮</span>
      </div>
    </motion.footer>
  );
};

export default Footer;
