import React from "react";
import { Share2, Check, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const UserProfile = () => {
  const { user, logout } = useAuth();

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
    <div className="text-slate-300 font-sans mx-auto relative">
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
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0BB995] to-[#0AB9C7] flex items-center justify-center text-[#F5F5FA] text-[40px] font-bold mb-4 shadow-lg">
            JD
          </div>
          <h1 className="text-[22px] font-semibold text-[#F5F5FA]">
            John Doe
          </h1>
          <p className="text-[13px] text-[#71858C] uppercase tracking-widest mt-1">
            CEO
          </p>
          <p className="text-[13px] text-[#71858C] mt-1">
            jhon_d@xyzweb.com
          </p>
        </div>
      </header>

      {/* Integrations Section */}
      <section>
        <h3 className="text-lg text-[#D2DCE5] mb-1">Integrations</h3>
        <p className="text-[13px] text-[#71858C] mb-6">
          Connect your Workspace with integrations
        </p>

        <div className="space-y-[28px]">
          {integrations.map((app) => (
            <div
              key={app.name}
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors
              ${
                app.isConnected
                  ? "border-[#0BB995] bg-[#0bb9951f]"
                  : "border-[#33AD8C] bg-[#469F8845] hover:border-[#00bfa5]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden shadow-inner bg-white">
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-[#EFF2FE] text-[18.68px] font-semibold">
                    {app.name}
                  </h4>
                  <p className="text-[14.94px] text-[#71858C]">
                    {app.description}
                  </p>
                </div>
              </div>

              {app.isConnected ? (
                <span className="flex items-center gap-2 bg-[#0BB995] text-white px-4 py-2 rounded-[10px] text-[13px] font-medium">
                  <Check size={14} />
                  Connected
                </span>
              ) : (
                <button className="flex items-center gap-2 bg-[#EFF2FE] hover:bg-white text-[#71858C] px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all active:scale-95">
                  <Share2 size={14} className="rotate-45" />
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
