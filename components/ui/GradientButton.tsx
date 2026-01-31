import React, { useState } from "react";
import { AI_BUTON } from "@/utils/icons";
import { SignalDrawer } from "../widgets/SignalDrawer";

export const GradientButton = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-4 right-4 w-28 h-28 rounded-full bg-gradient-to-br from-[#0FBA968C] to-[#0FB5C09C] flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-50 cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0FBA96] to-[#0FB5C0] flex items-center justify-center">
          {AI_BUTON}
        </div>
      </button>

      {/* The Drawer */}
      <SignalDrawer
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
};