import { OverlapSlider } from "../ui/OverlapSlider";
import { Card } from "../ui/Card";
import { CardHeader } from "./CardHeader";
import { SIGNAL } from "@/utils/icons";

type SignalDistributionItem = {
  theme: string;
  incidentCount: number;
  signalCount: number;
  color: string;
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
          const achieved = Math.round(
            (item.signalCount / maxSignals) * 100
          );

          return (
            <div key={item.theme} className="flex flex-col">
              <div className="flex mb-[6px] justify-between">
                <p className="text-[#D2DCE5] font-500 text-[12px]">
                  {item.theme}
                </p>

                <p className="text-[12px] text-[#71858C]">
                  <span className="font-400">
                    {item.incidentCount} incidents
                  </span>{" "}
                  <span className="font-bold">
                    {item.signalCount} signals
                  </span>
                </p>
              </div>

              <OverlapSlider
                total={100}
                achieved={achieved}
                trackColor="#8181A5"
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
