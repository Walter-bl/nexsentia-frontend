"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface AclGuardProps {
  children: ReactNode;
  requiredPermissions?: string[]; // permissions needed to access this page
}

const AclGuard: React.FC<AclGuardProps> = ({ children, requiredPermissions = [] }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User not logged in → redirect to login
        router.replace("/");
        return;
      }

      // Check if user has all required permissions
      const hasPermission =
        requiredPermissions.length === 0 ||
        requiredPermissions.every((perm) => user.permissions.includes(perm));

      if (!hasPermission) {
        // User logged in but does not have permission → redirect to unauthorized page
        router.replace("/unauthorized");
      }
    }
  }, [user, loading, router, requiredPermissions]);

  // Show nothing while loading
  if (loading || !user) return null;

  return <>{children}</>;
};

export default AclGuard;
