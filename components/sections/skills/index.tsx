"use client";

import { motion } from "motion/react";
import { skillsData } from "@/constant";

export const SkillsSection = () => {
  return (
    <section id="skills" className="relative w-full select-none px-2 sm:px-4 md:px-6 py-8 sm:py-14">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-pixel text-retro-green text-lg sm:text-2xl tracking-wider">
            Skills & Tech Stack
          </h2>
          <p className="font-pixel text-xs sm:text-sm text-retro-pink mt-2 tracking-wider">
            Technologies & Software Stack
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-12">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="space-y-4"
            >
              {/* Category Header Bar */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                <span className="font-pixel text-xs sm:text-sm text-retro-yellow uppercase tracking-widest">
                  // {category.title}
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-retro-yellow/30 to-transparent" />
              </div>

              {/* Skills Grid: 2 cols on mobile, 3 cols on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.data.map((skill) => {
                  const Logo = skill.logoComponent;

                  return (
                    <motion.div
                      key={skill.title}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="bg-black/80 border border-white/15 hover:border-retro-green/50 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3.5 sm:gap-4 transition-all duration-300 shadow-lg group"
                    >
                      {/* Full-Sized Direct Tech Icon */}
                      <div className="shrink-0 flex items-center justify-center p-1 group-hover:scale-110 transition-transform duration-300">
                        <Logo
                          className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-md"
                          style={{ color: skill.color }}
                        />
                      </div>

                      {/* Text Column */}
                      <div className="flex flex-col min-w-0">
                        <span className="font-pixel text-sm sm:text-base text-white font-bold tracking-tight truncate group-hover:text-retro-green transition-colors">
                          {skill.title}
                        </span>
                        <span className="font-sans text-xs text-muted-foreground font-medium mt-0.5 truncate">
                          {skill.subtitle}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
