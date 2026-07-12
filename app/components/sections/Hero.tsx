"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from "framer-motion";

// ─── Per-character split text with individual scroll scatter ──
type SplitProps = {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
  stagger?: number;
  scrollProgress: MotionValue<number>;
  scatterStart?: number; // scroll progress when scatter begins
};

// Single char — separates enter animation from scroll-scatter
function SplitChar({
  char, enterDelay, scrollProgress, scatterStart, index,
}: {
  char: string;
  enterDelay: number;
  scrollProgress: MotionValue<number>;
  scatterStart: number;
  index: number;
}): React.JSX.Element {
  const seed = (index * 137.5) % 360;
  const rad  = (seed * Math.PI) / 180;
  // Round to 2 decimal places — prevents SSR/client float mismatch
  const dx   = Math.round(Math.cos(rad) * 60 * 100) / 100;
  const dy   = Math.round((Math.sin(rad) * 40 - 20) * 100) / 100;

  // Scroll-driven scatter (exit)
  const scatterOpacity = useTransform(scrollProgress, [scatterStart, scatterStart + 0.25], [1, 0]);
  const scatterX       = useTransform(scrollProgress, [scatterStart, scatterStart + 0.3],  [0, dx]);
  const scatterY       = useTransform(scrollProgress, [scatterStart, scatterStart + 0.3],  [0, dy]);
  const blurRaw        = useTransform(scrollProgress, [scatterStart, scatterStart + 0.25], [0, 8]);
  const scatterFilter  = useTransform(blurRaw, (v) => `blur(${v}px)`);

  return (
    <span className="char-wrap">
      {/* Outer: scroll-driven scatter */}
      <motion.span
        style={{ display: "inline-block", x: scatterX, y: scatterY, opacity: scatterOpacity, filter: scatterFilter }}
      >
        {/* Inner: enter animation — mirrors scatter direction */}
        <motion.span
          className="char-inner"
          initial={{ x: -dx, y: -dy, opacity: 0, filter: "blur(8px)" }}
          animate={{ x: 0, y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: enterDelay, ease: [0.16, 1, 0.3, 1] }}
        >
          {char}
        </motion.span>
      </motion.span>
    </span>
  );
}

function SplitText({ text, delay = 0, style = {}, stagger = 0.04, scrollProgress, scatterStart = 0.15 }: SplitProps): React.JSX.Element {
  return (
    <span style={{ display: "block", ...style }} aria-label={text}>
      {text.split("").map((char, i) => (
        <SplitChar
          key={i}
          char={char}
          enterDelay={delay + i * stagger}
          scrollProgress={scrollProgress}
          scatterStart={scatterStart}
          index={i}
        />
      ))}
    </span>
  );
}

// ─── Typewriter ───────────────────────────────────────────
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }): React.JSX.Element {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(iv);
    }, 36);
    return () => clearInterval(iv);
  }, [started, text]);

  return (
    <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.01em" }}>
      {displayed}
      {displayed.length < text.length && (
        <span className="blink" style={{ color: "var(--accent)" }}>|</span>
      )}
    </span>
  );
}

// ─── Metadata ─────────────────────────────────────────────
const METADATA = [
  { label: "ROLE",      value: "Frontend Developer"           },
  { label: "LOCATION",  value: "Europe"                       },
  { label: "AVAILABLE", value: "Freelance"                    },
  { label: "STACK",     value: "React · Next.js · TypeScript" },
];

// ─── Main ─────────────────────────────────────────────────
export default function Hero(): React.JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  // Content fade + parallax
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 1]); // stays visible until scatter kicks in

  // Orb exits: scale down + blur
  const orbScale = useTransform(scrollYProgress, [0.1, 0.5], [1, 0.6]);
  const orbOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const orbBlurRaw = useTransform(scrollYProgress, [0.1, 0.45], [0, 20]);
  const orbFilter = useTransform(orbBlurRaw, (v) => `blur(${v}px)`);

  // Mouse parallax for orb — 3-5px max movement
  const rawMX = useMotionValue(0);
  const rawMY = useMotionValue(0);
  const orbX  = useSpring(rawMX, { stiffness: 55, damping: 18 });
  const orbY  = useSpring(rawMY, { stiffness: 55, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      rawMX.set(((e.clientX - cx) / cx) * 5);
      rawMY.set(((e.clientY - cy) / cy) * 5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawMX, rawMY]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ paddingBottom: "5rem", paddingLeft: "clamp(1.5rem, 6vw, 4rem)", paddingRight: "clamp(1.5rem, 6vw, 4rem)", background: "var(--bg)" }}
      aria-label="Hero"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 50% at 70% 35%, rgba(184,255,59,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Breathing orb — exits on scroll */}
      <motion.div
        style={{
          x: orbX, y: orbY,
          scale: orbScale,
          opacity: orbOpacity,
          filter: orbFilter,
          position: "absolute", top: "4rem", right: "clamp(1.5rem, 6vw, 4rem)",
          width: "min(500px, 44vw)", aspectRatio: "1",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ border: "1px solid rgba(255,255,255,0.04)" }}
        />
        {/* Mid ring */}
        <motion.div
          className="absolute rounded-full"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ inset: "12%", border: "1px solid rgba(255,255,255,0.06)" }}
        />
        {/* Inner orb — breathing 20s cycle */}
        <motion.div
          className="absolute rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.03, 1] }}
          transition={{
            opacity: { duration: 1.2, delay: 0.7 },
            scale:   { duration: 20, delay: 0.7, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            inset: "28%",
            background: "radial-gradient(circle at 38% 35%, rgba(184,255,59,0.12) 0%, rgba(184,255,59,0.02) 55%, transparent 100%)",
            boxShadow: "inset 0 0 60px rgba(184,255,59,0.06), 0 0 80px rgba(184,255,59,0.04)",
          }}
        />
        {/* Accent dot */}
        <motion.div
          className="absolute rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          style={{ top: "26%", right: "26%", width: "10px", height: "10px", background: "var(--accent)", boxShadow: "0 0 16px rgba(184,255,59,0.8)" }}
        />
        {/* Cross lines */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute origin-left"
          style={{ top: "50%", left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
        />
        <motion.div
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute origin-top"
          style={{ left: "50%", top: "10%", bottom: "10%", width: "1px", background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.07), transparent)" }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div style={{ y: headlineY, opacity: contentOpacity }} className="relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-caption"
          style={{ marginBottom: "2.5rem" }}
        >
          Portfolio — 2026
        </motion.p>

        <h1 aria-label="Building Digital Experiences">
          <SplitText
            text="BUILDING"
            delay={0.3}
            stagger={0.045}
            scrollProgress={scrollYProgress}
            scatterStart={0.12}
            style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "clamp(3.5rem, 11vw, 13rem)", lineHeight: 0.88, letterSpacing: "-0.04em", color: "var(--text)" }}
          />
          <SplitText
            text="DIGITAL"
            delay={0.55}
            stagger={0.045}
            scrollProgress={scrollYProgress}
            scatterStart={0.18}
            style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "clamp(3.5rem, 11vw, 13rem)", lineHeight: 0.88, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.15)" }}
          />
          <SplitText
            text="EXPERIENCES"
            delay={0.78}
            stagger={0.032}
            scrollProgress={scrollYProgress}
            scatterStart={0.24}
            style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "clamp(3.5rem, 11vw, 13rem)", lineHeight: 0.88, letterSpacing: "-0.04em", color: "var(--text)" }}
          />
        </h1>

        {/* Metadata — typewriter */}
        <div className="flex flex-wrap" style={{ marginTop: "3.5rem", gap: "2rem 3.5rem" }}>
          {METADATA.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
              className="flex flex-col"
              style={{ gap: "0.3rem" }}
            >
              <span className="font-caption">{item.label} —</span>
              <Typewriter text={item.value} delay={1.15 + i * 0.18} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 origin-left"
        style={{ left: "clamp(1.5rem, 6vw, 4rem)", right: "clamp(1.5rem, 6vw, 4rem)", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
      />
    </section>
  );
}
