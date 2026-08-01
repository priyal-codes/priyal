export interface ExperienceDate {
  dd: number;
  mm: string;
  yyyy: number;
}

export interface BaseExperience {
  role: string;
  startDate: ExperienceDate;
  endDate: ExperienceDate;
  description: string[];
  company: string;
  location?: string;
  companySite?: string;
  technologies: string[];
  projects?: string[];
  current?: boolean;
}

export type Experience = BaseExperience;

export const experience: Experience[] = [
  {
    role: "Junior Software Developer",
    company: "Gohil Infotech",
    location: "Ahmedabad",
    startDate: {
      dd: 1,
      mm: "March",
      yyyy: 2026,
    },
    endDate: {
      dd: 31,
      mm: "May",
      yyyy: 2026,
    },
    current: false,
    companySite: "https://gohilinfotech.com/",
    description: [
      "Contributed to the development and maintenance of multiple web applications using modern web technologies.",
      "Collaborated with senior developers to implement new features and enhance application functionality.",
      "Identified and resolved bugs, optimized performance, and improved user experience across projects.",
      "Participated in client discussions, requirement analysis, testing, and project delivery activities.",
      "Key Projects: Houspire, SighaiMart, Gvoice, GIPL, ChetakPlus",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "PHP",
      "MongoDB",
      "REST APIs",
      "JavaScript",
      "Laragon",
    ],
  },
  {
    role: "MERN Stack Intern",
    company: "Clustor Computing",
    location: "Nagpur",
    startDate: {
      dd: 1,
      mm: "December",
      yyyy: 2025,
    },
    endDate: {
      dd: 28,
      mm: "February",
      yyyy: 2026,
    },
    current: false,
    companySite: "#",
    description: [
      "Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
      "Built and integrated RESTful APIs for seamless communication between frontend and backend systems.",
      "Implemented user authentication, database operations, and responsive user interfaces.",
      "Collaborated with team members using Git and GitHub to debug issues and enhance application functionality.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Git",
      "GitHub",
      "REST APIs",
    ],
  },
];
