"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: string; // default 476px
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "476px",
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-[${maxWidth}] bg-[#0A1A1A] text-gray-200 p-8 shadow-2xl z-[70] transform transition-transform duration-500 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Optional header */}
        {(title || subtitle) && (
          <div className="flex justify-between items-start mb-5">
            <div>
              {title && <h2 className="text-2xl font-semibold text-[#EFF2FE]">{title}</h2>}
              {subtitle && <p className="text-sm text-[#71858C] mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        )}

        {/* Drawer content */}
        <div>{children}</div>
      </div>
    </>
  );
};
