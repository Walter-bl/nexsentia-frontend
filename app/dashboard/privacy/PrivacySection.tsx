"use client";

import React from "react";
import { Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface PrivacyArchitecture {
  anonymizationRate: number;
  piiStored: number;
  soc2Compliant: boolean;
  gdprCompliant: boolean;
  message: string;
}

interface PrivacySectionProps {
  privacyArchitecture?: PrivacyArchitecture; // optional in case data isn't ready
}

const PrivacySection = ({ privacyArchitecture }: PrivacySectionProps) => {
  // Fallback values if prop is undefined
  const {
    anonymizationRate = 0,
    piiStored = 0,
    soc2Compliant = false,
    gdprCompliant = false,
    message = "Your data is protected by enterprise-grade security measures",
  } = privacyArchitecture || {};

  // Dynamically populate metrics
  const metrics = [
    { label: "Anonymized", value: `${anonymizationRate}%` },
    { label: "PII Stored", value: piiStored },
    { label: "Compliant", value: soc2Compliant ? "SOC2 ✅" : "SOC2 ❌" },
    { label: "Compliant", value: gdprCompliant ? "GDPR ✅" : "GDPR ❌" },
  ];

  return (
    <Card className="p-8 xl:px-15">
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-10">
        <div className="p-2 bg-[#124337] rounded-lg">
          <Shield className="w-6 h-6 text-[#71858C]" />
        </div>
        <div>
          <p className="text-[15px] uppercase font-semibold text-[#EFF2FE]">
            Privacy-First Architecture
          </p>
          <p className="text-[12px] font-normal text-[#71858C]">{message}</p>
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
