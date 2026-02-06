import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  User, 
  Tag, 
  CheckCircle2, 
  Clock,
  AlertCircle
} from 'lucide-react';
import { SIGNALS } from '@/services/dashboard';

const IncidentDetailCard = ({ signalId }: any) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await SIGNALS.getSignalDetail(signalId);
        setData(response);
      } catch (err) {
        setError("Failed to load signal details.");
        console.error("Signal API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (signalId) fetchSignal();
  }, [signalId]);

  if (!signalId) return null;

  // --- Skeleton Loading State ---
  if (loading) {
    return (
      <div className="max-w-[700px] w-full mx-auto bg-[#0d1b1e] border border-[#2d4d52] rounded-2xl overflow-hidden animate-pulse">
        <div className="h-1.5 w-full bg-slate-700" />
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex gap-2 mb-3">
                <div className="h-4 w-16 bg-[#1a2e31] rounded" />
                <div className="h-4 w-24 bg-[#1a2e31] rounded" />
              </div>
              <div className="h-7 w-3/4 bg-[#1a2e31] rounded-md" />
            </div>
            <div className="h-8 w-24 bg-[#1a2e31] rounded-full" />
          </div>
          <div className="h-24 w-full bg-[#1a2e31] rounded-xl mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-10 w-10 bg-[#1a2e31] rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-12 bg-[#1a2e31] rounded" />
                  <div className="h-4 w-20 bg-[#1a2e31] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[700px] mx-auto p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 flex items-center gap-3">
        <AlertCircle size={20} />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  const formatDate = (dateStr: any) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-[700px] w-full mx-auto bg-[#0d1b1e] border border-[#2d4d52] rounded-2xl overflow-hidden shadow-2xl font-sans">
      <div className={`h-1.5 w-full ${data?.severity === 'critical' ? 'bg-red-500' : 'bg-orange-500'}`} />
      
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">
                {data?.severity}
              </span>
              <span className="text-slate-500 text-xs font-mono">{data?.details.issueKey}</span>
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">{data?.title}</h2>
          </div>
          
          <div className="shrink-0">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              data?.details.status === 'closed' 
                ? 'bg-[#00bfa5]/10 text-[#00bfa5] border border-[#00bfa5]/20' 
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {data?.details.status === 'closed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
              {data?.details.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="bg-[#1a2e31] rounded-xl p-4 border border-[#2d4d52] mb-6">
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Description</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{data?.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
          <MetaItem icon={<User size={18}/>} label="Assignee" value={data?.details.assignee} />
          <MetaItem icon={<Calendar size={18}/>} label="Created At" value={formatDate(data?.details.createdAt)} />
          <MetaItem icon={<Tag size={18}/>} label="Team / Project" value={`${data?.team} — ${data?.details.projectName}`} />
          <MetaItem 
            icon={<CheckCircle2 size={18}/>} 
            label="Resolved At" 
            value={data?.details.resolvedAt ? formatDate(data?.details.resolvedAt) : 'Pending'} 
            isResolved={!!data?.details.resolvedAt}
          />
        </div>

        {data?.details.labels && (
          <div className="mt-8 pt-6 border-t border-[#2d4d52] flex flex-wrap gap-2">
            {data.details.labels.map((label: any) => (
              <span key={label} className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">#{label}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper sub-component for the grid items to keep code clean
const MetaItem = ({ icon, label, value, isResolved }: any) => (
  <div className="flex items-start gap-3">
    <div className={`p-2 rounded-lg bg-[#1a2e31] ${isResolved ? 'text-[#00bfa5]' : 'text-slate-400'}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-500 uppercase">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  </div>
);

export default IncidentDetailCard;