"use client";

import React from "react";
import { Database, CircleCheckBig, Eye, LockKeyhole } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface GuaranteeItem {
  enabled: boolean;
  description: string;
}

interface PrivacyGuaranteesProps {
  privacyGuarantees?: {
    fullyAnonymized: GuaranteeItem;
    noPersonalIdentification: GuaranteeItem;
    noDataStorage: GuaranteeItem;
    ephemeralProcessing: GuaranteeItem;
  };
}

const PrivacyGuarantees = ({ privacyGuarantees }: PrivacyGuaranteesProps) => {
  if (!privacyGuarantees) return null; // optional fallback

  // Map guarantees from parent prop to displayable array
  const guarantees = [
    {
      title: "Fully Anonymized",
      description: privacyGuarantees.fullyAnonymized.description,
      icon: <CircleCheckBig className="w-5 h-5 text-[#469F88]" />,
      enabled: privacyGuarantees.fullyAnonymized.enabled,
    },
    {
      title: "No Personal Identification",
      description: privacyGuarantees.noPersonalIdentification.description,
      icon: <Eye className="w-5 h-5 text-[#469F88]" />,
      enabled: privacyGuarantees.noPersonalIdentification.enabled,
    },
    {
      title: "No Data Storage",
      description: privacyGuarantees.noDataStorage.description,
      icon: <Database className="w-5 h-5 text-[#469F88]" />,
      enabled: privacyGuarantees.noDataStorage.enabled,
    },
    {
      title: "Ephemeral Processing",
      description: privacyGuarantees.ephemeralProcessing.description,
      icon: <LockKeyhole className="w-5 h-5 text-[#469F88]" />,
      enabled: privacyGuarantees.ephemeralProcessing.enabled,
    },
  ].filter((item) => item.enabled); // only show enabled guarantees

  return (
    <Card className="p-8 xl:px-25">
      <h2 className="text-[18px] uppercase font-normal text-[#EFF2FE] mb-7">
        Privacy Guarantees
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guarantees.map((item, index) => (
          <div
            key={index}
            className="flex px-[30px] items-center min-h-[116px] gap-5 group bg-[#0A1C24] rounded-[7px]"
          >
            {/* Icon Container */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#123231] flex items-center justify-center transition-colors group-hover:bg-emerald-500/20">
              {item.icon}
            </div>

            {/* Text Content */}
            <div className="space-y-1">
              <h3 className="text-[#D2DCE5] font-bold text-[16px] leading-tight">
                {item.title}
              </h3>
              <p className="text-[#3C4C58] text-[14px] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PrivacyGuarantees;
