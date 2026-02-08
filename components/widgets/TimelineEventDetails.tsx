"use client";

import React, { useEffect, useState } from 'react';
import { 
  History, 
  User, 
  Server, 
  ShieldCheck, 
  Clock, 
  Lightbulb, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { timelineService } from '@/services/timeline';

const TimelineEventDetails = ({ eventId }: { eventId: string | null }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await timelineService.getTimelineDetail(eventId);
        setData(response);
      } catch (err) {
        setError("Could not retrieve timeline event.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <TimelineSkeleton />;
  if (error || !data) return <div className="text-red-400 p-4">{error || "No data"}</div>;

  const impactStyles = data.impactLevel === 'high' 
    ? "bg-red-500/10 text-red-500 border-red-500/20" 
    : "bg-blue-500/10 text-blue-400 border-blue-500/20";

  return (
    <div className="max-w-[700px] w-full mx-auto relative group pb-10">
      {/* Timeline connector line */}
      {/* <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#00bfa5] to-transparent ml-[20px] hidden sm:block" /> */}

      <div className="bg-[#0d1b1e] border border-[#2d4d52] rounded-2xl overflow-hidden shadow-xl hover:border-[#00bfa5]/30 transition-all duration-300">
        <div className="p-6">
          {/* 1. Header Section */}
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-[#1a2e31] border border-[#00bfa5] items-center justify-center text-[#00bfa5] z-10 shadow-[0_0_15px_rgba(0,191,165,0.2)]">
              <History size={20} />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${impactStyles}`}>
                  {data.impactLevel} Impact
                </span>
                <span className="text-slate-500 text-xs font-mono bg-slate-800/50 px-2 py-0.5 rounded italic">
                  {data.metadata.issueKey}
                </span>
                <span className="text-slate-500 text-xs ml-auto flex items-center gap-1">
                  <Clock size={12} /> {formatDate(data.eventDate)}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00bfa5] transition-colors leading-tight">
                {data.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{data.description}</p>
            </div>
          </div>

          {/* 2. Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#2d4d52] pt-6 pb-6">
            {/* <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1a2e31] rounded-lg text-slate-400"><User size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Assignee</p>
                <p className="text-sm text-slate-200">{data.metadata.assignee}</p>
              </div>
            </div> */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1a2e31] rounded-lg text-slate-400"><Server size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Affected Systems</p>
                <p className="text-sm text-slate-200">{data.affectedSystems.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1a2e31] rounded-lg text-slate-400"><ShieldCheck size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">AI Confidence</p>
                <p className="text-sm text-[#00bfa5] font-bold">{data.detectionConfidence}%</p>
              </div>
            </div>
          </div>

          {/* 3. Root Cause Hypotheses */}
          <section className="space-y-4 mb-8">
            <h4 className="text-[11px] uppercase tracking-[2px] text-slate-500 font-bold mb-3 flex items-center gap-2">
              <Lightbulb size={14} className="text-yellow-500" /> Root Cause Hypotheses
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {data.hypotheses.rootCauseHypotheses.map((h: any, idx: number) => (
                <div key={idx} className="bg-[#132326] border border-[#2d4d52] p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-semibold text-slate-200">{h.hypothesis}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00bfa5]/10 text-[#00bfa5] font-bold border border-[#00bfa5]/20">
                      {(h.confidence * 100).toFixed(0)}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{h.reasoning}</p>
                  <div className="flex flex-wrap gap-2">
                    {h.evidence.map((ev: string, i: number) => (
                      <span key={i} className="text-[10px] text-slate-500 bg-black/20 px-2 py-1 rounded italic">
                        • {ev}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Recommendations / Resolution Steps */}
          <section className="bg-[#00bfa5]/5 border border-[#00bfa5]/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
               <h4 className="text-sm font-bold text-[#00bfa5] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={16} /> AI Recommendation
               </h4>
               <span className="text-[10px] font-bold text-slate-500 uppercase px-2 py-1 rounded bg-slate-800">
                 {data.hypotheses.recommendations[0].category}
               </span>
            </div>
            
            <div className="mb-4">
              <p className="text-slate-200 font-semibold text-sm mb-1">{data.hypotheses.recommendations[0].title}</p>
              <p className="text-xs text-slate-400">{data.hypotheses.recommendations[0].description}</p>
            </div>

            <div className="space-y-2">
              {data.hypotheses.recommendations[0].steps.map((step: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-black/20 rounded-lg group/step hover:bg-[#00bfa5]/10 transition-colors">
                  <div className="w-5 h-5 rounded bg-[#1a2e31] flex items-center justify-center text-[10px] text-[#00bfa5] font-bold border border-[#2d4d52]">
                    {i + 1}
                  </div>
                  <p className="text-xs text-slate-300 flex-1">{step}</p>
                  <ChevronRight size={12} className="text-slate-600 group-hover/step:text-[#00bfa5]" />
                </div>
              ))}
            </div>
          </section>

          {/* 5. External Source Link */}
          {/* <div className="mt-6 flex items-center justify-between p-3 bg-black/20 rounded-xl border border-[#2d4d52]">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${data.metadata.status === 'resolved' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
              <span className="text-xs font-bold text-slate-400">
                STATUS: {data.metadata.status.toUpperCase()}
              </span>
            </div>
            <a 
              href={`#`} 
              className="flex items-center gap-1 text-[11px] font-bold text-[#00bfa5] hover:underline"
            >
              VIEW IN JIRA <ExternalLink size={12} />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const TimelineSkeleton = () => (
  <div className="max-w-[700px] w-full mx-auto animate-pulse">
    <div className="bg-[#0d1b1e] border border-[#2d4d52] rounded-2xl p-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-[#1a2e31]" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 bg-[#1a2e31] rounded" />
          <div className="h-6 w-3/4 bg-[#1a2e31] rounded" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#2d4d52]">
        <div className="h-12 bg-[#1a2e31] rounded-xl" />
        <div className="h-12 bg-[#1a2e31] rounded-xl" />
        <div className="h-12 bg-[#1a2e31] rounded-xl" />
      </div>
      <div className="h-40 bg-[#1a2e31] rounded-xl mt-6" />
    </div>
  </div>
);

export default TimelineEventDetails;