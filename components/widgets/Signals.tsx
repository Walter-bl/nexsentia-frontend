import { OverlapSlider } from "../ui/OverlapSlider";
import { Card } from "../ui/Card";
import { CardHeader } from "./CardHeader";
import { SIGNAL } from "@/utils/icons";

type SignalDistributionItem = {
  theme: string;
  incidentCount: number;
  signalCount: number;
  color: string;
  totalCount:number
};

type SignalsProps = {
  signalDistribution: SignalDistributionItem[];
};

const Signals = ({ signalDistribution }: SignalsProps) => {
  const maxSignals = Math.max(
    ...signalDistribution.map((item) => item.signalCount),
    1
  );

  return (
    <Card>
      <CardHeader
        label="Signal Distribution by theme"
        text="Categorized organizational signals"
        icon={SIGNAL}
      />

      <div className="flex flex-col gap-5 mt-[15px]">
      {signalDistribution.map((item) => {
  const achieved = maxSignals > 0 
    ? Math.round((item.signalCount / maxSignals) * 100) 
    : 0;

  return (
    <div key={item.theme} className="flex flex-col mb-4">
      <div className="flex mb-[6px] justify-between items-center">
        <p className="text-[#D2DCE5] font-medium text-[12px]">
          {item.theme}
        </p>

        <p className="text-[11px] text-[#71858C]">
          <span className="font-normal mr-2">
            {item.incidentCount} incidents
          </span>
          <span className="font-bold text-[#D2DCE5]">
            {item.signalCount} signals
          </span>
        </p>
      </div>

      <OverlapSlider
        total={item.totalCount}
        achieved={achieved}
        trackColor="rgba(129, 129, 165, 0.2)" // Slight transparency for a more modern look
        fillColor={item.color}
      />
    </div>
  );
})}
      </div>
    </Card>
  );
};

export default Signals;
