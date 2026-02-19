"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { setCurrentUserId } from "@/contexts/UserContext";

const STORAGE_KEY = "sentinel-auth";

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  handle: string;
};

type StoredAuth = {
  user: User;
  onboardingComplete: boolean;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStored(): StoredAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

function saveStored(data: StoredAuth | null) {
  if (typeof window === "undefined") return;
  if (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadStored();
    if (stored?.user) {
      setUser(stored.user);
      setOnboardingComplete(stored.onboardingComplete ?? false);
      setCurrentUserId(stored.user.id);
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((u: User | null, complete: boolean) => {
    setUser(u);
    setOnboardingComplete(complete);
    if (u) {
      saveStored({ user: u, onboardingComplete: complete });
      setCurrentUserId(u.id);
    } else {
      saveStored(null);
    }
  }, []);

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      const { data: existingEmail } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existingEmail) {
        throw new Error("An account with this email already exists");
      }

      const { data: existingUsername } = await supabase
        .from("users")
        .select("id")
        .eq("username", username)
        .maybeSingle();

      if (existingUsername) {
        throw new Error("This username is already taken");
      }

      const { data, error } = await supabase
        .from("users")
        .insert({
          username,
          email,
          password,
          name: username,
        })
        .select("id, username, email, name")
        .single();

      if (error) throw new Error(error.message);

      const newUser: User = {
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        handle: `@${data.username}`,
      };
      persist(newUser, false);
    },
    [persist]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase
        .from("users")
        .select("id, username, email, name, password")
        .eq("email", email)
        .maybeSingle();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("No account found with this email");
      if (data.password !== password) throw new Error("Incorrect password");

      const loggedInUser: User = {
        id: data.id,
        username: data.username || slugFromName(data.name || "user"),
        name: data.name || data.username || email.split("@")[0],
        email: data.email,
        handle: `@${data.username || slugFromName(data.name || "user")}`,
      };
      persist(loggedInUser, true);
    },
    [persist]
  );

  const logout = useCallback(() => {
    persist(null, false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("sentinel_user_id");
      localStorage.removeItem("sentinel-auth");
    }
  }, [persist]);

  const completeOnboarding = useCallback(() => {
    if (!user) return;
    setOnboardingComplete(true);
    saveStored({ user, onboardingComplete: true });
  }, [user]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    onboardingComplete,
    login,
    register,
    logout,
    completeOnboarding,
  };

  if (!hydrated) {
    return (
      <AuthContext.Provider value={value}>
        <div className="min-h-screen flex items-center justify-center bg-[#0c0a09]">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-white/10" />
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { initials };
