interface LabelledInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}: LabelledInputProps) => {
  return (
    <div className="flex flex-col my-3 w-full">
      <label className="font-semibold text-md text-black">{label}</label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 border border-slate-400 rounded-md mt-1 "
      />
    </div>
  );
};

export default LabelledInput;
