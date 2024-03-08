interface AvatarProps {
  name: string;
  profileImage: string;
}

const Avatar = ({ name, profileImage }: AvatarProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={profileImage}
        alt="author image"
        className="rounded-full w-6 h-6"
      />
      <h2 className="font-semibold text-sm">{name ?? "Unknown"}</h2>
    </div>
  );
};

export default Avatar;
