import axios from "axios";
import { useEffect, useState } from "react";
import { interestsList } from "../../constants/interestsList.ts";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { Button } from "../ui/buttons/Button.tsx";
import { ButtonAction } from "../ui/buttons/ButtonAction.tsx";
import { HeaderMenu } from "../ui/menu/HeaderMenu.tsx";
import { InterestCard } from "../ui/selects/InterestCard.tsx";
import { LikeIcon, ReportIcon, SkipIcon } from "./Swipes.tsx";

export const Notifications = () => {
  const userData = useRegistrationStore((state) => state.data); // Текущий пользователь
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Состояние загрузки

  // Функция для загрузки уведомлений
  const fetchNotifications = async () => {
    setLoading(true); // Устанавливаем состояние загрузки
    try {
      const response = await axios.get(
        `https://localhost:7268/api/Notification/${userData.userName}`,
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Ошибка загрузки уведомлений:", error);
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  // Загрузка уведомлений при монтировании
  useEffect(() => {
    fetchNotifications();
  }, [userData.userName]);

  // Обработка действия "Лайк"
  const handleMutualLike = async (likedUserName: string) => {
    try {
      await axios.post("https://localhost:7268/api/Notification/mutual-like", {
        currentUserName: userData.userName,
        likedUserName,
      });
      // Обновляем уведомления
      fetchNotifications();
    } catch (error) {
      console.error("Ошибка взаимного лайка:", error);
    }
  };

  // Обработка действия "Пропустить"
  const handleSkip = async (likedUserName: string) => {
    try {
      await axios.post("https://localhost:7268/api/Notification/skip", {
        currentUserName: userData.userName,
        likedUserName,
      });
      // Обновляем уведомления
      fetchNotifications();
    } catch (error) {
      console.error("Ошибка пропуска:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
          <HeaderMenu />
        </div>
        <p className="text-xl text-gray-500 mt-20 content-center">
          Загрузка уведомлений...
        </p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div>
        <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
          <HeaderMenu />
        </div>
        <p className="text-xl text-gray-500 mt-20 content-center">
          У вас нет новых уведомлений
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-lightPink">
      {/* Закреплённое меню */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
        <HeaderMenu />
        <p className="text-xl font-bold text-center py-4">Ваши уведомления</p>
      </div>

      {/* Скроллируемая форма */}
      <div
        className="custom-scroll mt-[100px] px-6 w-full max-w-3xl mx-auto"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex flex-col bg-white p-6 rounded-xl shadow-lg mb-6"
          >
            {/* Сообщение об уведомлении */}
            <p className="text-lg font-bold mb-4">{notification.message}</p>

            {/* Карточка пользователя */}
            <div className="flex">
              {/* Аватарка */}
              <img
                src={`https://localhost:7268${notification.userCard.avatar}`}
                alt="avatar"
                className="w-32 h-32 rounded-lg"
              />
              <div className="ml-6 flex flex-col justify-center">
                <p className="text-xl font-bold">
                  {notification.userCard.name}, {notification.userCard.age}
                </p>
                <p className="text-gray-500">{notification.userCard.city}</p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{notification.userCard.bio}</p>

            <div className="mt-4">
              <p className="font-semibold">Интересы:</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {notification.userCard.interests.map((id: number) => {
                  const interest = interestsList[id - 1]; // Индекс из API
                  return (
                    <InterestCard
                      key={id}
                      label={interest.label}
                      icon={interest.icon as string}
                    />
                  );
                })}
              </div>
            </div>

            {/* Кнопки действия */}
            <div className="flex justify-center mt-6 space-x-4">
              <ButtonAction
                className="bg-green-500"
                onClick={() => handleMutualLike(notification.userCard.userName)}
                icon={<LikeIcon />}
              >
                Лайк
              </ButtonAction>
              <ButtonAction
                className="bg-yellow-300"
                onClick={() => handleSkip(notification.userCard.userName)}
                icon={<SkipIcon />}
              >
                Пропустить
              </ButtonAction>
              <ButtonAction className="bg-red" icon={<ReportIcon />}>
                Жалоба
              </ButtonAction>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
