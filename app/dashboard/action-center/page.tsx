import React from "react";
import PageHeader from "@/components/widgets/PageHeader";
import PrivacySection from "../privacy/PrivacySection";
import ActionFilterBar from "./ActionFilterBar";
import StatusHeader from "./StatusHeader";
import ActionGrid from "./ActionGrid";

const page = () => {

      const summaries = [
    { value: "6", label: "Sources" },
    { value: "305,808", label: "PII Stored" },
    { value: "5", label: "Active Connections" },
    { value: "2 mins ago", label: "Last Update" },
  ];
  return (
    <div className="xl:px-[100px]">
      <PageHeader
        title="Action Center"
        description="A1-generated recommendations and task management"
      />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaries.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-xl border border-[#33AD8C] bg-[#469F8845] hover:bg-teal-900/20 transition-colors"
            >
              <span className="text-[25px] font-[700] text-[#8AF1B9] mb-1">
                {stat.value}
              </span>

              <span className="text-[16px] text-[#D2DCE5] font-normal">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <ActionFilterBar/>
        <StatusHeader/>
        <ActionGrid/>
    </div>
  );
};

export default page;
