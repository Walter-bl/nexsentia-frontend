import { Card } from "@/components/ui/Card";
import { CircularScore } from "@/components/widgets/CircularScore";
import { CardHeader } from "@/components/widgets/CardHeader";
import { BarChart } from "@/components/widgets/BarChart";
import { Pill } from "@/components/ui/Pill";
import {
  CircleAlert,
  CircleCheckBig,
  Clock4,
  Info,
  TrendingUp,
} from "lucide-react";
import { CHAT_ICON, RIGHT_ARROW, STRAIG_ALIGN } from "@/utils/icons";
import { StrategicAlignmentCard } from "@/components/widgets/StrategicAlignmentCard";
import Signals from "@/components/widgets/Signals";
import PerformanceDim from "@/components/widgets/PerformanceDim";

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-[25px]">
        {/* Health Score */}
        <div className="lg:col-span-3">
          <p className="mb-2 font-600 text-[20px] text-[#EFF2FE]">
            Real-time organizational health
          </p>
          <p className="text-[#71858C] font-400 text-[13px]">
            Real-time organizational health intelligence
          </p>
          <div className="mt-8">
            <CircularScore score={78} />

            <div className="flex w-full mt-[30px] justify-center gap-3">
              <div className="flex items-center justify-center flex-col">
                <p className="font-500 text-[#EFF2FE] text-[20px]">70</p>
                <p className="font-400 uppercase text-[#71858C] text-[12px]">
                  INDUSTRY
                </p>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="font-500 text-[#EFF2FE] text-[20px]">70</p>
                <p className="font-400 uppercase text-[#71858C] text-[12px]">
                  INDUSTRY
                </p>
              </div>{" "}
              <div className="flex items-center justify-center flex-col">
                <p className="font-500 text-[#EFF2FE] text-[20px]">70</p>
                <p className="font-400 uppercase text-[#71858C] text-[12px]">
                  INDUSTRY
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 gap-[25px] md:grid-cols-2">
          <div className="flex-col flex lg:flex-row justify-between gap-[25px] w-[100%] ">
            <Card className="h-[160px] w-full py-[20px]">
              <CardHeader icon={STRAIG_ALIGN} label="Strategic Alignment" />
              <div className="flex mt-[30px] items-end justify-between">
                <div className="flex  flex-col">
                  <h3 className="text-[#EFF2FE] font-500 text-[28px]">84%</h3>
                  <p className="text-[#71858C] font-400 text-[12px]">
                    Team Alignment
                  </p>
                </div>
                <Pill
                  text="+32%"
                  icon={<TrendingUp size={12} />}
                  width=""
                  className="p-2"
                />
              </div>
            </Card>
            <Card className="h-[160px] py-[20px] w-full ">
              <CardHeader icon={CHAT_ICON} label="Strategic Alignment" />
              <div className="flex mt-[30px] items-end justify-between">
                <div className="flex  flex-col">
                  <h3 className="text-[#EFF2FE] font-500 text-[28px]">76%</h3>
                  <p className="text-[#71858C] font-400 text-[12px]">
Communication Efficiency                  </p>
                </div>
                <Pill
                  text="+56%"
                  icon={<TrendingUp size={12} />}
                  width=""
                  className="p-2"
                />
              </div>
            </Card>
          </div>

          {/* Chart */}
          <Card className="w-full mt-[25px]">
            <div className="mb-[50px]">
              <CardHeader
                label="Business Escalations"
                text="Escalations to management"
                icon={STRAIG_ALIGN}
              />
            </div>
            <BarChart
              data={[25, 50, 70, 60, 90, 100]}
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            />{" "}
            <div className=" flex mt-[30px] py-[20px] justify-between border-t-[2px] border-[#1A2A2A] ">
              <p className="text-[12px] font-400 text-[#71858C]">
                Total this quarter
              </p>
              <p className="text-[22px] font-500 text-[#D2BB59]">111</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2  xl:grid-cols-3">
        <PerformanceDim />
        <StrategicAlignmentCard />
        <Signals />
      </div>
    </>
  );
}
