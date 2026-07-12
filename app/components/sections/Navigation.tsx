"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const NAV_LINKS = [
  { label: "Work",       href: "#projects"   },
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Navigation(): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  function LogoLink(): React.JSX.Element {
    const isHome = pathname === "/";
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (isHome) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    };
    return (
      <a href="/" onClick={handleClick} aria-label="Go to homepage" data-cursor="open">
        <Image src="/logo.svg" alt="AlexTrish" width={80} height={17} priority />
      </a>
    );
  }
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState("");

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
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
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "var(--accent)",
          transformOrigin: "left",
          zIndex: 99997,
        }}
      />

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[9000]"
        style={{ paddingTop: "2px" }} // offset for progress bar
        aria-label="Main navigation"
      >
        <div
          style={{
            padding: scrolled ? "0.85rem clamp(1.5rem, 6vw, 4rem)" : "1.5rem clamp(1.5rem, 6vw, 4rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "padding 0.4s ease",
            background: scrolled ? "rgba(11,11,11,0.85)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? "1px solid var(--border)" : "none",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Logo */}
          <LogoLink />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center" style={{ gap: "2.5rem", listStyle: "none" }} role="list">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-caption relative"
                    style={{
                      color: isActive ? "var(--accent)" : "rgba(255,255,255,0.4)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute rounded-full"
                        style={{
                          width: "3px", height: "3px",
                          background: "var(--accent)",
                          bottom: "-6px", left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Available + CV */}
          <div className="hidden md:flex items-center" style={{ gap: "1.5rem" }}>
            <a
              href="/cvv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption"
              style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
              data-cursor="open"
            >
              CV ↗
            </a>
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
              Available
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
            style={{ background: "rgba(11,11,11,0.97)", backdropFilter: "blur(24px)", gap: "2rem" }}
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
                style={{
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  color: active === link.href ? "var(--accent)" : "rgba(255,255,255,0.75)",
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="flex items-center" style={{ gap: "1.5rem", marginTop: "1rem" }}
            >
              <Link href="/work" className="font-caption" style={{ color: "rgba(255,255,255,0.3)" }}>
                All Work
              </Link>
              <a href="/cvv.pdf" target="_blank" rel="noopener noreferrer" className="font-caption" style={{ color: "rgba(255,255,255,0.3)" }}>
                CV ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
