import { useNavigate } from "react-router-dom";

export const MatchCard = ({ userName, avatarUrl }: any) => {
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
      <img
        src={`https://localhost:7268${avatarUrl}`}
        alt="avatar"
        className="w-16 h-16 rounded-full mr-4"
      />
      <div className="flex-1">
        <p className="font-bold text-lg">{userName}</p>
      </div>
      <div>
        <span className="text-black text-xl font-bold">&rarr;</span>
      </div>
    </div>
  );
};
