"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import TextReveal from "@/app/components/ui/TextReveal";

type SkillGroup = { category: string; skills: string[]; detail: string };

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Framer Motion", "GSAP", "Three.js"],
    detail: "Building pixel-perfect, performant interfaces with modern React patterns, server components, and production-grade animation systems.",
  },
  {
    category: "Styling",
    skills: ["Tailwind CSS", "CSS-in-JS", "SCSS", "Design Systems", "Figma"],
    detail: "Translating design intent into code — from token-based systems to bespoke editorial layouts that hold up at any viewport.",
  },
  {
    category: "Backend",
    skills: ["Node.js", "tRPC", "Prisma", "PostgreSQL", "Redis", "GraphQL"],
    detail: "End-to-end type-safe APIs, real-time data layers, and database schemas that scale without surprises.",
  },
  {
    category: "Infrastructure",
    skills: ["Vercel", "AWS", "Docker", "CI/CD", "Edge Functions"],
    detail: "Deploying with confidence — zero-downtime pipelines, edge-optimized delivery, and infrastructure that stays out of the way.",
  },
];

const MARQUEE_ITEMS = [
  "React", "Next.js", "TypeScript", "Framer Motion", "GSAP", "Three.js",
  "Node.js", "Prisma", "PostgreSQL", "Tailwind", "Figma", "Vercel",
  "React", "Next.js", "TypeScript", "Framer Motion", "GSAP", "Three.js",
  "Node.js", "Prisma", "PostgreSQL", "Tailwind", "Figma", "Vercel",
];

function SkillRow({ group, index }: { group: SkillGroup; index: number }): React.JSX.Element {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Mobile: stacked. Desktop: 3-col grid */}
      <div
        className="flex flex-col sm:grid items-start"
        style={{ gridTemplateColumns: "2rem 9rem 1fr", gap: "0.75rem 1.5rem", padding: "1.5rem 0" }}
      >
        <span className="font-caption hidden sm:block" style={{ paddingTop: "0.15rem" }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: hovered ? "var(--accent)" : "var(--text)",
            transition: "color 0.2s",
          }}
        >
          <span className="sm:hidden font-caption" style={{ marginRight: "0.5rem", color: "var(--muted)" }}>
            {String(index + 1).padStart(2, "0")} —
          </span>
          {group.category}
        </span>

        <div className="flex flex-col" style={{ gap: "0.75rem" }}>
          <div className="flex flex-wrap" style={{ gap: "0.4rem" }}>
            {group.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + i * 0.04 + 0.2 }}
                className="font-caption rounded-full"
                style={{
                  padding: "0.22rem 0.65rem",
                  border: `1px solid ${hovered ? "rgba(184,255,59,0.25)" : "rgba(255,255,255,0.07)"}`,
                  color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                  background: hovered ? "rgba(184,255,59,0.04)" : "transparent",
                  transition: "all 0.25s",
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.4)",
                  overflow: "hidden",
                  maxWidth: "36rem",
                }}
              >
                {group.detail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 origin-left"
        style={{ height: "1px", background: "linear-gradient(90deg, var(--accent), transparent)" }}
      />
    </motion.div>
  );
}

export default function Skills(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="overflow-hidden"
      style={{ padding: "clamp(4rem, 10vw, 8rem) 0", background: "var(--bg)" }}
      aria-label="Skills"
    >
      <div style={{ padding: "0 clamp(1.5rem, 6vw, 4rem)", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-caption"
          style={{ marginBottom: "1.5rem" }}
        >
          03 — Skills
        </motion.p>
        <TextReveal>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 8.5rem)", letterSpacing: "-0.04em", lineHeight: 0.9, color: "var(--text)" }}
          >
            Craft &amp;
            <br />
            <span style={{ color: "rgba(255,255,255,0.15)" }}>Expertise</span>
          </h2>
        </TextReveal>
      </div>

      <div
        className="overflow-hidden"
        style={{ padding: "1.25rem 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "4rem" }}
      >
        <div className="flex whitespace-nowrap">
          <div className="marquee-track flex" style={{ gap: "3rem", paddingRight: "3rem" }}>
            {MARQUEE_ITEMS.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="font-display select-none"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 4rem)", letterSpacing: "-0.03em", color: "rgba(255,255,255,0.06)" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "0 clamp(1.5rem, 6vw, 4rem)" }}>
        {SKILL_GROUPS.map((group, i) => (
          <SkillRow key={group.category} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}
