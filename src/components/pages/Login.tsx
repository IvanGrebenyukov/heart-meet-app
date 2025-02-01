import { data } from "autoprefixer";
import axios from "axios";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { Input } from "../ui/inputs/Input";
import { Button } from "../ui/buttons/Button";

interface LoginForm {
  userName: string;
  password: string;
}

export const Login = () => {
  const { setData } = useRegistrationStore();
  const userData = useRegistrationStore((state) => state.data);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginForm> = async (formData: LoginForm) => {
    try {
      console.log(formData);

      // Отправляем данные на сервер
      const response = await axios.post(
        "https://localhost:7268/api/Auth/login",
        formData,
      );

      const responseData = response.data;

      // Обработка данных в зависимости от роли и наличия профиля
      if (responseData.role === "Admin") {
        // Если роль Admin, переходим на страницу AdminPage
        navigate("/admin-page");
      } else if (
        responseData.role === "User" &&
        responseData.profile === null
      ) {
        // Если роль User и профиль отсутствует, переходим на страницу заполнения профиля
        setData({
          userName: formData.userName.split("@")[0],
          password: formData.password,
        });
        navigate("/signup-second");
      } else if (responseData.role === "User" && responseData.profile) {
        // Если роль User и профиль заполнен, сохраняем данные профиля и переходим на страницу профиля
        const profile = responseData.profile;

        setData({
          userName: profile.userName,
          password: formData.password,
          avatar: profile.avatar,
          name: profile.name,
          gender: profile.gender,
          birthDate: profile.birthDate,
          city: profile.city,
          phoneNumber: profile.phoneNumber,
          telegramUserName: profile.telegramUserName,
          bio: profile.bio,
          interests: profile.interests,
        });

        navigate("/profile");
      } else {
        throw new Error("Неизвестный формат ответа.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Ошибка входа. Проверьте логин или пароль.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        "space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl"
      }
    >
      <h2 className={"text-3xl font-bold text-black text-center"}>Вход</h2>

      {errorMessage && (
        <p className="text-red text-base text-center">{errorMessage}</p>
      )}

      {/* Поле Email */}
      <Controller
        name="userName"
        control={control}
        rules={{ required: "Введите Email" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Email или UserName"
            placeholder="Введите email или UserName"
            error={errors.userName?.message}
          />
        )}
      />

      {/* Поле Password */}
      <Controller
        name="password"
        control={control}
        rules={{ required: "Введите пароль" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            error={errors.password?.message}
          />
        )}
      />

      {/* Кнопка отправки */}
      <Button className={"mt-2 w-full flex justify-center"} type="submit">
        Log In
      </Button>
    </form>
  );
};
