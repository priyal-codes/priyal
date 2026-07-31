export interface Project {
  name: string;
  description: string;
  technologies: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export const selected_works: Project[] = [
  {
    name: "Covio",
    description:
      "A premium real-time video conferencing platform with WebRTC peer-to-peer streaming, Socket.io live chat, instant meeting room generation, and an integrated AI meeting assistant.",
    technologies: [
      "React 19",
      "WebRTC",
      "Socket.io",
      "Node.js",
      "Express",
      "MongoDB",
      "Material UI",
    ],
    links: {
      live: "https://covio.onrender.com",
      github: "https://github.com/priyal-codes/covio",
    },
  },
  {
    name: "HavenlyStays",
    description:
      "Full-stack vacation rental booking platform with owner listing controls, Cloudinary asset hosting, Passport.js authentication, ratings & review systems, and Mongo session persistence.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "EJS",
      "Passport.js",
      "Cloudinary",
      "Bootstrap 5",
    ],
    links: {
      live: "https://havenlystays-tssx.onrender.com",
      github: "https://github.com/priyal-codes/havenlystays",
    },
  },
  {
    name: "PicoPath",
    description:
      "Modern URL shortener featuring real-time click tracking analytics, custom link aliases, secure user authentication, password hashing, and a dark-mode interface.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "EJS",
      "Bcrypt",
      "Nodemailer",
    ],
    links: {
      live: "https://picopath.onrender.com/",
      github: "https://github.com/priyal-codes/picopath",
    },
  },
  {
    name: "OceanOfChapters",
    description:
      "Full-stack online bookstore featuring instant search autocomplete, multi-criteria genre filters, interactive saved wishlists, cart checkout, and author directories.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "EJS",
      "Bootstrap 5",
      "Mongoose",
    ],
    links: {
      live: "https://oceanofchapters-ib5o.onrender.com/",
      github: "https://github.com/priyal-codes/oceanofchapters",
    },
  },
];

export const works: Project[] = [
  {
    name: "Taskify",
    description:
      "User-isolated task manager providing full CRUD functionality, status tracking (Pending, In Progress, Completed), and secure session authentication.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "EJS",
      "Bcrypt",
      "Connect-Mongo",
    ],
    links: {
      live: "https://taskify-qzdh.onrender.com",
      github: "https://github.com/priyal-codes/taskify",
    },
  },
  {
    name: "SkyCast",
    description:
      "Sleek React weather application providing live OpenWeatherMap forecasts with dynamic condition-based background atmosphere effects.",
    technologies: [
      "React 19",
      "Vite",
      "Material-UI",
      "OpenWeatherMap API",
      "CSS Animations",
    ],
    links: {
      live: "https://skycast-pcc9.onrender.com",
      github: "https://github.com/priyal-codes/skycast",
    },
  },
];
