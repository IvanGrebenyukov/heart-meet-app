import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { interestsList } from "../../constants/interestsList.ts";
import { AvatarUpload } from "../ui/selects/AvatarUpload.tsx";
import { InterestCard } from "../ui/selects/InterestCard.tsx";

export const FriendProfile = () => {
  const { userName } = useParams<{ userName: string }>(); // Имя пользователя из URL
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  // Загрузка профиля пользователя
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7268/api/Match/profile/${userName}`,
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userName]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-xl text-gray-500">Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col absolute top-0 w-full">
      <div className="flex flex-row justify-between bg-white p-4 shadow-md">
        <button
          onClick={() => navigate("/matches")}
          className="text-blue-500 font-semibold"
        >
          Назад
        </button>
        <p className="text-xl font-bold">{profile.userName}</p>
      </div>
      <div
        className={
          "mx-96 flex flex-col items-center bg-white p-10 rounded-xl mt-5"
        }
      >
        <div className="flex flex-col sm:flex-row items-center w-full mb-6">
          <img
            src={`https://localhost:7268${profile.avatar}`}
            alt="avatar"
            className="w-40 h-40 rounded-lg mb-4"
          />
          <div className="flex flex-col sm:items-start">
            <p className="text-xl font-semibold ml-5">
              {profile.name}, {profile.age}
            </p>
            <p className="text-gray-500 ml-5">
              {profile.gender === "male" ? "Мужской" : "Женский"}
            </p>
          </div>
        </div>
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
        <div className="w-full mb-6">
          <p className="font-medium text-gray-600">О себе:</p>
          <p>{profile.bio || "Не указано"}</p>
        </div>
        <div className={"w-full flex-row justify-center"}>
          <h1 className="font-semibold text-black text-center">Интересы</h1>
          <div className="grid grid-cols-3 gap-4 mt-2 ">
            {profile.interests.map((id) => {
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
    </div>
  );
};
