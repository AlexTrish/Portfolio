import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Approach from './components/Approach';
import Contact from './components/Contact';
import EasterEgg from './components/EasterEgg';
import CustomCursor from './components/CustomCursor';
import AnimatedBackdrop from './components/AnimatedBackdrop';

function App() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [keySequence, setKeySequence] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKeySequence(prev => {
        const newSequence = (prev + e.key).slice(-4);
        if (newSequence === '1337') {
          setShowEasterEgg(true);
          return '';
        }
        return newSequence;
      });
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <>
      <AnimatedBackdrop />
      <CustomCursor />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 min-h-screen text-white"
      >
        <Hero />
        <Projects />
        <About />
        <Approach />
        <Contact />
      </motion.div>

      <AnimatePresence>
        {showEasterEgg && (
          <EasterEgg onClose={() => setShowEasterEgg(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;