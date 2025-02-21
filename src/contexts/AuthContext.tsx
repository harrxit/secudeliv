
import React, { createContext, useContext, useState } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (role: "user" | "admin") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: "user" | "admin") => {
    // Simulated login - in real app, this would validate credentials
    setUser({
      id: "1",
      name: role === "admin" ? "Security Head" : "John Doe",
      apartment: role === "admin" ? "Security Office" : "A-101",
      role: role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
