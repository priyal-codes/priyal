"use client";

import { motion } from "motion/react";
import { experience } from "@/constant";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative w-full px-2 sm:px-4 md:px-6 py-8 sm:py-14">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Level Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-retro-green uppercase tracking-wide">
            Work Experience
          </h2>
        
        </motion.div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-8">
          {experience.map((exp, index) => {
            const endLabel = exp.current ? "PRESENT" : `${exp.endDate.mm} ${exp.endDate.yyyy}`;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="retro-window-green"
              >
                <div className="retro-title-bar retro-title-bar-green text-xs sm:text-sm font-pixel py-2.5 px-4">
                  <span>{exp.role} @ {exp.company}</span>
                  <span>{exp.current ? "ACTIVE" : "COMPLETE"}</span>
                </div>
                <div className="p-6 sm:p-8 space-y-5">
                  {/* Role & Company */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-retro-green/20 pb-4">
                    <div>
                      <h3 className="font-pixel text-sm sm:text-base text-retro-yellow tracking-wider">
                        {exp.role}
                      </h3>
                      <p className="font-pixel text-xs text-retro-cyan tracking-wider mt-1">
                        {exp.company} {exp.location ? `(${exp.location})` : ""}
                      </p>
                    </div>
                    <p className="font-pixel text-xs text-muted-foreground tracking-wider">
                      {exp.startDate.mm} {exp.startDate.yyyy} — {endLabel}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    {exp.description.map((desc, i) => (
                      <p key={i} className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans font-medium flex items-start gap-3">
                        <span className="font-pixel text-xs text-retro-green mt-1 shrink-0">▸</span>
                        <span>{desc}</span>
                      </p>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-retro-green/20">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-pixel text-xs px-3 py-1.5 border border-retro-green/40 text-retro-green bg-retro-green/10 tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
