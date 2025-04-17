import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, ExternalLink } from 'lucide-react';
import { useState } from 'react';

type SocialLink = {
  id: number;
  name: string;
  url: string;
  icon: JSX.Element;
};

const socialLinks: SocialLink[] = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/AlexTrish",
    icon: <Github className="w-6 h-6" />,
  },
  // {
  //   id: 2,
  //   name: "LinkedIn",
  //   url: "https://linkedin.com",
  //   icon: <Linkedin className="w-6 h-6" />,
  // },
  {
    id: 2,
    name: "Email",
    url: "mailto:alextrishwork@gmail.com",
    icon: <Mail className="w-6 h-6" />,
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    setFormState({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-sans text-white mb-12">
          <span className="text-neon">/</span> CONTACT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-sans text-white">Let's Connect</h3>
              <p className="text-gray-400 font-mono">
                Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-sans text-white">Find me on</h4>
              <div className="flex flex-col space-y-4">
                {socialLinks.map(link => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-neon hover:text-white transition-colors group"
                    whileHover={{ x: 10 }}
                  >
                    <span className="w-8 h-8 border border-current rounded-full flex items-center justify-center">
                      {link.icon}
                    </span>
                    <span className="font-mono">{link.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-neon font-mono text-sm">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-neon/20 rounded-none px-4 py-3 text-white font-mono focus:outline-none focus:border-neon transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-neon font-mono text-sm">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-neon/20 rounded-none px-4 py-3 text-white font-mono focus:outline-none focus:border-neon transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-neon font-mono text-sm">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-black/50 border border-neon/20 rounded-none px-4 py-3 text-white font-mono focus:outline-none focus:border-neon transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-neon text-dark font-mono py-4 px-8 flex items-center justify-center space-x-2 hover:bg-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>SEND MESSAGE</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-neon opacity-5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon opacity-5 rounded-full filter blur-3xl" />
      </div>
    </section>
  );
}