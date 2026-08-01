"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Menu } from "./_components/Menu";
import { profile } from "@/constant";

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const SCROLL_THRESHOLD = 10;
    const HIDE_DELTA = 5;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else if (Math.abs(delta) > HIDE_DELTA) {
        setIsVisible(delta < 0);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -90,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out pointer-events-auto"
      )}
    >
      <div
        className={cn(
          "px-4 sm:px-6 py-3 transition-all duration-300 border-b-2",
          isScrolled
            ? "border-retro-green/30 bg-black/90 backdrop-blur-md"
            : "border-transparent bg-transparent"
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

          <div>
            <Menu />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
