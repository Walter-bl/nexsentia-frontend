"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface BusinessEscalationItem {
  month: string; // e.g., "2026-01"
  count: number;
  totalLoss?: number;
  bySeverity?: {
    critical?: number;
    high?: number;
    medium?: number;
    low?: number;
  };
}

interface BarChartProps {
  chartData: BusinessEscalationItem[];
}

export default function BarChart({ chartData }: BarChartProps) {
  // Convert month string "YYYY-MM" to readable month like "Jan"
  const monthLabels = chartData?.map((item) => {
    const date = new Date(item.month + "-01");
    return date.toLocaleString("default", { month: "short" });
  });

  // Define the series based on severity levels
  const series = [
    {
      name: "Critical",
      data: chartData?.map((item) => item.bySeverity?.critical || 0),
    },
    {
      name: "High",
      data: chartData?.map((item) => item.bySeverity?.high || 0),
    },
    {
      name: "Medium",
      data: chartData?.map((item) => item.bySeverity?.medium || 0),
    },
    {
      name: "Low",
      data: chartData?.map((item) => item.bySeverity?.low || 0),
    },
  ];

  const options: any = {
    chart: {
      type: "bar",
      stacked: true, // 🔥 Key for Stacked Bar
      toolbar: { show: false },
      background: "transparent",
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "20%", // Adjusted for better visuals
      },
    },
    // Matches the CircularScore palette: Critical, High, Medium, Low
    colors: ["#C9672B", "#F2B84B", "#469F88", "#2EE6A6"],
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"], // Adds spacing between stack segments
    },
    xaxis: {
      categories: monthLabels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#71858C", fontSize: "12px" } },
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      labels: { style: { colors: "#71858C", fontSize: "12px" } },
    },
    grid: {
      show: true,
      borderColor: "rgba(113, 133, 140, 0.1)",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `${val} incidents`,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#71858C" },
      markers: { radius: 12 },
    },
  };

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
}