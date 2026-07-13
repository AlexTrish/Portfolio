"use client";

import { motion } from "framer-motion";
import { useDict } from "@/app/lib/i18n/LocaleContext";

export default function Footer(): React.JSX.Element {
  const { dict } = useDict();
  const t = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer
      className="flex flex-col md:flex-row items-start md:items-center justify-between"
      style={{ padding: "2.5rem clamp(1.5rem, 6vw, 4rem)", borderTop: "1px solid rgba(255,255,255,0.06)", gap: "1.5rem" }}
      aria-label="Footer"
    >
      <div className="flex flex-col" style={{ gap: "0.25rem" }}>
        <span className="font-caption" style={{ color: "rgba(255,255,255,0.5)" }}>AlexTrish</span>
        <span className="font-caption" style={{ color: "rgba(255,255,255,0.2)" }}>{t.role}</span>
      </div>

      <div className="flex items-center" style={{ gap: "2rem" }}>
        <span className="font-caption" style={{ color: "rgba(255,255,255,0.18)" }}>© {year}</span>
        <div className="flex items-center" style={{ gap: "0.5rem" }}>
          <motion.div
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="rounded-full"
            style={{ width: "6px", height: "6px", background: "var(--accent)" }}
          />
          <span className="font-caption" style={{ color: "var(--accent)" }}>{t.available}</span>
        </div>
      </div>
    </footer>
  );
}
