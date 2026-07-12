"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import TextReveal from "@/app/components/ui/TextReveal";

function FlipCounter({ target, delay = 0 }: { target: string; delay?: number }): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    const duration = 900;
    const startTime = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (now < startTime) { requestAnimationFrame(tick); return; }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(`${Math.round(eased * num)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, delay]);

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "block",
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
          letterSpacing: "-0.04em",
          color: "var(--text)",
        }}
      >
        {value}
      </motion.span>
    </div>
  );
}

const STATS = [
  { value: "7+",  label: "Years of experience" },
  { value: "40+", label: "Projects shipped"    },
  { value: "12",  label: "Happy clients"       },
];

export default function About(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-12%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem)", background: "var(--bg-2)" }}
      aria-label="About"
    >
      <div
        className="absolute pointer-events-none"
        style={{ top: 0, left: 0, width: "40%", height: "60%", background: "radial-gradient(ellipse at 0% 0%, rgba(184,255,59,0.03) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="font-caption"
        style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}
      >
        01 — About
      </motion.p>

      {/* Two-column on lg, single column on mobile */}
      <div className="flex flex-col lg:grid lg:grid-cols-12" style={{ gap: "clamp(3rem, 6vw, 0px)" }}>

        {/* Left — quote + stats */}
        <div className="lg:col-span-8" style={{ paddingRight: "0" }}>
          <TextReveal delay={0.1}>
            <p
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 4vw, 5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.88)",
              }}
            >
              I craft interfaces that feel{" "}
              <motion.span
                initial={{ color: "var(--text)" }}
                animate={isInView ? { color: "var(--accent)", textShadow: "0 0 28px rgba(184,255,59,0.45)" } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ display: "inline" }}
              >
                inevitable
              </motion.span>
              {" "}— where every pixel earns its place.
            </p>
          </TextReveal>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left"
            style={{ marginTop: "3rem", height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }}
          />

          <div className="flex flex-wrap" style={{ marginTop: "3rem", gap: "2rem 4rem" }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col" style={{ gap: "0.3rem" }}>
                <FlipCounter target={stat.value} delay={0.7 + i * 0.15} />
                <span className="font-caption">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — bio */}
        <div className="lg:col-span-4 relative flex flex-col justify-between" style={{ gap: "2rem" }}>
          <motion.div
            style={{ y: lineY, position: "absolute", right: 0, top: 0, bottom: 0, width: "1px" }}
            className="hidden lg:block"
            aria-hidden="true"
          >
            <div style={{ height: "100%", background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.05), transparent)" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
            style={{ gap: "1.5rem" }}
          >
            <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(255,255,255,0.45)" }}>
              Based in Europe, I specialize in building high-performance web applications
              with a deep focus on interaction design, animation, and developer experience.
            </p>
            <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(255,255,255,0.45)" }}>
              My work sits at the intersection of engineering precision and visual craft —
              I believe the best interfaces are the ones you don&apos;t notice, because they simply work.
            </p>

            <div
              className="rounded-2xl"
              style={{ marginTop: "0.5rem", padding: "1.25rem", background: "rgba(184,255,59,0.04)", border: "1px solid rgba(184,255,59,0.12)" }}
            >
              <p className="font-caption" style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Currently</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.6 }}>
                Open to senior frontend &amp; full-stack roles and freelance collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
