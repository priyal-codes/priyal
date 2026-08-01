"use client";

import { motion } from "motion/react";
import { selected_works, works } from "@/constant";
import { CartridgeCard } from "./_components/CartridgeCard";

const allProjects = [...selected_works, ...works];

export const WorkSection = () => {
  return (
    <section id="work" className="relative w-full select-none px-2 sm:px-4 md:px-6 py-8 sm:py-14">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Level Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-pixel text-retro-green text-lg sm:text-2xl tracking-wider">
            Featured Projects
          </h2>
          <p className="font-pixel text-xs sm:text-sm text-retro-pink mt-2 tracking-wider">
            Game Cartridges — Select to Play
          </p>
        </motion.div>

        {/* Nintendo Game Cartridges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {allProjects.map((project, index) => (
            <CartridgeCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

