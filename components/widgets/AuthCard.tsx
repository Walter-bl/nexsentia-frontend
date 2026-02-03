"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import InputField from "@/components/ui/InputField";
import SocialButton from "@/components/ui/SocialButton";
import Link from "next/link"; // <-- Import Next.js Link

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
};

type SocialProvider = {
  icon: string;
  provider: "Google" | "Microsoft";
};

type AuthCardProps = {
  title: string;
  subtitle: string;
  fields: Field[];
  buttonText?: string;
  socials?: SocialProvider[];
  showDemo?: boolean;
  loading?: boolean; 
  fieldErrors?: any;
  onSubmit: (values: Record<string, string>) => void;
  onSocialAuth?: (provider: SocialProvider["provider"]) => void;
  footerText?: string; // new
  footerLink?: string; // new
  footerLinkText?: string; // new
};

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  fields,
  buttonText = "Submit",
  socials = [],
  showDemo = true,
  loading = false,
  fieldErrors,
  onSubmit,
  onSocialAuth,
  footerText,
  footerLink,
  footerLinkText,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-[660px] bg-[#0F2828] border border-[#469F88CC] rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h2 className="text-[#EFF2FE] text-[34px] font-semibold">{title}</h2>
          <p className="text-[#F5F5FA] text-[20px] mt-[10px] font-normal">{subtitle}</p>
        </header>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={fieldErrors?.[field.name]} // show specific field error
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer h-[58px] rounded-lg font-semibold flex items-center justify-center gap-2 mt-8
              bg-gradient-to-r from-[#02996E] to-[#0895AE]
              transition-all
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                {buttonText} <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Divider + Social */}
        {socials.length > 0 && (
          <>
            <div className="relative flex items-center justify-center py-2">
              <div className="w-full border-t border-slate-700" />
              <span className="absolute bg-[#0F2828] px-3 text-xs text-slate-500 uppercase">or</span>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {socials.map((item) => (
                <SocialButton
                  key={item.provider}
                  icon={item.icon}
                  provider={item.provider}
                  onClick={() => onSocialAuth?.(item.provider)}
                />
              ))}
            </div>
          </>
        )}

        {/* Footer Links */}
        {(footerText && footerLink && footerLinkText) && (
          <p className="text-center text-[#8AF1B9] mt-6">
            {footerText}{" "}
            <Link href={footerLink} className="underline hover:text-teal-300">
              {footerLinkText}
            </Link>
          </p>
        )}

        {/* Demo & security */}
        {showDemo && (
          <div className="pt-4 flex flex-col items-center gap-6">
            <button className="flex text-[20px] items-center gap-2 text-[#8AF1B9] hover:text-teal-300 transition-colors font-normal">
              <Sparkles size={18} />
              Enter Demo Mode
            </button>
            <p className="text-[16px] text-[#71858C]">
              Protected by enterprise-grade security
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCard;
