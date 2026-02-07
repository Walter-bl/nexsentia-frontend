import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 1; // How many pages to show on each side of current page

    // Always show first page
    pages.push(1);

    if (totalPages <= 5) {
      // If total pages are small, show all
      for (let i = 2; i <= totalPages; i++) pages.push(i);
    } else {
      // Calculate start and end indices for the middle section
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      if (showLeftDots) {
        pages.push("dots-left");
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      if (showRightDots) {
        pages.push("dots-right");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8 select-none">
      {/* Previous Button */}
      <button
        className="p-2 rounded-lg bg-[#1a2e31] border border-[#2d4d52] text-slate-400 hover:text-[#00bfa5] hover:border-[#00bfa5] disabled:opacity-30 disabled:hover:border-[#2d4d52] disabled:hover:text-slate-400 transition-all cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) => {
          if (page === "dots-left" || page === "dots-right") {
            return (
              <span key={`dots-${index}`} className="px-2 text-slate-500">
                <MoreHorizontal size={16} />
              </span>
            );
          }

          const isSelected = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
              className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg font-medium text-sm transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#00bfa5] text-[#0d1b1e] shadow-[0_0_10px_rgba(0,191,165,0.3)]"
                  : "bg-[#1a2e31] border border-[#2d4d52] text-slate-400 hover:border-[#00bfa5] hover:text-white"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        className="p-2 rounded-lg bg-[#1a2e31] border border-[#2d4d52] text-slate-400 hover:text-[#00bfa5] hover:border-[#00bfa5] disabled:opacity-30 disabled:hover:border-[#2d4d52] disabled:hover:text-slate-400 transition-all cursor-pointer"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};