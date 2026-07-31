export interface ExperienceDate {
  dd: number;
  mm: string;
  yyyy: number;
}

export interface BaseExperience {
  role: string;
  startDate: ExperienceDate;
  description: string[];
  company: string;
  companySite: string;
  technologies: string[];
}

export type Experience =
  | (BaseExperience & {
      current: true;
      // endDate?: never;
    })
  | (BaseExperience & {
      current?: false;
      endDate: ExperienceDate;
    });

export const experience: Experience[] = [
  {
    role: "Software Developer",
    startDate: {
      dd: 1,
      mm: "January",
      yyyy: 2024,
    },
    current: true,
    description: [
      "Engineered full-stack client web applications, internal tools, and scalable REST services using React, Node.js, Express, and MongoDB.",
      "Architected real-time communication systems, WebRTC video streaming rooms, and Socket.io live chat integrations.",
      "Designed and optimized database schemas, index strategies, and Mongo session handling for production reliability.",
      "Collaborated closely with cross-functional teams to deliver high-performance, responsive UI components and seamless API endpoints.",
    ],
    company: "Gohil Infotech",
    companySite: "https://gohilinfotech.com/",
    technologies: [
      "React 19",
      "Node.js",
      "Express.js",
      "MongoDB",
      "WebRTC",
      "Socket.io",
      "REST APIs",
      "TypeScript",
    ],
  },
];
