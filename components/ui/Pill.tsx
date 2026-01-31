import React from "react";

type PillProps = {
  text: string;
  icon?: React.ReactNode; // optional icon on the left
  width?: string; // default 139px
  height?: string; // default 21px
  bgColor?: string; // default rgba(70,159,136,0.2)
  textColor?: string; // default #469F88
  className?: string; // optional extra classes
};

export const Pill = ({
  text,
  icon,
  width = "139px",
  height = "21px",
  bgColor = "rgba(70,159,136,0.2)",
  textColor = "#469F88",
  className = "",
}: PillProps) => {
  return (
    <span
      className={`flex items-center justify-center gap-1 rounded-[10px] text-sm font-medium px-2 ${className}`}
      style={{
        width,
        height,
        background: bgColor,
        color: textColor,
      }}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {text}
    </span>
  );
};
