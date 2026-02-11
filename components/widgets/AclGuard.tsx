"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface AclGuardProps {
  children: ReactNode;
  requiredPermissions?: string[];
}

const AclGuard: React.FC<AclGuardProps> = ({ children, requiredPermissions = [] }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Define routes that anyone can see (Login, Register, etc.)
  const publicRoutes = ["/", "/register"];

  useEffect(() => {
    if (!loading) {
      // 1. If logged in and trying to access Login/Register, go to dashboard
      if (user && publicRoutes.includes(pathname)) {
        router.replace("/dashboard");
        return;
      }

      // 2. If NOT logged in and trying to access a PROTECTED route, go to login (/)
      if (!user && !publicRoutes.includes(pathname)) {
        router.replace("/");
        return;
      }

      // 3. Permission Check for authenticated users
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

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-[#33AD8C]/20" />
          <Loader2 className="h-10 w-10 animate-spin text-[#33AD8C]" />
        </div>
        <p className="mt-4 text-sm font-medium tracking-widest text-[#71858C] uppercase animate-pulse">
          Authenticating...
        </p>
      </div>
    );
  }

  // Allow rendering if the user is logged in OR if the route is public
  const isPublicRoute = publicRoutes.includes(pathname);
  if (!user && !isPublicRoute) return null;

  return <>{children}</>;
};

export default AclGuard;