import type { IconType } from "react-icons";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSnapchat,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

import { SiLeetcode } from "react-icons/si";

interface Social {
  name: string;
  handle: string;
  url: string;
  icon: IconType;
}

export const socials = [
  {
    name: "GitHub",
    handle: "priyal-codes",
    url: "https://github.com/priyal-codes",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    handle: "priyal",
    url: "https://www.linkedin.com/in/priyal-ramteke-38aa8126a/",
    icon: FaLinkedin,
  }, 
] satisfies Social[];
