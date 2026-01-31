import React from 'react';
import {  Database, CircleCheckBig, Eye, LockKeyhole } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const PrivacyGuarantees = () => {

  const guarantees = [
    {
      title: 'Fully Anonymized',
      description: 'All personal identifiers are removed before analysis',
      icon: <CircleCheckBig className="w-5 h-5 text-[#469F88]" />,
    },
    {
      title: 'No Personal Identification',
      description: 'Individual users cannot be identified from the data',
      icon: <Eye className="w-5 h-5 text-[#469F88]" />,
    },
    {
      title: 'No Data Storage',
      description: 'Raw data is never stored. Only aggregated patterns are retained',
      icon: <Database className="w-5 h-5 text-[#469F88]" />,
    },
    {
      title: 'Ephemeral Processing',
      description: 'All processing happens in isolated, temporary environments',
      icon: <LockKeyhole className="w-5 h-5 text-[#469F88]" />,
      
    },
  ];

  return (
    <Card className="p-8 xl:px-25">
      <h2 className="text-[18px] uppercase font-noram text-[#EFF2FE] mb-7">
        Privacy Guarantees
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guarantees.map((item, index) => (
          <div key={index} className="flex px-[30px] items-center min-h-[116px] gap-5 group bg-[#0A1C24] rounded-[7px]">
            {/* Icon Container */}
            <div className='flex gap-3'>
                 <div className="flex-shrink-0   w-12 h-12 rounded-xl bg-[#123231] flex items-center justify-center transition-colors group-hover:bg-emerald-500/20">
              {item.icon}
            </div>
            
            {/* Text Content */}
            <div className="space-y-1">
              <h3 className="text-[#D2DCE5] font-bold text-[16px] leading-tight">
                {item.title}
              </h3>
              <p className="text-[#3C4C58] text-[14px] leading-relaxed ">
                {item.description}
              </p>
            </div>
            </div>
           
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PrivacyGuarantees;