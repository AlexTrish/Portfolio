import type { Locale } from "@/app/lib/i18n";

export type ProjectImage = {
  src: string;
  alt: string;
  scroll: boolean;
};

export type LocalizedString = Record<Locale, string>;

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: LocalizedString;
  year: string;
  tags: string[];
  description: LocalizedString;
  longDescription: LocalizedString;
  accent: string;
  flip: boolean;
  preview: string | null;
  images: ProjectImage[];
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  highlights: LocalizedString;
};

export function getLocalized(field: LocalizedString, locale: Locale): string {
  return field[locale] || field.en || "";
}

export function getLocalizedList(field: LocalizedString, locale: Locale): string[] {
  const raw = getLocalized(field, locale);
  return raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : [];
}
