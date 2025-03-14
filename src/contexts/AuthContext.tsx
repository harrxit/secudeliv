
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserStatus, UserType } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  registerUser: (userData: Omit<User, "id" | "role" | "status" | "registeredAt">) => User;
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
      email: "admin@example.com",
      password: "admin123",
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
      password: "password123",
      phone: "123-456-7891",
      userType: "owner",
      registeredAt: new Date().toISOString(),
    },
    {
      id: "user-2",
      name: "Jane Smith",
      apartment: "B-202",
      role: "user",
      status: "approved",
      email: "jane@example.com",
      password: "password123",
      phone: "123-456-7892",
      userType: "tenant",
      ownerName: "Mike Johnson",
      ownerContact: "123-456-7893",
      registeredAt: new Date().toISOString(),
    },
  ]);

  // Filter for pending user registrations
  const pendingUsers = allUsers.filter(
    (u) => u.role === "user" && u.status === "pending"
  );

  const login = (email: string, password: string) => {
    const foundUser = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      return foundUser;
    }
    
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  const registerUser = (userData: Omit<User, "id" | "role" | "status" | "registeredAt">) => {
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
