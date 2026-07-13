"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLocale } from "@/app/hooks/useLocale";
import type { Locale, Dictionary } from "@/app/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const value = useLocale();
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useDict(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useDict must be used inside LocaleProvider");
  return ctx;
}
