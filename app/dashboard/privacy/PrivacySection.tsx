import React from "react";
import { Shield, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

const PrivacySection = () => {
  // DRY: Centralized data for the metric cards
  const metrics = [
    { label: "Anonymized", value: "100%" },
    { label: "PII Stored", value: "0" },
    { label: "Compliant", value: "SOC2" },
    { label: "Compliant", value: "GDPR" },
  ];

  return (
    <Card className="p-8 xl:px-25">
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-10">
        <div className="p-2 bg-[#124337] rounded-lg">
          <Shield className="w-6 h-6 text-[#71858C]" />
        </div>
        <div>
          <p className="text-[15px] uppercase font-600 text-[#EFF2FE]">
            {" "}
            Privacy-First Architecture
          </p>
          <p className="text-[12px] font-400 text-[#71858C]">
            {" "}
            Your data is protected by enterprise-grade security measures
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#33AD8C] bg-[#469F8845] hover:bg-teal-900/20 transition-colors"
          >
            <span className="text-[25px] font-[700] text-[#8AF1B9] mb-1">
              {item.value}
            </span>
            <span className="text-[16px] text-[#D2DCE5] font-normal">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PrivacySection;
