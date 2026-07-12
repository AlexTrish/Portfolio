import { PROJECTS } from "@/app/lib/projects";
import SmoothScroll from "@/app/components/ui/SmoothScroll";
import CustomCursor from "@/app/components/ui/CustomCursor";
import Navigation from "@/app/components/sections/Navigation";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Projects from "@/app/components/sections/Projects";
import Skills from "@/app/components/sections/Skills";
import Experience from "@/app/components/sections/Experience";
import Contact from "@/app/components/sections/Contact";
import Footer from "@/app/components/sections/Footer";

export default function Home(): React.JSX.Element {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects projects={PROJECTS} />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
