"use client";

import { RIGHT_ARROW, STRAIG_ALIGN } from "@/utils/icons";
import {
  CircleAlert,
  CircleCheckBig,
  Clock4,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { CardHeader } from "./CardHeader";
import { api } from "@/utils/api";
import { kpiService, SIGNALS } from "@/services/dashboard";
import { Drawer } from "./Drawer";
import IncidentDetailCard from "./SignalDetailCard";

type SignalSeverity = "critical" | "high" | "medium" | "low";

type RecentSignal = {
  id: string;
  type: "incident" | "task" | "communication";
  title: string;
  description: string;
  source: string;
  severity?: SignalSeverity;
  timestamp: string;
  team: string;
};

type StrategicItemProps = {
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  id:string
};

/* 🔹 Reusable Item */
const StrategicItem = ({
  icon,
  iconBg,
  title,
  subtitle,
  id
}: StrategicItemProps) => {
  
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
        const [signalId, setSignalId] = useState<string | null>(null);
  
  return (
    <>
  <div className="p-[10px] bg-[#0A1C24] rounded-[7px]">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div
            className={`flex justify-center items-center w-[25px] h-[25px] rounded-[7px] ${iconBg}`}
          >
            {icon}
          </div>

          <div>
            <p className="text-[#D2DCE5] font-500 text-[12px]">
              {title}
            </p>
            <p className="text-[#3C4C58] font-400 text-[11px]">
              {subtitle}
            </p>
          </div>
        </div>
        <div className=" p-2 h-fit cursor-pointer" onClick={()=>{
          setSignalId(id)
          setIsDrawerOpen(true)

        }}>
 {RIGHT_ARROW}
        </div>

       
      </div>
    </div>

       <Drawer
                  isOpen={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                  title="Recent Signals"
                  // subtitle="Detailed explanation"
                   maxWidth = "700px"
                >
                 <IncidentDetailCard signalId={signalId}/>
                </Drawer>
    </>
  
  );
};

type Props = {
  recentSignals?: RecentSignal[];
  loading?: boolean;
};

const LOAD_STEP = 5;

/* 🔹 Main Component */
export const StrategicAlignmentCard = ({
  recentSignals = [],
  loading = false,
}: Props) => {
  const [visibleCount, setVisibleCount] = useState(LOAD_STEP);

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

  const items: StrategicItemProps[] = recentSignals.map((signal) => {
    const { icon, bg,  } = getIconConfig(signal);

    return {
      icon,
      iconBg: bg,
      id:signal.id,
      title: signal.title,
      subtitle: `${signal.team} · ${formatTimeAgo(signal.timestamp)}`,
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

      <div className="flex flex-col gap-2 mt-[15px]">
        {loading
          ? [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-[52px] bg-[#101E25] rounded animate-pulse"
              />
            ))
          : visibleItems.map((item, index) => (
              <StrategicItem key={index} {...item} />
            ))}
      </div>

      {/* Load More Button */}
      {!loading && hasMore && (
        <button
          onClick={() =>
            setVisibleCount((prev) => prev + LOAD_STEP)
          }
          className="mt-4 text-[12px] text-[#469F88] hover:underline self-center"
        >
          Load more
        </button>
      )}
    </Card>
  );
};
