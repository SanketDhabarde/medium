interface AvatarProps {
  name: string;
  type: "small" | "medium";
}

const Avatar = ({ name, type }: AvatarProps) => {
  const typeClass = type === "small" ? `w-6 h-6` : `w-8 h-8`;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative inline-flex items-center justify-center ${typeClass} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
      >
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {name ? name[0] : "U"}
        </span>
      </div>

      <h2 className="font-semibold text-sm">{name ?? "Unknown"}</h2>
    </div>
  );
};

export default Avatar;
