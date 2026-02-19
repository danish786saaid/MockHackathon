"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "sentinel-preferences";

export type Theme = "dark" | "light";
export type Locale = "en" | "yue";

type StoredPreferences = {
  theme: Theme;
  locale: Locale;
  timezone: string;
};

const DEFAULT_PREFERENCES: StoredPreferences = {
  theme: "dark",
  locale: "en",
  timezone: "UTC",
};

type PreferencesContextValue = {
  theme: Theme;
  locale: Locale;
  timezone: string;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  setTimezone: (timezone: string) => void;
  hydrated: boolean;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function loadStored(): StoredPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<StoredPreferences>;
    return {
      theme: parsed.theme === "light" ? "light" : "dark",
      locale: parsed.locale === "yue" ? "yue" : "en",
      timezone: typeof parsed.timezone === "string" ? parsed.timezone : DEFAULT_PREFERENCES.timezone,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function saveStored(data: StoredPreferences) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<StoredPreferences>(DEFAULT_PREFERENCES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPrefs(loadStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveStored(prefs);
  }, [prefs, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", prefs.theme);
  }, [prefs.theme, hydrated]);

  const setTheme = useCallback((theme: Theme) => {
    setPrefs((p) => ({ ...p, theme }));
  }, []);

  const setLocale = useCallback((locale: Locale) => {
    setPrefs((p) => ({ ...p, locale }));
  }, []);

  const setTimezone = useCallback((timezone: string) => {
    setPrefs((p) => ({ ...p, timezone }));
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        theme: prefs.theme,
        locale: prefs.locale,
        timezone: prefs.timezone,
        setTheme,
        setLocale,
        setTimezone,
        hydrated,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
