"use client";

import { motion } from "motion/react";
import { profile, socials } from "@/constant";
import Link from "next/link";

export const ContactSection = () => {
  return (
    <section id="contact" className="relative w-full px-2 sm:px-4 md:px-6 py-8 sm:py-14">
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
            Contact & Connect
          </h2>
          <p className="font-mono text-xs sm:text-sm text-retro-pink font-medium tracking-wider mt-1.5">
            Open to Work &amp; Opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Dialog */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="retro-window flex flex-col justify-between"
          >
            <div>
              <div className="retro-title-bar text-xs sm:text-sm font-pixel py-2.5 px-4">
                <span>Message Box</span>
                <span>◆ ◇ ◆</span>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans font-medium">
                  I&apos;m actively seeking new job opportunities as a Full Stack Developer. Whether it&apos;s a full-time role, internship, or freelance project — I&apos;d love to connect!
                </p>
                <p className="font-pixel text-xs sm:text-sm text-retro-yellow leading-relaxed">
                  ▶ OPEN TO WORK — Available immediately
                </p>
                <p className="font-pixel text-xs text-retro-pink leading-relaxed">
                  Ready to contribute, collaborate, and build something amazing together.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 space-y-3">
              <div className="pt-4 border-t border-retro-pink/20">
                <Link
                  href={`mailto:${profile.email}`}
                  className="retro-btn border-retro-green text-retro-green bg-retro-green/10 hover:bg-retro-green/20 text-xs sm:text-sm px-5 py-2.5 inline-block font-bold"
                >
                  ✉ SAY HELLO
                </Link>
              </div>

              <div>
                <span className="font-pixel text-xs text-muted-foreground tracking-wider block">
                  {profile.email}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="retro-window-blue flex flex-col justify-between"
          >
            <div>
              <div className="retro-title-bar retro-title-bar-blue text-xs sm:text-sm font-pixel py-2.5 px-4">
                <span>Social Links & Location</span>
                <span>◆ ◇ ◆</span>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className="flex items-center gap-3 group bg-white/5 p-3 border border-retro-blue/30 hover:border-retro-cyan transition-all"
                  >
                    <span className="font-pixel text-xs text-retro-blue group-hover:text-retro-cyan transition-colors">▸</span>
                    <span className="font-pixel text-xs sm:text-sm text-white/90 group-hover:text-retro-cyan transition-colors tracking-wider">
                      {social.name.toUpperCase()}
                    </span>
                    <span className="font-pixel text-xs text-muted-foreground ml-auto">
                      @{social.handle}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <div className="pt-4 border-t border-retro-blue/20 flex items-center gap-3">
                <span className="font-pixel text-sm text-retro-yellow">📍</span>
                <span className="font-pixel text-xs text-white/80 tracking-wider">
                  {profile.curr_location.city}, {profile.curr_location.state}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
