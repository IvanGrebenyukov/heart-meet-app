import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { HeaderMenu } from "../ui/menu/HeaderMenu.tsx";
import { ChatCard } from "../ui/selects/ChatCard.tsx";
import { MatchCard } from "../ui/selects/MatchCard.tsx";

export const Chats = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userData = useRegistrationStore((state) => state.data);

  // Загрузка чатов
  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7268/api/Chat/user-chats/${userData.userName}`,
      );
      setChats(response.data);
      setMatches([]); // Очистить совпадения при возврате к чату
    } catch (error) {
      console.error("Ошибка загрузки чатов:", error);
    }
  };

  // Фильтрация чатов по поисковому запросу
  const searchMatches = async (query: string) => {
    try {
      const response = await axios.get(
        `https://localhost:7268/api/Chat/search-matches/${userData.userName}?search=${query}`,
      );
      setMatches(response.data);
      setErrorMessage(
        response.data.length === 0 ? "Совпадений не найдено" : "",
      );
    } catch (error) {
      console.error("Ошибка поиска совпадений:", error);
    }
  };

  // Обработка ввода в строку поиска
  const handleSearchChange = (query: string) => {
    setSearch(query);
    if (query) {
      setSearchActive(true);
      searchMatches(query);
    } else {
      resetSearch();
    }
  };

  // Сброс поиска
  const resetSearch = () => {
    setSearch("");
    setSearchActive(false);
    setMatches([]);
    setErrorMessage("");
    fetchChats();
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-lightPink">
      {/* Строка поиска */}
      <HeaderMenu />
      {/* Строка поиска */}
      <div className="p-4 bg-white shadow-md flex items-center mt-16">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Поиск чатов"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {searchActive && (
          <button
            onClick={resetSearch}
            className="ml-2 bg-red-500 text-white rounded-full p-2"
          >
            ✖
          </button>
        )}
      </div>

      {/* Линия разделения */}
      <div className="border-t border-gray-300 my-2"></div>

      {/* Список чатов */}
      {/* Список совпадений или чатов */}
      <div className="flex-1 overflow-y-auto p-4">
        {searchActive ? (
          matches.length > 0 ? (
            matches.map((match, index) => (
              <MatchCard
                key={index}
                userName={match.userName}
                avatarUrl={match.avatar}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">{errorMessage}</p>
          )
        ) : (
          chats.map((chat, index) => (
            <ChatCard
              key={index}
              userName={chat.userName}
              avatarUrl={chat.avatarUrl}
              lastMessageTime={chat.lastMessageTime}
              lastMessageText={chat.lastMessageText}
            />
          ))
        )}
      </div>
    </div>
  );
};
