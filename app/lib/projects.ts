import fs from "fs";
import path from "path";

export type ProjectImage = {
  src: string;
  alt: string;
  scroll: boolean; // true for *-long files
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  description: string;
  longDescription: string;
  accent: string;
  flip: boolean;
  preview: string | null;
  images: ProjectImage[];
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
};

const IMG_DIR = path.join(process.cwd(), "public", "img");

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm"]);

// Reserved filenames that are not gallery images
const RESERVED = new Set(["preview", "info"]);

function parseInfo(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = raw.split("\n");
  let currentKey: string | null = null;
  let buffer: string[] = [];

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    // A key line: no leading whitespace, has colon, value may be empty (multiline block)
    if (colonIdx > 0 && line[0] !== " " && line[0] !== "\t") {
      // Save previous buffer
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

  // Scan directory for images and video
  const files = fs.readdirSync(dir);

  let preview: string | null = null;
  let video: string | undefined;
  const images: ProjectImage[] = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);

    if (VIDEO_EXTS.has(ext)) {
      // Use video field from info.txt if specified, otherwise first video found
      if (!info.video || info.video === file) {
        video = `/img/${slug}/${file}`;
      }
      continue;
    }

    if (!IMAGE_EXTS.has(ext)) continue;

    if (base === "preview") {
      preview = `/img/${slug}/${file}`;
      continue;
    }

    if (RESERVED.has(base)) continue;

    // *-long suffix = scroll frame
    const isLong = base.endsWith("-long");
    images.push({
      src: `/img/${slug}/${file}`,
      alt: `${info.title ?? slug} — ${base}`,
      scroll: isLong,
    });
  }

  // Sort images alphabetically so order is predictable
  images.sort((a, b) => a.src.localeCompare(b.src));

  const title = info.title ?? slug;

  return {
    slug,
    index: String(index + 1).padStart(2, "0"),
    title,
    subtitle: info.subtitle ?? "",
    year: info.year ?? "",
    tags: info.tags ? info.tags.split(",").map((t) => t.trim()) : [],
    description: info.description ?? "",
    longDescription: info.longdescription ?? "",
    accent: info.accent ?? "#ffffff",
    flip: info.flip === "true",
    preview,
    images,
    video,
    liveUrl: info.liveurl || undefined,
    githubUrl: info.githuburl || undefined,
    highlights: info.highlights
      ? info.highlights.split(",").map((h) => h.trim())
      : [],
  };
}

function loadProjects(): Project[] {
  if (!fs.existsSync(IMG_DIR)) return [];

  const slugs = fs
    .readdirSync(IMG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort(); // alphabetical = consistent order

  const projects: Project[] = [];
  for (let i = 0; i < slugs.length; i++) {
    const project = readProject(slugs[i], i);
    if (project) projects.push(project);
  }

  // Re-index after filtering nulls
  return projects.map((p, i) => ({
    ...p,
    index: String(i + 1).padStart(2, "0"),
  }));
}

export const PROJECTS: Project[] = loadProjects();

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
