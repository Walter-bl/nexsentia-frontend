import React from "react";
import PrivacySection from "./PrivacySection";
import DataSources from "./DataSources";
import PageHeader from "@/components/widgets/PageHeader";
import PrivacyGuarantees from "./PrivacyGuarantees";

const page = () => {
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
