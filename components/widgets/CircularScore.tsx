import { TrendingUp } from "lucide-react";
import { Pill } from "../ui/Pill";

type Props = {
  score: number;
};

export const CircularScore = ({ score }: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Blurred background */}
      <div className="absolute h-40 w-40 rounded-full bg-[#25ab815a] blur-[50px] -z-10"></div>

      {/* Actual SVG */}
      <div className="relative flex justify-center h-[250px] w-[250px]">
        <svg className="h-full w-full -rotate-90">
          <circle
            cx="125"
            cy="125"
            r="100"
            stroke="#124337"
            strokeWidth="15"
            fill="none"
          />
          <circle
            cx="125"
            cy="125"
            r="100"
            stroke="#2EE6A6"
            strokeWidth="15"
            fill="none"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * score) / 100}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[56px] font-bold leading-[84px] text-[#469F88]">
            {score}
          </span>
          <span className="text-[14px] font-normal leading-[21px] text-center text-[#C9672B]">
            Health Score
          </span>
          <Pill text="Health Score" icon={<TrendingUp size={12} />} />
        </div>
      </div>
    </div>
  );
};
