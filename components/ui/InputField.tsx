type InputFieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-[#EFF2FE]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-[52px] rounded-lg bg-[#0B1F1E] border border-[#2E6F63] px-4 text-white outline-none focus:border-[#1EB389]"
      />
    </div>
  );
};

export default InputField;
