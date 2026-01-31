import { OverlapSlider } from "../ui/OverlapSlider";
import { Card } from "../ui/Card";
import { CardHeader } from "./CardHeader";
import { SIGNAL } from "@/utils/icons";
import PerformanceRadar from "./PerformanceRadar";

const stats = [
  { label: "Flow Efficiency", value: 82 },
  { label: "Strategic Alignment", value: 84 },
  { label: "Team Cohesion", value: 76 },
  { label: "Incident Response", value: 68 },
  { label: "Documentation", value: 71 },
  { label: "Communication", value: 79 },
];
const PerformanceDim = () => {
  return (
    <Card>
      <CardHeader
        label="Strategic Alignment"
        text="AI-detected organizational patterns"
        icon={SIGNAL}
      />

      <PerformanceRadar />

      {/* Divider */}
      <div className="h-[1px]   bg-[#1A2A2A] w-full mb-8" />

      {/* Stats Grid - Tailwind CSS */}
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-[15px] font-medium text-[#EFF2FE] mb-1">
              {stat.value}
            </span>
            <span className="text-[#71858C] text-[12px] font-normal leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PerformanceDim;
