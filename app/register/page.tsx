"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { LOGO } from "@/utils/icons";
import GOOGLE_ICON from "/google.png";
import MICROSOFT_ICON from "/micro.png";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import SocialButton from "@/components/ui/SocialButton";
import AuthCard from "@/components/widgets/AuthCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative  bg-[#081d1b]  text-white flex flex-col lg:flex-row items-center justify-center p-6 lg:p-24 gap-12">

  <div className="flex absolute left-0 top-0 py-[60px] px-2 bg-black items-center gap-3 mb-[50px] ">
          <div className="flex items-center gap-2">
            {LOGO}
            <p className=" font-poppins text-[33.275px] font-[500] leading-[23px] text-[#EFF2FE] sm:block">
              NexSentia
            </p>
          </div>
        </div>
      <div className="flex-1 max-w-xl space-y-6">
      

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
      <AuthCard
        title="NexSentia"
        subtitle="Secure to your dashboard"
        buttonText="Sign in"
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your mail",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
          },
        ]}
        socials={[
          { icon: "/google.png", provider: "Google" },
          { icon: "/micro.png", provider: "Microsoft" },
        ]}
        onSubmit={() => console.log("Login submit")}
      />
    </div>
  );
}
