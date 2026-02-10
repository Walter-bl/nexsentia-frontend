"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react"; // Using Lucide for a clean spinner

interface AclGuardProps {
  children: ReactNode;
  requiredPermissions?: string[];
}

const AclGuard: React.FC<AclGuardProps> = ({ children, requiredPermissions = [] }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (user && pathname === "/") {
        router.replace("/dashboard");
        return;
      }
      if (!user && pathname !== "/") {
        router.replace("/");
        return;
      }
      if (user) {
        const hasPermission =
          requiredPermissions.length === 0 ||
          requiredPermissions.every((perm) => user.permissions.includes(perm));

        if (!hasPermission) {
          router.replace("/unauthorized");
        }
      }
    }
  }, [user, loading, router, pathname, requiredPermissions]);

  // --- NICE LOADING STATE ---
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
        {/* Animated Logo or Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-[#33AD8C]/20" />
          <Loader2 className="h-10 w-10 animate-spin text-[#33AD8C]" />
        </div>
        
        {/* Optional Branding Text */}
        <p className="mt-4 text-sm font-medium tracking-widest text-[#71858C] uppercase animate-pulse">
          Authenticating...
        </p>
      </div>
    );
  }

  if (!user && pathname !== "/") {
    return null; // Keep null here to prevent content flash during redirect
  }

  return <>{children}</>;
};

export default AclGuard;