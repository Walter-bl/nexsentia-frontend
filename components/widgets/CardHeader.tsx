import { RIGHT_ARROW } from "@/utils/icons";
import IconWrapper from "../ui/IconWrapper";

type Props = {
  label: string;
  text?: string;
  bgColor?:string
  icon:any
};

export const CardHeader = ({ label,icon, text, bgColor }: Props) => {
  return (
    <div className="  flex-col flex items-center ">
      <div
        className={`  w-full flex justify-between ${!text ? "items-center" : ""} `}
      >
        <div className={` gap-2 flex ${!text ? "items-center" : ""}`}>
          <IconWrapper icon={icon} bgColor={bgColor??"#112F31"} />
          <div>
            <p className="text-[15px] uppercase font-600 text-[#EFF2FE]">
              {label}
            </p>
            {text && (
              <p className="text-[12px] font-400 text-[#71858C]">
                {text}
              </p>
            )}
          </div>
        </div>
        {RIGHT_ARROW}
      </div>
    </div>
  );
};
