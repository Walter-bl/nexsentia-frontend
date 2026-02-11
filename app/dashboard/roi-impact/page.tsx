"use client";

import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { TrendingUp, Users, Zap, FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import SuccessBanner from "./SuccessBanner";
import { api } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

/**
 * SKELETON COMPONENTS
 * Animated placeholders that mimic the actual layout
 */
const SkeletonPulse = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-800/40 rounded ${className}`} />
);

const DashboardSkeleton = () => (
  <div className="md:p-6 space-y-8 max-w-7xl mx-auto">
    {/* Header Skeleton */}
    <div className="grid rounded-[16px] grid-cols-1 p-8 lg:grid-cols-4 gap-4 bg-[#2a0a0a] border border-[#124337]">
      <div className="lg:col-span-2 flex flex-col justify-center gap-3">
        <SkeletonPulse className="h-4 w-40" />
        <SkeletonPulse className="h-10 w-60" />
        <SkeletonPulse className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-2 lg:col-span-2 gap-4">
        <SkeletonPulse className="h-24 rounded-xl" />
        <SkeletonPulse className="h-24 rounded-xl" />
      </div>
    </div>

    {/* Secondary Stats Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="p-6 rounded-xl border border-gray-800 bg-[#0a1a1a] h-32 flex flex-col gap-4">
          <SkeletonPulse className="h-4 w-1/2" />
          <SkeletonPulse className="h-8 w-1/3" />
        </div>
      ))}
    </div>

    {/* Team Breakdown Skeleton */}
    <div className="space-y-4">
      <SkeletonPulse className="h-6 w-56" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#0a1a1a] border border-gray-800 rounded-xl p-5 h-48 flex flex-col gap-4">
            <div className="flex justify-between">
                <SkeletonPulse className="h-5 w-3/4" />
                <SkeletonPulse className="h-5 w-12" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SkeletonPulse className="h-12 w-full" />
              <SkeletonPulse className="h-12 w-full" />
            </div>
            <SkeletonPulse className="h-4 w-full mt-auto" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * DASHBOARD COMPONENTS
 */
const TeamImpactCard = ({ team }: any) => (
  <div className="bg-[#0a1a1a] border border-gray-800 rounded-xl p-5 flex flex-col gap-4 hover:border-[#33AD8C]/50 transition-all">
    <div className="flex justify-between items-center">
      <h4 className="text-[#EFF2FE] font-bold text-[14px] uppercase tracking-tight">{team.teamName}</h4>
      <div className="flex items-center gap-1 text-[#8AF1B9] bg-[#8AF1B9]/10 px-2 py-0.5 rounded text-[10px] font-bold">
        <Zap size={10} fill="currentColor" />
        {team.executionSpeed.current}x Speed
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div className="bg-black/40 p-3 rounded-lg border border-gray-900">
        <p className="text-[#71858C] text-[10px] uppercase font-bold">Time Saved</p>
        <p className="text-[#EFF2FE] text-[16px] font-bold">
          {Math.floor(team.timeSaved.total).toLocaleString()}h
        </p>
      </div>
      <div className="bg-black/40 p-3 rounded-lg border border-gray-900">
        <p className="text-[#71858C] text-[10px] uppercase font-bold">Resolved</p>
        <p className="text-[#EFF2FE] text-[16px] font-bold">{team.problemsResolved}</p>
      </div>
    </div>

    <div className="flex items-center justify-between pt-2 border-t border-gray-800/50">
       <div className="flex items-center gap-2 text-[11px] text-[#71858C]">
          <FileText size={12} />
          <span>{team.documentationUpdates} Updates</span>
       </div>
       <div className="text-[11px] text-[#D2DCE5] font-medium">
          {Math.floor(team.timeSaved.perWeek)}h / week
       </div>
    </div>
  </div>
);

const StatCard = ({ title, value, subtext, subtext2, trend, isHighlight = false }: any) => (
  <div className={`p-6 rounded-xl border border-gray-800 ${isHighlight ? "bg-[#2a0a0a]" : "bg-[#0a1a1a]"} flex flex-col gap-2 h-full`}>
    <div className="flex justify-between items-start">
      <h3 className="text-[#EFF2FE] text-[16px] font-semibold uppercase">{title}</h3>
      {trend && <Pill text="" icon={<TrendingUp size={12} />} className="p-2" width=""/>}
    </div>
    <div>
      <div className={`text-[25px] font-semibold ${title.includes("Financial") || title.includes("Value") ? "text-red-400" : "text-[#EFF2FE]"}`}>{value}</div>
      <div className="text-[12px] flex gap-2 font-bold">
        <p className="text-[#71858C] mt-2">{subtext}</p>
        <p className="text-[#D2DCE5] mt-2">{subtext2}</p>
      </div>
    </div>
  </div>
);

const ComparisonList = ({ title, dotColor, items }: any) => (
  <Card className="w-full">
    <div className="flex items-center gap-2 mb-6">
      <span className={`w-3 h-3 rounded-full ${dotColor}`}></span>
      <h3 className="text-[#EFF2FE] text-[16px] font-semibold">{title}</h3>
    </div>
    <div className="space-y-4">
      {items.map((item: any, idx: number) => (
        <div key={idx} className="flex justify-between text-sm">
          <span className="text-[#71858C] font-medium text-[15px]">{item.label}</span>
          <span className={item.highlight ? "text-[#33AD8C]" : "text-[#C67C61]"}>{item.value}</span>
        </div>
      ))}
    </div>
  </Card>
);

export default function Page() {
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { filter } = useAuth();

  useEffect(() => {
    const fetchImpactData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/kpi/dashboard/team-impact?timeRange=${filter}`);
        setApiData(response);
      } catch (error) {
        console.error("Failed to fetch impact data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImpactData();
  }, [filter]);

  if (loading) return <DashboardSkeleton />;
  if (!apiData) return <div className="p-6 text-red-400">Connection Error.</div>;

  const secondaryStats = [
    { title: "Problems Resolved", value: apiData.overallMetrics.problemsResolved.toString(), subtext: "Total Period", subtext2: "Across all teams", trend: true },
    { title: "Cross-Team Alignments", value: apiData.overallMetrics.crossTeamAlignments.toString(), subtext: "Last 3 months", subtext2: "Synthesized interactions", trend: true },
    { title: "Meetings / Trainings Triggered", value: apiData.overallMetrics.meetingsTriggered.toString(), subtext: "Actionable AI", subtext2: "Based on recommendations", trend: true },
    { title: "Documentation Updates", value: apiData.overallMetrics.documentationUpdates.toString(), subtext: "Process Clarity", subtext2: "Automated knowledge capture", trend: true },
    { title: "Incidents Avoided", value: apiData.overallMetrics.incidentsAvoided.toString(), subtext: "Risk Mitigation", subtext2: "Early detection prevention", trend: true },
    { title: "Estimated Time Saved", value: `${Math.floor(apiData.totalValue.timeSavedHours).toLocaleString()}h`, subtext: "Efficiency Gain", subtext2: "Based on engineering hours", trend: true },
  ];

  return (
    <div className="md:p-6 space-y-8 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="grid rounded-[16px] grid-cols-1 p-8 lg:grid-cols-4 gap-4 bg-[#2a0a0a] border border-[#124337]">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <span className="text-[#D2DCE5] text-[16.12px] uppercase mb-2">Total Value Generated (Hours)</span>
          <h1 className="text-[25.8px] font-bold text-[#8AF1B9]">
            {Math.floor(apiData.totalValue.timeSavedHours).toLocaleString()} Hours
          </h1>
          <p className="text-[#D2DCE5] text-[16.12px] mt-2">Since {apiData.totalValue.since} ({apiData.totalValue.periodMonths} months)</p>
        </div>
        <div className="grid grid-cols-2 lg:col-span-2 gap-4">
          <div className="flex flex-col p-6 rounded-xl border border-[#33AD8C] bg-[#469F8845]">
            <span className="text-[25px] font-[700] text-[#8AF1B9] mb-1">{apiData.roi.multiple.toFixed(1)}x</span>
            <p className="text-[16px] text-[#D2DCE5] font-normal">Avg. Hours Saved Per Problem</p>
          </div>
          <div className="flex flex-col p-6 rounded-xl border border-[#33AD8C] bg-[#469F8845]">
            <span className="text-[25px] font-[700] text-[#8AF1B9] mb-1">{apiData.issuesPrevented}</span>
            <p className="text-[16px] text-[#D2DCE5] font-normal">Issues Prevented</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {secondaryStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Team Breakdown Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
            <Users className="text-[#33AD8C]" size={20} />
            <h2 className="text-[20px] uppercase tracking-widest text-[#EFF2FE]">Team Impact Breakdown</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiData.teamBreakdown.map((team: any, idx: number) => (
            <TeamImpactCard key={idx} team={team} />
          ))}
        </div>
      </div>

      {/* Impact Comparison Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <ComparisonList
          title="Before Platform"
          dotColor="bg-[#FF808B]"
          items={[
            { label: "Average Issue detection", value: `${apiData.beforePlatform.avgIssueDetection} days` },
            { label: "Cross-team friction", value: `${Math.abs(apiData.beforePlatform.crossTeamFrictionResolution)} units` },
            { label: "Monthly Incidents", value: apiData.beforePlatform.monthlyIncidents },
            { label: "Quarterly Impact Hours", value: `${Math.abs(apiData.beforePlatform.quarterlyImpactHours).toFixed(0)}h` },
          ]}
        />
        <ComparisonList
          title="With Platform"
          dotColor="bg-emerald-500"
          items={[
            { label: "Average Issue detection", value: `${apiData.withPlatform.avgIssueDetection} days`, highlight: true },
            { label: "Cross-team friction", value: `${Math.abs(apiData.withPlatform.crossTeamFrictionResolution)} units`, highlight: true },
            { label: "Monthly Incidents", value: apiData.withPlatform.monthlyIncidents, highlight: true },
            { label: "Quarterly Impact Hours", value: `${Math.abs(apiData.withPlatform.quarterlyImpactHours).toLocaleString()}h`, highlight: true },
          ]}
        />
      </div>

      {/* <SuccessBanner /> */}
    </div>
  );
}