import React, { useEffect, useState } from 'react';
import { 
  History, 
  User, 
  Server, 
  AlertTriangle, 
  ArrowUpRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { SIGNALS } from '@/services/dashboard'; // Adjust based on your actual service path
import { timelineService } from '@/services/timeline';

const TimelineEventDetails = ({ eventId }: { eventId: string| null }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // Assuming your service has a method for timeline specific data
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

  if (error) return (
    <div className="max-w-[700px] mx-auto p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-red-400 text-sm">
      {error}
    </div>
  );

  return (
    <div className="max-w-[700px] w-full mx-auto relative group">
      {/* Timeline connector line effect */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#00bfa5] to-transparent ml-[20px] hidden sm:block" />

      <div className="bg-[#0d1b1e] border border-[#2d4d52] rounded-2xl overflow-hidden shadow-xl hover:border-[#00bfa5]/50 transition-all duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-[#1a2e31] border border-[#00bfa5] items-center justify-center text-[#00bfa5] z-10 shadow-[0_0_15px_rgba(0,191,165,0.2)]">
              <History size={20} />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  {data.impactLevel} Impact
                </span>
                <span className="text-slate-500 text-xs font-mono">{data.metadata.issueKey}</span>
                <span className="text-slate-500 text-xs ml-auto flex items-center gap-1">
                  <Clock size={12} /> {formatDate(data.eventDate)}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00bfa5] transition-colors">
                {data.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6">{data.description}</p>
            </div>
          </div>

          {/* Stats / Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#2d4d52] pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1a2e31] rounded-lg text-slate-400"><User size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Assignee</p>
                <p className="text-sm text-slate-200">{data.metadata.assignee}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1a2e31] rounded-lg text-slate-400"><Server size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Affected Systems</p>
                <p className="text-sm text-slate-200">{data.affectedSystems.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1a2e31] rounded-lg text-slate-400"><ShieldCheck size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Confidence</p>
                <p className="text-sm text-slate-200">{data.detectionConfidence}%</p>
              </div>
            </div>
          </div>

          {/* Footer Status */}
          <div className="mt-6 flex items-center justify-between p-3 bg-[#132326] rounded-xl border border-[#2d4d52]">
             <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${data.isResolved ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
               <span className="text-xs font-medium text-slate-300">
                 Status: {data.metadata.status.toUpperCase()}
               </span>
             </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Placeholder
const TimelineSkeleton = () => (
  <div className="max-w-[700px] w-full mx-auto animate-pulse">
    <div className="bg-[#0d1b1e] border border-[#2d4d52] rounded-2xl p-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-[#1a2e31]" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 bg-[#1a2e31] rounded" />
          <div className="h-6 w-3/4 bg-[#1a2e31] rounded" />
          <div className="h-4 w-full bg-[#1a2e31] rounded" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#2d4d52]">
        <div className="h-10 bg-[#1a2e31] rounded" />
        <div className="h-10 bg-[#1a2e31] rounded" />
        <div className="h-10 bg-[#1a2e31] rounded" />
      </div>
    </div>
  </div>
);

export default TimelineEventDetails;