"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { profile } from "@/constant";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 left-0 right-0 z-50"
    >
      <div
        className={cn(
          "px-4 sm:px-6 py-3 border-b-2 border-retro-green/30 bg-black/95 backdrop-blur-md"
        )}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              <Image
                src="/images/logo.png"
                alt="logo"
                width={40}
                height={40}
                loading="lazy"
                quality={100}
                style={{ objectFit: "cover", imageRendering: "pixelated" }}
              />
            </motion.div>
            <span className="font-pixel text-retro-green text-sm sm:text-base tracking-wider font-bold">
              {profile.name.first}.
            </span>
          </Link>

          <a
            href="/docs/priyal_ramteke_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="retro-btn border-retro-yellow text-retro-yellow bg-retro-yellow/10 hover:bg-retro-yellow/20 text-xs px-4 py-2 font-bold flex items-center gap-1.5"
          >
            <span>RESUME</span>
            <span className="text-sm">⤓</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
