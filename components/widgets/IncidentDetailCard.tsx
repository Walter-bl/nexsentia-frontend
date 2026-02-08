import React, { useEffect, useState } from 'react';
import { 
  AlertTriangle, 
  Calendar, 
  Database, 
  BrainCircuit, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { api } from '@/utils/api';
import { Card } from '../ui/Card';

export const IncidentDetailCard = ({ signalId }: { signalId: string | null }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!signalId) return;
    // Replace with your actual API fetch logic
    const fetchSignal = async () => {
      setLoading(true);
      try {
        const res:any = await api.get(`/weak-signals/${signalId}`);
        setData(res?.data);

      } finally {
        setLoading(false);
      }
    };
    fetchSignal();

    return ()=>setData(null)
  }, [signalId]);

  if (!signalId) return null;


  // --- LOADING STATE ---
  if (loading) {
    return (
      <Card className="flex flex-col gap-6 p-6 text-slate-300">
        <section className="flex flex-col gap-4 border-b border-slate-800 pb-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex flex-col items-end shrink-0 gap-2">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </section>
        <section>
          <Skeleton className="h-4 w-32 mb-4" />
          <div className="border border-slate-800 rounded-xl overflow-hidden">
             <Skeleton className="h-20 w-full" />
             <div className="p-4 space-y-2">
               {[...Array(3)].map((_, i) => (
                 <Skeleton key={i} className="h-4 w-full" />
               ))}
             </div>
          </div>
        </section>
      </Card>
    );
  }

  const severityColor = data?.severity === 'critical' ? 'text-red-500' : 'text-orange-500';

  return (
    <Card className="flex flex-col gap-6 p-6 text-slate-300 ">
      {/* 1. TOP HEADER SECTION */}
      <section className="flex flex-col gap-4 border-b border-slate-800 pb-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-red-500/20 bg-red-500/10 ${severityColor}`}>
                {data?.severity || 'Critical'}
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-400">
                {data?.status || 'New'}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-2 leading-tight">
              {data?.title || 'Recurring Pattern: incident recurrence (15x, daily)'}
            </h1>
            <p className="text-sm text-slate-400 max-w-[90%]">
              {data?.description || 'Recurring incident pattern: "Cache invalidation not working properly"'}
            </p>
          </div>
          
          <div className="flex flex-col items-end shrink-0">
             <div className="text-[28px] font-bold text-[#00bfa5] leading-none">80%</div>
             <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">Confidence</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="bg-[#0A1C24] p-3 rounded-lg border border-slate-800/50">
            <div className="text-slate-500 text-[10px] uppercase mb-1 flex items-center gap-1">
              <Calendar size={12} /> Detected At
            </div>
            <div className="text-xs font-medium italic">Feb 08, 2026 08:15 AM</div>
          </div>
          <div className="bg-[#0A1C24] p-3 rounded-lg border border-slate-800/50">
            <div className="text-slate-500 text-[10px] uppercase mb-1 flex items-center gap-1">
              <Database size={12} /> System
            </div>
            <div className="text-xs font-medium uppercase">Servicenow</div>
          </div>
          <div className="bg-[#0A1C24] p-3 rounded-lg border border-slate-800/50">
            <div className="text-slate-500 text-[10px] uppercase mb-1 flex items-center gap-1">
              <Clock size={12} /> Frequency
            </div>
            <div className="text-xs font-medium uppercase text-[#00bfa5]">Daily (15 Occurrences)</div>
          </div>
        </div>
      </section>

      {/* 2. RECURRENCE TIMELINE / PATTERN DATA */}
      <section>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]">
          <AlertTriangle size={14} className="text-[#00bfa5]" /> Pattern Evidence
        </h3>
        <div className="bg-[#0A1C24] border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-[#0d222b]">
            <p className="text-xs font-semibold text-white">Next Predicted Occurrence</p>
            <p className="text-xl font-bold text-[#00bfa5]">Dec 10, 2025 <span className="text-xs font-normal text-slate-500 ml-2">at 12:28 AM</span></p>
          </div>
          <div className="max-h-[180px] overflow-y-auto p-4 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-slate-800">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] py-1 border-b border-slate-800/30 last:border-0">
                <span className="text-slate-400">Cache invalidation failure [#autogen-{50 + i}]</span>
                <span className="font-mono text-[#00bfa5]">85% match</span>
              </div>
            ))}
            <div className="text-center pt-2 text-[10px] text-slate-500 font-bold uppercase cursor-pointer hover:text-white">
              + 10 More instances
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI HYPOTHESES (The "Meat" of the Drawer) */}
      <section>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]">
          <BrainCircuit size={14} className="text-[#00bfa5]" /> AI Derived Hypotheses
        </h3>
        <div className="flex flex-col gap-4">
          {/* Hypothesis Card */}
          <div className="p-4 bg-[#0A1C24] border-l-2 border-l-[#00bfa5] rounded-r-lg border-y border-r border-slate-800">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-bold text-[#00bfa5] uppercase">Correlation (ID: 91)</span>
              <span className="text-[10px] bg-[#00bfa5]/10 text-[#00bfa5] px-2 rounded-full">90% Conf.</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300 mb-3 italic">
              "This signal shows strong correlation with Load balancer health and Email delivery delays within a 48-hour window."
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Validation Steps</div>
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 text-[11px] text-slate-400">
                  <CheckCircle2 size={12} className="text-slate-600" />
                  Review temporal sequence of correlated events
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#0A1C24] border-l-2 border-l-orange-500/50 rounded-r-lg border-y border-r border-slate-800">
             <div className="flex justify-between mb-2">
              <span className="text-[10px] font-bold text-orange-400 uppercase">Pattern Explanation (ID: 92)</span>
              <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 rounded-full">65% Conf.</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Likely scheduled processes or daily workload spikes causing infrastructure capacity constraints.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ACTIONS */}
      {/* <section className="mt-4 flex gap-3 sticky bottom-0 bg-[#061217] pt-4 border-t border-slate-800">
        <button className="flex-1 py-3 rounded-lg bg-[#00bfa5] text-[#0d1b1e] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
          Create Incident <ArrowRight size={14} />
        </button>
        <button className="flex-1 py-3 rounded-lg border border-slate-700 font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all text-slate-400">
          Dismiss Signal
        </button>
      </section> */}
    </Card>
  );
};



// Helper Skeleton Component
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-800/50 rounded ${className}`} />
);