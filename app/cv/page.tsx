import type { Metadata } from "next";
import CvPageClient from "./CvPageClient";

export const metadata: Metadata = {
  title: "CV — AlexTrish",
  description: "Curriculum Vitae — Alexander Trishin, Frontend & Full Stack Developer.",
};

export default function CvPage(): React.JSX.Element {
  return <CvPageClient />;
}
