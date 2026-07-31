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

  email: "priyaldotcodes@gmail.com",

  work: {
    title: "Software Developer",
    company: "Gohil Infotech",
  },

  education: {
    uni: "RTMNU University",
    degree: "B. Tech / Graduation",
    major: "Computer Science & Engineering",
    batch: "2020 - 2024",
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
    "I build high-performance full-stack web applications, real-time communication systems, and resilient backend APIs.",
    "Specialized in React 19, Node.js, Express, MongoDB, WebRTC, Socket.io, and database engineering with clean architecture.",
    "Somewhere between technical curiosity, user-centric design, and reliable code, great digital products are born.",
    "Still learning. Still shipping. Still building intuitive and impactful software applications every day.",
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

  quote: "Simplicity is prerequisite for reliability.",
};
