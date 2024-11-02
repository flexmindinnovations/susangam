"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { utility } from "@/app/utility/utils";
import { useApiConfig } from "@/app/utility/apiConfig";
import http from "@/app/utility/axios-instance";
import toast from "react-hot-toast";

interface AuthContextType {
  isLoggedIn: boolean;
  user: any | null,
  fetchDetails: () => Promise<void>,
}

const AuthContext = createContext<AuthContextType | any | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isPublicPath, setIsPublicPath] = useState(false);
  const pathname = usePathname();
  const publicPaths = ["login", "register"];
  const basePath = pathname?.split("/")[1] || "";
  const apiConfig = useApiConfig();

  useEffect(() => {
    const isPublic = publicPaths.includes(basePath);
    setIsPublicPath(isPublic);
    utility.isPublicPath.next(isPublic);
  }, [basePath]);

  const fetchUserDetails = async (): Promise<void | null> => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const getUserDetails = apiConfig.customer.getCustomerById(user.customerId) || "";
      const response = await http.get(getUserDetails);
      const { data } = response;
      if (data) {
        setUser(data);
        return data;
      }
    } catch (error: any) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return null;
    }
  };

  const logoutUser = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const loginUser = async () => {
    const isSingedIn = await isAuthenticated();
    if (isSingedIn) {
      setIsLoggedIn(true);
    }
  };

  const isAuthenticated = async () => {
    const _user = JSON.parse(localStorage.getItem("user") || "{}");
    const hasUserObj = _user && typeof _user === "object" && Object.keys(_user).length > 0;
    return hasUserObj && !!localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAuthenticated, user, fetchUserDetails, loginUser, logoutUser, isPublicPath }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};