import type { Metadata } from "next";
import { PROJECTS } from "@/app/lib/projects";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Work — Alex Mercer",
  description: "All projects by Alex Mercer — frontend & full stack developer.",
};

export default function WorkPage(): React.JSX.Element {
  return <WorkPageClient projects={PROJECTS} />;
}
