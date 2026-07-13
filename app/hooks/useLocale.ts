"use client";

import { useState, useEffect, useCallback } from "react";
import { getDictionary, DEFAULT_LOCALE, type Locale, type Dictionary } from "@/app/lib/i18n";

const COOKIE_KEY = "locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return (value === "en" || value === "ru" || value === "cs") ? value : DEFAULT_LOCALE;
}

function writeCookie(locale: Locale): void {
  document.cookie = `${COOKIE_KEY}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

type UseLocaleReturn = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

export function useLocale(initial?: Locale): UseLocaleReturn {
  const [locale, setLocaleState] = useState<Locale>(initial ?? DEFAULT_LOCALE);

  useEffect(() => {
    const fromCookie = readCookie();
    if (fromCookie !== locale) setLocaleState(fromCookie);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((next: Locale) => {
    writeCookie(next);
    setLocaleState(next);
  }, []);

  return { locale, dict: getDictionary(locale), setLocale };
}
