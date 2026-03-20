import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type UserRole = "visitor" | "member" | "admin" | "superadmin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  membershipId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    // Simulated — replace with api.post("/auth/login", { email, password })
    await new Promise((r) => setTimeout(r, 800));
    
    // Since demo users are removed and there's no backend, this simulates a successful login 
    // for any credentials so you can still access the dashboard during development.
    const userData: User = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
      role: "member",
      membershipId: `DLCF-${Math.floor(Math.random() * 900) + 100}`,
    };
    localStorage.setItem("auth_token", "demo_jwt_token");
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setUser(userData);
    setIsLoading(false);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = { id: Date.now().toString(), name, email, role: "member", membershipId: `DLCF-${Math.floor(Math.random() * 900) + 100}` };
    localStorage.setItem("auth_token", "demo_jwt_token");
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (roles: UserRole[]) => !!user && roles.includes(user.role),
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated: !!user, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
