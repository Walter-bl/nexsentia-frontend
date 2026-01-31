type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ title, children, className }: CardProps) => {
  return (
    <div
      className={`rounded-2xl bg-[#0D2027] border border-[#124337] p-5 ${className}`}
    >
      {title && (
        <h3 className="mb-4 text-sm font-semibold text-gray-200">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
