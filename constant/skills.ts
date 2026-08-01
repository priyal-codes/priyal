import type { IconType } from "react-icons";

import {
  FaGitAlt,
  FaGithub,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaSquareJs,
  FaPhp,
  FaJava,
  FaDatabase,
} from "react-icons/fa6";

import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostman,
  SiTailwindcss,
  SiXampp,
} from "react-icons/si";

import { MdApi } from "react-icons/md";
import { TbBrandVscode } from "react-icons/tb";

export interface SkillItem {
  title: string;
  subtitle: string;
  logoComponent: IconType;
  color?: string;
}

export interface SkillsCategory {
  title: string;
  data: SkillItem[];
}

export const skillsData: SkillsCategory[] = [
  {
    title: "Languages",
    data: [
      { title: "JavaScript", subtitle: "Programming Language", logoComponent: FaSquareJs, color: "#F7DF1E" },
      { title: "PHP", subtitle: "Server-Side Scripting", logoComponent: FaPhp, color: "#777BB4" },
      { title: "Java", subtitle: "Object-Oriented Language", logoComponent: FaJava, color: "#ED8B00" },
      { title: "SQL", subtitle: "Database Querying", logoComponent: FaDatabase, color: "#4479A1" },
    ],
  },
  {
    title: "Frontend",
    data: [
      { title: "React.js", subtitle: "Frontend Library", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Next.js", subtitle: "React Framework", logoComponent: SiNextdotjs, color: "#FFFFFF" },
      { title: "HTML5", subtitle: "Markup Language", logoComponent: FaHtml5, color: "#E34F26" },
      { title: "CSS3", subtitle: "Web Stylesheet", logoComponent: FaCss3Alt, color: "#1572B6" },
      { title: "Tailwind CSS", subtitle: "Utility-First CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    data: [
      { title: "Node.js", subtitle: "Backend Runtime", logoComponent: FaNodeJs, color: "#339933" },
      { title: "Express.js", subtitle: "Web Framework", logoComponent: SiExpress, color: "#FFFFFF" },
      { title: "PHP", subtitle: "Backend Scripting", logoComponent: FaPhp, color: "#777BB4" },
      { title: "REST APIs", subtitle: "Web Services & Endpoints", logoComponent: MdApi, color: "#F55036" },
    ],
  },
  {
    title: "Databases",
    data: [
      { title: "MongoDB", subtitle: "NoSQL Database", logoComponent: SiMongodb, color: "#47A248" },
      { title: "MySQL", subtitle: "Relational Database", logoComponent: SiMysql, color: "#00758F" },
    ],
  },
  {
    title: "Tools & Environment",
    data: [
      { title: "Git", subtitle: "Version Control", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", subtitle: "Code Hosting & Collaboration", logoComponent: FaGithub, color: "#FFFFFF" },
      { title: "VS Code", subtitle: "Code Editor", logoComponent: TbBrandVscode, color: "#007ACC" },
      { title: "Postman", subtitle: "API Development Tool", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "XAMPP", subtitle: "Local Server Stack", logoComponent: SiXampp, color: "#FB7A24" },
    ],
  },
];
