interface ButtonProps {
  label: string;
  onClick: () => void;
}
const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="w-full p-2 bg-black text-white rounded-md"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
