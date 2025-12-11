"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { AuthenticationService } from "../lib/services/auth/AuthenticationService";
import { LoginRequest, RegisterRequest } from "../lib/models/Authentication";

interface AuthContextType {
    authService: AuthenticationService;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (dto: LoginRequest) => Promise<string>;
    register: (dto: RegisterRequest) => Promise<string>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const authService = useMemo(() => new AuthenticationService(), []);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        setIsAuthenticated(authService.isAuthenticated());
        setIsAdmin(authService.getRoles().includes("Admin"));
    }, [authService]);

    const login = async (dto: LoginRequest) => {
        const token = await authService.login(dto);
        setIsAuthenticated(true);
        setIsAdmin(authService.getRoles().includes("Admin"));
        return token;
    };

    const register = async (dto: RegisterRequest) => {
        const token = await authService.register(dto);
        setIsAuthenticated(true);
        setIsAdmin(authService.getRoles().includes("Admin"));
        return token;
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ authService, isAuthenticated, isAdmin, login, register, logout }}>
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
