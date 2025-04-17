import { motion } from 'framer-motion';
import { Code2, Briefcase, GraduationCap, Terminal } from 'lucide-react';
//I'll add Briefcase it after I'm done working for the company
//I'll add GraduationCap it after I graduate from college

type TimelineItem = {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: JSX.Element;
};


const timeline: TimelineItem[] = [
  {
    id: 1,
    date: "2023 - Present",
    title: "Frontend Developer",
    description: "Building responsive web applications and implementing modern UI/UX designs",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    id: 2,
    date: "2021 - 2023",
    title: "Junior Developer",
    description: "Started career in web development, focusing on HTML, CSS, and JavaScript",
    icon: <Terminal className="w-6 h-6" />,
  },
];

const skills = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", 
  "React", "Tailwind CSS", "Node.js", "Git", 
  "Webpack", "Vite"
];

export default function About() {
  return (
    <section className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-sans text-white mb-12">
          <span className="text-neon">/</span> ABOUT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl font-mono text-gray-300">
              Passionate frontend developer with a keen eye for creating engaging, responsive, and accessible web experiences.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-sans text-white">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-neon/10 text-neon font-mono text-sm rounded-full border border-neon/20"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute left-4 top-0 bottom-0 w-px bg-neon/20" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-12 pb-12 last:pb-0"
              >
                <div className="absolute left-0 w-8 h-8 bg-dark border-2 border-neon rounded-full flex items-center justify-center">
                  <div className="text-neon">
                    {item.icon}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-neon font-mono text-sm">{item.date}</span>
                  <h3 className="text-xl font-sans text-white">{item.title}</h3>
                  <p className="text-gray-400 font-mono text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon opacity-5 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 right-0 w-32 h-32 bg-neon opacity-5 rounded-full filter blur-3xl" />
      </div>
    </section>
  );
}