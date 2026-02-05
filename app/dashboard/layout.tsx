"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/widgets/Sidebar";
import { Header } from "../../components/widgets/Header";
import { GradientButton } from "@/components/ui/GradientButton";
import AclGuard from "@/components/widgets/AclGuard";
import { useAuth } from "@/context/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {

  const {  setSidebarOpen, sidebarOpen}=useAuth()
  return (

     <AclGuard requiredPermissions={["reports.read"]}>
        <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main area */}
      <div className="flex w-full flex-1 flex-col lg:ml-[262px] ">
        <Header  />

        <main className="flex-1 w-full  p-4 lg:p-6 mt-[62px]">{children}</main>
      </div>
      <GradientButton/>
    </div>
    </AclGuard>
  
  );
};

export default Layout;
