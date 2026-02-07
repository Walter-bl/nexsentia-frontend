"use client";

import { Filter } from "lucide-react";

type FilterType = "All" | "High Impact" | "Medium Impact" | "Low Impact";

interface ImpactFilterProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

const FILTERS: {
  label: FilterType;
  active: string;
  inactive: string;
}[] = [
  {
    label: "All",
    active: "bg-[#124337] text-[#8AF1B9] ring-1 ring-[#8AF1B9]/30",
    inactive: "bg-white/5 text-gray-400 hover:bg-white/10",
  },
  {
    label: "High Impact",
    active: "bg-[#7A3335] text-[#EFF2FE] ring-1 ring-white/20",
    inactive: "bg-[#7A3335]/30 text-gray-400 hover:bg-[#7A3335]/50",
  },
  {
    label: "Medium Impact",
    active: "bg-[#A97C28] text-[#EFF2FE] ring-1 ring-white/20",
    inactive: "bg-[#A97C28]/30 text-gray-400 hover:bg-[#A97C28]/50",
  },
  {
    label: "Low Impact",
    active: "bg-[#469F88] text-[#EFF2FE] ring-1 ring-white/20",
    inactive: "bg-[#469F88]/30 text-gray-400 hover:bg-[#469F88]/50",
  },
];

export const ImpactFilter = ({
  activeFilter,
  setActiveFilter,
}: ImpactFilterProps) => {
  return (
    <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2 sm:mb-10 sm:gap-4">
      {/* Filter Icon */}
      <button className="shrink-0 rounded-md p-2 text-gray-500 hover:text-white">
        <Filter size={20} />
      </button>

      {/* Filters */}
      <div className="flex gap-2 sm:gap-3">
        {FILTERS.map(({ label, active, inactive }) => {
          const isActive = activeFilter === label;

          return (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`shrink-0 cursor-pointer flex h-[28px] sm:h-[30px] items-center justify-center rounded-[7px] px-4 sm:px-5 text-[13px] sm:text-sm font-semibold transition-all ${
                isActive ? active : inactive
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
