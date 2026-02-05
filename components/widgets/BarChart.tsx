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
  const monthLabels = chartData.map((item) => {
    const date = new Date(item.month + "-01"); // append day to parse
    return date.toLocaleString("default", { month: "short" });
  });

  const series = [
    {
      name: "Total Escalations",
      data: chartData.map((item) => item.count),
    },
  ];

  const options: any = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "top",
        columnWidth: "20%",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    colors: chartData.map((item) => (item.count > 0 ? "#F99D0F" : "#20393D")),
    xaxis: {
      categories: monthLabels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#71858C" } },
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      labels: { style: { colors: "#71858C" } },
    },
    grid: { show: false },
    tooltip: { theme: "dark" },
    legend: { show: false },
  };

  return (
    <>
    

      <Chart options={options} series={series} type="bar" height={250} />

    
    </>
  );
}
