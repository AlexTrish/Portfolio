"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorState = "default" | "view" | "send" | "open" | "click";

const LABEL: Record<CursorState, string> = {
  default: "",
  view: "VIEW",
  send: "SEND",
  open: "OPEN",
  click: "",
};

export default function CustomCursor(): React.JSX.Element {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 32, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 32, mass: 0.3 });

  // Ring — lags behind intentionally
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.8 });

  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setState((s) => s !== "default" ? s : "click");
    const onUp = () => setState((s) => s === "click" ? "default" : s);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const el = t.closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        const label = el.dataset.cursor as CursorState;
        setState(label ?? "default");
      } else if (t.closest("a")) {
        setState("open");
      } else if (t.closest("button[type='submit'], [data-cursor-send]")) {
        setState("send");
      } else if (t.closest("[data-cursor-view]")) {
        setState("view");
      } else if (t.closest("button, a")) {
        setState("open");
      } else {
        setState((s) => (["view","send","open"].includes(s) ? "default" : s));
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY, visible]);

  const isLabeled = state === "view" || state === "send" || state === "open";
  const isClick = state === "click";

  const ringSize = isLabeled ? 64 : isClick ? 20 : 36;
  const dotSize = isClick ? 4 : 5;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          background: isLabeled ? "var(--accent)" : "#fff",
          opacity: visible ? 1 : 0,
          transition: "background 0.2s, width 0.15s, height 0.15s",
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          border: "1px solid rgba(255,255,255,0.25)",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: isLabeled ? "var(--accent)" : "rgba(255,255,255,0.25)",
          backgroundColor: isLabeled ? "rgba(184,255,59,0.08)" : "rgba(0,0,0,0)",
        }}
        transition={{
          width: { type: "spring", stiffness: 220, damping: 22 },
          height: { type: "spring", stiffness: 220, damping: 22 },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
        }}
      >
        <AnimatePresence mode="wait">
          {isLabeled && (
            <motion.span
              key={state}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: "0.5rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                userSelect: "none",
              }}
            >
              {LABEL[state]}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
