import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

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
    image: "https://s828sas.storage.yandex.net/rdisk/d1c695ccaa8483f434e95cfb09e76ee6086432895221f3d819220ac7922b7d91/68013d30/eqfXeBzT9XtTBCDYi54BGRk029EvwWdrWgpu2moX8p43Z6yMWBrqvpdbA_lr2TDKjSpK5UPv4iwyQYuq0U1pyA==?uid=358523085&filename=ChemG.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=358523085&fsize=1645033&hid=c689c5b238e6328f5c1944d9a6bd4b00&media_type=image&tknv=v2&etag=a73005fca488ee7e59a3479c5a7c7487&ts=632fce7e5ac00&s=33452fe8439534d7de60c7fa0486f671f11f2e3eadedcb8d22c361c73590bf6c&pb=U2FsdGVkX1_NHUtfuvFcHym4R9QW8ZPzrAZQxF3ZjA3BUcgCdgdLUhi3GqB-1TTlQK4__GYOjHR8G_n_G7gqeh5XhXRpRwz1px_9pBK6pkU",
    tags: ["Tauri", "TypeScript", "Tailwind"],
  },
  {
    id: 2,
    title: "YaCalc",
    description: "A handy extension for quick calculation, designed to simplify and speed up your work.",
    image: "https://s974sas.storage.yandex.net/rdisk/fc4b455c0977531ac8fcb5e529285bbf7623d0b42ae5aeadccfc65eb0c3b65c4/68013e98/eqfXeBzT9XtTBCDYi54BGX4lRJXYowcHcCrAEsLJTgmQU49K4HCZcoFvfE98ierQuwCcD8PagPYUXh-rFullfQ==?uid=358523085&filename=YaCalc.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=358523085&fsize=1126436&hid=adb9beb4bc653c1821c32cdfe442bd15&media_type=image&tknv=v2&etag=d37a195653ea850a74eed8e3df230d5f&ts=632fcfd5ad600&s=6fcdb0c8bac711a369c54b730b112f0aaf4680a85b93e422b7f44d4f1f3882a2&pb=U2FsdGVkX1-nYUM1VYem5915tEfj9TKtpoz1b6Rsi_UTwzIjqEAQFZAD-Ko3t1S37d1Whf9zrMJyhg0kcMvs3glkru3ZC4MUFmjbYphvdYg",
    tags: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/AlexTrish/YaCalc"
  },
  {
    id: 3,
    title: "DangRogue",
    description: "A roguelike-style game in the DnD universe. [Unreleased]",
    image: "https://s880sas.storage.yandex.net/rdisk/1e13400a8e043a9b57449143e955cabc77e8a78fb9bacde55057750532198988/68013fd7/eqfXeBzT9XtTBCDYi54BGYNrP-0UjBWY1f6BMoIWPBxHBREihe-Rw9JXrJcoTpkS3XRXuoPlNLBJxqlxoBA80g==?uid=358523085&filename=DangRogue.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=358523085&fsize=1187399&hid=16df0eadf3b79797a9c96ab68589adb3&media_type=image&tknv=v2&etag=79b33a4917814d61db189c2512eebd3f&ts=632fd105e63c0&s=3282f41dc3ae2106000a5ef0ec99eab99edbbe28b903099abd6b5da57d234d59&pb=U2FsdGVkX1-iYrbCmjqNhNy-diButINtw1hueycPxHy8hQN3Kjdku73QlYni40Nm5CZ-AjEWQwZi3xRDGhV5R-3D2-1TGIOzWOgkCtYJORw",
    tags: ["Gadot", "GDScript", "Lua"],
    liveUrl: "https://example.com"
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