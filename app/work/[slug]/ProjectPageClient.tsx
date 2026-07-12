"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SmoothScroll from "@/app/components/ui/SmoothScroll";
import CustomCursor from "@/app/components/ui/CustomCursor";
import Navigation from "@/app/components/sections/Navigation";
import Footer from "@/app/components/sections/Footer";
import TextReveal from "@/app/components/ui/TextReveal";
import type { Project, ProjectImage } from "@/app/lib/projects";

type ProjectProps = { project: Project };
type Props = { project: Project; projects: Project[] };

function HeroSection({ project }: ProjectProps): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 clamp(1.5rem, 6vw, 4rem) 5rem" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 60% 40%, ${project.accent}09 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Hero image — parallax */}
      <motion.div
        className="hidden md:block"
        style={{
          y: imageY,
          position: "absolute",
          top: "5rem",
          right: "clamp(1.5rem, 6vw, 4rem)",
          width: "min(560px, 46vw)",
          aspectRatio: "16/10",
          borderRadius: "1.5rem",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 60px ${project.accent}12`,
        }}
        aria-hidden="true"
      >
        {project.preview ? (
          <Image
            src={project.preview}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 46vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "#fff" }}
          >
            <span
              className="font-display"
              style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", letterSpacing: "-0.04em", color: "#111" }}
            >
              {project.title}
            </span>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center font-caption"
          style={{ marginBottom: "2.5rem", gap: "1rem" }}
        >
          <Link
            href="/work"
            style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f5f5")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
          >
            ← All Work
          </Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>{project.index}</span>
        </motion.div>

        <h1 className="font-display" aria-label={project.title}>
          <TextReveal delay={0.1}>
            <span
              className="block"
              style={{
                fontSize: "clamp(4rem, 12vw, 13rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: "#f5f5f5",
              }}
            >
              {project.title}
            </span>
          </TextReveal>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center"
          style={{ marginTop: "2.5rem", gap: "2rem 4rem" }}
        >
          <div className="flex flex-col" style={{ gap: "0.3rem" }}>
            <span className="font-caption">Project</span>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
              {project.subtitle}
            </span>
          </div>
          <div className="flex flex-col" style={{ gap: "0.3rem" }}>
            <span className="font-caption">Year</span>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
              {project.year}
            </span>
          </div>
          <div className="flex flex-col" style={{ gap: "0.3rem" }}>
            <span className="font-caption">Stack</span>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
              {project.tags.join(" · ")}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 origin-left"
        style={{
          left: "clamp(1.5rem, 6vw, 4rem)",
          right: "clamp(1.5rem, 6vw, 4rem)",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />
    </section>
  );
}

function OverviewSection({ project }: ProjectProps): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem)" }}
    >
      <div
        className="flex flex-col md:grid"
        style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 6rem)", alignItems: "start" }}
      >
        {/* Left — long description */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-caption"
            style={{ marginBottom: "2rem" }}
          >
            Overview
          </motion.p>
          <TextReveal delay={0.1}>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 700,
              }}
            >
              {project.longDescription}
            </p>
          </TextReveal>
        </div>

        {/* Right — highlights + links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
          style={{ gap: "3rem", paddingTop: "0" }}
        >
          {/* Highlights */}
          <div className="flex flex-col" style={{ gap: "0.75rem" }}>
            <span className="font-caption" style={{ marginBottom: "0.5rem" }}>Highlights</span>
            {project.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, x: 12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center"
                style={{ gap: "0.75rem" }}
              >
                <div
                  className="rounded-full"
                  style={{ width: "4px", height: "4px", background: project.accent, flexShrink: 0 }}
                />
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                  {h}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Links */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-col" style={{ gap: "0.75rem" }}>
              <span className="font-caption" style={{ marginBottom: "0.5rem" }}>Links</span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-caption flex items-center"
                  style={{ color: project.accent, gap: "0.5rem", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Live Site ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-caption flex items-center"
                  style={{ color: "rgba(255,255,255,0.4)", gap: "0.5rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f5f5")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection({ project }: ProjectProps): React.JSX.Element {
  return (
    <section style={{ padding: "0 clamp(1.5rem, 6vw, 4rem) clamp(4rem, 8vw, 8rem)" }}>
      <div className="flex flex-col" style={{ gap: "1.5rem" }}>
        {/* Video if available */}
        {project.video && (
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full"
              style={{ display: "block" }}
            />
          </div>
        )}

        {/* Images */}
        {project.images.map((img, i) => {
          const isFirst = i === 0 && !project.video;
          return (
            <ImageBlock key={img.src} img={img} accent={project.accent} large={isFirst} />
          );
        })}
      </div>
    </section>
  );
}

function ImageBlock({
  img,
  accent,
  large,
}: {
  img: ProjectImage;
  accent: string;
  large: boolean;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        background: `${accent}08`,
        ...(img.scroll && { aspectRatio: "16/9", overflowY: "auto" }),
      }}
    >
      {img.scroll ? (
        <Image
          src={img.src}
          alt={img.alt}
          width={1600}
          height={900}
          className="w-full"
          style={{ display: "block" }}
          sizes="(max-width: 768px) 100vw, calc(100vw - 8rem)"
        />
      ) : (
        <motion.div style={{ y }}>
          <Image
            src={img.src}
            alt={img.alt}
            width={1600}
            height={large ? 900 : 700}
            className="w-full"
            style={{ display: "block" }}
            sizes="(max-width: 768px) 100vw, calc(100vw - 8rem)"
          />
        </motion.div>
      )}
    </motion.div>
  );
}

function NextProjectSection({ project, projects }: Props): React.JSX.Element {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="font-caption"
        style={{ marginBottom: "2rem" }}
      >
        Next Project
      </motion.p>

      <Link href={`/work/${next.slug}`} className="block group">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between"
        >
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.25)",
                fontWeight: 300,
                marginBottom: "0.5rem",
              }}
            >
              {next.index} — {next.subtitle}
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 8rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "#f5f5f5",
                transition: "color 0.3s",
              }}
            >
              {next.title}
            </h2>
          </div>

          <motion.div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "4rem",
              height: "4rem",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.4)",
              flexShrink: 0,
            }}
            whileHover={{ scale: 1.1, borderColor: next.accent, color: next.accent }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 12L12 2M12 2H4M12 2V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </Link>
    </section>
  );
}

export default function ProjectPageClient({ project, projects }: Props): React.JSX.Element {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection project={project} />
        <OverviewSection project={project} />
        <GallerySection project={project} />
        <NextProjectSection project={project} projects={projects} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
