"use client";

import React, { useEffect, useState } from 'react';
import { 
  AlertTriangle, 
  Calendar, 
  Database, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { api } from '@/utils/api';
import { Card } from '../ui/Card';

// Helper for date formatting
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const IncidentDetailCard = ({ signalId }: { signalId: string | null }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!signalId) return;
    const fetchSignal = async () => {
      setLoading(true);
      try {
        // Mocking the API response with your provided JSON for this example
        const res: any = await api.get(`/weak-signals/${signalId}`);
        setData(res);
      } catch (error) {
        console.error("Error fetching signal details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSignal();
    return () => setData(null);
  }, [signalId]);

  if (!signalId) return null;

  // --- LOADING STATE ---
  if (loading) {
    return (
      <Card className="flex flex-col gap-6 p-6 text-slate-300">
        <section className="flex flex-col gap-4 border-b border-slate-800 pb-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-4 w-12" /></div>
              <Skeleton className="h-7 w-3/4" /><Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex flex-col items-end shrink-0 gap-2"><Skeleton className="h-8 w-12" /><Skeleton className="h-3 w-16" /></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        </section>
        <section><Skeleton className="h-4 w-32 mb-4" /><div className="border border-slate-800 rounded-xl overflow-hidden"><Skeleton className="h-20 w-full" /><div className="p-4 space-y-2">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}</div></div></section>
      </Card>
    );
  }

  const severityColor = data?.severity === 'high' ? 'text-orange-500 border-orange-500/20 bg-orange-500/10' : 
                       data?.severity === 'critical' ? 'text-red-500 border-red-500/20 bg-red-500/10' : 
                       'text-blue-500 border-blue-500/20 bg-blue-500/10';

  return (
    <Card className="flex flex-col gap-6 p-6 text-slate-300">
      {/* 1. TOP HEADER SECTION */}
      <section className="flex flex-col gap-4 border-b border-slate-800 pb-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${severityColor}`}>
                {data?.severity}
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-400">
                {data?.status}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-2 leading-tight">
              {data?.title}
            </h1>
            <p className="text-sm text-slate-400 max-w-[90%] italic">
              {data?.description}
            </p>
          </div>
          
          <div className="flex flex-col items-end shrink-0">
             <div className="text-[28px] font-bold text-[#00bfa5] leading-none">{data?.confidenceScore}%</div>
             <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">Confidence</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="bg-[#0A1C24] p-3 rounded-lg border border-slate-800/50">
            <div className="text-slate-500 text-[10px] uppercase mb-1 flex items-center gap-1">
              <Calendar size={12} /> Detected At
            </div>
            <div className="text-[11px] font-medium">{formatDate(data?.detectedAt)}</div>
          </div>
          <div className="bg-[#0A1C24] p-3 rounded-lg border border-slate-800/50">
            <div className="text-slate-500 text-[10px] uppercase mb-1 flex items-center gap-1">
              <Database size={12} /> Affected Entity
            </div>
            <div className="text-[11px] font-medium uppercase">{data?.affectedEntities?.[0]?.name || 'N/A'}</div>
          </div>
          <div className="bg-[#0A1C24] p-3 rounded-lg border border-slate-800/50">
            <div className="text-slate-500 text-[10px] uppercase mb-1 flex items-center gap-1">
              <Clock size={12} /> Frequency
            </div>
            <div className="text-[11px] font-medium uppercase text-[#00bfa5]">
              {data?.patternData?.frequency} ({data?.patternData?.occurrences} Occurrences)
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECURRENCE TIMELINE / PATTERN DATA */}
      {
        data?.patternData &&   <section>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]">
          <AlertTriangle size={14} className="text-[#00bfa5]" /> Pattern Evidence
        </h3>
        <div className="bg-[#0A1C24] border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-[#0d222b] flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-white/70">Next Predicted Occurrence</p>
              <p className="text-lg font-bold text-[#00bfa5]">
                {new Date(data?.patternData?.predictedNext).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                <span className="text-xs font-normal text-slate-500 ml-2">
                  at {new Date(data?.patternData?.predictedNext).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </p>
            </div>
            <TrendingUp size={20} className="text-slate-700" />
          </div>
          <div className="max-h-[180px] overflow-auto p-4 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-slate-800">
            {data?.patternData?.similarities?.map((phrase: string, i: number) => (
              <div key={i} className="flex items-center justify-between text-[11px] py-1.5 border-b border-slate-800/30 last:border-0">
                <span className="text-slate-400 truncate mr-4">{phrase}</span>
                <span className="font-mono text-[#00bfa5] shrink-0">MATCH</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      }
       {
        data?.patternData && <section>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]">
          <AlertTriangle size={14} className="text-[#00bfa5]" /> Pattern Evidence
        </h3>
        <div className="bg-[#0A1C24] border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-[#0d222b] flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-white/70">Next Predicted Occurrence</p>
              <p className="text-lg font-bold text-[#00bfa5]">
                {new Date(data?.patternData?.predictedNext).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                <span className="text-xs font-normal text-slate-500 ml-2">
                  at {new Date(data?.patternData?.predictedNext).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </p>
            </div>
            <TrendingUp size={20} className="text-slate-700" />
          </div>
          <div className="max-h-[180px] overflow-auto  p-4 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-slate-800">
            {data?.patternData?.similarities?.map((phrase: string, i: number) => (
              <div key={i} className="flex items-center justify-between text-[11px] py-1.5 border-b border-slate-800/30 last:border-0">
                <span className="text-slate-400 truncate mr-4">{phrase}</span>
                <span className="font-mono text-[#00bfa5] shrink-0">MATCH</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* 3. AI HYPOTHESES */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest text-[11px]">
          <BrainCircuit size={14} className="text-[#00bfa5]" /> AI Derived Hypotheses
        </h3>
        <div className="flex flex-col gap-4">
          {data?.hypotheses?.map((hypo: any) => (
            <div key={hypo.id} className="p-4 bg-[#0A1C24] border-l-2 border-l-[#00bfa5] rounded-r-lg border-y border-r border-slate-800">
              <div className="flex justify-between mb-2">
                <span className="text-[10px] font-bold text-[#00bfa5] uppercase">
                  {hypo.hypothesisType.replace('_', ' ')} (ID: {hypo.id})
                </span>
                <span className="text-[10px] bg-[#00bfa5]/10 text-[#00bfa5] px-2 rounded-full font-bold">
                  {hypo.confidence}% Conf.
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-200 mb-4">
                {hypo.hypothesis}
              </p>
              
              {hypo.validationSteps && (
                <div className="flex flex-col gap-2 bg-black/20 p-3 rounded-lg">
                  <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <ShieldCheck size={12} /> Validation Steps
                  </div>
                  {hypo.validationSteps.map((v: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00bfa5] shrink-0" />
                      <div>
                        <span className="text-slate-300">{v.action}</span>
                        <span className="ml-2 text-[9px] text-slate-600 uppercase">[{v.difficulty}]</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOOTER ACTIONS */}
      {/* <section className="mt-auto pt-4 flex gap-3 border-t border-slate-800">
        <button className="flex-1 py-3 rounded-lg bg-[#00bfa5] text-[#0d1b1e] font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
          Promote to Incident <ArrowRight size={14} />
        </button>
        <button className="flex-1 py-3 rounded-lg border border-slate-700 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all text-slate-400">
          Archive Signal
        </button>
      </section> */}
    </Card>
  );
};

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-800/50 rounded ${className}`} />
);