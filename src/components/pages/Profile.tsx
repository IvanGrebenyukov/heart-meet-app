import axios from "axios";
import { useEffect, useState } from "react";
import { interestsList } from "../../constants/interestsList.ts";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { Button } from "../ui/buttons/Button.tsx";
import { Input } from "../ui/inputs/Input.tsx";
import { TextArea } from "../ui/inputs/TextArea.tsx";
import { HeaderMenu } from "../ui/menu/HeaderMenu.tsx";
import { AvatarUpload } from "../ui/selects/AvatarUpload.tsx";
import { InterestCard } from "../ui/selects/InterestCard.tsx";
import "../../styles/formStyles.css";

export const Profile = () => {
  const { setData } = useRegistrationStore();
  const userData = useRegistrationStore((state) => state.data);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    city: "",
    phoneNumber: "",
    telegramUserName: "",
    bio: "",
    interests: [],
  });
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
        setFormData({
          city: response.data.city || "",
          phoneNumber: response.data.phoneNumber || "",
          telegramUserName: response.data.telegramUserName || "",
          bio: response.data.bio || "",
          interests: response.data.interests || [],
        });
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    };

    fetchProfile();
  }, []);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (id) => {
    setFormData((prev) => {
      const isSelected = prev.interests.includes(id);
      const updatedInterests = isSelected
        ? prev.interests.filter((interestId) => interestId !== id)
        : [...prev.interests, id];
      return { ...prev, interests: updatedInterests };
    });
  };

  const saveChanges = async () => {
    try {
      await axios.put(
        `https://localhost:7268/api/Profile/${userData.userName}`,
        formData,
      );

      setData((prev) => ({ ...prev, phoneNumber: formData.phoneNumber }));

      setIsEditing(false);
      const updatedProfile = { ...profile, ...formData };
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
    }
  };

  const handleAvatarUpload = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("Avatar", file);
    console.log(formData + "ava");
    console.log(userData.userName);

    try {
      const response = await axios.post(
        `https://localhost:7268/api/Auth/upload-avatar?userName=${userData.userName}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      // API должен вернуть путь к аватарке
      const avatarPath = response.data.avatar;
      setData({ avatar: avatarPath }); // Сохраняем путь аватара в глобальном хранилище
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
    }
  };

  useEffect(() => {
    if (avatar) {
      handleAvatarUpload(avatar);
    }
  }, [avatar]);

  if (!profile)
    return (
      <div>
        <HeaderMenu />
        Загрузка...
      </div>
    );

  return (
    <div className={"flex flex-col absolute top-0 w-full"}>
      <HeaderMenu />
      <div className="flex flex-col w-full bg-lightPink ">
        {/* Верхнее меню */}
        <div
          className={
            "mx-96 flex flex-col items-center bg-white p-10 rounded-xl mt-20"
          }
        >
          {/* Контент профиля */}

          {/* Заголовок с username */}
          <div className="w-full text-center mb-6">
            <p className="text-xl font-bold text-black">{profile.userName}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center w-full mb-6">
            {/* <div className="flex flex-col items-center w-1/3"> */}
            {/*   <img */}
            {/*     src={`https://localhost:7268${profile.avatar}`} */}
            {/*     alt="avatar" */}
            {/*     className="w-40 h-40 rounded-lg" */}
            {/*   /> */}
            {/*   <Button className="mt-2  text-white rounded-md"> */}
            {/*     Изменить аватарку */}
            {/*   </Button> */}
            {/* </div> */}
            <AvatarUpload
              avatar={
                profile.avatar
                  ? `https://localhost:7268${profile.avatar}`
                  : null
              }
              onAvatarChange={setAvatar}
            />
            <div className="flex flex-col sm:items-start">
              <p className="text-xl font-semibold">
                {profile.name}, {profile.age}
              </p>
              <p className="text-gray-500">
                {profile.gender === "male" ? "Мужской" : "Женский"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between w-full mb-6">
            {isEditing ? (
              <>
                <Input
                  label="Город"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <Input
                  label="Телефон"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                <Input
                  label="Telegram"
                  name="telegramUserName"
                  value={formData.telegramUserName}
                  onChange={handleInputChange}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          <div className="w-full mb-6">
            {isEditing ? (
              <TextArea
                label="О себе"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <p className="font-medium text-gray-600">О себе:</p>
                <p>{profile.bio || "Не указано"}</p>
              </>
            )}
          </div>

          <div className={"w-full flex-row justify-center"}>
            {isEditing ? (
              <>
                <h1 className="font-semibold text-black text-center">
                  Интересы
                </h1>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {interestsList.map((interest, index) => (
                    <InterestCard
                      key={index}
                      label={interest.label}
                      icon={interest.icon as string}
                      isSelected={formData.interests.includes(index + 1)}
                      onClick={() => toggleInterest(index + 1)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 className="font-semibold text-black text-center">
                  Интересы
                </h1>
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
              </>
            )}
          </div>

          <Button
            className={"mt-2 w-full flex justify-center mt-10"}
            onClick={isEditing ? saveChanges : toggleEdit}
          >
            {isEditing ? "Сохранить изменения" : "Обновить профиль"}
          </Button>
        </div>
      </div>
    </div>
  );
};
