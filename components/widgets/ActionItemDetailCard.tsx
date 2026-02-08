"use client";

import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  ShieldCheck, 
  Link as LinkIcon, 
  User, 
  Zap,
  Loader2,
  Eye,
  Info
} from "lucide-react";
import { api } from "@/utils/api";
import { Card } from "../ui/Card";

// --- TypeScript Interfaces ---

interface ImmediateAction {
  step: number;
  title: string;
  description: string;
  estimatedTime: string;
  priority: string;
}

interface Documentation {
  title: string;
  url: string;
  relevance: string;
}

interface PreventiveMeasure {
  title: string;
  description: string;
  impact?: string;
  effort?: string;
}

interface ActionItem {
  id: string | number;
  title: string;
  description: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  sourceType: string;
  sourceId: string;
  assignedToName: string;
  metadata?: {
    affectedSystems?: string[];
    estimatedImpact?: string;
  };
  aiAnalysis?: {
    estimatedEffort: string;
    detectedIssue?: string;
  };
  resolutionPlan: {
    rootCause: {
      analysis: string;
      likelyReasons: string[];
    };
    immediateActions: ImmediateAction[];
    preventiveMeasures: PreventiveMeasure[];
    monitoringChecklist: string[];
    successCriteria: string[];
    relatedDocumentation: Documentation[];
  };
}

interface ActionItemDetailProps {
  actionItemId: string | null | number;
}

const ActionItemDetailCard = ({ actionItemId }: ActionItemDetailProps) => {
  const [data, setData] = useState<ActionItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActionDetail = async () => {
      if (!actionItemId) return;
      try {
        setLoading(true);
        const response:ActionItem = await api.get(`/action-center/${actionItemId}`);
        // Safely extract data from common API response wrappers
        const result = response || response;
        setData(result as ActionItem);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load action item details.");
      } finally {
        setLoading(false);
      }
    };
    fetchActionDetail();
  }, [actionItemId]);

  if (loading) {
    return (
      <div className="max-w-[700px] mx-auto p-10 flex flex-col items-center justify-center space-y-4 text-[#465a69]">
        <Loader2 className="animate-spin" size={32} />
        <p className="text-sm font-medium">Analyzing Action Item...</p>
        <div className="w-full h-32 bg-[#0A1C24] animate-pulse rounded-lg mt-8" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-[700px] mx-auto p-10 text-center text-red-400">
        <p>{error || "No data available"}</p>
      </div>
    );
  }

  const priorityColors = {
    high: "text-red-400 bg-red-400/10 border-red-400/20",
    medium: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    low: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  };

  return (
    <Card className=" text-[#D2DCE5] font-sans pb-10">
      {/* 1. Header & Source Info */}
      <div className="p-6 border-b border-[#1a2e31]">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-2 py-1 rounded bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold uppercase border border-[#10b981]/20">
            {data.status}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${priorityColors[data.priority as keyof typeof priorityColors] || priorityColors.low}`}>
            {data.priority} Priority
          </span>
          <span className="text-[#465a69] text-[12px] ml-auto font-mono">
            {data.sourceType?.toUpperCase()}: {data.sourceId}
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-white">{data.title}</h1>
        <p className="text-[#71858C] text-sm leading-relaxed">{data.description}</p>
        
        {/* Metadata Badges (Affected Systems / Impact) */}
        {data.metadata && (
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#1a2e31]/50">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#465a69] uppercase font-bold">Affected:</span>
              <span className="text-[11px] text-slate-300">{data.metadata.affectedSystems?.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#465a69] uppercase font-bold">Impact:</span>
              <span className="text-[11px] text-slate-300">{data.metadata.estimatedImpact}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-8">
        {/* 2. Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0A1C24] p-4 rounded-lg border border-[#1a2e31] flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400"><User size={20} /></div>
            <div>
              <p className="text-[10px] text-[#465a69] uppercase font-bold">Assigned To</p>
              <p className="text-sm font-medium">{data.assignedToName || "Unassigned"}</p>
            </div>
          </div>
          <div className="bg-[#0A1C24] p-4 rounded-lg border border-[#1a2e31] flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400"><Clock size={20} /></div>
            <div>
              <p className="text-[10px] text-[#465a69] uppercase font-bold">Effort / Category</p>
              <p className="text-sm font-medium">{data.aiAnalysis?.estimatedEffort} · {data.category}</p>
            </div>
          </div>
        </div>

        {/* 3. AI Analysis Detail */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-[#00bfa5]">
            <Zap size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">AI Strategic Analysis</h2>
          </div>
          <div className="bg-[#0D2329] p-5 rounded-lg border border-[#00bfa5]/20 space-y-4">
            <div>
              <h4 className="text-[10px] text-[#00bfa5] uppercase font-bold mb-1">Root Cause Analysis</h4>
              <p className="text-sm text-slate-300">{data.resolutionPlan?.rootCause?.analysis}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.resolutionPlan?.rootCause?.likelyReasons?.map((reason: string, i: number) => (
                <span key={i} className="text-[10px] bg-[#162e35] px-2 py-1 rounded text-[#71858C] border border-white/5">• {reason}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Immediate Actions */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-[#F4BE5E]">
            <BarChart3 size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Resolution Plan</h2>
          </div>
          <div className="space-y-4 border-l border-[#1a2e31] ml-3 pl-6">
            {data.resolutionPlan?.immediateActions?.map((action: any) => (
              <div key={action.step} className="relative">
                <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-[#061419] border-2 border-[#F4BE5E]" />
                <h3 className="text-sm font-bold text-white">{action.title}</h3>
                <p className="text-xs text-[#71858C] mt-1">{action.description}</p>
                <div className="flex gap-3 mt-2">
                  <span className="text-[10px] font-mono text-[#F4BE5E] bg-[#F4BE5E]/10 px-1.5 py-0.5 rounded">{action.estimatedTime}</span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{action.priority} priority</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Preventive & Monitoring (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-[#0A1C24]/50 p-4 rounded-lg border border-[#1a2e31]">
            <div className="flex items-center gap-2 mb-3 text-purple-400">
              <ShieldCheck size={16} />
              <h3 className="text-[11px] font-bold uppercase">Preventive Measures</h3>
            </div>
            {data.resolutionPlan?.preventiveMeasures?.map((pm: any, i: number) => (
              <div key={i} className="mb-2">
                <p className="text-xs font-bold text-slate-300">{pm.title}</p>
                <p className="text-[10px] text-[#71858C]">{pm.description}</p>
              </div>
            ))}
          </section>

          <section className="bg-[#0A1C24]/50 p-4 rounded-lg border border-[#1a2e31]">
            <div className="flex items-center gap-2 mb-3 text-blue-400">
              <Eye size={16} />
              <h3 className="text-[11px] font-bold uppercase">Monitoring Checklist</h3>
            </div>
            <ul className="space-y-2">
              {data.resolutionPlan?.monitoringChecklist?.map((item: string, i: number) => (
                <li key={i} className="text-[10px] text-[#71858C] flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 6. Success Criteria */}
        <section className="bg-[#10b981]/5 p-5 rounded-xl border border-[#10b981]/10">
          <div className="flex items-center gap-2 mb-4 text-[#10b981]">
            <CheckCircle2 size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Success Criteria</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {data.resolutionPlan?.successCriteria?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-[11px] text-[#71858C]">
                <div className="mt-1"><CheckCircle2 size={12} className="text-[#10b981]" /></div>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* 7. Documentation */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-[#465a69]">
            <Info size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Resources</h2>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {data.resolutionPlan?.relatedDocumentation?.map((doc: any, i: number) => (
              <a href={doc.url} key={i} target="_blank" className="flex items-center justify-between p-3 rounded bg-[#0A1C24] border border-[#1a2e31] hover:border-[#00bfa5]/40 transition-all group">
                <div className="flex items-center gap-3">
                  <LinkIcon size={14} className="text-[#3C4C58] group-hover:text-[#00bfa5]" />
                  <div>
                    <p className="text-xs font-medium text-slate-300">{doc.title}</p>
                    <p className="text-[10px] text-[#465a69]">{doc.relevance}</p>
                  </div>
                </div>
                <LinkIcon size={12} className="opacity-0 group-hover:opacity-100 text-[#00bfa5]" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </Card>
  );
};

export default ActionItemDetailCard;