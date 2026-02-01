"use client";

import Image from "next/image";

type SocialButtonProps = {
  icon: string;
  provider: "Google" | "Microsoft";
  onClick?: () => void;
};

const SocialButton = ({
  icon,
  provider,
  onClick,
}: SocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-3 bg-[#0D2027] border-[1.2px] border-[#71858C] rounded-lg py-3 hover:bg-slate-800 transition-colors"
    >
      <Image src={icon} alt={provider} width={24} height={24} />

      <span className="text-[20px] font-normal text-[#FFFFFF]">
        {provider}
      </span>
    </button>
  );
};

export default SocialButton;
