interface AvatarProps {
  name: string;
  profileImage: string;
  type: "small" | "medium";
}

const Avatar = ({ name, profileImage, type }: AvatarProps) => {
  const typeClass = type === "small" ? `w-6 h-6` : `w-8 h-8`;

  return (
    <div className="flex items-center gap-2">
      <img
        src={profileImage}
        alt="author image"
        className={`rounded-full ${typeClass}`}
      />
      <h2 className="font-semibold text-sm">{name ?? "Unknown"}</h2>
    </div>
  );
};

export default Avatar;
