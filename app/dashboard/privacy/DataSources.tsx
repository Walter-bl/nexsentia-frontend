import React from "react";
import { Clock, Database, File, FileText, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import PageHeader from "@/components/widgets/PageHeader";
import Image from "next/image";

const DataSources = () => {
  // DRY: Data for the top summary stats
  const summaries = [
    { value: "6", label: "Sources" },
    { value: "305,808", label: "PII Stored" },
    { value: "5", label: "Active Connections" },
    { value: "2 mins ago", label: "Last Update" },
  ];

  // DRY: Data for the integration cards
  const sources = [
    {
      name: "Jira",
      sub: "Atlassian Jira",
      users: "2,340",
      threads: "18",
      participants: "45",
      sync: "13:44",
      progress: 70,
      color: "bg-[#1868DB]",
      icon: "/jira.png",
    },
    {
      name: "ServiceNow",
      sub: "ServiceNow CSM",
      users: "1820",
      threads: "340",
      participants: "2100",
      sync: "13:44",
      progress: 85,
      color: "bg-[#0FBC85]",
      icon: "/snow.png",
    },
    {
      name: "Microsoft Outlook",
      sub: "Atlassian Jira",
      users: "45,892",
      threads: "8450",
      participants: "234",
      sync: "13:44",
      progress: 40,
      color: "bg-[#0078D4]",
      icon: "/msoft.png",
    },
    {
      name: "Gmail",
      sub: "ServiceNow CSM",
      users: "23,456",
      threads: "4230",
      participants: "156",
      sync: "13:44",
      progress: 60,
      color: "bg-[#FF383C]",
      icon: "/email.png",
    },
       {
      name: "Slack",
      sub: "Atlassian Jira",
      users: "30,456",
      threads: "3430",
      participants: "156",
      sync: "13:44",
      progress: 60,
      color: "bg-[#CB30E0]",
      icon: "/slack.png",
    },
     {
      name: "Microsoft Teams",
      sub: "ServiceNow CSM",
      users: "30,456",
      threads: "3430",
      participants: "156",
      sync: "13:44",
      progress: 60,
      color: "bg-[#6155F5]",
      icon: "/mt.png",
    },
  ];

  return (
    <Card className=" p-8 xl:px-25 min-h-screen ">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Data Sources"
          description="Connected integrations and data pipelines"
        />

        {/* Summary Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaries.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-xl border border-[#33AD8C] bg-[#469F8845] hover:bg-teal-900/20 transition-colors"
            >
              <span className="text-[25px] font-[700] text-[#8AF1B9] mb-1">
                {stat.value}
              </span>

              <span className="text-[16px] text-[#D2DCE5] font-normal">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Source Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sources.map((source, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-[#33AD8C] bg-[#469F8845] relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3">
                  <div className=" overflow-hidden rounded-[10px] ">
                    {/* {source.name[0]} */}
                    <Image src={source.icon} width={48} height={48} alt="" />
                  </div>
                  <div className=" flex flex-col justify-center">
                    <h3 className="text-[#EFF2FE] text-[18.68px] font-semibold leading-none">
                      {source.name}
                    </h3>
                    <span className="text-[14.94px] text-[#71858C]">
                      {source.sub}
                    </span>
                  </div>
                </div>
                <div className="flex  text-[#124337] items-center gap-2 px-2 py-1 bg-[#8181A5] rounded-full">
                  <div className="w-2 h-2 rounded-full bg-[#124337]  animate-pulse" />
                  <span className="text-[12px]  font-norml uppercase">
                    Connected
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <Metric label="Users" value={source.users} />
                <Metric label="Threads" value={source.threads} />
                <Metric label="Participants" value={source.participants} />
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center text-[10px] mb-2 tracking-tighter">
                <p className="flex items-center text-[14.94px] text-[#71858C]  gap-1">
                  <Clock size={12} /> Last sync: {source.sync}
                </p>
                <div className="flex gap-2 ">
                  <Database size={12} className="text-[#FFFFFF]" />
                  <FileText size={12} className="text-[#FFFFFF]"/>
                  
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] ">
                  <span className="font-medium text-[12px] text-[#D2DCE5]">Communication</span>
                  <span  className="font-normal text-[12.87px] text-[#71858C] ">10,417 items</span>
                </div>
                <div className="h-1.5 w-full bg-[#8181A5] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${source.color} opacity-80`}
                    style={{ width: `${source.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// DRY Helper Component
const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center">
    <div className="text-[#EFF2FE] font-semibold text-[18.86px]">{value}</div>
    <div className="text-[14.94px] text-[#71858C] font-normal">
      {label}
    </div>
  </div>
);

export default DataSources;
