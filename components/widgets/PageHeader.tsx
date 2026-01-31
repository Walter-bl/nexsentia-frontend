import React from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  rightSlot?: React.ReactNode; // optional: buttons, filters, etc.
};

const PageHeader = ({
  title,
  description,
  rightSlot,
}: PageHeaderProps) => {
  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[20px] font-semibold text-[#EFF2FE]">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-[13px] text-[#71858C]">
            {description}
          </p>
        )}
      </div>

      {rightSlot && (
        <div className="flex items-center gap-2">
          {rightSlot}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
