"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

// Priority type
type PriorityLevel = "High" | "Critical" | "Medium" | "Low";

// Action item from parent
export interface ActionItem {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedToName: string;
}

// Props for single Action Card
interface ActionCardProps {
  priority: PriorityLevel;
  title: string;
  description: string;
  user: string;
  avatarColor: string;
  warningText?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  priority,
  title,
  description,
  user,
  avatarColor,
  warningText = "Recurring deployment failures in CI/CD pipeline",
}) => {
  const priorityStyles: Record<PriorityLevel, string> = {
    High: "bg-[#7E161F] text-[#EFF2FE]",
    Critical: "bg-[#BA6D20] text-[#EFF2FE]",
    Medium: "bg-teal-700/60 text-[#EFF2FE]",
    Low: "bg-gray-600 text-[#EFF2FE]",
  };

  return (
    <div className="border px-[27px] py-[31px] rounded-[15.29px] border-[#33AD8C] bg-[#469F8845] flex flex-col h-full">
      <div
        className={`self-start w-fit px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-tighter ${priorityStyles[priority]}`}
      >
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

      <div className="bg-[#27292A80] rounded-lg p-2 flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-[#F4BE5E] flex-shrink-0" />
        <span className="text-[11px] text-[#71858C] truncate">{warningText}</span>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#FFFFFF] ${avatarColor}`}
        >
          {user
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <span className="text-[#EFF2FE] text-[12px] font-semibold">{user}</span>
      </div>
    </div>
  );
};

interface ActionGridProps {
  actions: ActionItem[];
}

const ActionGrid: React.FC<ActionGridProps> = ({ actions }) => {
  // Map avatar color dynamically per user (example: hash to color or fixed)
  const getAvatarColor = (user: string) => {
    const colors = [
      "bg-[#469F88]",
      "bg-[#BA6D20]",
      "bg-[#7E161F]",
      "bg-[#4B5563]",
    ];
    const index = user.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Map action priority to card priority
  const mapPriority = (priority: string): PriorityLevel => {
    switch (priority.toLowerCase()) {
      case "high":
        return "High";
      case "critical":
        return "Critical";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "Medium";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {actions?.map((action) => (
        <ActionCard
          key={action.id}
          priority={mapPriority(action.priority)}
          title={action.title}
          description={action.description}
          user={action.assignedToName}
          avatarColor={getAvatarColor(action.assignedToName)}
        />
      ))}
    </div>
  );
};

export default ActionGrid;
