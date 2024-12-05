import axios from "axios";
import { useEffect, useState } from "react";
import { interestsList } from "../../constants/interestsList.ts";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { Button } from "../ui/buttons/Button.tsx";
import { HeaderMenu } from "../ui/menu/HeaderMenu.tsx";
import { AvatarUpload } from "../ui/selects/AvatarUpload.tsx";
import { InterestCard } from "../ui/selects/InterestCard.tsx";
import "../../styles/formStyles.css";

export const Profile = () => {
  const userData = useRegistrationStore((state) => state.data);
  const [profile, setProfile] = useState(null);
  console.log(userData.userName);
  useEffect(() => {
    console.log(userData.userName);
    const fetchProfile = async () => {
      console.log(userData.userName);
      try {
        const response = await axios.get(
          `https://localhost:7268/api/Profile/${userData.userName}`,
        );
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    };

    fetchProfile();
  }, [userData.userName]);

  if (!profile)
    return (
      <div>
        <HeaderMenu />
        Загрузка...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-lightPink custom-scroll">
      {/* Верхнее меню */}
      <HeaderMenu />

      {/* Контент профиля */}
      <div className=" flex flex-col items-center mt-8 px-4 py-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        {/* Заголовок с username */}
        <div className="w-full text-center mb-6">
          <p className="text-xl font-bold text-black">{profile.userName}</p>
        </div>

        {/* Раздел с аватаркой и именем */}
        <div className="flex flex-col sm:flex-row items-center w-full mb-6">
          <div className="flex flex-col items-center w-1/3">
            <img
              src={`https://localhost:7268${profile.avatar}`}
              alt="avatar"
              className="w-40 h-40 rounded-lg"
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Изменить аватарку
            </button>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl font-semibold">
              {profile.name}, {profile.age}
            </p>
            <p className="text-gray-500">
              {profile.gender === "male" ? "Мужской" : "Женский"}
            </p>
          </div>
        </div>

        {/* Блок с городом, телефоном, Telegram и о себе */}
        <div className="flex flex-col sm:flex-row justify-between w-full mb-6">
          <div className="flex-1 mb-4 sm:mb-0">
            <p className="font-medium text-gray-600">Город:</p>
            <p>{profile.city}</p>
          </div>
          <div className="flex-1 mb-4 sm:mb-0">
            <p className="font-medium text-gray-600">Телефон:</p>
            <p>{profile.phoneNumber || "Не указан"}</p>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-600">Telegram:</p>
            <p>{profile.telegramUserName || "Не указан"}</p>
          </div>
        </div>

        {/* О себе */}
        <div className="w-full mb-6">
          <p className="font-medium text-gray-600">О себе:</p>
          <p>{profile.bio || "Не указано"}</p>
        </div>

        {/* Интересы */}
        <div className="w-full mb-6">
          <p className="font-medium text-gray-600 mb-4">Интересы:</p>
          <div className="grid grid-cols-2 gap-4">
            {profile.interests.map((id) => {
              const interest = interestsList[id - 1]; // Индекс из API
              return (
                <InterestCard
                  key={id}
                  label={interest.label}
                  icon={interest.icon as string}
                  isSelected={true} // Предположим, что интересы всегда выбраны
                  onClick={() => {}}
                />
              );
            })}
          </div>
        </div>

        {/* Кнопка обновления профиля */}
        <Button className={"mt-2 w-full flex justify-center"}>
          Обновить профиль
        </Button>
      </div>
    </div>
  );
};
