"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { LOGO } from "@/utils/icons";
import GOOGLE_ICON from "/google.png";
import MICROSOFT_ICON from "/micro.png";
import Image from "next/image";

const InputField = ({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-[20px] font-[400] text-[#FFFFFF]">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-[#1243378F] border border-[#469F8896] rounded-lg px-4 h-[58px] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
    />
  </div>
);

const SocialButton = ({
  icon: Icon,
  provider,
}: {
  icon: any;
  provider: string;
}) => (
  <button className="flex flex-1 items-center justify-center gap-3 bg-[#0D2027] border-[1.2px] border-[#71858C] rounded-lg py-3 hover:bg-slate-800 transition-colors">
    {/* <Icon
      size={20}
      className={provider === "Google" ? "text-blue-400" : "text-blue-600"}
    /> */}
    <Image src={Icon} alt={provider} width={24} height={24} />

    <span className="text-[20px] font-normal text-[#FFFFFF">{provider}</span>
  </button>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen  bg-[#081d1b]  text-white flex flex-col lg:flex-row items-center justify-center p-6 lg:p-24 gap-12">
      {/* Left Content Section */}
      <div className="flex-1 max-w-xl space-y-6">
        <div className="flex items-center gap-3 mb-[50px] ">
          <div className="flex items-center gap-2">
            {LOGO}
            <p className="hidden font-poppins text-[33.275px] font-[700] leading-[23px] text-[#EFF2FE] sm:block">
              NexSentia
            </p>
          </div>
        </div>

        <h1 className="text-5xl text-[#EFF2FE] lg:text-[64px] font-normal leading-tight">
          Understand your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EB389] to-[#0BA9C5]">
            organization
          </span>
          <br />
          like never before.
        </h1>

        <p className="text-[#F5F5FA] text-[20px] max-w-md leading-relaxed">
          AI-powered insights for executive leadership. No individual
          surveillance. Pure organizational intelligence.
        </p>
      </div>

      {/* Right Login Card */}
      <div className="w-full max-w-[660px] bg-[#0F2828] border border-[#469F88CC] rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
        <div className="space-y-6">
          <header className="space-y-1">
            <h2 className="text-[#EFF2FE] font-[34px]">Airlock</h2>
            <p className="text-[#F5F5FA] text-[20px] mt-[10px] font-normal">
              Secure to your dashboard
            </p>
          </header>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your mail"
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <button className="w-full bg-gradient-to-r from-[#02996E] to-[#0895AE] hover:opacity-90 h-[58px] rounded-lg font-semibold flex items-center justify-center gap-2 transition-all mt-8">
              Sign in <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative flex items-center justify-center py-2">
            <div className="w-full border-t border-slate-700"></div>
            <span className="absolute bg-[#0F2828] px-3 text-xs text-slate-500 uppercase">
              or
            </span>
          </div>

          <div className="flex gap-4">
            <SocialButton icon="/google.png" provider="Google" />
            <SocialButton icon="/micro.png" provider="Microsoft" />
          </div>

          <div className="pt-4 flex flex-col items-center gap-6">
            <button className="flex text-[20px] items-center gap-2 text-[#8AF1B9] hover:text-teal-300 transition-colors font-normal">
              <Sparkles size={18} />
              Enter Demo Mode
            </button>
            <p className="text-[16px] text-[#71858C]">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
