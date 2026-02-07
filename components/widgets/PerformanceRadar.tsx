"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div style={{ height: 300, backgroundColor: "transparent" }} />,
});

// Type for a single team signal
export interface Metric {
  key: string;
  name: string;
  value: number;
  unit?: string;
  status: "critical" | "warning" | "good" | "excellent";
}

interface Props {
  metrics: Metric[];
}

const PerformanceRadar = ({ metrics }: Props) => {
  // Prepare series and categories dynamically
  const series = [
    {
      name: "Team Metrics",
      data: metrics.map((m) => m.value),
    },
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      background: "transparent",
    },
    colors: ["#469F885C"],
    markers: { size: 0, strokeWidth: 0 },
    stroke: { show: true, width: 3, colors: ["#33AD8C"], curve: "smooth" },
    fill: { opacity: 0.3 },
    xaxis: {
      categories: metrics.map((m) => m.name),
      labels: {
        rotate: 0,
        style: { colors: "#9ca3af", fontSize: "14px", fontFamily: "inherit" },
      },
    },
    yaxis: { show: false, min: 0 },
    plotOptions: {
      radar: {
        size: 120,
        polygons: {
          strokeColors: "#2d3748",
          strokeWidth: '1',
          connectorColors: "#2d3748",
          fill: { colors: ["transparent", "transparent"] },
        },
      },
    },
    legend: { show: false },
    tooltip: { theme: "dark" },
  };

  return (
    <div className="mt-[20px] w-full">
      <Chart options={options} series={series} type="radar" height={300} />
    </div>
  );
};

export default PerformanceRadar;
