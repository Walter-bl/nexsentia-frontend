"use client"; // Required for useState in Next.js App Router

import React, { useState } from "react";
import {
  Filter,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import PageHeader from "@/components/widgets/PageHeader";

const events = [
  {
    date: "Dec 18",
    impact: "High Impact",
    category: "Communication",
    title: "Communication Bottleneck Detected",
    impactColor: "bg-[#7A3335] text-[#EFF2FE]",
    bg: "bg-[#7A3335]/30",
  },
  {
    date: "Dec 17",
    impact: "Medium Impact",
    category: "Operations",
    title: "Workload Distribution Imbalance",
    impactColor: "bg-[#A97C28] text-[#EFF2FE]",
  },
  {
    date: "Dec 16",
    impact: "Low Impact",
    category: "Incidents",
    title: "Recurrent Incident Pattern Resolved",
    impactColor: "bg-[#469F88] text-[#EFF2FE]",
  },
  {
    date: "Dec 15",
    impact: "Medium Impact",
    category: "Operations",
    title: "Decision Velocity Slowing",
    impactColor: "bg-[#A97C28] text-[#EFF2FE]",
  },
];

const Page = () => {
  // 1. Initialize filter state
  const [activeFilter, setActiveFilter] = useState("All");

  // 2. Filter the events based on the active state
  const filteredEvents = events.filter((event) => {
    if (activeFilter === "All") return true;
    return event.impact === activeFilter;
  });

  return (
    <div className="min-h-screen md:p-6  text-gray-300">
      {/* Header */}
<PageHeader
  title="Timeline"
  description="AI-generated analysis and recommendations"
/>

      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-2 text-gray-500 hover:text-white cursor-pointer">
          <Filter size={20} />
        </div>

        {/* Filter Buttons */}
        <button
          onClick={() => setActiveFilter("All")}
          className={`px-4 cursor-pointer h-[30px] flex justify-center items-center rounded-[7px] text-sm font-medium transition-all ${
            activeFilter === "All"
              ? "bg-[#124337] text-[#8AF1B9] ring-1 ring-[#8AF1B9]/30"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveFilter("High Impact")}
          className={`font-semibold px-5 cursor-pointer h-[30px] rounded-[7px] text-sm transition-all ${
            activeFilter === "High Impact"
              ? "bg-[#7A3335] text-[#EFF2FE] ring-1 ring-white/20"
              : "bg-[#7A3335]/30 text-gray-400 hover:bg-[#7A3335]/50"
          }`}
        >
          High Impact
        </button>

        <button
          onClick={() => setActiveFilter("Medium Impact")}
          className={`font-semibold  px-5 h-[30px] cursor-pointer rounded-[7px] text-sm transition-all ${
            activeFilter === "Medium Impact"
              ? "bg-[#A97C28] text-[#EFF2FE] ring-1 ring-white/20"
              : "bg-[#A97C28]/30 text-gray-400 hover:bg-[#A97C28]/50"
          }`}
        >
          Medium Impact
        </button>

        <button
          onClick={() => setActiveFilter("Low Impact")}
          className={`px-5 font-semibold cursor-pointer h-[30px]  rounded-[7px] text-sm transition-all ${
            activeFilter === "Low Impact"
              ? "bg-[#469F88] text-[#EFF2FE] ring-1 ring-white/20"
              : "bg-[#469F88]/30 text-gray-400 hover:bg-[#469F88]/50"
          }`}
        >
          Low Impact
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div
              key={index}
              className="group relative bg-[#0D2027] border border-[#124337] rounded-[16px] p-5 hover:border-[#0FBA96]/30 transition-all cursor-pointer"
            >
              {/* Top Row: Meta Data */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[11px] font-[700] text-[#71858C] uppercase tracking-wider">
                    <CalendarDays size={14} className="text-gray-600" />
                    {event.date}
                  </div>

                  <span
                    className={`px-6 flex justify-center items-center h-[30px] rounded-[7px] text-[13px] font-semibold tracking-tight ${event.impactColor}`}
                  >
                    {event.impact}
                  </span>

                  <span className="text-[14px] text-[#EFF2FE] font-semibold">
                    {event.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 group-hover:text-[#0FBA96] transition-colors">
                  <Pill
                    text=""
                    icon={<TrendingUp size={12} />}
                    width=""
                    className="p-2"
                  />
                  <ChevronRight size={18} />
                </div>
              </div>

              {/* Bottom Row: Title */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-[31px] flex justify-center items-center rounded-[10px] h-[31px] bg-[#27292A]`}
                >
                  <AlertTriangle
                    size={18}
                    className="text-[#F4BE5E] opacity-80"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {event.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500 italic">
            No events found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
