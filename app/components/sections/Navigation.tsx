"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useDict } from "@/app/lib/i18n/LocaleContext";
import { LOCALES, type Locale } from "@/app/lib/i18n";

const LOCALE_LABELS: Record<Locale, string> = { en: "EN", ru: "RU", cs: "CS" };

export default function Navigation(): React.JSX.Element {
  const { dict, locale, setLocale } = useDict();
  const t = dict.nav;

  const NAV_LINKS = [
    { label: t.work,       href: "#projects"   },
    { label: t.about,      href: "#about"      },
    { label: t.skills,     href: "#skills"     },
    { label: t.experience, href: "#experience" },
    { label: t.contact,    href: "#contact"    },
  ];

  const pathname = usePathname();
  const router   = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/");
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed", top: 0, left: 0, right: 0,
          height: "2px", background: "var(--accent)",
          transformOrigin: "left", zIndex: 99997,
        }}
      />

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[9000]"
        style={{ paddingTop: "2px" }}
        aria-label="Main navigation"
      >
        <div
          style={{
            padding: scrolled ? "0.85rem clamp(1.5rem, 6vw, 4rem)" : "1.5rem clamp(1.5rem, 6vw, 4rem)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            transition: "padding 0.4s ease",
            background: scrolled ? "rgba(11,11,11,0.92)" : "transparent",
            backdropFilter: scrolled && !isMobile ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled && !isMobile ? "blur(20px)" : "none",
            borderBottom: scrolled ? "1px solid var(--border)" : "none",
            width: "100%", boxSizing: "border-box",
          }}
        >
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} aria-label="Go to homepage" data-cursor="open">
            <Image src="/logo.svg" alt="AlexTrish" width={80} height={17} priority />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center" style={{ gap: "2.5rem", listStyle: "none" }} role="list">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-caption relative"
                    style={{ color: isActive ? "var(--accent)" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute rounded-full"
                        style={{ width: "3px", height: "3px", background: "var(--accent)", bottom: "-6px", left: "50%", transform: "translateX(-50%)" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right side: locale switcher + CV + Available */}
          <div className="hidden md:flex items-center" style={{ gap: "1.5rem" }}>
            {/* Locale switcher */}
            <div className="flex items-center" style={{ gap: "0.25rem" }}>
              {LOCALES.map((loc, i) => (
                <span key={loc} className="flex items-center" style={{ gap: "0.25rem" }}>
                  <button
                    onClick={() => setLocale(loc)}
                    className="font-caption"
                    style={{
                      color: locale === loc ? "var(--accent)" : "rgba(255,255,255,0.25)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { if (locale !== loc) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
                    onMouseLeave={(e) => { if (locale !== loc) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
                    aria-label={`Switch to ${loc}`}
                  >
                    {LOCALE_LABELS[loc]}
                  </button>
                  {i < LOCALES.length - 1 && (
                    <span className="font-caption" style={{ color: "rgba(255,255,255,0.1)" }}>/</span>
                  )}
                </span>
              ))}
            </div>

            <Link
              href="/cv"
              className="font-caption"
              style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
            >
              {t.cv}
            </Link>

            <a
              href="mailto:alextrishwork@gmail.com"
              className="font-caption flex items-center"
              style={{ gap: "0.45rem", color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
            >
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full"
                style={{ width: "5px", height: "5px", background: "var(--accent)", flexShrink: 0 }}
              />
              {t.available}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col"
            style={{ gap: "5px", padding: "0.5rem" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 6 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                style={{ display: "block", width: "20px", height: "1px", background: "#fff", transformOrigin: "center" }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[8999] flex flex-col items-center justify-center"
            style={{ background: "rgba(11,11,11,0.98)", gap: "2rem" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNavClick(link.href)}
                className="font-display"
                style={{ fontSize: "clamp(2rem, 8vw, 4rem)", color: active === link.href ? "var(--accent)" : "rgba(255,255,255,0.75)" }}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="flex items-center" style={{ gap: "1.5rem", marginTop: "1rem" }}
            >
              <Link href="/work" className="font-caption" style={{ color: "rgba(255,255,255,0.3)" }}>
                {t.allWork}
              </Link>
              <Link href="/cv" className="font-caption" style={{ color: "rgba(255,255,255,0.3)" }}>
                {t.cv}
              </Link>
            </motion.div>

            {/* Mobile locale switcher */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex items-center" style={{ gap: "1rem" }}
            >
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { setLocale(loc); setMenuOpen(false); }}
                  className="font-caption"
                  style={{ color: locale === loc ? "var(--accent)" : "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}
                >
                  {LOCALE_LABELS[loc]}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
