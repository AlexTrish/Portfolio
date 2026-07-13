"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomCursor from "@/app/components/ui/CustomCursor";
import SmoothScroll from "@/app/components/ui/SmoothScroll";
import { LocaleProvider, useDict } from "@/app/lib/i18n/LocaleContext";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROJECTS = [
  { name: "Retry.VPN",     year: "2026", desc: "Landing, CRM & personal account for a zero-logs WireGuard VPN service.",             stack: "Next.js · TypeScript · Tailwind · REST API" },
  { name: "Qvor",          year: "2026", desc: "Full-stack social network & messenger with real-time messaging, WebRTC and E2EE.",    stack: "Next.js · TypeScript · WebSockets · PostgreSQL" },
  { name: "Retry.Network", year: "2025", desc: "Landing, CRM & dashboard for a decentralised web infrastructure platform.",          stack: "Next.js · TypeScript · Tailwind · REST API" },
  { name: "Retry.Proxy",   year: "2025", desc: "Privacy-first proxy service with zero-logging architecture and residential proxies.", stack: "Next.js · TypeScript · Tailwind · REST API" },
  { name: "Eline",         year: "2026", desc: "Editorial landing for a handcraft artist — booking, e-commerce, Shopify.",           stack: "Next.js · TypeScript · Shopify · Framer Motion" },
  { name: "ChemG",         year: "2024", desc: "AI-powered chemistry learning app with virtual laboratory and OpenAI assistant.",    stack: "Tauri · React · JavaScript · OpenAI" },
];

const SKILLS = [
  { category: "Frontend",       items: "React, Next.js, TypeScript, Framer Motion, GSAP, Three.js" },
  { category: "Styling",        items: "Tailwind CSS, CSS-in-JS, SCSS, Design Systems, Figma" },
  { category: "Backend",        items: "Node.js, tRPC, Prisma, PostgreSQL, Redis, GraphQL" },
  { category: "Infrastructure", items: "Vercel, AWS, Docker, CI/CD, Edge Functions" },
];

function Section({ label, children }: { label: string; children: React.ReactNode }): React.JSX.Element {
  return (
    <section style={{ marginBottom: "3.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <span className="font-caption" style={{ color: "var(--accent)" }}>{label}</span>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
      </div>
      {children}
    </section>
  );
}

function CvContent(): React.JSX.Element {
  const { dict } = useDict();
  const t = dict.cv;
  const tc = t.contacts;
  const exp = dict.experience.items;

  const CONTACTS = [
    { label: tc.website,  value: "alextrish.ru",              href: "https://alextrish.ru" },
    { label: tc.email,    value: "alextrishwork@gmail.com",   href: "mailto:alextrishwork@gmail.com" },
    { label: tc.github,   value: "github.com/AlexTrish",      href: "https://github.com/AlexTrish" },
    { label: tc.linkedin, value: "linkedin.com/in/alextrish", href: "https://www.linkedin.com/in/alextrish/" },
    { label: tc.location, value: tc.locationValue,            href: null },
  ];

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #0B0B0B !important; }
          .print-page { padding: 2rem !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        {/* Top bar */}
        <div
          className="no-print"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            padding: "1.25rem clamp(1.5rem, 6vw, 4rem)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid var(--border)",
            background: "rgba(11,11,11,0.92)",
          }}
        >
          <Link href="/" aria-label="Back to portfolio">
            <Image src="/logo.svg" alt="AlexTrish" width={72} height={15} />
          </Link>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <button
              onClick={() => window.print()}
              className="font-caption"
              style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
              aria-label="Print CV"
            >
              {t.printSave}
            </button>
            <Link
              href="/"
              className="font-caption"
              style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f5f5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
            >
              {t.back}
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="print-page" style={{ maxWidth: "860px", margin: "0 auto", padding: "8rem clamp(1.5rem, 6vw, 3rem) 6rem" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO }}
            style={{ marginBottom: "4rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem" }}>
              <div>
                <h1 className="font-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.9, color: "#f5f5f5", marginBottom: "0.75rem" }}>
                  Alexander
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>Trishin</span>
                </h1>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", fontWeight: 300, marginTop: "1rem" }}>
                  {t.role}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", alignItems: "flex-end" }}>
                {CONTACTS.map(({ label, value, href }) => (
                  <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                    <span className="font-caption" style={{ color: "var(--muted)" }}>{label}</span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="font-caption"
                        style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-caption" style={{ color: "rgba(255,255,255,0.5)" }}>{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <motion.div
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }}
              />
              <span className="font-caption" style={{ color: "var(--accent)" }}>{t.available}</span>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EXPO }}
            style={{ marginBottom: "3.5rem" }}
          >
            <p style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.5)", fontWeight: 300, maxWidth: "52rem" }}>
              {t.summary}
            </p>
          </motion.div>

          {/* Experience */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EXPO }}>
            <Section label={t.sectionExp}>
              {exp.map((item, i) => (
                <div
                  key={item.period}
                  style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "0.75rem 2rem", padding: "1.75rem 0", borderBottom: i < exp.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <span className="font-caption" style={{ paddingTop: "0.2rem" }}>{item.period}</span>
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 0.75rem", alignItems: "baseline", marginBottom: "0.6rem" }}>
                      <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "0.95rem", color: i === 0 ? "#f5f5f5" : "rgba(255,255,255,0.8)", letterSpacing: "-0.01em" }}>
                        {item.role}
                      </span>
                      <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>@ {item.company}</span>
                    </div>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(255,255,255,0.38)", fontWeight: 300, marginBottom: "0.85rem" }}>
                      {item.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {item.highlights.map((s) => (
                        <span key={s} className="font-caption" style={{ padding: "0.18rem 0.55rem", border: `1px solid ${i === 0 ? "rgba(184,255,59,0.2)" : "rgba(255,255,255,0.07)"}`, borderRadius: "999px", color: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.28)", background: i === 0 ? "rgba(184,255,59,0.04)" : "transparent" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Section>
          </motion.div>

          {/* Projects */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}>
            <Section label={t.sectionProj}>
              {PROJECTS.map((p, i) => (
                <div key={p.name} style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "0.5rem 2rem", padding: "1.25rem 0", borderBottom: i < PROJECTS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "start" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "0.85rem", color: "#f5f5f5", letterSpacing: "-0.01em" }}>{p.name}</span>
                    <span className="font-caption">{p.year}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(255,255,255,0.4)", fontWeight: 300, marginBottom: "0.5rem" }}>{p.desc}</p>
                    <span className="font-caption" style={{ color: "rgba(255,255,255,0.22)" }}>{p.stack}</span>
                  </div>
                </div>
              ))}
            </Section>
          </motion.div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: EXPO }}>
            <Section label={t.sectionSkills}>
              {SKILLS.map((s, i) => (
                <div key={s.category} style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "0.5rem 2rem", padding: "1rem 0", borderBottom: i < SKILLS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "baseline" }}>
                  <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500, fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", letterSpacing: "-0.01em" }}>{s.category}</span>
                  <span className="font-caption" style={{ color: "rgba(255,255,255,0.35)" }}>{s.items}</span>
                </div>
              ))}
            </Section>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
          >
            <span className="font-caption" style={{ color: "rgba(255,255,255,0.18)" }}>AlexTrish — {new Date().getFullYear()}</span>
            <span className="font-caption" style={{ color: "rgba(255,255,255,0.18)" }}>alextrish.ru</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function CvPageClient(): React.JSX.Element {
  return (
    <LocaleProvider>
      <SmoothScroll>
        <CustomCursor />
        <CvContent />
      </SmoothScroll>
    </LocaleProvider>
  );
}
