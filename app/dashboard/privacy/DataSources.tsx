"use client";

import React from "react";
import { Clock, Database, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import PageHeader from "@/components/widgets/PageHeader";
import Image from "next/image";

interface Source {
  id: string;
  name: string;
  platform: string;
  isConnected: boolean;
  users: number;
  threads: number;
  participants: number;
  piiStored: number;
  lastSync: string | null;
  category: string;
  itemsProcessed: number;
}

interface DataSourcesProps {
  dataSources: {
    totalSources: number;
    totalPiiStored: number;
    activeConnections: number;
    lastUpdate: string;
    sources: Source[];
  };
}

const DataSources = ({ dataSources }: DataSourcesProps) => {
  // Safe destructure with fallback
  const {
    totalSources = 0,
    totalPiiStored = 0,
    activeConnections = 0,
    lastUpdate = new Date().toISOString(),
    sources = [],
  } = dataSources || {}; // <- fallback to empty object

  // Summary stats
  const summaries = [
    { value: totalSources, label: "Sources" },
    { value: totalPiiStored, label: "PII Stored" },
    { value: activeConnections, label: "Active Connections" },
    {
      value: new Date(lastUpdate).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      label: "Last Update",
    },
  ];

  return (
    <Card className="p-8 xl:px-15 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Data Sources"
          description="Connected integrations and data pipelines"
        />

        {/* Summary Row */}
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

        {/* Source Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sources.length > 0 ? (
            sources.map((source) => {
              const progress = Math.min((source.itemsProcessed / 10437) * 100, 100);

              const colorMap: Record<string, string> = {
                Jira: "bg-[#1868DB]",
                ServiceNow: "bg-[#0FBC85]",
                "Microsoft Outlook": "bg-[#0078D4]",
                Gmail: "bg-[#FF383C]",
                Slack: "bg-[#CB30E0]",
                "Microsoft Teams": "bg-[#6155F5]",
              };

              return (
                <div
                  key={source.id}
                  className="p-6 rounded-2xl border border-[#33AD8C] bg-[#469F8845] relative overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-3">
                      <div className="overflow-hidden rounded-[10px]">
                        <Image
                          src={`/${source.id}.png`}
                          width={48}
                          height={48}
                          alt={source.name}
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-[#EFF2FE] text-[18.68px] font-semibold leading-none">
                          {source.name}
                        </h3>
                        <span className="text-[14.94px] text-[#71858C]">
                          {source.platform}
                        </span>
                      </div>
                    </div>
<div
  className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 ${
    source.isConnected
      ? "bg-[#10b981]/10 border-[#10b981]/20 text-[#ffffff]" // Emerald Green
      : "bg-red-500/10 border-red-500/20 text-[#ffffff]"      // Soft Rose Red
  }`}
>
  <div
    className={`w-1.5 h-1.5 rounded-full ${
      source.isConnected
        ? "bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"
        : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
    }`}
  />
  <span className="text-[11px] font-bold uppercase tracking-wider">
    {source.isConnected ? "Connected" : "Disconnected"}
  </span>
</div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <Metric label="Users" value={source.users.toLocaleString()} />
                    <Metric label="Threads" value={source.threads.toLocaleString()} />
                    <Metric
                      label="Participants"
                      value={source.participants.toLocaleString()}
                    />
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-center text-[10px] mb-2 tracking-tighter">
                    <p className="flex items-center text-[14.94px] text-[#71858C] gap-1">
                      <Clock size={12} /> Last sync:{" "}
                      {source.lastSync
                        ? new Date(source.lastSync).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </p>
                    <div className="flex gap-2">
                      <Database size={12} className="text-[#FFFFFF]" />
                      <FileText size={12} className="text-[#FFFFFF]" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="font-medium text-[12px] text-[#D2DCE5]">
                        {source.category}
                      </span>
                      <span className="font-normal text-[12.87px] text-[#71858C]">
                        {source.itemsProcessed.toLocaleString()} items
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#8181A5] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colorMap[source.name] || "bg-[#469F88]"} opacity-80`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No sources available
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

// Metric Helper Component
const Metric = ({ label, value }: { label: string; value: string | number }) => (
  <div className="text-center">
    <div className="text-[#EFF2FE] font-semibold text-[18.86px]">{value}</div>
    <div className="text-[14.94px] text-[#71858C] font-normal">{label}</div>
  </div>
);

export default DataSources;


