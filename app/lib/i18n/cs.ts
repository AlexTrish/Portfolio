import type { Dictionary } from "./en";

const cs: Dictionary = {
  nav: {
    work:       "Práce",
    about:      "O mně",
    skills:     "Dovednosti",
    experience: "Zkušenosti",
    contact:    "Kontakt",
    allWork:    "Všechny práce",
    cv:         "CV ↗",
    available:  "Dostupný",
  },

  hero: {
    label:     "Portfolio — 2026",
    line1:     "BUILDING",
    line2:     "DIGITAL",
    line3:     "EXPERIENCES",
    role:      "Frontend vývojář",
    location:  "Evropa",
    available: "Freelance",
    stack:     "React · Next.js · TypeScript",
    metaRole:      "ROLE",
    metaLocation:  "LOKACE",
    metaAvailable: "DOSTUPNOST",
    metaStack:     "STACK",
  },

  about: {
    label:    "01 — O mně",
    headline: "Tvořím rozhraní, která působí",
    accent:   "nevyhnutelně",
    rest:     "— kde každý pixel si zaslouží své místo.",
    bio1:     "Působím v Evropě a specializuji se na vysoce výkonné webové aplikace s důrazem na interakční design, animace a vývojářský zážitek.",
    bio2:     "Moje práce stojí na průsečíku inženýrské přesnosti a vizuálního řemesla — nejlepší rozhraní jsou ta, která si nevšimnete, protože prostě fungují.",
    currently:      "Aktuálně",
    currentlyValue: "Otevřen senior frontend & full-stack pozicím a freelance spolupráci.",
    stats: [
      { value: "3+",  label: "Let zkušeností" },
      { value: "50+", label: "Dokončených projektů" },
      { value: "27",  label: "Spokojených klientů" },
    ],
  },

  projects: {
    label:    "02 — Práce",
    title1:   "Vybrané",
    title2:   "Projekty",
    subtitle: "Výběr prací zahrnující designové systémy, platformy a digitální zážitky.",
    viewAll:  "Zobrazit všech {n} projektů",
    viewCase: "Zobrazit případovou studii",
  },

  work: {
    label:  "Všechny práce — {n} projektů",
    title1: "Vybrané",
    title2: "Práce",
  },

  skills: {
    label:  "03 — Dovednosti",
    title1: "Řemeslo &",
    title2: "Expertíza",
    groups: [
      {
        category: "Frontend",
        skills:   ["React", "Next.js", "TypeScript", "Framer Motion", "GSAP", "Three.js"],
        detail:   "Tvorba pixel-perfect, výkonných rozhraní s moderními React vzory, serverovými komponentami a animačními systémy.",
      },
      {
        category: "Stylování",
        skills:   ["Tailwind CSS", "CSS-in-JS", "SCSS", "Design Systems", "Figma"],
        detail:   "Převod designového záměru do kódu — od token-based systémů po editorské layouty fungující na jakémkoli viewportu.",
      },
      {
        category: "Backend",
        skills:   ["Node.js", "tRPC", "Prisma", "PostgreSQL", "Redis", "GraphQL"],
        detail:   "End-to-end typově bezpečná API, real-time datové vrstvy a databázová schémata, která se škálují bez překvapení.",
      },
      {
        category: "Infrastruktura",
        skills:   ["Vercel", "AWS", "Docker", "CI/CD", "Edge Functions"],
        detail:   "Nasazení s jistotou — zero-downtime pipeline, edge-optimalizované doručování a infrastruktura, která nepřekáží.",
      },
    ],
  },

  experience: {
    label:  "04 — Zkušenosti",
    title1: "Kde",
    title2: "Jsem Působil",
    items: [
      {
        period:      "2024 — Současnost",
        role:        "Full-Stack vývojář",
        company:     "OSVČ",
        type:        "Plný úvazek",
        description: "Vývoj full-stack webových aplikací od konceptu po produkci. Návrh škálovatelné frontend architektury v React, Next.js a TypeScript, vývoj backend služeb, REST API a autentizačních systémů.",
        highlights:  ["React", "Next.js", "Node.js", "REST API", "Architektura"],
      },
      {
        period:      "2021 — 2024",
        role:        "Middle Frontend vývojář",
        company:     "OSVČ",
        type:        "Plný úvazek",
        description: "Vývoj responzivních webových aplikací, implementace komplexních uživatelských rozhraní, integrace REST API a spolupráce s designéry na vytváření kvalitního UX.",
        highlights:  ["React", "TypeScript", "Výkon", "UI/UX", "REST API"],
      },
      {
        period:      "2020 — 2021",
        role:        "Junior Frontend vývojář",
        company:     "OSVČ",
        type:        "Plný úvazek",
        description: "Tvorba responzivních rozhraní, údržba existujících projektů a implementace nových funkcí. Získání zkušeností s moderními frontend technologiemi a komponentovým vývojem.",
        highlights:  ["HTML", "CSS", "JavaScript", "React", "Git"],
      },
    ],
  },

  contact: {
    label:       "05 — Kontakt",
    title1:      "Pojďme",
    title2:      "Spolupracovat",
    title3:      "",
    subtitle:    "Dostupný pro senior pozice, freelance projekty a kreativní spolupráci. Pojďme vytvořit něco výjimečného.",
    send:        "Odeslat zprávu →",
    sending:     "Odesílám...",
    successTitle: "Zpráva odeslána.",
    successSub:   "Odpovím do 24 hodin.",
    sendAnother:  "Odeslat další",
    errorMsg:     "Něco se pokazilo. Zkuste to znovu nebo napište přímo.",
    fields: {
      name:        "Jméno",
      email:       "Email",
      message:     "Zpráva",
      namePh:      "Vaše jméno",
      emailPh:     "your@email.com",
      messagePh:   "Řekněte mi o svém projektu...",
      nameErr:     "Zadejte jméno",
      emailErr:    "Zadejte email",
      emailInvalid: "Neplatný email",
      messageErr:  "Zadejte zprávu",
    },
  },

  footer: {
    role:      "Frontend & Full Stack vývojář",
    available: "Dostupný pro práci",
  },

  projectPage: {
    backToWork:  "← Všechny práce",
    overview:    "Přehled",
    highlights:  "Klíčové body",
    links:       "Odkazy",
    liveSite:    "Živý web ↗",
    github:      "GitHub ↗",
    nextProject: "Další projekt",
    project:     "Projekt",
    year:        "Rok",
    stack:       "Stack",
  },

  cv: {
    printSave:    "Tisk / Uložit PDF ↓",
    back:         "← Zpět",
    role:         "Frontend & Full Stack vývojář",
    available:    "Dostupný pro senior pozice a freelance",
    summary:      "Frontend & Full Stack vývojář s 3+ lety zkušeností s vývojem vysoce výkonných webových aplikací. Specializuji se na React, Next.js a TypeScript — od pixel-perfect rozhraní po škálovatelné backend systémy.",
    sectionExp:   "Zkušenosti",
    sectionProj:  "Vybrané projekty",
    sectionSkills:"Dovednosti",
    contacts: {
      website:  "Web",
      email:    "Email",
      github:   "GitHub",
      linkedin: "LinkedIn",
      location: "Lokace",
      locationValue: "Evropa",
    },
  },
};

export default cs;
