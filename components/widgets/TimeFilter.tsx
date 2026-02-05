"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TimeRange } from "@/services/dashboard";



const OPTIONS: { label: string; value: TimeRange }[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 14 days", value: "14d" },
  { label: "Last 30 days", value: "1m" },
   { label: "Last 3 months", value: "3m" },
      { label: "Last 6 months", value: "6m" },


  { label: "Last year", value: "1y" },
];

type Props = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
};

export const TimeFilter = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel =
    OPTIONS.find((o) => o.value === value)?.label || "Select";

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative   z-50 ">
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex cursor-pointer h-[33px] w-[151px] items-center justify-between gap-2 rounded-md
          border-[2px] border-[#71858C] bg-[#0F2B33] px-3 text-[13px] font-bold
          text-[#EFF2FE] hover:border-[#1EB389] transition"
      >
        {selectedLabel}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute overflow-hidden right-0 z-50 mt-2 w-[190px] rounded-lg
          border border-[#2E6F63] bg-[#0B1F1E] shadow-xl"
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full cursor-pointer px-4 py-2 text-left text-[13px]
                ${
                  value === opt.value
                    ? "bg-[#1EB389] text-black"
                    : "text-[#EFF2FE] hover:bg-[#123C3B]"
                } transition`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
