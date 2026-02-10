"use client";

import  { useState } from "react";
import { LOGO } from "@/utils/icons";

import AuthCard from "@/components/widgets/AuthCard";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const { register } = useAuth();
 const router= useRouter()
  const [loading, setLoading] = useState(false);
const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

const handleRegister = async (values: Record<string, string>) => {
  try {
    setLoading(true);
    setFieldErrors({}); // reset previous errors
    await register(values as any);
    // toast.success("Account created successfully 🎉");
    router.push("/dashboard");
  } catch (error: any) {
    const ERRORS=error.data.errors
    console.log('error ====',ERRORS)
    if (ERRORS && Array.isArray(ERRORS)) {
      const newErrors: Record<string, string> = {};
     ERRORS.forEach((err: { field: string; errors: string[] }) => {
        // Show the first error for each field
        newErrors[err.field] = err.errors[0];
      });
      setFieldErrors(newErrors);
    } else {
      toast.error(error?.message || "Registration failed");
    }
  } finally {
    setLoading(false);
  }
};


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
  buttonText="Register"
  loading={loading}
  fields={[
    { name: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name" },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your mail" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
  ]}
  fieldErrors={fieldErrors} // 👈 pass the errors
  socials={[
    { icon: "/google.png", provider: "Google" },
    { icon: "/micro.png", provider: "Microsoft" },
  ]}
  onSubmit={handleRegister}

   footerText="Already have an account?"
  footerLink="/"
  footerLinkText="Login"
/>

    </div>
  );
}
