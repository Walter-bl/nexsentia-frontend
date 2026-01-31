type OverlapSliderProps = {
  total: number;
  achieved: number;
  trackColor: string;    // background / total
  fillColor: string;     // achieved / progress
};

export const OverlapSlider = ({
  total,
  achieved,
  trackColor,
  fillColor,
}: OverlapSliderProps) => {
  const percentage = Math.min((achieved / total) * 100, 100);

  return (
    <div className="w-full">
      <div
        className="relative h-[8px] w-full rounded-full overflow-hidden"
        style={{ backgroundColor: trackColor }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{
            width: `${percentage}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>
    </div>
  );
};
