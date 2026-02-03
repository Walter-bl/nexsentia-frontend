import React, { useState } from "react";
import { AI_BUTON } from "@/utils/icons";
import { Drawer, } from "../widgets/Drawer";
import { SignalDrawerContent } from "../widgets/SignalDrawerContent";

export const GradientButton = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
<button
  onClick={() => setIsDrawerOpen(true)}
  className="fixed bottom-4 right-4 w-28 h-28 rounded-full flex items-center justify-center z-10 cursor-pointer group"
>
  {/* Outer pulse gradient */}
  <span
    className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#0FBA968C] to-[#0FB5C09C] opacity-60"
    style={{
      animation: "pulseSlow 2.5s ease-in-out infinite",
    }}
  ></span>

  {/* Inner static button */}
  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#0FBA96] to-[#0FB5C0] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105">
    {AI_BUTON}
  </div>

  {/* Custom keyframes */}
  <style jsx>{`
    @keyframes pulseSlow {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.15);
        opacity: 0.3;
      }
      100% {
        transform: scale(1);
        opacity: 0.6;
      }
    }
  `}</style>
</button>




      {/* The Drawer */}
      {/* <SignalDrawer
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      /> */}

        <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Signal Detection"
        subtitle="Detailed explanation"
      >
        <SignalDrawerContent />
      </Drawer>
    </>
  );
};