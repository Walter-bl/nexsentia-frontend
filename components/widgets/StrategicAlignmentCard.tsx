"use client";

import { STRAIG_ALIGN } from "@/utils/icons";
import {
  Activity,
  CircleAlert,
  CircleCheckBig,
  Clock4,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { Card } from "../ui/Card";
import { CardHeader } from "./CardHeader";
import { Drawer } from "./Drawer";
import { IncidentDetailCard } from "./IncidentDetailCard";

type SignalSeverity = "critical" | "high" | "medium" | "low";

type RecentSignal = {
  id: string;
  type: "incident" | "task" | "communication";
  title: string;
  description: string;
  source: string;
  severity?: SignalSeverity; // Optional from API
  category: string;
  confidenceScore: number;
  timestamp: string;
  team: string;
  status: string;
    affectedEntities:any[]

};

type StrategicItemProps = {
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  id: string;
  severity: SignalSeverity; // Required for the UI
  confidenceScore: number;
  status: string;
  category: string;
  affectedEntities:any[]
};

/* 🔹 Reusable Item Component */
const StrategicItem = ({
  icon,
  iconBg,
  title,
  subtitle,
  id,
  severity,
  confidenceScore,
  affectedEntities,
  category,
}: StrategicItemProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [signalId, setSignalId] = useState<string | null>(null);

  // Severity color mapping
  const severityColors: Record<SignalSeverity, string> = {
    critical: "text-red-500 bg-red-500/10 border-red-500/20",
    high: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    medium: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    low: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  };

  return (
    <>
      <div className="p-[12px] bg-[#0A1C24] border border-[#1a2e31] rounded-[10px] hover:border-[#00bfa5]/40 transition-all group">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3">
            <div className={`flex justify-center items-center shrink-0 w-[32px] h-[32px] rounded-[8px] shadow-lg ${iconBg}`}>
              {icon}
            </div>

            <div>
              <p className="text-[#D2DCE5] font-semibold text-[13px] leading-tight mb-1">
                {title}
              </p>
              <p className="text-[#3C4C58] font-medium text-[11px]">
                {subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSignalId(id);
              setIsDrawerOpen(true);
            }}
            className="p-1.5 hover:bg-[#1a2e31] rounded-full transition-colors text-[#3C4C58] group-hover:text-[#00bfa5]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Data Row */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#1a2e31]">
  {/* Severity Badge */}
  <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${severityColors[severity]}`}>
    {severity}
  </span>

  {/* Affected Entities Section */}
  <div className="flex items-center gap-2">
    {affectedEntities?.map((entity: any) => (
      <div 
        key={entity.id} 
        className="flex items-center gap-1.5 px-2 py-0.5 rounded-md"
      >
        {/* Type Icon Indicator (Small dot colored by impact) */}
        {/* <div className={`w-1 h-1 rounded-full ${
          entity.impactLevel === 'high' ? 'bg-red-500' : 
          entity.impactLevel === 'medium' ? 'bg-orange-500' : 'bg-blue-400'
        }`} /> */}
    
        <span className="text-[10px] capitalize text-slate-200 font-bold">
        {entity.name} - {entity.type}
        </span>
      </div>
    ))}
  </div>

  {/* Confidence Score Bar */}
  <div className="flex items-center gap-2 ml-auto">
    <span className="text-[10px] text-[#3C4C58] font-medium">Confidence</span>
    <div className="w-12 h-1 bg-[#132326] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#00bfa5] transition-all duration-1000"
        style={{ width: `${confidenceScore}%` }}
      />
    </div>
    <span className="text-[10px] font-bold text-slate-300">{confidenceScore}%</span>
  </div>
</div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Signal Details"
        maxWidth="700px"
      >
        <IncidentDetailCard signalId={signalId} />
      </Drawer>
    </>
  );
};


/* ... existing imports and types ... */

type Props = {
  // Updated type to reflect the nested object structure in your JSON
  recentSignals?: Record<string, RecentSignal[]>; 
  loading?: boolean;
};

const LOAD_STEP = 5;

export const StrategicAlignmentCard = ({
  recentSignals = {}, // Default to empty object
  loading = false,
}: Props) => {
  // 1. State for the active filter (null means "All")
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(LOAD_STEP);

  // 2. Extract available sources (e.g., ["jira", "servicenow"])
  const sources = Object.keys(recentSignals);

  // 3. Flatten and filter data
  const allSignalsFlat = Object.entries(recentSignals).flatMap(([source, signals]) =>
    signals.map((s) => ({ ...s, source })) // Inject source name into signal
  );

  const filteredSignals = activeFilter
    ? allSignalsFlat.filter((s) => s.source === activeFilter)
    : allSignalsFlat;

  /* Helper functions (getIconConfig, formatTimeAgo) remain the same */
  const getIconConfig = (signal: RecentSignal) => {
    if (signal.type === "incident") {
      if (signal.severity === "critical" || signal.severity === "high") {
        return {
          icon: <CircleAlert size={13} className="text-[#FA6464]" />,
          bg: "bg-[#2A1A1A]",
        };
      }
      return {
        icon: <Clock4 size={13} className="text-[#F4BE5E]" />,
        bg: "bg-[#252E28]",
      };
    }

    return {
      icon: <CircleCheckBig size={13} className="text-[#469F88]" />,
      bg: "bg-[#123231]",
    };
  };

  const formatTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  // 4. Map filtered data to UI props
  const items: StrategicItemProps[] = filteredSignals.map((signal) => {
    const { icon, bg } = getIconConfig(signal);
    return {
      icon,
      iconBg: bg,
      id: signal.id,
      title: signal.title,
      category: signal.category,
      severity: signal.severity || "low",
      status: signal.status,
      confidenceScore: signal.confidenceScore,
      affectedEntities: signal?.affectedEntities,
      subtitle: `${formatTimeAgo(signal.timestamp)}`,
    };
  });

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  return (
    <Card>
      <CardHeader
        label=" Recent Signals "
        text=" AI-detected organizational patterns "
        icon={STRAIG_ALIGN}
      />

      {/* 5. Filter Buttons Row */}
      {!loading && sources.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 px-1">
          <button
            onClick={() => { setActiveFilter(null); setVisibleCount(LOAD_STEP); }}
            className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all border ${
              activeFilter === null 
              ? "bg-[#00bfa5] border-[#00bfa5] text-[#0A1C24]" 
              : "bg-transparent border-[#1a2e31] text-[#71858C] hover:border-[#3C4C58]"
            }`}
          >
            ALL
          </button>
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => { setActiveFilter(source); setVisibleCount(LOAD_STEP); }}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all border ${
                activeFilter === source
                ? "bg-[#00bfa5] border-[#00bfa5] text-[#0A1C24]"
                : "bg-transparent border-[#1a2e31] text-[#71858C] hover:border-[#3C4C58]"
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 mt-[15px]">
        {loading
          ? [...Array(5)].map((_, i) => (
              <div key={i} className="h-[100px] bg-[#101E25] rounded-[10px] animate-pulse" />
            ))
          : visibleItems.map((item) => (
              <StrategicItem key={item.id} {...item} />
            ))}
            
        {!loading && visibleItems.length === 0 && (
          <div className="text-center py-10 text-[#3C4C58] text-sm">
            No signals found for this source.
          </div>
        )}
      </div>

      {!loading && hasMore && (
        <div className="flex justify-center mt-8 mb-4"> 
          <button
            onClick={() => setVisibleCount((prev) => prev + LOAD_STEP)}
            className="px-8 py-2.5 cursor-pointer rounded-full bg-[#469F88]/10 border border-[#469F88]/30 text-[#469F88] text-[13px] font-semibold tracking-wide hover:bg-[#469F88] hover:text-white transition-all duration-300"
          >
            Show More Signals
          </button>
        </div>
      )}
    </Card>
  );
};