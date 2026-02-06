"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface FilterProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
}

const ActionFilterBar: React.FC<FilterProps> = ({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}) => {
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch); // only call parent setter after delay
    }, 500); // 500ms debounce

    return () => clearTimeout(handler); // cleanup on value change
  }, [localSearch, setSearch]);

  return (
    <Card className="p-0">
      <div className="w-full max-w-6xl p-4 md:p-6 rounded-2xl flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#648383]" />
          </div>
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            type="text"
            placeholder="Search action..."
            className="w-full bg-[#162c2c] text-white border border-[#33AD8C] rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#2dd4bf] placeholder:text-[#648383]"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative min-w-[180px]">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none bg-[#162c2c] text-[#a0bcbc] border border-[#33AD8C] rounded-xl py-3 px-4 pr-10 focus:outline-none cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-[#648383]" />
          </div>
        </div>

        {/* Priority Dropdown */}
        <div className="relative min-w-[180px]">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full appearance-none bg-[#162c2c] border border-[#33AD8C] text-[#a0bcbc] rounded-xl py-3 px-4 pr-10 focus:outline-none cursor-pointer"
          >
            <option value="">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-[#648383]" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActionFilterBar;
