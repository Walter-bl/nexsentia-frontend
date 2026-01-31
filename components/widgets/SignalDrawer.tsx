import React from "react";
import { X, Sparkles, Clock, FileText } from "lucide-react";
import { ARROW_BUTTON, FILE } from "@/utils/icons";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignalDrawer = ({ isOpen, onClose }: DrawerProps) => {
  return (
    <>
      {/* Backdrop: Visible only when isOpen is true */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-[476px] bg-[#0A1A1A] text-gray-200 p-8 shadow-2xl z-[70] transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-semibold text-[#EFF2FE]">
              Signal Detection
            </h2>
            <p className="text-sm text-[#71858C] mt-1">Detailed explanation</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          <section>
            <h3 className="text-[10px] font-bold text-[#71858C] uppercase tracking-[0.15em] mb-4">
              What this means
            </h3>
            <p className="text-[13px] font-400 leading-relaxed text-[#D2DCE5]">
              AI-detected patterns and weak signals across organizational data
              that may indicate emerging trends or issues.
            </p>
          </section>

          <section>
            <h3 className="text-[10px] font-bold text-[#71858C] uppercase tracking-[0.15em] mb-4">
              Key Drivers
            </h3>
            <ul className="space-y-4">
              {[
                "Pattern recognition across communications",
                "Anomaly detection in operational metrics",
                "Trend analysis from multiple data sources",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px]">
                  <span className="w-2 h-2 rounded-full bg-[#469F88] mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Business Impact Card */}
          <div className="border border-[#33AD8C] bg-[#469F8845] rounded-2xl p-6">
            <h4 className="text-[#8AF1B9] text-[13px] font-bold uppercase tracking-widest mb-3">
              Business Impact
            </h4>
            <p className="text-sm text-[#D2DCE5] leading-relaxed">
              Early signal detection enables proactive intervention, reducing
              potential impact by up to 80%.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 space-y-4">
          <button className="w-full py-2 rounded-[10px] bg-gradient-to-r from-[#02996E] to-[#0895AE] text-white font-semibold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
            <Sparkles size={18} /> AI Agent
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className=" text-[#71858C] flex items-center justify-center gap-2 py-2 bg-[#EFF2FE] hover:bg-white/10 rounded-xl text-xs font-medium transition-colors border border-white/5">
              {ARROW_BUTTON} Go to Timeline
            </button>
            <button className="flex  text-[#71858C] items-center justify-center gap-2 py-2 bg-[#EFF2FE] hover:bg-white/10 rounded-xl text-xs font-medium transition-colors border border-white/5">
              {FILE} Generate Summary
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
