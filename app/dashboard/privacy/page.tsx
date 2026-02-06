"use client";

import React, { useEffect, useState } from "react";
import PrivacySection from "./PrivacySection";
import DataSources from "./DataSources";
import PageHeader from "@/components/widgets/PageHeader";
import PrivacyGuarantees from "./PrivacyGuarantees";
import { PrivacyDashboardData, privacyService } from "@/services/privacy";

const Page = () => {
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

  // Skeleton for PrivacySection
  const PrivacySectionSkeleton = () => (
    <div className="p-8 xl:px-25 space-y-4">
      <div className="h-6 w-48 bg-gray-700 rounded animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
      </div>
    </div>
  );

  // Skeleton for DataSources
  const DataSourcesSkeleton = () => (
    <div className="p-8 xl:px-25 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-800 rounded-2xl animate-pulse"
            />
          ))}
      </div>
    </div>
  );

  // Skeleton for PrivacyGuarantees
  const PrivacyGuaranteesSkeleton = () => (
    <div className="p-8 xl:px-25 space-y-6">
      <div className="h-6 w-64 bg-gray-700 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-28 bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
      </div>
    </div>
  );

  return (
    <div className="xl:px-[50px]">
      <PageHeader
        title="Privacy Control"
        description="Trust & data governance"
      />
      <div className="flex flex-col gap-[25px]">
        {loading ? (
          <>
            <PrivacySectionSkeleton />
            <DataSourcesSkeleton />
            <PrivacyGuaranteesSkeleton />
          </>
        ) : (
          <>
            <PrivacySection privacyArchitecture={data?.privacyArchitecture} />
            <DataSources
              dataSources={
                data?.dataSources || {
                  totalSources: 0,
                  totalPiiStored: 0,
                  activeConnections: 0,
                  lastUpdate: new Date().toISOString(),
                  sources: [],
                }
              }
            />{" "}
            <PrivacyGuarantees privacyGuarantees={data?.privacyGuarantees} />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
