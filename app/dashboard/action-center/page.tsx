"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/components/widgets/PageHeader";
import ActionFilterBar from "./ActionFilterBar";
import ActionGrid from "./ActionGrid";
import {
  actionCenterService,
} from "@/services/action-center";
import StatusHeader from "./StatusHeader";

// --- Skeleton Components ---

const StatSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex flex-col p-6 rounded-xl border border-[#33AD8C]/30 bg-[#469F8815] animate-pulse">
        <div className="h-8 w-16 bg-[#8AF1B9]/20 rounded mb-2" />
        <div className="h-4 w-24 bg-[#D2DCE5]/20 rounded" />
      </div>
    ))}
  </div>
);

const Page = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [actions, setActions] = useState<any>(null); // Initialized as null
  const [loading, setLoading] = useState(true);

  const fetchActions = async () => {
    setLoading(true);
    try {
      const data = await actionCenterService.getItems({
        search,
        status: status || undefined,
        priority: priority || undefined,
      });
      setActions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActions();
  }, [search, status, priority]);

  // Safely calculate summaries
  const summaries = actions?.stats
    ? [
        { value: actions.stats.totalSources.toString(), label: "Sources" },
        { value: actions.stats.totalPiiStored.toLocaleString(), label: "PII Stored" },
        { value: actions.stats.activeConnections.toString(), label: "Active Connections" },
        {
          value: new Date(actions.stats.lastUpdate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          label: "Last Update",
        },
      ]
    : [];

  const uniqueStatuses = Array.from(
    new Set(actions?.actions?.map((a: any) => a.status) || []),
  );

  const statusCounts = uniqueStatuses.map((status: any) => {
    return {
      label: status.toUpperCase().replace("_", " "),
      count: actions?.actions?.filter((a: any) => a.status === status).length,
      badgeColor:
        status === "open"
          ? "bg-[#B5B5B552] text-[#000000]"
          : status === "in_progress"
            ? "bg-[#D3656782] text-[#000000]"
            : status === "done"
              ? "bg-[#339A8082] text-[#000000]"
              : "bg-gray-500 text-white",
    };
  });

  return (
    <div className="xl:px-[100px]">
      <PageHeader
        title="Action Center"
        description="AI-generated recommendations and task management"
      />

      {/* Stats Section */}
      {loading && !actions ? (
        <StatSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaries.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-xl border border-[#33AD8C] bg-[#469F8845] hover:bg-teal-900/20 transition-colors"
            >
              <span className="text-[25px] font-[700] text-[#8AF1B9] mb-1">
                {stat.value}
              </span>
              <span className="text-[16px] text-[#D2DCE5] font-normal">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <ActionFilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />
      
      <StatusHeader statuses={statusCounts} />
      
      {/* Pass loading prop to ActionGrid to show item skeletons */}
     {loading? <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[200px] rounded-2xl bg-gray-800/20 border border-gray-700 animate-pulse" />
        ))}
      </div>:<ActionGrid actions={actions?.actions || []} />}
    </div>
  );
};

export default Page;