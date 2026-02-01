import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { TrendingUp } from "lucide-react";
import React from "react";
import SuccessBanner from "./SuccessBanner";

// Reusable Metric Card Component
const StatCard = ({
  title,
  value,
  subtext,
  subtext2,
  trend,
  isHighlight = false,
}: any) => (
  <div
    className={`p-6 rounded-xl border border-gray-800 ${isHighlight ? "bg-[#2a0a0a]" : "bg-[#0a1a1a]"} flex flex-col gap-2 h-full`}
  >
    <div className="flex justify-between items-start">
      <h3 className="text-[#EFF2FE] text-[16px] font-semibold uppercase">
        {title}
      </h3>

      {trend && (
        <Pill
          text=""
          icon={<TrendingUp size={12} />}
          width=""
          className="p-2"
        />
      )}
    
    </div>
    <div>
      <div
        className={`text-[25px] font-semibold ${title.includes("Financial") ? "text-red-400" : "text-[#EFF2FE]"}`}
      >
        {value}
      </div>
      <div className="text-[12px] flex gap-2 font-bold">
        <p className="text-[#71858C]  mt-2">{subtext}</p>
        <p className="text-[#D2DCE5]  mt-2">{subtext2}</p>
      </div>
    </div>
  </div>
);

// Reusable Comparison Section Component
const ComparisonList = ({ title, dotColor, items }: any) => (
  <Card className=" w-full">
    <div className="flex items-center gap-2 mb-6">
      <span className={`w-3 h-3 rounded-full ${dotColor}`}></span>
      <h3 className="text-[#EFF2FE] text-[16px] font-semibold">{title}</h3>
    </div>
    <div className="space-y-4">
      {items.map((item: any, idx: number) => (
        <div key={idx} className="flex justify-between text-sm">
          <span className="text-[#71858C] font-medium text-[15px] ">{item.label}</span>
          <span
            className={item.highlight ? "text-[#33AD8C]" : "text-[#C67C61]"}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  </Card>
);

export default function Page() {
  const secondaryStats = [
    {
      title: "Problems Resolved",
      value: "12",
      subtext: "Last 7 days ",
      subtext2: "+4 VS previous week",
      trend: true,
    },
    {
      title: "Cross-Team Alignments",
      value: "5",
      subtext: "Last 7 days ",
      subtext2: "+2 VS previous week",

      trend: true,
    },
    {
      title: "Meetings / Trainings Triggered",
      value: "8",
      subtext: "Last 7 days",
      subtext2: " Based on AI recommendations",

      trend: true,
    },
    {
      title: "Documentation Updates",
      value: "23",
      subtext: "Last 7 days ",
      subtext2: "~15% process clarity",

      trend: true,
    },
    {
      title: "Incidents Avoided",
      value: "7",
      subtext: "Last 7 days",
      subtext2: " Early detection prevented escalation",

      trend: true,
    },
    {
      title: "Estimated Financial Gain",
      value: "€285k",
      subtext: "Last 7 days ",
      subtext2: " Based on AI recommendations",

      trend: true,
    },
  ];

  return (
    <div className=" md:p-6  ">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Section */}
        <div className="grid rounded-[16px] grid-cols-1 p-8  lg:grid-cols-4 gap-4 bg-[#2a0a0a] border border-[#124337]">
          <div className="lg:col-span-2  rounded-xl flex flex-col justify-center">
            <span className="text-[#D2DCE5] text-[16.12px] uppercase mb-2">
              Total Value Generated
            </span>
            <h1 className="text-[25.8px] font-bold text-[#8AF1B9]">€1.2M</h1>
            <p className="text-[#D2DCE5] text-[16.12px] mt-2">
              Since platform implementation (6 months)
            </p>
          </div>
          <div className="grid grid-cols-2 lg:col-span-2 gap-4">
            <div className="flex flex-col p-6 rounded-xl border border-[#33AD8C] bg-[#469F8845] hover:bg-teal-900/20 transition-colors">
              <span className="text-[25px] font-[700] text-[#8AF1B9] mb-1">
                6.2x
              </span>
              <p className="text-[16px] text-[#D2DCE5] font-normal">ROI</p>
            </div>
            <div className="flex flex-col p-6 rounded-xl border border-[#33AD8C] bg-[#469F8845] hover:bg-teal-900/20 transition-colors">
              <span className="text-[25px] font-[700] text-[#8AF1B9] mb-1">
                10
              </span>
              <p className="text-[16px] text-[#D2DCE5] font-normal">
                Issues Prevented
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Grid for Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {secondaryStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Impact Comparison Section */}
        <div className="space-y-4">
          <h2 className="text-[20px] uppercase tracking-widest text-[#EFF2FE]">
            Impact Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComparisonList
              title="Before Platform"
              dotColor="bg-[#FF808B]"
              items={[
                { label: "Average Issue detection", value: "14 days" },
                { label: "Cross-team friction resolution", value: "21 days" },
                { label: "Monthly Incidents", value: "8-12" },
                { label: "Quarterly financial impact", value: "€850k" },
              ]}
            />
            <ComparisonList
              title="With Platform"
              dotColor="bg-emerald-500"
              items={[
                {
                  label: "Average Issue detection",
                  value: "2 days",
                  highlight: true,
                },
                {
                  label: "Cross-team friction resolution",
                  value: "5 days",
                  highlight: true,
                },
                { label: "Monthly Incidents", value: "2-3", highlight: true },
                {
                  label: "Quarterly financial impact",
                  value: "€180k",
                  highlight: true,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <SuccessBanner/>
    </div>
  );
}
