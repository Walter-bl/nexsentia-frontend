import { TrendingUp } from "lucide-react";
import { Pill } from "../ui/Pill";

type OverallHealth = {
  score: number; // 0 - 100
  status: "critical" | "warning" | "good" | "excellent";
  totalMetrics: number;
};

type Props = {
  overallHealth: OverallHealth;
};

export const CircularScore = ({ overallHealth }: Props) => {
  // 1. Existing Text Color Map
  const statusColorMap = {
    critical: "#C9672B",
    warning: "#F2B84B",
    good: "#469F88",
    excellent: "#2EE6A6",
  } as const;

  // 2. New Background Color Map (20% opacity version of the colors above)
  const statusBgMap = {
    critical: "rgba(201, 103, 43, 0.2)",
    warning: "rgba(242, 184, 75, 0.2)",
    good: "rgba(70, 159, 136, 0.2)",
    excellent: "rgba(46, 230, 166, 0.2)",
  } as const;

  const textColor = statusColorMap[overallHealth.status] || "#71858C";
  const bgColor = statusBgMap[overallHealth.status] || "rgba(113, 133, 140, 0.2)";

  // Circle configuration
  const radius = 110;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const score = overallHealth.score;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute h-40 w-40 rounded-full bg-[#25ab815a] blur-[50px] -z-10"></div>

      <div className="relative flex justify-center h-[250px] w-[250px]">
        <svg className="h-full w-full -rotate-90">
          <circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke="#124337"
            strokeWidth={strokeWidth}
            fill="none"
          />

          <circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke={textColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset,stroke] duration-1000 ease-in-out"
          />
        </svg>

        <div className="absolute mr-[15px] inset-0 flex flex-col items-center justify-center">
          <span className="text-[56px] ml-[5px] font-bold leading-[84px]" style={{ color: textColor }}>
            {score}
          </span>
          <span
            className="text-[14px] mb-[10px] font-normal leading-[21px] text-center"
            style={{ color: textColor }}
          >
            Health Score
          </span>
          <Pill
            text={`+${overallHealth.totalMetrics} ${overallHealth.status}`}
            icon={<TrendingUp size={12} />}
            textColor={textColor} // Set dynamically
            bgColor={bgColor} 
          className='!font-[700]' // The ! makes it important
          />
        </div>
      </div>
    </div>
  );
};
