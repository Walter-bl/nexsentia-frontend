"use client";

import React from "react";

type OverallHealthCounts = {
  excellentCount: number;
  goodCount: number;
  warningCount: number;
  criticalCount: number;
};

interface Props {
  overallHealth?: OverallHealthCounts;
  loading?: boolean;
}

const HealthCounts = ({ overallHealth, loading = false }: Props) => {
  const items = [
    { label: "Excellent", value: overallHealth?.excellentCount ?? 0 },
    { label: "Good", value: overallHealth?.goodCount ?? 0 },
    { label: "Warning", value: overallHealth?.warningCount ?? 0 },
    { label: "Critical", value: overallHealth?.criticalCount ?? 0 },
  ];

  return (
    <div className="flex w-full mt-[30px] justify-center gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-center flex-col">
          {loading ? (
            <div className="h-5 w-10 bg-[#1A1A1A] rounded animate-pulse mb-1" />
          ) : (
            <p className="font-500 text-[#EFF2FE] text-[20px]">{item.value}</p>
          )}
          {loading ? (
            <div className="h-3 w-12 bg-[#1A1A1A] rounded animate-pulse" />
          ) : (
            <p className="font-400 uppercase text-[#71858C] text-[12px]">
              {item.label}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default HealthCounts;
