"use client";

import React, { useState } from "react";
import { OverlapSlider } from "../ui/OverlapSlider";
import { Card } from "../ui/Card";
import { CardHeader } from "./CardHeader";
import { SIGNAL } from "@/utils/icons";
import PerformanceRadar, { Metric } from "./PerformanceRadar";
import { Drawer } from "./Drawer";
import TeamSignalsWindow from "./TeamSignalsWindow";

// Single team signal
export interface TeamSignal {
  team: string; // e.g., "Engineering", "Product"
  metrics: Metric[]; // metrics for that team
  overallScore: number; // overall score for the team
}

// Props for component using all team signals
export interface PerformanceDimProps {
  teamSignals: TeamSignal[];
}

const PerformanceDim: React.FC<any> = ({ teamSignals }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Card>
      <div>
        <CardHeader
          label=" PERFORMANCE DIMENSIONS "
          text=" Multi-axis organizational view "
          icon={SIGNAL}
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>

      {/* Radar chart for first team (you can make dynamic later) */}
      <PerformanceRadar metrics={teamSignals?.byMetric || []} />

      {/* Divider */}
      <div className="h-[1px] bg-[#1A2A2A] w-full mb-8" />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 text-center">
        {teamSignals?.byMetric?.map((metric: any) => (
          <div key={metric.key} className="flex flex-col items-center">
            <span className="text-[15px] font-medium text-[#EFF2FE] mb-1">
              {metric?.value?.toFixed(2)}
            </span>
            <span className="text-[#71858C] text-[12px] font-normal leading-tight">
              {metric?.name}
            </span>
          </div>
        ))}
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Team Signals"
        // subtitle="Detailed explanation"
        maxWidth="700px"
      >
        <TeamSignalsWindow teamSignals={teamSignals?.byTeam} />
      </Drawer>
    </Card>
  );
};

export default PerformanceDim;
