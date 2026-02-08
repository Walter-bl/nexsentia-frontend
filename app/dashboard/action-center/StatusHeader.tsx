"use client";

import React from "react";
import { Clock } from "lucide-react"; // Icon

// Define the type for a single status
export interface StatusItem {
  label: string;
  count: number;
  badgeColor: string;
}

// Props for the StatusHeader component
interface StatusHeaderProps {
  statuses: StatusItem[];
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ statuses }) => {
  return (
    <div className="w-full p-8 mt-[20px] mb-[15px]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between max-w-6xl mx-auto gap-8 md:gap-4">
        {statuses.map((status) => (
          <div key={status.label} className="flex items-center gap-3">
            {/* Icon Container */}
            <div className="bg-[#124337] p-2 rounded-[7px]">
              <Clock className="w-5 h-5 text-[#71858C]" />
            </div>

            {/* Label */}
            <span className="text-[#EFF2FE] font-semibold tracking-wider text-[18.68px]">
              {status.label}
            </span>

            {/* Count Badge */}
            <div
              className={`px-3 text-[#EFF2FE] py-0.5 rounded-full text-[8.57px] font-bold min-w-[24px] flex justify-center items-center ${status.badgeColor}`}
            >
              {status.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusHeader;

