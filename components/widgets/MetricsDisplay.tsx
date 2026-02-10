"use client";

import React from "react";
import { Clock, AlertCircle, TrendingUp, Zap } from "lucide-react";

export interface Metric {  // <--- Added export here
  key: string;
  name: string;
  value: number;
  unit: string;
  status: string;
}

interface MetricsDisplayProps {
  metrics: Metric[];
}
const getIcon = (key: string) => {
  const iconProps = { size: 18, className: "text-[#33AD8C]" };
  switch (key) {
    case "incident_resolution_time":
      return <Clock {...iconProps} />;
    case "critical_incidents_rate":
      return <AlertCircle {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
};

export default function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="w-full max-w-[700px] mx-auto">
      {/* Grid Logic: 
         - Stacked (1 col) on mobile/very narrow views
         - 2 Columns fixed for the 700px drawer width
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const isExcellent = metric.status === "excellent";
          
          return (
            <div
              key={metric.key}
              className="bg-[#0a1a1a] border border-gray-800 rounded-xl p-4 hover:border-[#33AD8C]/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="p-2 bg-black/40 rounded-lg border border-gray-900 group-hover:bg-[#33AD8C]/10 transition-colors">
                  {getIcon(metric.key)}
                </div>
                
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border whitespace-nowrap ${
                  isExcellent 
                    ? "bg-[#8AF1B9]/10 text-[#8AF1B9] border-[#8AF1B9]/20" 
                    : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                }`}>
                  <div className={`w-1 h-1 rounded-full ${isExcellent ? "bg-[#8AF1B9] animate-pulse" : "bg-gray-400"}`} />
                  {metric.status}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[#71858C] text-[10px] font-bold uppercase tracking-widest mb-1 leading-tight">
                  {metric.name}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <h4 className="text-xl font-bold text-[#EFF2FE]">
                    {Number.isInteger(metric.value) ? metric.value : metric.value.toFixed(2)}
                  </h4>
                  <span className="text-[10px] font-medium text-[#D2DCE5] opacity-50 uppercase">
                    {metric.unit}
                  </span>
                </div>
              </div>

              {/* <div className="mt-3 pt-3 border-t border-gray-900/50 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-[#33AD8C] font-bold">
                  <TrendingUp size={10} />
                  <span>8.2% Imp.</span>
                </div>
                <span className="text-[#71858C] opacity-60">vs last period</span>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}