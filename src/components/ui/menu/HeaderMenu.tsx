import { useLocation, useNavigate } from "react-router-dom";
import searchIcon from "../../../assets/icons/menu/search.png";
import chatIcon from "../../../assets/icons/menu/chat.png";
import matchIcon from "../../../assets/icons/menu/match.png";
import notificationIcon from "../../../assets/icons/menu/notification.png";
import profileIcon from "../../../assets/icons/menu/profile.png";
import { useRegistrationStore } from "../../../stores/useRegistrationStore.ts";

export const HeaderMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reset } = useRegistrationStore();

  const menuItems = [
    { name: "Поиск", icon: searchIcon, path: "/swipes" },
    { name: "Чаты", icon: chatIcon, path: "/chats" },
    { name: "Совпадения", icon: matchIcon, path: "/matches" },
    { name: "Уведомления", icon: notificationIcon, path: "/notifications" },
    { name: "Профиль", icon: profileIcon, path: "/profile" },
  ];

  const handleLogout = () => {
    reset(); // Очищаем store и localStorage
    navigate("/"); // Перенаправляем на главную страницу
  };

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md border-b-2 border-gray-200 w-full mb-10 fixed">
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
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-600 font-medium ml-4"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};
