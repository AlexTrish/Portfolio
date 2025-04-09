import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import { Code, Server, Palette, GitBranch, Apple as Api } from 'lucide-react';

const iconMap = {
  'code': Code,
  'server': Server,
  'palette': Palette,
  'git-branch': GitBranch,
  'api': Api,
};

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="brutalist-container bg-rust-500 inline-block p-6 -rotate-2 mb-8">
            <h2 className="text-4xl font-marker text-grunge-100">Skills & Expertise</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-grunge">
            I'm a frontend developer with expertise in building modern web applications.
            I love creating beautiful, responsive, and user-friendly interfaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20, rotate: -2 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  rotate: index % 2 ? 2 : -2,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.1 
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: index % 2 ? 3 : -3,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                className="torn-paper p-6 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    {Icon && <Icon className="w-8 h-8 text-rust-500" />}
                    <h3 className="text-xl font-marker text-grunge-900 dark:text-white brutalist-text">
                      {skill.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-grunge-700 dark:text-grunge-300 mb-4 font-grunge">
                    {skill.description}
                  </p>

                  <div className="relative">
                    <div className="h-3 bg-grunge-200 rounded-full overflow-hidden brutalist-container">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-full bg-rust-500"
                      />
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                      className="absolute -top-6 right-0 text-sm font-marker text-grunge-900 dark:text-white"
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                </div>

                <div 
                  className="absolute inset-0 bg-noise opacity-10"
                  style={{
                    transform: `rotate(${index % 2 ? 2 : -2}deg)`,
                    mixBlendMode: 'overlay'
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}