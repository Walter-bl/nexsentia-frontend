"use client";

import { AIAGENT, CHEVDOWN, LOGO } from "@/utils/icons";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  setSidebarOpen: (val: boolean) => void;
}

export const Header = ({ setSidebarOpen }: HeaderProps) => {

  const pathname = usePathname();

const isDashboardRoot = pathname === "/dashboard";

console.log('isDashboardRoot',isDashboardRoot)
  return (
<header className="fixed z-20 bg-[#070F12] flex h-[64px] w-full lg:w-[calc(100%-262px)] items-center justify-between px-4 lg:px-6">
    { isDashboardRoot&& <div className="flex w-full items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5 text-[#EFF2FE]" />
        </button>

        {/* Title – hide on very small screens */}
        <h2 className="hidden text-sm font-semibold text-[#EFF2FE] sm:block">
          Organizational Pulse
        </h2>
      </div>}

      <div className="flex items-center justify-end w-full gap-2 sm:gap-4">
        {/* Date filter */}
         {
          isDashboardRoot &&  <>
          
        <span className="hidden sm:flex h-[33px] w-[151px] items-center justify-between gap-3 rounded-md border-[2px] border-[#71858C] bg-[#0F2B33] px-3 text-[13px] font-bold text-[#EFF2FE]">
          Last 30 days
          {CHEVDOWN}
        </span>

        {/* AI Agent */}
        {/* <span className="flex h-[33px] items-center justify-center gap-2 rounded-[4px] bg-[linear-gradient(90deg,_#02996E_0%,_#0895AE_100%)] px-3 font-poppins text-sm font-semibold text-[#EFF2FE] sm:w-[118px]">
          {AIAGENT}
          <span className="hidden sm:inline">AI Agent</span>
        </span> */}

        {/* Divider */}
        {/* <div className="hidden h-[20px] w-[2px] bg-[#1A2A2A] sm:block" /> */}
       
        </>
        }
      

        {/* Logo */}
        {/* <div className="flex items-center gap-2">
          {LOGO}
          <p className="hidden font-poppins text-[15.275px] font-bold leading-[23px] text-[#EFF2FE] sm:block">
            NexSentia
          </p>
        </div> */}
      </div>
    </header>
  );
};
