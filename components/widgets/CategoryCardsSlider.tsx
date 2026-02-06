"use client";

import React, { useEffect, useRef, useState } from "react";
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
import type { Swiper as SwiperType } from "swiper";

type Category = {
  score: number;
  trend: "up" | "down";
  metricsCount: number;
};

interface Props {
  categories?: Record<string, Category>; // optional
  loading?: boolean;
}



const CategoryCardsSlider = ({ categories = {}, loading = false }:Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [ready, setReady] = useState(false);

  const categoryList = Object.entries(categories || {});

  useEffect(() => {
    if (categoryList.length > 1) {
      setReady(true);
    }
  }, [categoryList.length]);

  if (!ready) return null; // 🔥 CRITICAL FIX

  return (
    <Swiper
      key={categoryList.length}   // 🔥 FORCE RE-MOUNT
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      spaceBetween={16}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop
      modules={[Autoplay]}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      }}
      className="w-full"
    >
      {categoryList.map(([key, cat]) => (
        <SwiperSlide key={key} className="h-[160px]">
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
          </Card>        </SwiperSlide>
      ))}
    </Swiper>
  );
};



export default CategoryCardsSlider;
