import type { Dictionary } from "./en";

const ru: Dictionary = {
  nav: {
    work:       "Работы",
    about:      "Обо мне",
    skills:     "Навыки",
    experience: "Опыт",
    contact:    "Контакт",
    allWork:    "Все работы",
    cv:         "CV ↗",
    available:  "Доступен",
  },

  hero: {
    label:     "Портфолио — 2026",
    line1:     "BUILDING",
    line2:     "DIGITAL",
    line3:     "EXPERIENCES",
    role:      "Frontend-разработчик",
    location:  "Европа",
    available: "Фриланс",
    stack:     "React · Next.js · TypeScript",
    metaRole:      "РОЛЬ",
    metaLocation:  "ЛОКАЦИЯ",
    metaAvailable: "ДОСТУПНОСТЬ",
    metaStack:     "СТЕК",
  },

  about: {
    label:    "01 — Обо мне",
    headline: "Я создаю интерфейсы, которые ощущаются",
    accent:   "неизбежными",
    rest:     "— где каждый пиксель оправдывает своё место.",
    bio1:     "Базируюсь в Европе. Специализируюсь на высокопроизводительных веб-приложениях с глубоким фокусом на дизайн взаимодействий, анимацию и опыт разработчика.",
    bio2:     "Моя работа находится на пересечении инженерной точности и визуального мастерства — лучшие интерфейсы те, которых не замечаешь, потому что они просто работают.",
    currently:      "Сейчас",
    currentlyValue: "Открыт к senior frontend & full-stack позициям и фриланс-сотрудничеству.",
    stats: [
      { value: "3+",  label: "Лет опыта" },
      { value: "50+", label: "Проектов запущено" },
      { value: "27",  label: "Довольных клиентов" },
    ],
  },

  projects: {
    label:    "02 — Работы",
    title1:   "Избранные",
    title2:   "Проекты",
    subtitle: "Подборка работ в области дизайн-систем, платформ и цифровых продуктов.",
    viewAll:  "Все {n} проектов",
    viewCase: "Смотреть кейс",
  },

  work: {
    label:  "Все работы — {n} проектов",
    title1: "Избранные",
    title2: "Работы",
  },

  skills: {
    label:  "03 — Навыки",
    title1: "Мастерство &",
    title2: "Экспертиза",
    groups: [
      {
        category: "Frontend",
        skills:   ["React", "Next.js", "TypeScript", "Framer Motion", "GSAP", "Three.js"],
        detail:   "Создание pixel-perfect, производительных интерфейсов с современными паттернами React, серверными компонентами и анимационными системами.",
      },
      {
        category: "Стилизация",
        skills:   ["Tailwind CSS", "CSS-in-JS", "SCSS", "Design Systems", "Figma"],
        detail:   "Перевод дизайн-замысла в код — от token-based систем до редакционных лейаутов, работающих на любом вьюпорте.",
      },
      {
        category: "Backend",
        skills:   ["Node.js", "tRPC", "Prisma", "PostgreSQL", "Redis", "GraphQL"],
        detail:   "End-to-end типобезопасные API, real-time слои данных и схемы баз данных, которые масштабируются без сюрпризов.",
      },
      {
        category: "Инфраструктура",
        skills:   ["Vercel", "AWS", "Docker", "CI/CD", "Edge Functions"],
        detail:   "Деплой с уверенностью — zero-downtime пайплайны, edge-оптимизированная доставка и инфраструктура, которая не мешает.",
      },
    ],
  },

  experience: {
    label:  "04 — Опыт",
    title1: "Где",
    title2: "Я Работал",
    items: [
      {
        period:      "2024 — Сейчас",
        role:        "Full-Stack разработчик",
        company:     "Самозанятый",
        type:        "Полная занятость",
        description: "Разработка full-stack веб-приложений от концепции до продакшена. Проектирование масштабируемой frontend-архитектуры на React, Next.js и TypeScript, разработка backend-сервисов, REST API и систем аутентификации.",
        highlights:  ["React", "Next.js", "Node.js", "REST API", "Архитектура"],
      },
      {
        period:      "2021 — 2024",
        role:        "Middle Frontend-разработчик",
        company:     "Самозанятый",
        type:        "Полная занятость",
        description: "Разработка адаптивных веб-приложений, реализация сложных пользовательских интерфейсов, интеграция REST API и совместная работа с дизайнерами для создания качественного UX.",
        highlights:  ["React", "TypeScript", "Производительность", "UI/UX", "REST API"],
      },
      {
        period:      "2020 — 2021",
        role:        "Junior Frontend-разработчик",
        company:     "Самозанятый",
        type:        "Полная занятость",
        description: "Создание адаптивных интерфейсов, поддержка существующих проектов и реализация новых функций. Освоение современных frontend-технологий и компонентной разработки.",
        highlights:  ["HTML", "CSS", "JavaScript", "React", "Git"],
      },
    ],
  },

  contact: {
    label:       "05 — Контакт",
    title1:      "Давайте",
    title2:      "Работать",
    title3:      "Вместе",
    subtitle:    "Открыт к senior-позициям, фриланс-проектам и творческому сотрудничеству. Давайте создадим что-то выдающееся.",
    send:        "Отправить →",
    sending:     "Отправка...",
    successTitle: "Сообщение отправлено.",
    successSub:   "Отвечу в течение 24 часов.",
    sendAnother:  "Отправить ещё",
    errorMsg:     "Что-то пошло не так. Попробуйте ещё раз или напишите напрямую.",
    fields: {
      name:        "Имя",
      email:       "Email",
      message:     "Сообщение",
      namePh:      "Ваше имя",
      emailPh:     "your@email.com",
      messagePh:   "Расскажите о вашем проекте...",
      nameErr:     "Введите имя",
      emailErr:    "Введите email",
      emailInvalid: "Некорректный email",
      messageErr:  "Введите сообщение",
    },
  },

  footer: {
    role:      "Frontend & Full Stack разработчик",
    available: "Открыт к работе",
  },

  projectPage: {
    backToWork:  "← Все работы",
    overview:    "Обзор",
    highlights:  "Ключевое",
    links:       "Ссылки",
    liveSite:    "Сайт ↗",
    github:      "GitHub ↗",
    nextProject: "Следующий проект",
    project:     "Проект",
    year:        "Год",
    stack:       "Стек",
  },

  cv: {
    printSave:    "Печать / Сохранить PDF ↓",
    back:         "← Назад",
    role:         "Frontend & Full Stack разработчик",
    available:    "Открыт к senior-позициям и фрилансу",
    summary:      "Frontend & Full Stack разработчик с 3+ годами опыта создания высокопроизводительных веб-приложений. Специализируюсь на React, Next.js и TypeScript — от pixel-perfect интерфейсов до масштабируемых backend-систем.",
    sectionExp:   "Опыт",
    sectionProj:  "Избранные проекты",
    sectionSkills:"Навыки",
    contacts: {
      website:  "Сайт",
      email:    "Email",
      github:   "GitHub",
      linkedin: "LinkedIn",
      location: "Локация",
      locationValue: "Европа",
    },
  },
};

export default ru;
