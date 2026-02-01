import React from 'react';
import { Search, ChevronDown } from 'lucide-react'; // Using lucide-react for icons
import { Card } from '@/components/ui/Card';

const ActionFilterBar = () => {
  return (
    <Card className="p-[0px] ">
      {/* Container with subtle border and dark teal background */}
      <div className="w-full max-w-6xl p-4 md:p-6 rounded-2xl flex flex-col md:flex-row gap-4">
        
        {/* Search Input Section */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#648383]" />
          </div>
          <input
            type="text"
            placeholder="Search action..."
            className="w-full bg-[#162c2c] text-white border border-[#33AD8C] rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#2dd4bf] transition-colors placeholder:text-[#648383]"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative min-w-[180px]">
          <select className="w-full appearance-none bg-[#162c2c] text-[#a0bcbc] border border-[#33AD8C] rounded-xl py-3 px-4 pr-10 focus:outline-none focus:border-[#2dd4bf] cursor-pointer">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-[#648383]" />
          </div>
        </div>

        {/* Priorities Dropdown */}
        <div className="relative min-w-[180px]">
          <select className="w-full appearance-none bg-[#162c2c] border border-[#33AD8C] text-[#a0bcbc] border border-[#2dd4bf50] rounded-xl py-3 px-4 pr-10 focus:outline-none focus:border-[#2dd4bf] cursor-pointer">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
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