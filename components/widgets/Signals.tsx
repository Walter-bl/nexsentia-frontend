import { OverlapSlider } from "../ui/OverlapSlider";
import { Card } from "../ui/Card";
import { CardHeader } from "./CardHeader";
import { SIGNAL } from "@/utils/icons";

type SignalItem = {
  title: string;
  incidents: number;
  signals: number;
  achieved: number;
  fillColor: string;
};

const SIGNALS_DATA: SignalItem[] = [
  {
    title: "Communication",
    incidents: 24,
    signals: 156,
    achieved: 72,
    fillColor: "#0FBC85",
  },
  {
    title: "Stock",
    incidents: 18,
    signals: 136,
    achieved: 40,
    fillColor: "#F4BE5E",
  },
  {
    title: "Checkout",
    incidents: 24,
    signals: 156,
    achieved: 100,
    fillColor: "#F4BE5E",
  },
    {
    title: "System",
    incidents: 24,
    signals: 166,
    achieved: 100,
    fillColor: "#00C3D0",
  },
  {
    title: "Product Display",
    incidents: 24,
    signals: 126,
    achieved: 20,
    fillColor: "#8B5BF6",
  },
];

const Signals = () => {
  return (
    <Card>
      <CardHeader
        label="Strategic Alignment"
        text="AI-detected organizational patterns"
        icon={SIGNAL}
      />

      <div className="flex flex-col gap-5 mt-[15px]">
        {SIGNALS_DATA.map((item) => (
          <div key={item.title} className="flex flex-col">
            <div className="flex mb-[6px] justify-between">
              <p className="text-[#D2DCE5] font-500 text-[12px]">
                {item.title}
              </p>

              <p className="text-[12px] text-[#71858C]">
                <span className="font-400">
                  {item.incidents} incidents
                </span>{" "}
                <span className="font-bold">
                  {item.signals} signals
                </span>
              </p>
            </div>

            <OverlapSlider
              total={100}
              achieved={item.achieved}
              trackColor="#8181A5"
              fillColor={item.fillColor}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Signals;
