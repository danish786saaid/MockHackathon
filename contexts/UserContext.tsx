"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/auth-context";

export type User = { id: string; name: string | null; email: string | null } | null;

const UserContext = createContext<User>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (!authUser?.id) {
      setUser(null);
      return;
    }
    supabase
      .from("users")
      .select("id, name, email")
      .eq("id", authUser.id)
      .maybeSingle()
      .then(({ data }) => {
        setUser(data ? { id: data.id, name: data.name, email: data.email } : null);
      });
  }, [authUser?.id]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

// Keep these exports so existing code doesn't break
export const USER_CHANGE_EVENT = "sentinel_user_change";
export function setCurrentUserId(id: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("sentinel_user_id", id);
    window.dispatchEvent(new CustomEvent(USER_CHANGE_EVENT, { detail: id }));
  }
}
