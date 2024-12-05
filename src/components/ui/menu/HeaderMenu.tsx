import { useLocation, useNavigate } from "react-router-dom";
import musicIcon from "../../../assets/icons/music.png";
import booksIcon from "../../../assets/icons/books.png";
import moviesIcon from "../../../assets/icons/movies.png";
import sportsIcon from "../../../assets/icons/sports.png";
import travelIcon from "../../../assets/icons/travel.png";

export const HeaderMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Поиск", icon: musicIcon, path: "/swipes" },
    { name: "Чаты", icon: booksIcon, path: "/chats" },
    { name: "Совпадения", icon: moviesIcon, path: "/matches" },
    { name: "Уведомления", icon: sportsIcon, path: "/notifications" },
    { name: "Профиль", icon: travelIcon, path: "/profile" },
  ];

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md border-b-2 border-gray-200 w-full mt-10 mb-10">
      <div className="text-2xl font-bold text-pink-500">HeartMeet</div>
      <div className="flex space-x-8">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center ${
              location.pathname === item.path
                ? "font-bold text-pink-500"
                : "text-gray-600"
            }`}
          >
            <img
              src={item.icon as string}
              alt={item.name}
              className="w-6 h-6 mr-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
