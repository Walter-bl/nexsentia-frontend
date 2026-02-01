import React from 'react';
import { Clock } from 'lucide-react'; // Using Clock icon to match the design

const StatusHeader = () => {
  const statuses = [
    { label: 'OPEN', count: 3, badgeColor: 'bg-[#B5B5B552] text-[#000000]' },
    { label: 'IN PROGRESS', count: 2, badgeColor: 'bg-[#D3656782] text-[#000000]' },
    { label: 'DONE', count: 1, badgeColor: 'bg-[#339A8082] text-[#000000]' },
  ];

  return (
    <div className="w-full bg-[#020d0f] p-8 mt-[20px] mb-[15px]">
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
            <div className={`px-3 py-0.5 rounded-full text-[8.57px] font-bold min-w-[24px] flex justify-center items-center ${status.badgeColor}`}>
              {status.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusHeader;