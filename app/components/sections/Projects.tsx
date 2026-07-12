"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import TextReveal from "@/app/components/ui/TextReveal";
import type { Project } from "@/app/lib/projects";

const SLIDE_X = ["120%", "-120%", "120%"];
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const bgVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.12 } },
};
const imageVariant: Variants = {
  hidden: { opacity: 0, scale: 1.06, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.65, delay: 0.22, ease: EXPO } },
};
const textVariant: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.38, ease: EXPO } },
};
const arrowVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.52, ease: EXPO } },
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * 3,
      y: ((e.clientX - cx) / (rect.width  / 2)) * 4,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={`Project: ${project.title}`}
    >
      <Link href={`/work/${project.slug}`} className="block group">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: SLIDE_X[index] },
            visible: { opacity: 1, x: "0%", transition: { duration: 0.9, ease: EXPO } },
          }}
        >
          <motion.div
            className="flex flex-col md:grid overflow-hidden rounded-2xl md:rounded-3xl"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              border: "1px solid rgba(255,255,255,0.06)",
              transformStyle: "preserve-3d",
              perspective: "1200px",
              transition: "border-color 0.3s",
            }}
            animate={{
              rotateX: tilt.x,
              rotateY: tilt.y,
              borderColor: isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            data-cursor-view
          >
            {/* Visual panel */}
            <motion.div
              variants={bgVariant}
              className="relative overflow-hidden"
              style={{
                order: project.flip ? 2 : 1,
                minHeight: "clamp(240px, 40vw, 420px)",
                background: `linear-gradient(135deg, ${project.accent}12 0%, #101010 100%)`,
              }}
            >
              <motion.div
                variants={imageVariant}
                style={{
                  y: imageY,
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                }}
              >
                <div
                  className="relative w-full rounded-xl overflow-hidden md:w-4/5"
                  style={{
                    aspectRatio: "16/10",
                    boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accent}15`,
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {project.preview ? (
                    <Image
                      src={project.preview}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "#fff" }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
                          letterSpacing: "-0.04em",
                          color: "#111",
                        }}
                      >
                        {project.title}
                      </span>
                    </div>
                  )}

                </div>
              </motion.div>

              <div className="absolute" style={{ top: "1.25rem", left: "1.25rem", zIndex: 10 }}>
                <span className="font-caption" style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(0,0,0,0.8)" }}>
                  {project.index}
                </span>
              </div>
              <div className="absolute glass rounded-full" style={{ bottom: "1.25rem", right: "1.25rem", padding: "0.3rem 0.75rem" }}>
                <span className="font-caption">{project.year}</span>
              </div>
            </motion.div>

            {/* Info panel */}
            <motion.div
              variants={bgVariant}
              className="flex flex-col justify-between"
              style={{
                order: project.flip ? 1 : 2,
                padding: "clamp(1.5rem, 4vw, 3rem)",
                background: "#101010",
              }}
            >
              <motion.div variants={textVariant} className="flex flex-col" style={{ gap: "1.25rem" }}>
                <div className="flex flex-wrap" style={{ gap: "0.4rem" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-caption rounded-full"
                      style={{
                        padding: "0.25rem 0.65rem",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 4.5rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 0.9,
                      color: "#f5f5f5",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
                    {project.subtitle}
                  </p>
                </div>

                <p
                  className="font-editorial"
                  style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", maxWidth: "28rem" }}
                >
                  {project.description}
                </p>
              </motion.div>

              <motion.div variants={arrowVariant} style={{ marginTop: "2rem" }}>
                <motion.div
                  className="flex items-center"
                  style={{ gap: "0.75rem" }}
                  animate={{ x: isHovered ? 6 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="font-caption" style={{ color: "rgba(255,255,255,0.35)" }}>
                    View Case Study
                  </span>
                  <div style={{ width: "2rem", height: "1px", background: project.accent }} />
                  <div className="rounded-full" style={{ width: "6px", height: "6px", background: project.accent }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

export default function Projects({ projects }: { projects: Project[] }): React.JSX.Element {
  const featured = projects.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem)" }}
      aria-label="Featured Projects"
    >
      <div
        className="flex flex-col md:flex-row md:items-end justify-between"
        style={{ marginBottom: "clamp(3rem, 6vw, 5rem)", gap: "2rem" }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-caption"
            style={{ marginBottom: "1.5rem" }}
          >
            02 — Work
          </motion.p>
          <TextReveal>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2.8rem, 7.5vw, 8.5rem)", letterSpacing: "-0.04em", lineHeight: 0.9, color: "#f5f5f5" }}
            >
              Selected
              <br />
              <span style={{ color: "rgba(255,255,255,0.18)" }}>Projects</span>
            </h2>
          </TextReveal>
        </div>

        <div className="flex flex-col items-start md:items-end" style={{ gap: "1.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-editorial"
            style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.38)", maxWidth: "20rem" }}
          >
            A curated selection of work spanning design systems, platforms, and digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/work"
              className="font-caption flex items-center"
              style={{ color: "rgba(255,255,255,0.4)", gap: "0.5rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f5f5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
            >
              View all {projects.length} projects
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: "1.5rem" }}>
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
