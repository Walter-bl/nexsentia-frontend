import React from 'react';
import { CheckCircle2 } from 'lucide-react'; // Using lucide-react for the icon
import { Card } from '@/components/ui/Card';

const SuccessBanner = () => {
  const highlights = [
    { bold: "85% faster", text: "issue detection" },
    { bold: "76% fewer", text: "incidents" },
    { bold: "€670k", text: "quarterly savings" },
  ];

  return (
    <Card className="mt-[40px]">
      <div className="flex items-center gap-4 backdrop-blur-sm">
        {/* Success Icon */}
        <div className="flex-shrink-0">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
        </div>

        {/* Content Area */}
        <div className="flex flex-wrap items-center gap-x-2 text-sm md:text-base text-gray-300">
          {highlights.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex gap-1.5 items-center">
                <span className="font-bold text-white whitespace-nowrap">
                  {item.bold}
                </span>
                <span className="whitespace-nowrap">{item.text}</span>
              </div>
              
              {/* Dot Separator (Hidden after last item) */}
              {index < highlights.length - 1 && (
                <span className="mx-1 text-gray-500 hidden sm:inline">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SuccessBanner;