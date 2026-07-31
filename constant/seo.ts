import { socials } from "./social";

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  ogImage?: string;
  type?: "website" | "article" | "profile";
}

export interface ConstructMetadataOptions {
  title?: string;
  useTitleTemplate?: boolean;
  description?: string;
  keywords?: string[];
  image?: string | null;
  path?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  authors?: { name: string; url?: string }[];
  noIndex?: boolean;
}

const xSocial = socials.find((s) => s.name === "X");
const githubSocial = socials.find((s) => s.name === "GitHub");

export const SITE_SEO = {
  siteName: "Priyal Ramteke",
  siteTitle: "Priyal Ramteke - Full-Stack Software Developer",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://priyal.vercel.app",
  titleTemplate: "%s | Priyal Ramteke",
  defaultDescription:
    "Personal portfolio, full-stack projects, and CV of Priyal Ramteke — Software Developer specializing in React 19, Node.js, Express, MongoDB, WebRTC, and Socket.io.",
  defaultKeywords: [
    "Priyal Ramteke",
    "Priyal Ramteke Portfolio",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "WebRTC Developer",
    "Software Engineer Portfolio",
    "Web Developer India",
  ],
  author: {
    name: "Priyal Ramteke",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://priyal.vercel.app",
    email: "priyaldotcodes@gmail.com",
    handle: `@${githubSocial?.handle || "priyal-codes"}`,
  },
  creator: "Priyal Ramteke",
  publisher: "Priyal Ramteke",
  defaultOgImage: "/images/thumbnail.png",
  twitterHandle: `@${githubSocial?.handle || "priyal-codes"}`,
  socialLinks: socials.map((s) => s.url),
  locale: "en_US",
  themeColor: "#000000",
  robotsDefault: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} as const;

export const PAGE_SEO: Record<
  "home" | "projects" | "blogs" | "resume" | "license",
  PageSeoConfig
> = {
  home: {
    title: "Priyal Ramteke - Full-Stack Software Developer",
    description:
      "Welcome to the official portfolio of Priyal Ramteke. Discover full-stack web applications, real-time communication systems, technical projects, and experience.",
    keywords: [
      "Priyal Ramteke",
      "Priyal Ramteke Portfolio",
      "Full Stack Developer",
      "React Engineer",
      "WebRTC Engineer",
    ],
    path: "/",
    type: "website",
  },
  projects: {
    title: "Projects & Works",
    description:
      "Explore full-stack web applications, real-time video streaming apps, and open-source GitHub repositories created by Priyal Ramteke.",
    keywords: [
      "Priyal Ramteke Projects",
      "Full Stack Applications",
      "Covio WebRTC",
      "HavenlyStays",
      "Developer Portfolio",
    ],
    path: "/projects",
    type: "website",
  },
  blogs: {
    title: "Blog & Technical Articles",
    description:
      "Explore technical articles, tutorials, and insights on full-stack development, React, Node.js, and real-time systems by Priyal Ramteke.",
    keywords: [
      "Priyal Ramteke Blog",
      "Web Development Articles",
      "React Tutorials",
      "Developer Blog",
    ],
    path: "/blogs",
    type: "website",
  },
  resume: {
    title: "Resume & CV",
    description:
      "Curriculum vitae and professional experience of Priyal Ramteke - Software Developer specializing in React 19, Node.js, Express, MongoDB, and WebRTC.",
    keywords: [
      "Priyal Ramteke Resume",
      "Priyal Ramteke CV",
      "Software Developer Resume",
      "Full Stack Developer CV",
    ],
    path: "/resume",
    type: "profile",
  },
  license: {
    title: "License & Terms of Usage",
    description:
      "Official software license, usage permissions, restrictions, and copyright terms for Priyal Ramteke's portfolio source code.",
    keywords: [
      "Priyal Ramteke",
      "Portfolio License",
      "Terms of Use",
    ],
    path: "/license",
    type: "website",
  },
};
