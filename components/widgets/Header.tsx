"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { TimeFilter, TimeFilterValue } from "./TimeFilter";
import { daysAgo } from "@/utils/helper";

interface HeaderProps {
  setSidebarOpen: (val: boolean) => void;
}

export const Header = ({ setSidebarOpen }: HeaderProps) => {
  const pathname = usePathname();
  const isDashboardRoot = pathname === "/dashboard";

  // ✅ missing state (this was causing errors)
  const [filter, setFilter] = useState<TimeFilterValue>("30d");
  console.log("filter ==", filter);

  return (
    <header className="fixed z-20 flex h-[64px] w-full items-center justify-between bg-[#070F12] px-4 lg:w-[calc(100%-262px)] lg:px-6">
      {/* Left side */}

      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5 text-[#EFF2FE]" />
        </button>

        {/* {isDashboardRoot && (
          <h2 className="hidden text-sm font-semibold text-[#EFF2FE] sm:block">
            Organizational Pulse
          </h2>
        )} */}
      </div>

      {/* Right side */}
      <div className="flex  items-center justify-end gap-2 sm:gap-4">
        {isDashboardRoot && (
          <TimeFilter value={filter} onChange={(v) => setFilter(v)} />
        )}
      </div>
    </header>
  );
};
