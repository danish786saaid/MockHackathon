"use client";

import { AuthProvider } from "@/lib/auth-context";
import { UserProvider } from "@/contexts/UserContext";
import { PreferencesProvider } from "@/contexts/PreferencesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </PreferencesProvider>
  );
}
