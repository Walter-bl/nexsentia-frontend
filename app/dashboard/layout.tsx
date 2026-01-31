"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { GradientButton } from "@/components/ui/GradientButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main area */}
      <div className="flex w-full flex-1 flex-col lg:ml-[262px] ">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 w-full  p-4 lg:p-6 mt-[62px]">{children}</main>
      </div>
      <GradientButton/>
    </div>
  );
};

export default Layout;
