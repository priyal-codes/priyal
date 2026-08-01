import type { Metadata } from "next";
import { MainConsole } from "@/components/common";
import { constructMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.home);

export default function Home() {
  return <MainConsole />;
}
