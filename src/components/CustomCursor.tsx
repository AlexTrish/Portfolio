import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element) || typeof target.matches !== 'function') return;

      const selectorsMap: { [key: string]: string } = {
        'button[type="submit"]': 'SEND',
        'a[href^="mailto:"]': 'EMAIL',
        'a[href^="https://github.com"]': 'CODE',
        'a': 'LINK',
        'input, textarea': 'TYPE',
        'canvas': 'EXPLORE',
      };

      for (const selector in selectorsMap) {
        if (target.matches(selector)) {
          setIsHovering(true);
          setCursorText(selectorsMap[selector]);
          return;
        }
      }

      if (target.matches('button, a, [role="button"], input, textarea')) {
        setIsHovering(true);
        setCursorText('CLICK');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    const handleMouseDown = () => {
      setIsHovering(true);
    };

    const handleMouseUp = () => {
      setIsHovering(false);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave, true);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile || !visible) return null;

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >

        <motion.div
          className="w-4 h-4 bg-neon rounded-full relative"
          animate={{
            scale: isHovering ? 0.5 : 1,
          }}
        />
        

        <motion.div
          className="absolute inset-0 border border-neon rounded-full"
          animate={{
            scale: isHovering ? 3 : 1.5,
            opacity: isHovering ? 0.3 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        
  
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="text-neon font-mono text-xs bg-dark px-2 py-1 rounded">
              {cursorText}
            </span>
          </motion.div>
        )}
        

        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon rounded-full"
              animate={{
                x: [0, Math.cos(i * 2.1) * 20, 0],
                y: [0, Math.sin(i * 2.1) * 20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}