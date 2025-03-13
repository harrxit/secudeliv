
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserStatus } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (role: "user" | "admin") => void;
  logout: () => void;
  registerUser: (userData: Omit<User, "id" | "role" | "status">) => User;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  pendingUsers: User[];
  allUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([
    {
      id: "admin-1",
      name: "Security Head",
      apartment: "Security Office",
      role: "admin",
      status: "approved",
      email: "security@example.com",
      phone: "123-456-7890",
      registeredAt: new Date().toISOString(),
    },
    {
      id: "user-1",
      name: "John Doe",
      apartment: "A-101",
      role: "user",
      status: "approved",
      email: "john@example.com",
      phone: "123-456-7891",
      registeredAt: new Date().toISOString(),
    },
    {
      id: "user-2",
      name: "Jane Smith",
      apartment: "B-202",
      role: "user",
      status: "approved",
      email: "jane@example.com",
      phone: "123-456-7892",
      registeredAt: new Date().toISOString(),
    },
  ]);

  // Auto-login on app start
  useEffect(() => {
    // Default to user role for auto-login
    const regularUser = allUsers.find(
      (u) => u.role === "user" && u.status === "approved"
    );
    if (regularUser) setUser(regularUser);
  }, []);

  // Filter for pending user registrations
  const pendingUsers = allUsers.filter(
    (u) => u.role === "user" && u.status === "pending"
  );

  const login = (role: "user" | "admin") => {
    // For demo, we'll log in as a specific user based on role
    if (role === "admin") {
      const adminUser = allUsers.find((u) => u.role === "admin");
      if (adminUser) setUser(adminUser);
    } else {
      // For demo, just log in as the first approved user
      const regularUser = allUsers.find(
        (u) => u.role === "user" && u.status === "approved"
      );
      if (regularUser) setUser(regularUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const registerUser = (userData: Omit<User, "id" | "role" | "status">) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      role: "user",
      status: "pending",
      registeredAt: new Date().toISOString(),
      ...userData,
    };

    setAllUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const updateUserStatus = (userId: string, status: UserStatus) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );

    // If the currently logged in user's status is being updated, update that too
    if (user && user.id === userId) {
      setUser({ ...user, status });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registerUser,
        updateUserStatus,
        pendingUsers,
        allUsers,
      }}
    >
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
