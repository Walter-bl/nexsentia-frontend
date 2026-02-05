'use client'

import React, { useEffect, useState } from "react";
import PrivacySection from "./PrivacySection";
import DataSources from "./DataSources";
import PageHeader from "@/components/widgets/PageHeader";
import PrivacyGuarantees from "./PrivacyGuarantees";
import { PrivacyDashboardData, privacyService } from "@/services/privacy";

const page = () => {

  
  const [data, setData] = useState<PrivacyDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await privacyService.getDashboard();
        setData(res);
      } catch (err) {
        console.error("Failed to load privacy dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="xl:px-[100px]">
      <PageHeader
        title="Privacy Control"
        description="Trust & data governance"
      />
      <div className="flex flex-col gap-[25px]">
        <PrivacySection />
        <DataSources />
        <PrivacyGuarantees/>
      </div>
    </div>
  );
};

export default page;
