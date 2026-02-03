type InputFieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // 👈 add this
};

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#EFF2FE]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-[52px] rounded-lg bg-[#0B1F1E] border px-4 text-white outline-none 
          ${error ? "border-red-500" : "border-[#2E6F63]"} 
          focus:border-[#1EB389]`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>} {/* 👈 show error */}
    </div>
  );
};

export default InputField;
