import React, { useState } from 'react';
import PerformanceRadar from './PerformanceRadar';

const TeamSignalsWindow = ({ teamSignals }:any) => {
  const [activeTab, setActiveTab] = useState(0);



  console.log(' teamSignals[activeTab]?.metrics ====',teamSignals[0]?.metrics )

  if (!teamSignals || teamSignals.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="flex flex-col  gap-8">
        
        {/* Left Side: Tabs/List */}
        <div className="w-full ">
          <div className="flex gap-4 justify-between  overflow-auto snap-x snap-mandatory 
  scrollbar-thin 
  scrollbar-track-transparent 
  scrollbar-thumb-[#2d4d52] 
  hover:scrollbar-thumb-[#00bfa5]/50 w-full ">
            {teamSignals.map((item:any, index:number) => (
              <button
                key={item.team}
                onClick={() => setActiveTab(index)}
                className={`flex w-full cursor-pointer items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                  activeTab === index
                    ? 'bg-[#1a2e31] border-[#00bfa5] shadow-[0_0_15px_rgba(0,191,165,0.1)]'
                    : 'bg-transparent border-[#2d4d52] hover:border-slate-500'
                }`}
              >
                <div>
                  <p className={`font-medium ${activeTab === index ? 'text-[#00bfa5]' : 'text-slate-300'}`}>
                    {item.team}
                  </p>
                  <p className="text-xs text-slate-500">Overall Performance</p>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold ${activeTab === index ? 'text-white' : 'text-slate-400'}`}>
                    {item.overallScore}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full   flex flex-col items-center justify-center min-h-[400px]">
            <PerformanceRadar metrics={teamSignals[activeTab]?.metrics || []} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 w-full">
            {teamSignals[activeTab].metrics.slice(0, 4).map((m:any) => (
              <div key={m.key} className="bg-[#1a2e31] p-2 rounded-lg border border-[#2d4d52] text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{m.name}</p>
                <p className="text-sm font-semibold text-[#00bfa5]">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export default TeamSignalsWindow;