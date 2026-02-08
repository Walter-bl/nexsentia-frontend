"use client";

import React from "react";
import { Share2, Check, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const UserProfile = () => {
  const { user, logout } = useAuth();

  // Helper to get initials
  const initials = `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`.toUpperCase() || "??";

  const integrations = [
    {
      name: "Jira",
      description: "Atlassian Jira",
      logo: "/jira.png",
      isConnected: user?.integrations?.jiraConnected,
    },
    {
      name: "ServiceNow",
      description: "ServiceNow CSM",
      logo: "/servicenow.png",
      isConnected: user?.integrations?.serviceNowConnected,
    },
    {
      name: "Slack",
      description: "Communication Platform",
      logo: "/slack.png",
      isConnected: user?.integrations?.slackConnected,
    },
    {
      name: "Microsoft Teams",
      description: "Collaboration Tool",
      logo: "/teams.png",
      isConnected: user?.integrations?.teamsConnected,
    },
  ];

  return (
    <div className="text-slate-300 font-sans mx-auto relative max-w-[700px] pb-10">
      {/* Header Section */}
      <header className="mb-8 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] text-[#D2DCE5]">User Profile</h2>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium 
                       bg-red-500/10 text-red-400 border border-red-500/30
                       hover:bg-red-500 hover:text-white hover:border-red-500
                       transition-all duration-200 active:scale-95"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0BB995] to-[#0AB9C7] flex items-center justify-center text-[#F5F5FA] text-[40px] font-bold mb-4 shadow-lg border-4 border-[#061419]">
            {initials}
          </div>
          <h1 className="text-[22px] font-semibold text-[#F5F5FA]">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-[13px] text-[#0BB995] font-bold uppercase tracking-widest mt-1">
            {user?.role}
          </p>
          <p className="text-[13px] text-[#71858C] mt-1">
            {user?.email}
          </p>
        </div>
      </header>

      <div className="space-y-10">
        {/* Permissions Section */}
        <section className="bg-[#0A1C24] p-5 rounded-xl border border-[#1a2e31]">
          <div className="flex items-center gap-2 mb-4 text-[#D2DCE5]">
            <ShieldCheck size={18} className="text-[#0BB995]" />
            <h3 className="text-md font-semibold">Permissions & Access</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {user?.permissions?.map((permission: string) => (
              <span 
                key={permission}
                className="px-3 py-1 rounded-md bg-[#162e35] border border-[#33AD8C]/20 text-[#71858C] text-[11px] font-mono"
              >
                {permission}
              </span>
            ))}
            {(!user?.permissions || user.permissions.length === 0) && (
              <p className="text-xs text-[#465a69]">No specific permissions assigned.</p>
            )}
          </div>
        </section>

        {/* Integrations Section */}
        <section>
          <h3 className="text-lg text-[#D2DCE5] mb-1">Integrations</h3>
          <p className="text-[13px] text-[#71858C] mb-6">
            Connect your Workspace with integrations
          </p>

          <div className="space-y-[12px]">
            {integrations.map((app) => (
              <div
                key={app.name}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all
                ${
                  app.isConnected
                    ? "border-[#0BB995]/40 bg-[#0BB995]/5"
                    : "border-[#1a2e31] bg-[#0A1C24] hover:border-[#33AD8C]/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 overflow-hidden flex items-center justify-center rounded-[11px] ">
                    <img
                      src={app.logo}
                      alt={app.name}
                      className="w-full h-full object-contain grayscale-[0.5] contrast-125"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/48?text=" + app.name.charAt(0);
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-[#EFF2FE] text-[16px] font-semibold">
                      {app.name}
                    </h4>
                    <p className="text-[12px] text-[#71858C]">
                      {app.description}
                    </p>
                  </div>
                </div>

                {app.isConnected ? (
                  <span className="flex items-center gap-2 bg-[#0BB995]/20 text-[#0BB995] px-4 py-2 rounded-lg text-[12px] font-bold border border-[#0BB995]/30">
                    <Check size={14} strokeWidth={3} />
                    Connected
                  </span>
                ) : (
                  <button className="flex items-center gap-2 bg-[#EFF2FE] hover:bg-white text-[#061419] px-4 py-2 rounded-lg text-[12px] font-bold transition-all active:scale-95 shadow-lg">
                    <Share2 size={14} className="rotate-45" />
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;