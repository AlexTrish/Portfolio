import { motion } from 'framer-motion';
import { Github as GitHub, Linkedin, Mail, Scissors, Code, Server, Palette, GitBranch, Apple, Package, Terminal, Monitor } from 'lucide-react';

const IconBackground = () => {
  const icons = [Code, Server, Palette, GitBranch, Apple, Package, Terminal, Monitor];
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 4,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          <Icon size={48} className="text-rust-500 dark:text-gray-600" />
        </motion.div>
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-grunge-900 dark:bg-gray-900">
      <div className="hero-pattern absolute inset-0"></div>
      <div className="icon-grid"></div>
      <IconBackground />
      <div className="noise-overlay"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <motion.div 
            className="brutalist-container bg-grunge-800 dark:bg-gray-800 p-8 -rotate-1 mb-12"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: -1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.h1 
              className="text-7xl sm:text-9xl font-marker text-grunge-100 glitch-effect"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 200
              }}
            >
              Alex Trish
            </motion.h1>
          </motion.div>

          <motion.div
            className="torn-paper clip-torn bg-grunge-100 dark:bg-gray-800 p-6 rotate-1 mb-12 max-w-2xl mx-auto"
            initial={{ x: -100, opacity: 0, rotate: -5 }}
            animate={{ x: 0, opacity: 1, rotate: 1 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
          >
            <p className="text-xl sm:text-2xl text-grunge-900 dark:text-gray-100 font-grunge text-center">
              Frontend Developer based in Russia
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: <GitHub />, href: "https://github.com/AlexTrish/", rotate: -2 },
              { icon: <Linkedin />, href: "https://linkedin.com", rotate: 2 },
              { icon: <Mail />, href: "mailto:alextrishwork@gmail.com", rotate: -1 }
            ].map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="brutalist-container p-5 bg-rust-500 hover:bg-rust-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                initial={{ scale: 0, rotate: link.rotate * 5 }}
                animate={{ scale: 1, rotate: link.rotate }}
                transition={{ 
                  delay: 0.6 + index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: link.rotate * 3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.9,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.a
              href="#contact"
              className="brutalist-container bg-grunge-100 dark:bg-gray-800 text-grunge-900 dark:text-gray-100 px-8 py-4 font-marker text-xl rotate-2 relative"
              whileHover={{ 
                scale: 1.05, 
                rotate: 4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contact Me</span>
              <motion.div
                initial={{ rotate: 45 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-3 -right-3"
              >
              </motion.div>
            </motion.a>
            <motion.a
              href="#projects"
              className="brutalist-container bg-rust-500 dark:bg-gray-700 text-grunge-100 px-8 py-4 font-marker text-xl -rotate-2"
              whileHover={{ 
                scale: 1.05, 
                rotate: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}