interface Name {
  full: string;
  first: string;
  last: string;
}

interface Work {
  title: string;
  company: string;
}

interface Location {
  city: string;
  state: string;
}

interface Education {
  uni: string;
  degree: string;
  major: string;
  batch: string;
  location: Location;
}

interface DOB {
  dd: number;
  mm: number;
  yyyy: number;
}

interface Titles {
  constant_word: string;
  rotating_words: string[];
}

interface Profile {
  name: Name;
  email: string;
  phone: string;
  work: Work;
  education: Education;
  DOB: DOB;
  curr_location: Location;
  about: string[];
  hero_titles: Titles;
  quote: string;
}

export const profile: Profile = {
  name: {
    full: "Priyal Ramteke",
    first: "Priyal",
    last: "Ramteke",
  },

  email: "priyalramteke008@gmail.com",
  phone: "+91 77968 98161",

  work: {
    title: "Full Stack Developer",
    company: "MERN Stack Specialist",
  },

  education: {
    uni: "JD College of Engineering & Management",
    degree: "B.Tech",
    major: "Computer Science & Engineering",
    batch: "2022 - 2026",
    location: {
      city: "Nagpur",
      state: "Maharashtra",
    },
  },

  DOB: {
    dd: 15,
    mm: 6,
    yyyy: 2002,
  },

  curr_location: {
    city: "Nagpur",
    state: "Maharashtra",
  },

  about: [
    "Full Stack Developer with hands-on experience in MERN Stack development and web application maintenance.",
    "Proficient in React.js, Next.js, Node.js, Express.js, MongoDB, REST API development, and SQL/MySQL database systems.",
    "Strong problem solver and team collaborator with clear technical communication and high adaptability in fast-paced environments.",
    "Passionate about clean architecture, user-centric design, performance optimization, and continuous learning.",
  ],

  hero_titles: {
    constant_word: "Stay",
    rotating_words: [
      "Building 🚀",
      "Creating ✨",
      "Innovating ⚡",
      "Coding 💻",
      "Curious 💡",
    ],
  },

  quote: "Every morning you have two choices: continue to sleep with your dreams, or wake up and chase them.",
};
