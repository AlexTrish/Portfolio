import { motion } from 'framer-motion';
import { Code2, Lightbulb, Sparkles, Zap } from 'lucide-react';

const principles = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Clean Code is an Art Form",
    description: "I don't just write code — I craft experiences. Every line is purposeful, every function tells a story."
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovation Through Design",
    description: "The best solutions emerge when technology meets creative thinking. I push boundaries while maintaining usability."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Details Matter",
    description: "From pixel-perfect animations to optimized load times, excellence lives in the details."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance First",
    description: "Speed isn't just a feature — it's a fundamental requirement. Every millisecond counts."
  }
];

export default function Approach() {
  return (
    <section className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-sans text-white mb-12">
          <span className="text-neon">/</span> APPROACH
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon/20 to-transparent rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000" />
              <div className="relative bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-neon/20">
                <div className="text-neon mb-4">{principle.icon}</div>
                <h3 className="text-2xl font-sans text-white mb-4">{principle.title}</h3>
                <p className="font-mono text-gray-400">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-3xl md:text-4xl font-sans text-white leading-relaxed">
            "I don't just build websites —<br />
            <span className="text-neon">I create digital experiences</span><br />
            that leave lasting impressions."
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-neon opacity-5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon opacity-5 rounded-full filter blur-3xl" />
      </div>
    </section>
  );
}