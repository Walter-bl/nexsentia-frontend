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
import HealthCounts from "@/components/widgets/HealthCounts";
import CategoryCardsSlider from "@/components/widgets/CategoryCardsSlider";

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
              <CircularScore overallHealth={data?.overallHealth} />
            )}

            <HealthCounts
              overallHealth={data?.overallHealth}
              loading={loading}
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="lg:col-span-9 gap-[25px] md:grid-cols-2">
          <CategoryCardsSlider
            categories={data?.strategicAlignment?.categories}
            loading={loading}
          />

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
                <div className="flex  py-[20px] justify-between border-t-[2px] border-[#1A2A2A]">
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
      <div className="grid grid-cols-1 gap-[25px] lg:grid-cols-1 mb-[25px]">
        {loading ? (
          <>
            <div className="h-[250px] w-full bg-[#1A1A1A] rounded animate-pulse" />
          </>
        ) : (
          <>
            <PerformanceDim teamSignals={data?.teamSignals} />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-[25px] lg:grid-cols-2">
        {loading ? (
          <>
            <div className="h-[250px] w-full bg-[#1A1A1A] rounded animate-pulse" />
            <div className="h-[250px] w-full bg-[#1A1A1A] rounded animate-pulse" />
          </>
        ) : (
          <>
            <StrategicAlignmentCard />
            <Signals />
          </>
        )}
      </div>
    </>
  );
}
