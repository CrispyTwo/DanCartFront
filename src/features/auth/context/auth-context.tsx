"use client";

import { AuthenticationService } from "@/src/lib/api/auth-service";
import { LoginRequest, RegisterRequest } from "@/src/types/auth.types";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useApi } from "@/src/hooks/use-api";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (dto: LoginRequest) => Promise<void>;
  register: (dto: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const api = useApi()
  const authService = useMemo(() => new AuthenticationService(api), []);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const router = useRouter()
  useEffect(() => {
    const checkSession = async () => {
      try {
        const authState = await authService.getState();

        if (authState.isAuthenticated) {
          setIsAuthenticated(authState.isAuthenticated);
          setIsAdmin(authState.user.roles.includes("Admin"));
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Failed to check session", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkSession();
  }, [authService]);

  const login = async (dto: LoginRequest) => {
    try {
      const authState = await authService.login(dto);
      setIsAuthenticated(authState.isAuthenticated);
      setIsAdmin(authState.user.roles.includes("Admin"));
    } catch {
      setIsAuthenticated(true);
    }
  };

  const register = async (dto: RegisterRequest) => {
    try {
      const authState = await authService.register(dto);
      setIsAuthenticated(authState.isAuthenticated);
      setIsAdmin(authState.user.roles.includes("Admin"));
    } catch {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}
