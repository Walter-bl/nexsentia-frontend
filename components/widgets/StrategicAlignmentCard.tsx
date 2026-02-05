import { RIGHT_ARROW, STRAIG_ALIGN } from "@/utils/icons";
import {
  CircleAlert,
  CircleCheckBig,
  Clock4,
} from "lucide-react";
import { ReactNode } from "react";
import { Card } from "../ui/Card";
import { CardHeader } from "./CardHeader";

type StrategicItemProps = {
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
};

/* 🔹 Reusable Item (same file) */
const StrategicItem = ({
  icon,
  iconBg,
  title,
  subtitle,
}: StrategicItemProps) => {
  return (
    <div className="p-[10px] bg-[#0A1C24] rounded-[7px]">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div
            className={`flex justify-center items-center w-[25px] h-[25px] rounded-[7px] ${iconBg}`}
          >
            {icon}
          </div>

          <div>
            <p className="text-[#D2DCE5] font-500 text-[12px]">
              {title}
            </p>
            <p className="text-[#3C4C58] font-400 text-[11px]">
              {subtitle}
            </p>
          </div>
        </div>

        {RIGHT_ARROW}
      </div>
    </div>
  );
};

/* 🔹 Main Component */
export const StrategicAlignmentCard = () => {
  const items: StrategicItemProps[] = [
    {
      icon: <CircleAlert size={13} className="text-[#F4BE5E]" />,
      iconBg: "bg-[#252E28]",
      title: "Elevated incident cluster detected in checkout systems",
      subtitle: "Engineering - 2 hours ago",
    },
    {
      icon: <CircleCheckBig size={13} className="text-[#469F88]" />,
      iconBg: "bg-[#123231]",
      title: "Documentation Coverage improved by 12% this sprint",
      subtitle: "Product - 5 hours ago",
    },
    {
      icon: <CircleCheckBig size={13} className="text-[#469F88]" />,
      iconBg: "bg-[#123231]",
      title: "Documentation Coverage improved by 12% this sprint",
      subtitle: "Product - 5 hours ago",
    },
    {
      icon: <Clock4 size={13} className="text-[#F4BE5E]" />,
      iconBg: "bg-[#252E28]",
      title: "Elevated incident cluster detected in checkout systems",
      subtitle: "Engineering - 2 hours ago",
    },
  ];

  return (
      <Card>
        <CardHeader
          label=" Recent Signals "
          text=" AI-detected organizational patterns "
          icon={STRAIG_ALIGN}
        />

        <div className="flex flex-col gap-2 mt-[15px]">
          {items.map((item, index) => (
            <StrategicItem key={index} {...item} />
          ))}
        </div>
      </Card>
  );
};
