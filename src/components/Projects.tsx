import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';
import ChemG from '../img/ChemG.png';
import YaCalc from '../img/YaCalc.png';
import DangRogue from '../img/DangRogue.png';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "ChemG",
    description: "Program for fast learning with AI technology. [Unreleased]",
    image: ChemG,
    tags: ["Tauri", "TypeScript", "Tailwind"],
  },
  {
    id: 2,
    title: "YaCalc",
    description: "A handy extension for quick calculation, designed to simplify and speed up your work.",
    image: YaCalc,
    tags: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/AlexTrish/YaCalc"
  },
  {
    id: 3,
    title: "DangRogue",
    description: "A roguelike-style game in the DnD universe. [Unreleased]",
    image: DangRogue,
    tags: ["Gadot", "GDScript", "Lua"],
  }
];

const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  return (
    <section className="min-h-screen py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-sans text-white mb-12">
          <span className="text-neon">/</span> PROJECTS
        </h2>

        <div className="flex flex-wrap gap-3 mb-12">
          <motion.button
            key="all"
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full font-mono text-sm ${
              selectedTag === null
                ? 'bg-neon text-dark'
                : 'border border-neon text-neon'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {allTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full font-mono text-sm ${
                selectedTag === tag
                  ? 'bg-neon text-dark'
                  : 'border border-neon text-neon'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-neon/20"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-sans text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 font-mono text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neon/10 text-neon text-xs font-mono rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neon hover:text-white transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-mono">Live</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neon hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-mono">Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}