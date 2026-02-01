import React from 'react';
import { AlertTriangle } from 'lucide-react';

// 1. Define the Priority type for strict style mapping
type PriorityLevel = 'High' | 'Critical' | 'Medium';

interface ActionCardProps {
  priority: PriorityLevel;
  title: string;
  description: string;
  user: string;
  avatarColor: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  priority, 
  title, 
  description, 
  user, 
  avatarColor 
}) => {
  // 2. Type the styles object using Record
  const priorityStyles: Record<PriorityLevel, string> = {
    High: 'bg-[#7E161F] text-[#EFF2FE]',
    Critical: 'bg-[#BA6D20] text-[#EFF2FE]',
    Medium: 'bg-teal-700/60 text-[#EFF2FE]',
  };

  return (
    <div className="border px-[27px] py-[31px] rounded-[15.29px] border-[#33AD8C] bg-[#469F8845] flex flex-col h-full">
      <div className={`self-start w-fit px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-tighter ${priorityStyles[priority]}`}>
        {priority}
      </div>

      <div className="flex-grow">
        <h3 className="text-[#EFF2FE] font-semibold text-[18.68px] leading-tight mb-2 mt-[10px]">
          {title}
        </h3>
        <p className="text-[#71858C] text-[14.94px] mb-2 leading-snug">
          {description}
        </p>
      </div>

      {/* Warning Box */}
      <div className="bg-[#27292A80] rounded-lg p-2 flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-[#F4BE5E] flex-shrink-0" />
        <span className="text-[11px] text-[#71858C] truncate">
          Recurring deployment failures in CI/CD pipeline
        </span>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#FFFFFF] ${avatarColor}`}>
          {user.split(' ').map(n => n[0]).join('')}
        </div>
        <span className="text-[#EFF2FE] text-[12px] font-semibold">{user}</span>
      </div>
    </div>
  );
};

const ActionGrid: React.FC = () => {
  // 3. Typed data array
  const cards: ActionCardProps[] = [
    { 
      priority: 'High', 
      title: 'Implement circuit breaker patterns', 
      user: 'Mike Johnson', 
      avatarColor: 'bg-[#469F88]', 
      description: 'Add circuit breakers to prevent cascades during deployment issues.' 
    },
    { 
      priority: 'Critical', 
      title: 'Investigate infrastructure scaling limits', 
      user: 'Sarah Chen', 
      avatarColor: 'bg-[#469F88]', 
      description: 'Evaluate auto-scaling configurations for affected services during peak traffic periods.' 
    },
    { 
      priority: 'Medium', 
      title: 'Update deployment scheduling policy', 
      user: 'Sarah Oaks', 
      avatarColor: 'bg-[#469F88]', 
      description: 'Establish off-peak deployment windows to minimize user impact during releases.' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 bg-[#050505]">
      {cards.map((card, i) => (
        <ActionCard key={i} {...card} />
      ))}
    </div>
  );
};

export default ActionGrid;