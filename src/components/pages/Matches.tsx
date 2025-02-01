import axios from "axios";
import { useEffect, useState } from "react";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { Button } from "../ui/buttons/Button.tsx";
import { HeaderMenu } from "../ui/menu/HeaderMenu.tsx";

export const Matches = () => {
  const userData = useRegistrationStore((state) => state.data); // Данные текущего пользователя
  const [matches, setMatches] = useState<any[]>([]);

  // Функция для загрузки совпадений
  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7268/api/Match/${userData.userName}/matches`,
      );
      setMatches(response.data);
    } catch (error) {
      console.error("Ошибка загрузки совпадений:", error);
    }
  };

  // Функция для удаления совпадения
  const removeMatch = async (likedUserName: string) => {
    try {
      await axios.delete("https://localhost:7268/api/Match/remove-match", {
        data: {
          currentUserName: userData.userName,
          likedUserName,
        },
      });
      fetchMatches(); // Обновляем список совпадений
    } catch (error) {
      console.error("Ошибка удаления совпадения:", error);
    }
  };

  // Загрузка совпадений при монтировании
  useEffect(() => {
    if (userData.userName) {
      fetchMatches();
    }
  }, [userData.userName]);

  if (!userData.userName) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-xl text-gray-500">Ошибка: пользователь не найден</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <HeaderMenu />
        <p className="text-xl text-gray-500 mt-20">Нет совпадений</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-lightPink">
      {/* Закреплённое меню */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
        <HeaderMenu />
        <p className="text-xl font-bold text-center py-4">Мои совпадения</p>
      </div>

      {/* Список совпадений */}
      <div
        className="custom-scroll mt-[100px] px-6 w-full max-w-3xl mx-auto"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {matches.map((match) => (
          <div
            key={match.userName}
            className="flex flex-row bg-white p-6 rounded-xl shadow-lg mb-6 items-center"
          >
            {/* Аватарка */}
            <div className="w-1/4">
              <img
                src={`https://localhost:7268${match.avatar}`}
                alt="avatar"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Информация о пользователе */}
            <div className="flex-1 ml-6">
              <p className="text-xl font-bold">
                {match.name}, {match.age}
              </p>
              <p className="text-gray-500">{match.city}</p>
            </div>

            {/* Кнопки действия */}
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() =>
                  (window.location.href = `/profile/${match.userName}`)
                }
                className="bg-blue-500 text-white"
              >
                Посмотреть профиль
              </Button>
              <Button
                onClick={() => removeMatch(match.userName)}
                className="bg-red-500 text-white"
              >
                Удалить из совпадений
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
