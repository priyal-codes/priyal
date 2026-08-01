import type { Metadata } from "next";
import { NotFoundGame } from "@/components/mics/404";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist. Navigate back to explore the portfolio.",
};

export default function NotFound() {
  return <NotFoundGame />;
}
