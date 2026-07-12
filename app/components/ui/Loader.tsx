"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = { onComplete: () => void };

export default function Loader({ onComplete }: Props): React.JSX.Element {
  const [phase, setPhase] = useState<"logo" | "line" | "reveal" | "done">("logo");

  useEffect(() => {
    // logo → line
    const t1 = setTimeout(() => setPhase("line"), 900);
    // line → reveal
    const t2 = setTimeout(() => setPhase("reveal"), 1700);
    // reveal → done (unmount)
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "#0B0B0B" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase === "logo" || phase === "line" ? 1 : 0, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo.svg"
              alt="Alex Mercer"
              width={160}
              height={34}
              priority
              style={{ filter: "brightness(1)" }}
            />
          </motion.div>

          {/* Expanding line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              phase === "line" || phase === "reveal"
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              height: "1px",
              background: "var(--accent)",
              transformOrigin: "left",
            }}
          />

          {/* Counter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "line" ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="font-caption"
            style={{ position: "absolute", bottom: "2rem", right: "4rem", color: "var(--accent)" }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
