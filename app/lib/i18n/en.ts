export type SkillGroupItem = { category: string; skills: string[]; detail: string };
export type StatItem = { value: string; label: string };
export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  highlights: string[];
};

export type Dictionary = {
  nav: {
    work: string;
    about: string;
    skills: string;
    experience: string;
    contact: string;
    allWork: string;
    cv: string;
    available: string;
  };
  hero: {
    label: string;
    line1: string;
    line2: string;
    line3: string;
    role: string;
    location: string;
    available: string;
    stack: string;
    metaRole: string;
    metaLocation: string;
    metaAvailable: string;
    metaStack: string;
  };
  about: {
    label: string;
    headline: string;
    accent: string;
    rest: string;
    bio1: string;
    bio2: string;
    currently: string;
    currentlyValue: string;
    stats: StatItem[];
  };
  projects: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    viewAll: string;
    viewCase: string;
  };
  work: {
    label: string;
    title1: string;
    title2: string;
  };
  skills: {
    label: string;
    title1: string;
    title2: string;
    groups: SkillGroupItem[];
  };
  experience: {
    label: string;
    title1: string;
    title2: string;
    items: ExperienceEntry[];
  };
  contact: {
    label: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    send: string;
    sending: string;
    successTitle: string;
    successSub: string;
    sendAnother: string;
    errorMsg: string;
    fields: {
      name: string;
      email: string;
      message: string;
      namePh: string;
      emailPh: string;
      messagePh: string;
      nameErr: string;
      emailErr: string;
      emailInvalid: string;
      messageErr: string;
    };
  };
  footer: {
    role: string;
    available: string;
  };
  projectPage: {
    backToWork: string;
    overview: string;
    highlights: string;
    links: string;
    liveSite: string;
    github: string;
    nextProject: string;
    project: string;
    year: string;
    stack: string;
  };
  cv: {
    printSave: string;
    back: string;
    role: string;
    available: string;
    summary: string;
    sectionExp: string;
    sectionProj: string;
    sectionSkills: string;
    contacts: {
      website: string;
      email: string;
      github: string;
      linkedin: string;
      location: string;
      locationValue: string;
    };
  };
};

const en: Dictionary = {
  nav: {
    work:       "Work",
    about:      "About",
    skills:     "Skills",
    experience: "Experience",
    contact:    "Contact",
    allWork:    "All Work",
    cv:         "CV ↗",
    available:  "Available",
  },
  hero: {
    label:         "Portfolio — 2026",
    line1:         "BUILDING",
    line2:         "DIGITAL",
    line3:         "EXPERIENCES",
    role:          "Frontend Developer",
    location:      "Europe",
    available:     "Freelance",
    stack:         "React · Next.js · TypeScript",
    metaRole:      "ROLE",
    metaLocation:  "LOCATION",
    metaAvailable: "AVAILABLE",
    metaStack:     "STACK",
  },
  about: {
    label:          "01 — About",
    headline:       "I craft interfaces that feel",
    accent:         "inevitable",
    rest:           "— where every pixel earns its place.",
    bio1:           "Based in Europe, I specialise in building high-performance web applications with a deep focus on interaction design, animation, and developer experience.",
    bio2:           "My work sits at the intersection of engineering precision and visual craft — I believe the best interfaces are the ones you don't notice, because they simply work.",
    currently:      "Currently",
    currentlyValue: "Open to senior frontend & full-stack roles and freelance collaborations.",
    stats: [
      { value: "3+",  label: "Years of experience" },
      { value: "50+", label: "Projects shipped" },
      { value: "27",  label: "Happy clients" },
    ],
  },
  projects: {
    label:    "02 — Work",
    title1:   "Selected",
    title2:   "Projects",
    subtitle: "A curated selection of work spanning design systems, platforms, and digital experiences.",
    viewAll:  "View all {n} projects",
    viewCase: "View Case Study",
  },
  work: {
    label:  "All Work — {n} Projects",
    title1: "Selected",
    title2: "Work",
  },
  skills: {
    label:  "03 — Skills",
    title1: "Craft &",
    title2: "Expertise",
    groups: [
      {
        category: "Frontend",
        skills:   ["React", "Next.js", "TypeScript", "Framer Motion", "GSAP", "Three.js"],
        detail:   "Building pixel-perfect, performant interfaces with modern React patterns, server components, and production-grade animation systems.",
      },
      {
        category: "Styling",
        skills:   ["Tailwind CSS", "CSS-in-JS", "SCSS", "Design Systems", "Figma"],
        detail:   "Translating design intent into code — from token-based systems to bespoke editorial layouts that hold up at any viewport.",
      },
      {
        category: "Backend",
        skills:   ["Node.js", "tRPC", "Prisma", "PostgreSQL", "Redis", "GraphQL"],
        detail:   "End-to-end type-safe APIs, real-time data layers, and database schemas that scale without surprises.",
      },
      {
        category: "Infrastructure",
        skills:   ["Vercel", "AWS", "Docker", "CI/CD", "Edge Functions"],
        detail:   "Deploying with confidence — zero-downtime pipelines, edge-optimized delivery, and infrastructure that stays out of the way.",
      },
    ],
  },
  experience: {
    label:  "04 — Experience",
    title1: "Where",
    title2: "I've Been",
    items: [
      {
        period:      "2024 — Present",
        role:        "Full-Stack Developer",
        company:     "Self Employed",
        type:        "Full-time",
        description: "Building full-stack web applications from concept to production. Designing scalable frontend architecture with React, Next.js and TypeScript while developing backend services, REST APIs and authentication systems. Managing deployment, performance optimization and the complete development lifecycle.",
        highlights:  ["React", "Next.js", "Node.js", "REST API", "Architecture"],
      },
      {
        period:      "2021 — 2024",
        role:        "Middle Frontend Developer",
        company:     "Self Employed",
        type:        "Full-time",
        description: "Developed responsive web applications, implemented complex user interfaces, integrated REST APIs and collaborated with designers to deliver polished user experiences. Focused on performance, accessibility and maintainable code architecture.",
        highlights:  ["React", "TypeScript", "Performance", "UI/UX", "REST API"],
      },
      {
        period:      "2020 — 2021",
        role:        "Junior Frontend Developer",
        company:     "Self Employed",
        type:        "Full-time",
        description: "Built responsive interfaces, maintained existing projects and implemented new features under guidance. Gained experience with modern frontend technologies, component-based development and Git workflows.",
        highlights:  ["HTML", "CSS", "JavaScript", "React", "Git"],
      },
    ],
  },
  contact: {
    label:        "05 — Contact",
    title1:       "Let's",
    title2:       "Work",
    title3:       "Together",
    subtitle:     "Available for senior roles, freelance projects, and creative collaborations. Let's build something remarkable.",
    send:         "Send Message →",
    sending:      "Sending...",
    successTitle: "Message sent.",
    successSub:   "I'll get back to you within 24 hours.",
    sendAnother:  "Send another",
    errorMsg:     "Something went wrong. Please try again or email directly.",
    fields: {
      name:         "Name",
      email:        "Email",
      message:      "Message",
      namePh:       "Your name",
      emailPh:      "your@email.com",
      messagePh:    "Tell me about your project...",
      nameErr:      "Name is required",
      emailErr:     "Email is required",
      emailInvalid: "Invalid email",
      messageErr:   "Message is required",
    },
  },
  footer: {
    role:      "Frontend & Full Stack Developer",
    available: "Available for work",
  },
  projectPage: {
    backToWork:  "← All Work",
    overview:    "Overview",
    highlights:  "Highlights",
    links:       "Links",
    liveSite:    "Live Site ↗",
    github:      "GitHub ↗",
    nextProject: "Next Project",
    project:     "Project",
    year:        "Year",
    stack:       "Stack",
  },
  cv: {
    printSave:     "Print / Save PDF ↓",
    back:          "← Back",
    role:          "Frontend & Full Stack Developer",
    available:     "Available for senior roles & freelance",
    summary:       "Frontend & Full Stack Developer with 3+ years of experience building high-performance web applications. I specialise in React, Next.js and TypeScript — from pixel-perfect interfaces to scalable backend systems. My work sits at the intersection of engineering precision and visual craft.",
    sectionExp:    "Experience",
    sectionProj:   "Selected Projects",
    sectionSkills: "Skills",
    contacts: {
      website:       "Website",
      email:         "Email",
      github:        "GitHub",
      linkedin:      "LinkedIn",
      location:      "Location",
      locationValue: "Europe",
    },
  },
};

export default en;
