import type { Metadata } from "next";
import { PROJECTS } from "@/app/lib/projects";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Work — AlexTrish",
  description: "All projects by AlexTrish — frontend & full stack developer.",
};

export default function WorkPage(): React.JSX.Element {
  return <WorkPageClient projects={PROJECTS} />;
}
