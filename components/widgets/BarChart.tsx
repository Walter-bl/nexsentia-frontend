type Props = {
  data: number[];
  labels: string[]; // X-axis labels (e.g., months)
  maxValue?: number; // max Y-axis value (optional)
};

export const BarChart = ({ data, labels, maxValue }: Props) => {
  const max = maxValue || Math.max(...data, 100); // max value for scaling

  return (
    <div className="flex w-full items-end gap-3">
      {/* Y-axis labels */}
      <div className="flex flex-col justify-between h-32 mr-2 text-xs text-gray-400">
        {Array.from({ length: 5 }, (_, i) => {
          const val = Math.round((max / 4) * (4 - i));
          return <div key={i}>{val}</div>;
        })}
      </div>

      {/* Chart area */}
      <div className="flex-1 flex flex-col">
        {/* Bars */}
        <div className="flex justify-between items-end h-32 ">
          {data.map((value, index) => (
            <div
              key={index}
              className={` w-[20px] rounded-t-md ${
                index === data.length - 1 ? "bg-yellow-400" : "bg-[#1E3A40]"
              }`}
              style={{ height: `${(value / max) * 100}%` }}
            />
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          {labels.map((label, index) => (
            <span key={index}  className=" w-[20px] text-center">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
