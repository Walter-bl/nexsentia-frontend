"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import PageHeader from "@/components/widgets/PageHeader";
import { ImpactFilter } from "./ImpactFilter";
import { TimelineItem, timelineService } from "@/services/timeline";
import { Pagination } from "@/components/widgets/Pagination";
import { Drawer } from "@/components/widgets/Drawer";
import TimelineEventDetails from "@/components/widgets/TimelineEventDetails";

type FilterType = "All" |"all" | "High Impact" | "Medium Impact" | "Low Impact";

// --- Skeleton Component ---
const TimelineSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div 
        key={i} 
        className="animate-pulse rounded-[16px] border border-[#124337] bg-[#0D2027]/50 p-4 sm:p-5"
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <div className="h-4 w-20 rounded bg-gray-700/50" /> {/* Date */}
            <div className="h-7 w-24 rounded-[7px] bg-gray-700/50" /> {/* Impact */}
            <div className="h-4 w-32 rounded bg-gray-700/50" /> {/* Category */}
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-700/50" /> {/* Action */}
        </div>
        <div className="flex items-start gap-3">
          <div className="h-7 w-7 rounded-[10px] bg-gray-700/50 shrink-0" /> {/* Icon */}
          <div className="h-6 w-3/4 rounded bg-gray-700/50" /> {/* Title */}
        </div>
      </div>
    ))}
  </div>
);

const impactColorMap: Record<string, string> = {
  high: "bg-[#7A3335] text-[#EFF2FE]",
  medium: "bg-[#A97C28] text-[#EFF2FE]",
  low: "bg-[#469F88] text-[#EFF2FE]",
};

const impactColorIcon: Record<
  string,
  { bg: string; text: string; icon: string }
> = {
  high: { bg: "rgba(242,92,84,0.2)", text: "#F25C54", icon: "#F25C54" },
  medium: { bg: "rgba(244,190,94,0.2)", text: "#F4BE5E", icon: "#F4BE5E" },
  low: { bg: "rgba(58,179,151,0.2)", text: "#3AB397", icon: "#3AB397" },
};

const TimelinePage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [eventId, setEventId] = useState<string | null>(null);
  const limit = 10;

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      try {
        const res = await timelineService.getTimeline(page, limit,activeFilter);
        setTimeline(res.events);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error("Failed to load timeline", err);
        setTimeline([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [page,activeFilter]);

  // const filteredEvents = useMemo(() => {
  //   if (activeFilter === "All") return timeline;
  //   return timeline.filter((event) => {
  //     const impactLabel =
  //       event.impactLevel.charAt(0).toUpperCase() +
  //       event.impactLevel.slice(1) +
  //       " Impact";
  //     return impactLabel === activeFilter;
  //   });
  // }, [timeline, activeFilter]);

  return (
    <div className="min-h-screen md:p-6 text-gray-300">
      <PageHeader
        title="Timeline"
        description="AI-generated analysis and recommendations"
      />

      <ImpactFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* Timeline List */}
      <div className="space-y-4">
        {loading ? (
          <TimelineSkeleton />
        ) : timeline.length ? (
          timeline.map((event) => {
            const impactLabel =
              event.impactLevel.charAt(0).toUpperCase() +
              event.impactLevel.slice(1) +
              " Impact";

            return (
              <div
                key={event.id}
                onClick={() => {
                  setEventId(event.id);
                  setIsDrawerOpen(true);
                }}
                className="group relative rounded-[16px] border border-[#124337] bg-[#0D2027] p-4 sm:p-5 transition-all hover:border-[#0FBA96]/30 cursor-pointer"
              >
                {/* Top Row */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#71858C]">
                      <CalendarDays size={14} />
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>

                    <span
                      className={`flex h-[26px] sm:h-[30px] items-center justify-center rounded-[7px] px-4 sm:px-6 text-[12px] sm:text-[13px] font-semibold ${
                        impactColorMap[event.impactLevel]
                      }`}
                    >
                      {impactLabel}
                    </span>

                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#EFF2FE]">
                      {event.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Pill
                      text=""
                      icon={
                        <TrendingUp
                          size={12}
                          color={impactColorIcon[event.impactLevel].icon}
                        />
                      }
                      width=""
                      bgColor={impactColorIcon[event.impactLevel].bg}
                      textColor={impactColorIcon[event.impactLevel].text}
                      className="p-2"
                    />
                    <ChevronRight
                      size={16}
                      color={impactColorIcon[event.impactLevel].icon}
                    />
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-start gap-3">
                  <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[10px] bg-[#27292A] shrink-0">
                    <AlertTriangle size={16} className="text-[#F4BE5E] opacity-80" />
                  </div>

                  <h3 className="text-[15px] sm:text-lg font-semibold leading-snug text-white">
                    {event.title}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center text-gray-500 italic">
            No events found for this filter.
          </div>
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Timeline event"
        maxWidth="700px"
      >
        <TimelineEventDetails eventId={eventId} />
      </Drawer>
    </div>
  );
};

export default TimelinePage;