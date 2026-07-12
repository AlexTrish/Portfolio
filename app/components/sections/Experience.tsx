"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/app/components/ui/TextReveal";

type Experience = {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  highlights: string[];
};

const EXPERIENCES: Experience[] = [
  {
    period: "2024 — Present",
    role: "Full-Stack Developer",
    company: "Self Employed",
    type: "Full-time",
    description:
      "Building full-stack web applications from concept to production. Designing scalable frontend architecture with React, Next.js and TypeScript while developing backend services, REST APIs and authentication systems. Managing deployment, performance optimization and the complete development lifecycle.",
    highlights: [
      "React",
      "Next.js",
      "Node.js",
      "REST API",
      "Architecture",
    ],
  },
  {
    period: "2021 — 2024",
    role: "Middle Frontend Developer",
    company: "Self Employed",
    type: "Full-time",
    description:
      "Developed responsive web applications, implemented complex user interfaces, integrated REST APIs and collaborated with designers to deliver polished user experiences. Focused on performance, accessibility and maintainable code architecture.",
    highlights: [
      "React",
      "TypeScript",
      "Performance",
      "UI/UX",
      "REST API",
    ],
  },
  {
    period: "2020 — 2021",
    role: "Junior Frontend Developer",
    company: "Self Employed",
    type: "Full-time",
    description:
      "Built responsive interfaces, maintained existing projects and implemented new features under guidance. Gained experience with modern frontend technologies, component-based development and Git workflows.",
    highlights: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
    ],
  },
];

function ExperienceItem({
  experience,
  index,
  isLast,
}: {
  experience: Experience;
  index: number;
  isLast: boolean;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const isActive = index === 0;

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{
        padding: "clamp(1.5rem, 4vw, 3rem) 0",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Mobile: stacked. md+: 3-col grid */}
      <div className="flex flex-col md:grid md:items-start" style={{ gridTemplateColumns: "10rem 1.5rem 1fr", gap: "0.75rem 2rem" }}>

        {/* Period */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-caption">{experience.period}</span>
        </motion.div>

        {/* Timeline dot + line — hidden on mobile */}
        <div className="hidden md:flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full"
            style={{
              width: "8px",
              height: "8px",
              marginTop: "0.3rem",
              flexShrink: 0,
              border: isActive ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.2)",
              background: isActive ? "var(--accent)" : "var(--bg-2)",
              boxShadow: isActive ? "0 0 12px rgba(184,255,59,0.6)" : "none",
              position: "relative",
              zIndex: 1,
            }}
          />
          {!isLast && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: "linear" }}
              className="origin-top"
              style={{ flex: 1, width: "1px", background: "rgba(255,255,255,0.06)", marginTop: "0.5rem" }}
            />
          )}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: index * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
          style={{ gap: "0.75rem" }}
        >
          <div className="flex flex-wrap items-baseline" style={{ gap: "0.5rem 0.75rem" }}>
            <h3
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: "clamp(1.2rem, 2.5vw, 2.2rem)",
                letterSpacing: "-0.03em",
                color: isActive ? "var(--text)" : "rgba(255,255,255,0.85)",
              }}
            >
              {experience.role}
            </h3>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
              @ {experience.company}
            </span>
            <span
              className="font-caption rounded-full"
              style={{ padding: "0.2rem 0.6rem", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}
            >
              {experience.type}
            </span>
          </div>

          <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.75, color: "rgba(255,255,255,0.4)", maxWidth: "38rem" }}>
            {experience.description}
          </p>

          <div className="flex flex-wrap" style={{ gap: "0.75rem" }}>
            {experience.highlights.map((h) => (
              <span key={h} className="font-caption" style={{ color: isActive ? "var(--accent)" : "rgba(255,255,255,0.3)" }}>
                #{h}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem)", background: "var(--bg-2)" }}
      aria-label="Experience"
    >
      <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-caption"
          style={{ marginBottom: "1.5rem" }}
        >
          04 — Experience
        </motion.p>
        <TextReveal>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 8.5rem)", letterSpacing: "-0.04em", lineHeight: 0.9, color: "var(--text)" }}
          >
            Where
            <br />
            <span style={{ color: "rgba(255,255,255,0.15)" }}>I&apos;ve Been</span>
          </h2>
        </TextReveal>
      </div>

      <div>
        {EXPERIENCES.map((exp, i) => (
          <ExperienceItem
            key={exp.company + exp.period}
            experience={exp}
            index={i}
            isLast={i === EXPERIENCES.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
