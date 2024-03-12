import React from "react";

interface TextAreaInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const TextAreaInput = ({
  value,
  onChange,
  placeholder,
}: TextAreaInputProps) => {
  return (
    <textarea
      className="text-4xl font-bold resize-none my-3 min-h-5 w-full focus:outline-none"
      value={value}
      onChange={onChange}
      autoFocus
      placeholder={placeholder}
    />
  );
};

export default TextAreaInput;
