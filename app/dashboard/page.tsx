"use client";

import { Card } from "@/components/ui/Card";
import { CircularScore } from "@/components/widgets/CircularScore";
import { CardHeader } from "@/components/widgets/CardHeader";
import { Pill } from "@/components/ui/Pill";
import { TrendingDown, TrendingUp } from "lucide-react";
import { ALERT_ICON, CHAT_ICON, STRAIG_ALIGN } from "@/utils/icons";
import { StrategicAlignmentCard } from "@/components/widgets/StrategicAlignmentCard";
import Signals from "@/components/widgets/Signals";
import PerformanceDim from "@/components/widgets/PerformanceDim";
import BarChart from "@/components/widgets/BarChart";
import { useEffect, useState } from "react";
import { kpiService, TimeRange } from "@/services/dashboard";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>("1m");
  const [data, setData] = useState<any>(null);

  console.log("data ====", data);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await kpiService.organizationalPulse(timeRange);
        setData(res);
      } catch (err) {
        console.error("Failed to load KPI data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-[25px]">
        {/* Health Score */}
        <div className="lg:col-span-3">
          <p
            className={`mb-2 font-600 text-[20px] ${loading ? "bg-[#1A1A1A] h-6 w-3/4 rounded animate-pulse" : "text-[#EFF2FE]"}`}
          >
            {!loading && "Organizational Pulse"}
          </p>
          <p
            className={`text-[13px] ${loading ? "bg-[#1A1A1A] h-4 w-2/3 rounded animate-pulse" : "text-[#71858C]"}`}
          >
            {!loading && "Real-time organizational health intelligence"}
          </p>

          <div className="mt-8">
            {loading ? (
              <div className="h-[120px] w-full bg-[#1A1A1A] rounded-full animate-pulse" />
            ) : (
              <CircularScore score={data?.overallHealth?.score} />
            )}

            <div className="flex w-full mt-[30px] justify-center gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center flex-col"
                >
                  {loading ? (
                    <div className="h-5 w-10 bg-[#1A1A1A] rounded animate-pulse mb-1" />
                  ) : (
                    <p className="font-500 text-[#EFF2FE] text-[20px]">70</p>
                  )}
                  {loading ? (
                    <div className="h-3 w-12 bg-[#1A1A1A] rounded animate-pulse" />
                  ) : (
                    <p className="font-400 uppercase text-[#71858C] text-[12px]">
                      {i === 0
                        ? "PREVIOUS"
                        : i === 1
                          ? "TARGET"
                          : "INDUSTRY AVG"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="lg:col-span-9 gap-[25px] md:grid-cols-2">
          <div className="flex-col flex lg:flex-row justify-between gap-[25px] w-[100%]">
            <Card className="h-[160px] w-full py-[20px]">
              {loading ? (
                <div className="h-full w-full bg-[#1A1A1A] rounded animate-pulse" />
              ) : (
                <>
                  <CardHeader icon={STRAIG_ALIGN} label="Strategic Alignment" />
                  <div className="flex mt-[30px] items-end justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-[#EFF2FE] font-500 text-[28px]">
                        84%
                      </h3>
                      <p className="text-[#71858C] font-400 text-[12px]">
                        Team Alignment
                      </p>
                    </div>
                    <Pill
                      text={`+${data?.strategicAlignment?.overall}`}
                      icon={<TrendingUp size={12} />}
                      className="p-2"
                      width=""
                    />
                  </div>
                </>
              )}
            </Card>

            <Card className="h-[160px] w-full py-[20px] mt-4 lg:mt-0">
              {loading ? (
                <div className="h-full w-full bg-[#1A1A1A] rounded animate-pulse" />
              ) : (
                <>
                  <CardHeader
                    icon={CHAT_ICON}
                    label="Communication Efficiency"
                  />
                  <div className="flex mt-[30px] items-end justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-[#EFF2FE] font-500 text-[28px]">
                        {
                          data?.strategicAlignment?.categories?.communication
                            ?.metricsCount
                        }
                        %
                      </h3>
                      <p className="text-[#71858C] font-400 text-[12px]">
                        vs last quarter
                      </p>
                    </div>
                    <Pill
                      text={`${data?.strategicAlignment?.categories?.communication?.trend === "down" ? "-" : "+"}${data?.strategicAlignment?.categories?.communication?.score ?? 0}`}
                      icon={
                        data?.strategicAlignment?.categories?.communication
                          ?.trend === "down" ? (
                          <TrendingDown size={12} />
                        ) : (
                          <TrendingUp size={12} />
                        )
                      }
                      className="p-2"
                      bgColor={
                        data?.strategicAlignment?.categories?.communication
                          ?.trend === "down"
                          ? "rgba(250, 100, 100, 0.2)" // red for down
                          : "rgba(70, 159, 136, 0.2)" // green for up
                      }
                      textColor={
                        data?.strategicAlignment?.categories?.communication
                          ?.trend === "down"
                          ? "#FA6464" // darker red for text
                          : "#469F88" // green for text
                      }
                      width=""
                    />
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Chart */}
          <Card className="w-full mt-[25px]">
            {loading ? (
              <div className="h-[250px] w-full bg-[#1A1A1A] rounded animate-pulse" />
            ) : (
              <>
                <CardHeader
                  label="Business Escalations"
                  text="Escalations to management"
                  icon={ALERT_ICON}
                  bgColor="#252E28"
                />
                <BarChart chartData={data?.businessEscalations?.chartData} />
                <div className="flex mt-[10px] py-[20px] justify-between border-t-[2px] border-[#1A2A2A]">
                  <p className="text-[12px] font-400 text-[#71858C]">
                    Total this quarter
                  </p>
                  <p className="text-[22px] font-500 text-[#D2BB59]">
                    {data?.businessEscalations?.totalLoss}
                  </p>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Bottom 3 Cards */}
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <>
            <div className="h-[250px] w-full bg-[#1A1A1A] rounded animate-pulse" />
            <div className="h-[250px] w-full bg-[#1A1A1A] rounded animate-pulse" />
            <div className="h-[250px] w-full bg-[#1A1A1A] rounded animate-pulse" />
          </>
        ) : (
          <>
            <PerformanceDim />
            <StrategicAlignmentCard />
            <Signals />
          </>
        )}
      </div>
    </>
  );
}
