"use client";

import { usePreferences } from "@/contexts/PreferencesContext";
import { en, type TranslationKey } from "./en";
import { yue } from "./yue";

const translations = { en, yue };

export function useTranslation() {
  const { locale } = usePreferences();
  const dict = translations[locale] ?? en;

  function t(key: TranslationKey, params?: Record<string, string>): string {
    let value = dict[key] ?? (en as Record<string, string>)[key] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), v);
      });
    }
    return value;
  }

  return { t, locale };
}
