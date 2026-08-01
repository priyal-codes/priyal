"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Download } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { socials } from "@/constant";

const RESUME_PATH = "/docs/priyal_ramteke_resume.pdf";

export interface MenuItem {
  label: string;
  link: string;
  ariaLabel?: string;
  isDownload?: boolean;
}

const SECTION_ITEMS: MenuItem[] = [
  { label: "Home", link: "/#hero" },
  { label: "About", link: "/#about" },
  { label: "Skills", link: "/#skills" },
  { label: "Experience", link: "/#experience" },
  { label: "Work", link: "/#work" },
  { label: "Contact", link: "/#contact" },
];

const BASE_PAGE_ITEMS: MenuItem[] = [
  { label: "Resume", link: "/resume" },
  { label: "Projects", link: "/projects" },
];

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSectionClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    setOpen(false);

    let targetId = link.replace("/#", "");
    if (targetId === "hero") targetId = "home";

    if (pathname === "/") {
      window.location.hash = `#${targetId}`;
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      router.push(`/#${targetId}`);
    }
  };

  const filteredPageItems: MenuItem[] = BASE_PAGE_ITEMS.reduce<MenuItem[]>(
    (acc, item) => {
      if (item.link === "/resume") {
        if (pathname === "/resume") {
          acc.push({
            label: "Download Resume",
            link: RESUME_PATH,
            isDownload: true,
          });
        } else {
          acc.push(item);
        }
      } else {
        if (pathname !== item.link) {
          acc.push(item);
        }
      }
      return acc;
    },
    [],
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Retro Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="retro-btn border-retro-green text-retro-green bg-retro-green/10 hover:bg-retro-green/20 text-xs sm:text-sm px-4 py-2 font-bold"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? "✕ CLOSE" : "≡ MENU"}
      </button>

      {/* Sheet Content — Retro Side Drawer */}
      <SheetContent
        side="right"
        showCloseButton={false}
        className="z-999 border-l-3 border-retro-green bg-black/95 backdrop-blur-md text-foreground w-full max-w-sm sm:max-w-md h-full flex flex-col p-0 gap-0"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Main navigation and section links</SheetDescription>
        </SheetHeader>

        {/* Header */}
        <div className="flex flex-row items-center justify-between p-5 pt-16 sm:pt-6 border-b-2 border-retro-green/30 shrink-0">
          <span className="font-pixel text-xs sm:text-sm tracking-widest text-retro-green uppercase">
            Navigation
          </span>
          <button
            onClick={() => setOpen(false)}
            className="retro-btn border-retro-pink text-retro-pink text-xs px-3 py-1.5 font-bold"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 gap-6 flex flex-col min-h-0">
          {/* Sections */}
          <div className="flex flex-col gap-1">
            <span className="font-pixel text-xs tracking-widest text-retro-pink uppercase px-2 mb-2">
              Sections
            </span>
            <ul className="flex flex-col gap-1">
              {SECTION_ITEMS.map((item, idx) => (
                <li key={item.label}>
                  <a
                    href={item.link}
                    onClick={(e) => handleSectionClick(e, item.link)}
                    className="py-3 px-3 hover:bg-retro-green/10 border border-transparent hover:border-retro-green/30 transition-all duration-200 group flex items-center justify-between"
                  >
                    <span className="font-pixel text-xs sm:text-sm uppercase tracking-wider text-white/90 group-hover:text-retro-green transition-colors">
                      {item.label}
                    </span>
                    <span className="font-pixel text-xs text-retro-green/80">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          {filteredPageItems.length > 0 && (
            <div className="pt-4 border-t-2 border-retro-green/20 flex flex-col gap-1">
              <span className="font-pixel text-xs tracking-widest text-retro-yellow uppercase px-2 mb-2">
                Pages
              </span>
              <ul className="flex flex-col gap-1">
                {filteredPageItems.map((item, idx) => (
                  <li key={item.label}>
                    {item.isDownload ? (
                      <a
                        href={item.link}
                        download="Priyal_Ramteke_Resume.pdf"
                        onClick={() => setOpen(false)}
                        className="py-3 px-3 bg-retro-yellow/10 border border-retro-yellow/30 hover:bg-retro-yellow/20 transition-all flex items-center justify-between"
                      >
                        <span className="font-pixel text-xs uppercase tracking-wider text-retro-yellow flex items-center gap-2">
                          <Download className="w-3.5 h-3.5" />
                          {item.label}
                        </span>
                        <span className="font-pixel text-xs text-retro-yellow/80">
                          {String(SECTION_ITEMS.length + idx + 1).padStart(2, "0")}
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={item.link}
                        onClick={() => setOpen(false)}
                        className="py-3 px-3 hover:bg-retro-green/10 border border-transparent hover:border-retro-green/30 transition-all group flex items-center justify-between"
                      >
                        <span className="font-pixel text-xs sm:text-sm uppercase tracking-wider text-white/90 group-hover:text-retro-green transition-colors">
                          {item.label}
                        </span>
                        <span className="font-pixel text-xs text-retro-green/80">
                          {String(SECTION_ITEMS.length + idx + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Socials */}
        <div className="p-5 sm:p-6 border-t-2 border-retro-green/20 flex flex-col gap-3 shrink-0">
          <span className="font-pixel text-xs tracking-widest text-retro-cyan uppercase px-1">
            Socials
          </span>
          <div className="flex flex-wrap gap-2.5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn border-retro-cyan/50 text-retro-cyan text-xs px-3 py-1.5 hover:bg-retro-cyan/15 font-bold"
              >
                {social.name.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
