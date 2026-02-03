"use client";

import { useAuth } from "@/context/AuthContext";
import { LOGO } from "@/utils/icons";
import {
  Shield,
  AlertCircle,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Drawer } from "./Drawer";
import UserProfile from "./UserProfileI";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const pathname = usePathname();
  const {user}=useAuth()

  const navItems = [
    { label: "Pulse", icon: <Activity size={20} />, path: "/dashboard" },
    { label: "Timeline", icon: <Clock size={20} />, path: "/dashboard/timeline" },
    { label: "Privacy & Data", icon: <Shield size={20} />, path: "/dashboard/privacy" },
    { label: "Action Center", icon: <AlertCircle size={20} />, path: "/dashboard/action-center" },
    { label: "ROI & Impact", icon: <TrendingUp size={20} />, path: "/dashboard/toi-impact" },
  ];

 const isActive = (path: string) => {
  if (path === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
};


  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed flex flex-col justify-between h-[100vh]  z-40 w-[262px] bg-[#081617] transition-transform duration-300  lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-4 flex gap-2 items-center p-6 border-b border-[#1A2A2A]">
          {LOGO}
          <p className="mt-1 font-poppins text-[15.275px] font-bold leading-[23px] text-[#EFF2FE]">
            NexSentia
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4 flex-1 p-6">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`relative flex items-center gap-3 px-4 h-[58px] rounded-lg transition-all group ${
                  active
                    ? "text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && (
                  <div className="absolute inset-0 border-l-2 border-[#25AB80] rounded-lg bg-gradient-to-r from-[#0E2825] to-[#091B1F]" />
                )}

                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                    active
                      ? "bg-[#124337] text-[#5FB199]"
                      : "text-gray-400 bg-[#15292F] group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </div>

                <span className="text-sm font-medium relative z-10">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t border-white/10 p-6">
          <div   onClick={() => setIsDrawerOpen(true)} className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors group">
            <div
              className="
    flex h-[33.97px] w-[33.97px] uppercase items-center justify-center
    rounded-[18.0728px]
    bg-[linear-gradient(145.58deg,_#0BB995_15.09%,_#0AB9C7_84.4%)]
    font-poppins text-[13.5714px] font-semibold
    leading-[20px] text-[#EFF2FE]
  "
            >
              
               {user?.email.at(0)}

            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[13.57px] font-600 text-[#EFF2FE]">
                {user?.email}
              </span>
              <p className="text-[#5D7079] font-700 text-[11.37px]">  {user?.role}</p>
            </div>
          </div>
        </div>
      </aside>
         <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              title="Setting"
              // subtitle="Detailed explanation"
            >
              <UserProfile />
            </Drawer>
    </>
  );
};
