"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SmoothScroll from "@/app/components/ui/SmoothScroll";
import CustomCursor from "@/app/components/ui/CustomCursor";
import Navigation from "@/app/components/sections/Navigation";
import Footer from "@/app/components/sections/Footer";
import TextReveal from "@/app/components/ui/TextReveal";
import type { Project } from "@/app/lib/projects";

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${project.slug}`} className="block group">
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: "3rem 1fr 2.5rem",
            gap: "1.25rem",
            padding: "2rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            transition: "border-color 0.3s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")
          }
        >
          {/* Index */}
          <span className="font-caption" style={{ color: `${project.accent}80` }}>
            {project.index}
          </span>

          {/* Title + subtitle + tags + thumbnail */}
          <div className="flex items-center" style={{ gap: "1.5rem", minWidth: 0 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.4rem, 3.5vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "#f5f5f5",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  marginTop: "0.3rem",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.3)",
                  fontWeight: 300,
                }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Tags */}
            <div className="hidden lg:flex flex-wrap justify-end" style={{ gap: "0.35rem", flexShrink: 0 }}>
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-caption rounded-full"
                  style={{
                    padding: "0.2rem 0.55rem",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.28)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Thumbnail */}
            <div
              className="relative overflow-hidden rounded-xl hidden sm:flex items-center justify-center"
              style={{
                width: "clamp(6rem, 14vw, 14rem)",
                height: "60px",
                flexShrink: 0,
                border: "1px solid rgba(255,255,255,0.07)",
                background: `${project.accent}10`,
              }}
            >
              {project.preview ? (
                <Image
                  src={project.preview}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="14rem"
                />
              ) : (
                <span
                  className="font-display"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "-0.02em",
                    color: "#111",
                    background: "#fff",
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 0.75rem",
                    textAlign: "center",
                  }}
                >
                  {project.title}
                </span>
              )}
            </div>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
            }}
            whileHover={{ x: 4, borderColor: "rgba(255,255,255,0.3)", color: "#f5f5f5" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 12L12 2M12 2H4M12 2V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkPageClient({ projects }: { projects: Project[] }): React.JSX.Element {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main style={{ paddingTop: "8rem" }}>
        {/* Header */}
        <section style={{ padding: "4rem clamp(1.5rem, 6vw, 4rem) 6rem" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-caption"
            style={{ marginBottom: "2rem" }}
          >
            All Work — {projects.length} Projects
          </motion.p>
          <TextReveal>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 11rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.88,
                color: "#f5f5f5",
              }}
            >
              Selected
              <br />
              <span style={{ color: "rgba(255,255,255,0.18)" }}>Work</span>
            </h1>
          </TextReveal>
        </section>

        {/* Project list */}
        <section style={{ padding: "0 clamp(1.5rem, 6vw, 4rem) 8rem" }}>
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
