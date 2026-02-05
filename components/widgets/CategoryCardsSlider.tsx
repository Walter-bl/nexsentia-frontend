"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { CardHeader } from "@/components/widgets/CardHeader";
import { TrendingUp, TrendingDown } from "lucide-react";
import { STRAIG_ALIGN, CHAT_ICON } from "@/utils/icons";

type Category = {
  score: number;
  trend: "up" | "down";
  metricsCount: number;
};

interface Props {
  categories?: Record<string, Category>; // optional
  loading?: boolean;
}

const CategoryCardsSlider = ({ categories = {}, loading = false }: Props) => {
  const categoryList = Object.entries(categories || {}); // safe fallback

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1} // default 1 slide
      autoplay={{
        delay: 3000, // auto-slide every 3s
        disableOnInteraction: false,
      }}
      loop={true} // loop slides
      modules={[Autoplay]}
      breakpoints={{
        768: { slidesPerView: 2 }, // 2 slides for screens >= 768px
        1024: { slidesPerView: 2 }, // same for larger
      }}
      className="w-full"
    >
      {categoryList.map(([key, cat]) => (
        <SwiperSlide
          key={key}
          style={{ width: "auto" }}
          className="h-[160px]"
        >
          <Card className="h-full w-full py-[20px]">
            {loading ? (
              <div className="h-full w-full bg-[#1A1A1A] rounded animate-pulse" />
            ) : (
              <>
                <CardHeader
                  icon={key === "communication" ? CHAT_ICON : STRAIG_ALIGN}
                  label={key
                    .replace("_", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                />
                <div className="flex mt-[30px] items-end justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-[#EFF2FE] font-500 text-[28px]">
                      {cat.metricsCount}
                      {key === "communication" ? "%" : ""}
                    </h3>
                    <p className="text-[#71858C] font-400 text-[12px]">
                      {key === "communication" ? "vs last quarter" : "Team metric"}
                    </p>
                  </div>
                  <Pill
                    text={`${cat.trend === "down" ? "-" : "+"}${cat.score}`}
                    icon={cat.trend === "down" ? (
                      <TrendingDown size={12} />
                    ) : (
                      <TrendingUp size={12} />
                    )}
                    className="p-2"
                    bgColor={
                      cat.trend === "down"
                        ? "rgba(250, 100, 100, 0.2)"
                        : "rgba(70, 159, 136, 0.2)"
                    }
                    textColor={cat.trend === "down" ? "#FA6464" : "#469F88"}
                    width=""
                  />
                </div>
              </>
            )}
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoryCardsSlider;
