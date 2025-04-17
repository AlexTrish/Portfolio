import { motion } from 'framer-motion';
import { Code2, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-sans text-white mb-6 relative inline-block">
          <span className="relative z-10">FRONTEND</span>
          <motion.span
            className="absolute -left-2 top-0 text-neon opacity-50"
            animate={{
              x: [-2, 2, -2],
              y: [-1, 1, -1],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          >
            FRONTEND
          </motion.span>
        </h1>
        <p className="text-neon font-mono text-xl md:text-2xl mb-8">
          <Terminal className="inline-block mr-2" /> Building digital experiences
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 flex items-center gap-4"
      >
        <Code2 className="text-neon w-8 h-8" />
        <span className="text-white font-mono">Scroll to explore</span>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-neon opacity-5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon opacity-5 rounded-full filter blur-3xl" />
      </div>
    </motion.section>
  );
}