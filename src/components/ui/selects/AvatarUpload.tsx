import type { ChangeEvent, FC } from "react";

interface IAvatarUploadProps {
  avatar: File | null;
  onAvatarChange: (file: File | null) => void;
}

export const AvatarUpload: FC<IAvatarUploadProps> = ({
  avatar,
  onAvatarChange,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onAvatarChange(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center">
        {avatar ? (
          <img
            src={URL.createObjectURL(avatar)}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Нет изображения</span>
        )}
      </div>
      <label
        htmlFor="avatarInput"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
      >
        Добавить аватарку
      </label>
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
