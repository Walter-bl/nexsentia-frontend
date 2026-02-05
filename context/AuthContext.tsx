"use client";


import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { AuthContextType, AuthResponse, RegisterPayload, User } from "@/types/auth";
import toast from "react-hot-toast";
import { UerInfo } from "@/types/user";
import { TimeRange } from "@/services/dashboard";



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UerInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
const [filter, setFilter] = useState<TimeRange>("7d");
  const [loading, setLoading] = useState(true);

  
  // Load tokens from localStorage on mount
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      fetchUser(storedAccessToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Save tokens to localStorage
  const saveTokens = (tokens: { accessToken: string; refreshToken: string }) => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  };

  const fetchUser = async (token?: string) => {
    setLoading(true);
    try {
      const data = await userService.getMe();
      setUser(data as any);
    } catch (error: any) {
      console.error("Fetch user failed:", error);
      setUser(null);
      toast.error("Failed to load user info");
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (data: RegisterPayload) => {
    setLoading(true);
    try {
      const res: AuthResponse = await authService.register(data);
      saveTokens(res.tokens); // only save tokens
      await fetchUser(); // fetch user info after registration
      toast.success("Account created successfully 🎉");
    } catch (error: any) {
      toast.error(error?.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
const login = async (data: { email: string; password: string }) => {
  setLoading(true);
  try {
    const res: AuthResponse = await authService.login(data);

    // Save only tokens
    saveTokens(res.tokens); // accessToken + refreshToken in localStorage

    // Fetch user info after successful login
    await fetchUser();

    toast.success("Logged in successfully 🎉");
  } catch (error: any) {

    console.log('error =======',error)
    // Handle API error responses
    if (error?.status === 401) {
      toast.error("Invalid credentials. Please check your email and password.");
      return
    } else if (error?.errors && Array.isArray(error.errors)) {
      // Validation errors (e.g., password rules)
      const messages = error.errors.map((e: any) => e.errors.join(", ")).join("\n");
      toast.error(messages);
    } else {
      // Generic fallback
      toast.error(error?.message || "Login failed");
    }

    throw error;
  } finally {
    setLoading(false);
  }
};


  // Logout user
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loading,
        register,
        login,
        logout,
        fetchUser,
        setSidebarOpen, sidebarOpen,
        filter, setFilter
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
