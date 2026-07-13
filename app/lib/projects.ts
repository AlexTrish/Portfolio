import "server-only";
import fs from "fs";
import path from "path";
import type { Locale } from "@/app/lib/i18n";
import type { Project, ProjectImage, LocalizedString } from "@/app/lib/project-types";
export type { Project, ProjectImage, LocalizedString } from "@/app/lib/project-types";
export { getLocalized, getLocalizedList } from "@/app/lib/project-types";

const IMG_DIR = path.join(process.cwd(), "public", "img");

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm"]);
const RESERVED    = new Set(["preview", "info"]);

const LANG_TAG_RE = /\[(en|ru|cz)\]/gi;

function parseLocalized(raw: string): LocalizedString | null {
  // Check if there are any lang tags at all
  if (!LANG_TAG_RE.test(raw)) return null;
  LANG_TAG_RE.lastIndex = 0;

  const result: Partial<LocalizedString> = {};
  const parts = raw.split(LANG_TAG_RE);
  // parts = ["", "en", "English text", "ru", "Русский текст", ...]
  for (let i = 1; i < parts.length; i += 2) {
    const tag = parts[i].toLowerCase() as "en" | "ru" | "cz";
    const locale: Locale = tag === "cz" ? "cs" : tag;
    result[locale] = (parts[i + 1] ?? "").trim();
  }

  const fallback = result.en ?? result.cs ?? result.ru ?? "";
  return {
    en: result.en ?? fallback,
    ru: result.ru ?? fallback,
    cs: result.cs ?? fallback,
  };
}

function toLocalizedString(plain: string): LocalizedString {
  const localized = parseLocalized(plain);
  if (localized) return localized;
  return { en: plain, ru: plain, cs: plain };
}

function parseInfo(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = raw.split("\n");
  let currentKey: string | null = null;
  let buffer: string[] = [];

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0 && line[0] !== " " && line[0] !== "\t") {
      if (currentKey) result[currentKey] = buffer.join("\n").trim();
      currentKey = line.slice(0, colonIdx).trim().toLowerCase();
      buffer = [line.slice(colonIdx + 1).trim()];
    } else if (currentKey) {
      buffer.push(line);
    }
  }
  if (currentKey) result[currentKey] = buffer.join("\n").trim();
  return result;
}

function readProject(slug: string, index: number): Project | null {
  const dir = path.join(IMG_DIR, slug);
  const infoPath = path.join(dir, "info.txt");

  if (!fs.existsSync(infoPath)) return null;

  const raw = fs.readFileSync(infoPath, "utf-8");
  const info = parseInfo(raw);

  const files = fs.readdirSync(dir);

  let preview: string | null = null;
  let video: string | undefined;
  const images: ProjectImage[] = [];

  for (const file of files) {
    const ext  = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);

    if (VIDEO_EXTS.has(ext)) {
      if (!info.video || info.video === file) video = `/img/${slug}/${file}`;
      continue;
    }
    if (!IMAGE_EXTS.has(ext)) continue;
    if (base === "preview") { preview = `/img/${slug}/${file}`; continue; }
    if (RESERVED.has(base)) continue;

    images.push({ src: `/img/${slug}/${file}`, alt: `${info.title ?? slug} — ${base}`, scroll: base.endsWith("-long") });
  }

  images.sort((a, b) => a.src.localeCompare(b.src));

  const title = info.title ?? slug;

  return {
    slug,
    index: String(index + 1).padStart(2, "0"),
    title,
    subtitle:        toLocalizedString(info.subtitle ?? ""),
    year:            info.year ?? "",
    tags:            info.tags ? info.tags.split(",").map((t) => t.trim()) : [],
    description:     toLocalizedString(info.description ?? ""),
    longDescription: toLocalizedString(info.longdescription ?? ""),
    accent:          info.accent ?? "#ffffff",
    flip:            info.flip === "true",
    preview,
    images,
    video,
    liveUrl:    info.liveurl   || undefined,
    githubUrl:  info.githuburl || undefined,
    highlights: toLocalizedString(info.highlights ?? ""),
  };
}

function loadProjects(): Project[] {
  if (!fs.existsSync(IMG_DIR)) return [];

  const slugs = fs
    .readdirSync(IMG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const projects: Project[] = [];
  for (let i = 0; i < slugs.length; i++) {
    const project = readProject(slugs[i], i);
    if (project) projects.push(project);
  }

  return projects.map((p, i) => ({ ...p, index: String(i + 1).padStart(2, "0") }));
}

export const PROJECTS: Project[] = loadProjects();

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
