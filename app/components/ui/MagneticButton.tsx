"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  onClick?: () => void;
  href?: string;
  "aria-label"?: string;
};

export default function MagneticButton({
  children,
  className = "",
  style,
  strength = 0.4,
  onClick,
  href,
  "aria-label": ariaLabel,
}: MagneticButtonProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      >
        {href ? (
          <a
            href={href}
            aria-label={ariaLabel}
            className={className}
            style={style}
          >
            {children}
          </a>
        ) : (
          <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={className}
            style={style}
          >
            {children}
          </button>
        )}
      </motion.div>
    </div>
  );
}
