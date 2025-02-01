import { useNavigate } from "react-router-dom";

export const ChatCard = ({
  userName,
  avatarUrl,
  lastMessageTime,
  lastMessageText,
}: any) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/current-chat/${userName}`, {
      state: { avatarUrl },
    });
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4"
    >
      {/* Аватарка */}
      <img
        src={`https://localhost:7268${avatarUrl}`}
        alt="avatar"
        className="w-16 h-16 rounded-full mr-4"
      />
      {/* Информация о чате */}
      <div className="flex-1">
        <p className="font-bold text-lg">{userName}</p>
        <p className="text-gray-500">{lastMessageText}</p>
      </div>
      {/* Время сообщения */}
      <p className="text-sm text-gray-400">
        {new Date(lastMessageTime).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};
