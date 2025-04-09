import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative bg-grunge-800">
      <div className="noise-overlay"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="brutalist-container bg-rust-500 inline-block p-6 -rotate-2">
            <h2 className="text-5xl font-marker text-grunge-100">Featured Projects</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="torn-paper clip-jagged relative"
              style={{ transform: `rotate(${index % 2 ? 2 : -2}deg)` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover filter contrast-125 saturate-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="p-6 relative">
                <h3 className="text-2xl font-marker text-grunge-900 mb-4 brutalist-text">
                  {project.title}
                </h3>
                <p className="text-grunge-700 mb-6 font-grunge">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="brutalist-container bg-grunge-800 text-grunge-100 px-3 py-1 text-sm font-grunge"
                      style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-container bg-rust-500 text-grunge-100 p-3 hover:bg-rust-600 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-container bg-grunge-800 text-grunge-100 p-3 hover:bg-grunge-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}