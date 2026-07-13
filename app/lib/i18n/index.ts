import en from "./en";
import ru from "./ru";
import cs from "./cs";

export type { Dictionary } from "./en";
export type Locale = "en" | "ru" | "cs";

export const LOCALES: Locale[] = ["en", "ru", "cs"];
export const DEFAULT_LOCALE: Locale = "en";

const dictionaries = { en, ru, cs };

export function getDictionary(locale: Locale): import("./en").Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
