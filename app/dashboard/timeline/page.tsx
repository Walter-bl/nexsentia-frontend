"use client"; // Required for useState in Next.js App Router

import React, { useEffect, useState } from "react";
import {
  Filter,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import PageHeader from "@/components/widgets/PageHeader";
import { ImpactFilter } from "./ImpactFilter";
import { TimelineItem, timelineService } from "@/services/timeline";
type FilterType = "All" | "High Impact" | "Medium Impact" | "Low Impact";


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
const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  // 2. Filter the events based on the active state
  const filteredEvents = events.filter((event) => {
    if (activeFilter === "All") return true;
    return event.impact === activeFilter;
  });


  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      try {
        const res = await timelineService.getTimeline(page, limit);
        setTimeline(res.items);
      } catch (err) {
        console.error("Failed to load timeline", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [page, limit]);

  return (
    <div className="min-h-screen md:p-6  text-gray-300">
      {/* Header */}
<PageHeader
  title="Timeline"
  description="AI-generated analysis and recommendations"
/>

      {/* Filter Bar */}
    <ImpactFilter
  activeFilter={activeFilter}
  setActiveFilter={setActiveFilter}
/>

      {/* Timeline List */}
    <div className="space-y-4">
  {filteredEvents.length > 0 ? (
    filteredEvents.map((event, index) => (
      <div
        key={index}
        className="group relative rounded-[16px] border border-[#124337] bg-[#0D2027] p-4 sm:p-5 transition-all hover:border-[#0FBA96]/30 cursor-pointer"
      >
        {/* Top Row */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left meta */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {/* Date */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#71858C]">
              <CalendarDays size={14} className="text-gray-600" />
              {event.date}
            </div>

            {/* Impact */}
            <span
              className={`flex h-[26px] sm:h-[30px] items-center justify-center rounded-[7px] px-4 sm:px-6 text-[12px] sm:text-[13px] font-semibold ${event.impactColor}`}
            >
              {event.impact}
            </span>

            {/* Category */}
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#EFF2FE]">
              {event.category}
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-gray-600 transition-colors group-hover:text-[#0FBA96]">
            <Pill
              text=""
              icon={<TrendingUp size={12} />}
              width=""
              className="p-2"
            />
            <ChevronRight size={16} className="sm:size-[18px]" />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-start gap-3">
          <div className="flex h-[28px] w-[28px] sm:h-[31px] sm:w-[31px] items-center justify-center rounded-[10px] bg-[#27292A] shrink-0">
            <AlertTriangle
              size={16}
              className="text-[#F4BE5E] opacity-80 sm:size-[18px]"
            />
          </div>

          <h3 className="text-[15px] sm:text-lg font-semibold leading-snug text-white">
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
