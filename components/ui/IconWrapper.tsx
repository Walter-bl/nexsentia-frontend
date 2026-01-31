import React from "react";

const IconWrapper = ({ icon, bgColor }) => {
  return (
    <div className=" flex justify-center items-center w-[31px] h-[31px] rounded-[7px] " style={{ background: bgColor }}>
      {icon}
    </div>
  )
}

export default IconWrapper;
