import axios from "axios";
import { useEffect, useState } from "react";
import { interestsList } from "../../constants/interestsList.ts";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { ButtonAction } from "../ui/buttons/ButtonAction.tsx";

import { FaThumbsUp, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { HeaderMenu } from "../ui/menu/HeaderMenu.tsx";
import { InterestCard } from "../ui/selects/InterestCard.tsx";
import { ComplaintDialog } from "./ComplaintDialog.tsx";

export const LikeIcon = () => <FaThumbsUp className="text-white" />;
export const SkipIcon = () => <FaTimes className="text-white" />;
export const ReportIcon = () => (
  <FaExclamationTriangle className="text-white" />
);

export const Swipes = () => {
  const userData = useRegistrationStore((state) => state.data);
  const [userToSwipe, setUserToSwipe] = useState<any>(null);
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState<string>(""); // Город для фильтрации
  const [isCityFilterActive, setIsCityFilterActive] = useState(false); // Состояние фильтрации

  const fetchRandomUser = async () => {
    try {
      console.log(encodeURIComponent(cityFilter));
      const url = isCityFilterActive
        ? `https://localhost:7268/api/Swipe/random-user-by-city/${userData.userName}?city=${encodeURIComponent(
            cityFilter,
          )}`
        : `https://localhost:7268/api/Swipe/random-user/${userData.userName}`;
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data);
      setUserToSwipe(response.data);
    } catch (error) {
      console.error("Ошибка загрузки пользователя:", error);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, [userData.userName, isCityFilterActive]);

  const handleAction = async (action: "like" | "skip") => {
    try {
      const url = `https://localhost:7268/api/Swipe/${action}`;
      await axios.post(url, {
        currentUserName: userData.userName,
        targetUserName: userToSwipe.userName,
      });

      // Загружаем следующую карточку
      await fetchRandomUser();
    } catch (error) {
      console.error(`Ошибка при ${action}:`, error);
    }
  };

  const handleComplaintSubmit = async (complaintText: string) => {
    try {
      await axios.post("https://localhost:7268/api/admin/submit-complaint", {
        userName: userData.userName,
        reportedUserName: userToSwipe.userName,
        complaintText,
      });
      alert("Жалоба отправлена успешно.");
    } catch (error) {
      console.error("Ошибка отправки жалобы:", error);
    }
  };

  const handleCityFilter = () => {
    setIsCityFilterActive(true);
  };

  const clearCityFilter = () => {
    setCityFilter(""); // Очистить значение инпута
    setIsCityFilterActive(false);
  };

  if (!userToSwipe) {
    return (
      <div>
        <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
          <HeaderMenu />
        </div>
        <p className="text-xl text-gray-500 mt-20 content-center">
          Пользователи закончились, приходите позже
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col absolute top-0 w-full">
      <HeaderMenu />
      <div className="flex flex-row justify-between mt-20 px-10">
        {/* Левая часть: Карточка пользователя */}
        <div className="flex flex-col w-2/3 bg-lightPink ">
          <div
            className={
              "mx-20 flex flex-col items-center bg-white p-10 rounded-xl"
            }
          >
            <div className="flex">
              {/* Аватарка */}
              <img
                src={`https://localhost:7268${userToSwipe.avatar}`}
                alt="avatar"
                className="w-40 h-40 rounded-lg"
              />
              <div className="ml-6 flex flex-col justify-center">
                <p className="text-xl font-bold">
                  {userToSwipe.name}, {userToSwipe.age}
                </p>
                <p className="text-gray-500">{userToSwipe.city}</p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{userToSwipe.bio}</p>

            <div className="mt-4">
              <p className="font-semibold">Интересы:</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {userToSwipe.interests.map((id) => {
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
          </div>
          {/* Кнопки действия */}
          <div className="flex justify-center mt-6 space-x-4">
            <ButtonAction
              className={"bg-green-500"}
              onClick={() => handleAction("like")}
              icon={<LikeIcon />}
            >
              Лайк
            </ButtonAction>
            <ButtonAction
              className={"bg-yellow-300"}
              onClick={() => handleAction("skip")}
              icon={<SkipIcon />}
            >
              Пропустить
            </ButtonAction>
            <ButtonAction
              className={"bg-red"}
              onClick={() => setIsComplaintDialogOpen(true)}
              icon={<ReportIcon />}
            >
              Жалоба
            </ButtonAction>
          </div>
          <ComplaintDialog
            isOpen={isComplaintDialogOpen}
            onClose={() => setIsComplaintDialogOpen(false)}
            onSubmit={handleComplaintSubmit}
            reportedUserName={userToSwipe.userName}
          />
        </div>

        {/* Правая часть: Фильтрация */}
        <div className="w-1/3 bg-white p-6 rounded-xl shadow-md">
          <label
            htmlFor="city"
            className="block text-lg font-medium text-gray-700"
          >
            Фильтр по городу
          </label>
          <input
            type="text"
            id="city"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            placeholder="Введите город"
          />
          <div className="flex justify-between mt-4">
            {!isCityFilterActive ? (
              <button
                onClick={handleCityFilter}
                className="bg-pink text-white px-4 py-2 rounded-md hover:bg-pink-600"
              >
                Искать
              </button>
            ) : (
              <button
                onClick={clearCityFilter}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Отменить фильтрацию
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
