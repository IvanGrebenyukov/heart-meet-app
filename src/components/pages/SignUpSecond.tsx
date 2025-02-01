import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interestsList } from "../../constants/interestsList";
import { useRegistrationStore } from "../../stores/useRegistrationStore";
import { Button } from "../ui/buttons/Button";
import { Input } from "../ui/inputs/Input";
import { TextArea } from "../ui/inputs/TextArea";
import { AvatarUpload } from "../ui/selects/AvatarUpload.tsx";
import { GenderSelect } from "../ui/selects/GenderSelect";
import { InterestCard } from "../ui/selects/InterestCard";
import "../../styles/formStyles.css";

interface ISignUpSecondProps {
  name: string;
  city: string;
  birthDate: string;
  phoneNumber: string;
  telegramUserName?: string;
  bio?: string;
}

export const SignUpSecond = () => {
  const { setData } = useRegistrationStore();
  const userData = useRegistrationStore((state) => state.data);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignUpSecondProps>();
  const [selectedGender, setSelectedGender] = useState<string>(
    userData.gender || "",
  );
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [avatar, setAvatar] = useState<File | null>(null);
  const navigate = useNavigate();

  const toggleInterest = (index: number) => {
    setSelectedInterests((prev) =>
      prev.includes(index + 1)
        ? prev.filter((i) => i !== index + 1)
        : [...prev, index + 1],
    );
  };

  const handleAvatarUpload = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("Avatar", file);
    console.log(formData + "  fwfwfw");
    console.log(userData.userName);

    try {
      const response = await axios.post(
        `https://localhost:7268/api/Auth/upload-avatar?userName=${userData.userName}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      // API должен вернуть путь к аватарке
      const avatarPath = response.data.avatar;
      console.log(avatarPath);
      setData({ avatar: avatarPath }); // Сохраняем путь аватара в глобальном хранилище
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
    }
  };

  const onSubmit: SubmitHandler<ISignUpSecondProps> = async (formData) => {
    const profileData = {
      ...formData,
      gender: selectedGender,
      interests: selectedInterests,
      // phoneNumber: formData.phoneNumber.replace("+7", "8"), // Убираем '+' из номера
    };
    console.log(profileData);
    try {
      await axios.post(
        `https://localhost:7268/api/Auth/register-step2?userName=${userData.userName}`,
        {
          name: formData.name,
          birthDate: formData.birthDate,
          city: formData.city,
          gender: selectedGender,
          interests: selectedInterests,
          phoneNumber: "-",
          telegramUserName: formData.telegramUserName,
          bio: formData.bio,
        },
      );

      // Вход после регистрации
      const loginResponse = await axios.post(
        "https://localhost:7268/api/Auth/login",
        {
          userName: userData.userName,
          password: userData.password, // Используем пароль из store
        },
      );
      setData(loginResponse.data);
      // Сохраняем данные пользователя в store
      navigate("/profile"); // Переход на страницу профиля
    } catch (error) {
      console.error("Ошибка завершения регистрации:", error);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]); // Следим за изменением data

  useEffect(() => {
    if (avatar) {
      if (!userData.userName) {
        console.error("Ошибка: userName отсутствует");
        return;
      }

      handleAvatarUpload(avatar);
    }
  }, [avatar, userData.userName]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] custom-scroll"
      style={{ maxHeight: "90vh" }}
    >
      <h2 className="text-3xl font-bold text-black text-center">
        Настройка профиля
      </h2>
      <AvatarUpload
        avatar={
          userData.avatar ? `https://localhost:7268${userData.avatar}` : null
        }
        onAvatarChange={setAvatar}
      />
      <Controller
        name="name"
        control={control}
        rules={{ required: "Введите имя" }}
        render={({ field }) => (
          <Input {...field} label="Имя" error={errors.name?.message} />
        )}
      />
      <GenderSelect
        selectedGender={selectedGender}
        onSelect={setSelectedGender}
      />
      <Controller
        name="birthDate"
        control={control}
        rules={{ required: "Выберите дату рождения" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Дата рождения"
            type="date"
            error={errors.birthDate?.message}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        rules={{ required: "Введите ваш город" }}
        render={({ field }) => (
          <Input {...field} label="Город" error={errors.city?.message} />
        )}
      />
      {/* <Controller */}
      {/*   name="phoneNumber" */}
      {/*   control={control} */}
      {/*   rules={{ */}
      {/*     required: "Введите номер телефона", */}
      {/*     pattern: { */}
      {/*       value: /^\+7\d{10}$/, */}
      {/*       message: "Номер телефона должен быть в формате +7XXXXXXXXXX", */}
      {/*     }, */}
      {/*   }} */}
      {/*   render={({ field }) => ( */}
      {/*     <Input */}
      {/*       {...field} */}
      {/*       label="Номер телефона" */}
      {/*       placeholder="+7XXXXXXXXXX" */}
      {/*       error={errors.phoneNumber?.message} */}
      {/*       onBlur={(e) => { */}
      {/*         const value = e.target.value.trim(); */}
      {/*         if (!value.startsWith("+7")) { */}
      {/*           field.onChange(`+7${value}`); */}
      {/*         } */}
      {/*       }} */}
      {/*     /> */}
      {/*   )} */}
      {/* /> */}
      <Controller
        name="telegramUserName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Ссылка Telegram"
            placeholder="Необязательно"
          />
        )}
      />
      <Controller
        name="bio"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            label="О себе"
            placeholder="Расскажите другим о себе"
          />
        )}
      />
      <div>
        <label className="font-semibold text-black">Интересы</label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {interestsList.map((interest, index) => (
            <InterestCard
              key={index}
              label={interest.label}
              icon={interest.icon as string}
              isSelected={selectedInterests.includes(index + 1)}
              onClick={() => toggleInterest(index)}
            />
          ))}
        </div>
      </div>
      <Button type="submit" className="mt-4 w-full">
        Завершить регистрацию
      </Button>
    </form>
  );
};
