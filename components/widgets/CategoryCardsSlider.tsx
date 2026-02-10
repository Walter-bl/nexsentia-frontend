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
import { Drawer } from "./Drawer";
import MetricsDisplay, { Metric } from "./MetricsDisplay";

// --- Types ---

// Define what a Metric looks like based on your MetricsDisplay requirements


type Category = {
  score: number;
  trend: "up" | "down";
  metricsCount: number;
  title?: string;
  metrics: Metric[];
};

interface Props {
  categories?: Record<string, Category>;
  loading?: boolean;
}

// Data passed to the handleOpenDrawer function
interface DrawerData {
  metrics: Metric[];
  formattedLabel: string;
}

// --- Sub-Components ---

const SkeletonCard = () => (
  <Card className="h-[160px] w-full py-[20px]">
    <div className="h-full w-full bg-[#1A1A1A] rounded animate-pulse" />
  </Card>
);

/**
 * Pure UI Component for the Card
 */
const CategoryCard = ({
  itemKey,
  data,
  onOpenDrawer,
}: {
  itemKey: string;
  data: Category;
  onOpenDrawer: (data: DrawerData) => void;
}) => {
  const formattedLabel = itemKey
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const isDown = data.trend === "down";

  return (
    <Card className="h-full w-full py-[20px]">
      <CardHeader
        icon={itemKey.toLowerCase().includes("communication") ? CHAT_ICON : STRAIG_ALIGN}
        label={formattedLabel}
        // Properly structured object matching DrawerData interface
        onClick={() => onOpenDrawer({ metrics: data.metrics, formattedLabel })}
      />

      <div className="flex mt-[30px] items-end justify-between">
        <div className="flex flex-col">
          <p className="text-[#71858C] font-[400] text-[12px]">
            {data.title || "Team metric"}
          </p>
        </div>

        <Pill
          text={`${isDown ? "-" : "+"}${data.score ?? 0}`}
          icon={isDown ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
          className="p-2"
          bgColor={isDown ? "rgba(250, 100, 100, 0.2)" : "rgba(70, 159, 136, 0.2)"}
          textColor={isDown ? "#FA6464" : "#469F88"}
          width=""
        />
      </div>
    </Card>
  );
};

// --- Main Component ---

const CategoryCardsSlider = ({ categories = {}, loading = false }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [ready, setReady] = useState(false);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<Metric[]>([]);
  const [formattedLabel, setFormattedLabel] = useState<string>("");

  const categoryList = Object.entries(categories || {});

  useEffect(() => {
    if (categoryList.length > 0) {
      setReady(true);
    }
  }, [categoryList.length]);

  const handleOpenDrawer = (data: DrawerData) => {
    setSelectedMetrics(data.metrics);
    setFormattedLabel(data.formattedLabel);
    setIsDrawerOpen(true);
  };

  if (!ready && !loading) return null;

  return (
    <>
      <Swiper
        key={categoryList.length}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={categoryList.length > 1}
        modules={[Autoplay]}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        className="w-full"
      >
        {loading
          ? [1, 2].map((i) => (
              <SwiperSlide key={`skeleton-${i}`} className="h-[160px]">
                <SkeletonCard />
              </SwiperSlide>
            ))
          : categoryList.map(([key, cat]) => (
              <SwiperSlide key={key} className="h-[160px]">
                <CategoryCard 
                    itemKey={key} 
                    data={cat} 
                    onOpenDrawer={handleOpenDrawer} 
                />
              </SwiperSlide>
            ))}
      </Swiper>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={formattedLabel}
      >
        <MetricsDisplay metrics={selectedMetrics} />
      </Drawer>
    </>
  );
};

export default CategoryCardsSlider;