"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import AuthCard from "@/components/widgets/AuthCard";
import { LOGO } from "@/utils/icons";
import { useRouter } from "next/navigation";

 const Page=()=> {
  const { login } = useAuth();
   const router= useRouter()
  
  const [loading, setLoading] = useState(false);
const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const handleLogin = async (values: Record<string, string>) => {
    try {
      setLoading(true);
      await login({
        email: values.email,
        password: values.password,
      });
      
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081d1b] text-white flex flex-col lg:flex-row items-center justify-center p-6 lg:p-24 gap-12">
      {/* Left Section */}
      <div className="flex-1 max-w-xl space-y-6">
        <div className="flex items-center gap-3 mb-[50px]">
          <div className="flex items-center gap-4">
            {/* Logo */}
            {LOGO}
            <p className="font-poppins text-[33px] font-[700] leading-[23px] text-[#EFF2FE] sm:block">
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
          AI-powered insights for executive leadership. No individual surveillance. Pure organizational intelligence.
        </p>
      </div>

      {/* Login Card */}
      <AuthCard
        title="NexSentia"
        subtitle="Secure to your dashboard"
        buttonText="Sign in"
        loading={loading}
          fieldErrors={fieldErrors}
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "Enter your mail" },
          { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
        ]}
        socials={[
          { icon: "/google.png", provider: "Google" },
          { icon: "/micro.png", provider: "Microsoft" },
        ]}
        onSubmit={handleLogin}

           footerText="Already don't have an account?"
  footerLink="/register"
  footerLinkText="Register"
      />
    </div>
  );
}

export default Page
