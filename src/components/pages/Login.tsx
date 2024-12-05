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
      const response = await axios.post(
        "https://localhost:7268/api/Auth/login",
        formData,
      );
      const responseData = response.data;
      const gender = responseData.userName;
      console.log(responseData);

      setData({
        userName: responseData.userName,
        password: formData.password,
        avatar: responseData.avatar,
        name: responseData.name,
        gender: responseData.gender,
        birthDate: responseData.birthDate,
        city: responseData.city,
        phoneNumber: responseData.phoneNumber,
        telegramUserName: responseData.telegramUserName,
        bio: responseData.bio,
        interests: responseData.interests,
      });
      //
      // console.log(responseData.data);

      // console.log(userData);

      console.log(gender);

      if (gender === undefined) {
        setData({
          userName: formData.userName.split("@")[0],
          password: formData.password,
        });
        navigate("/signup-second");
        // Переход на заполнение профиля
      } else {
        navigate("/profile"); // Переход на страницу профиля
      }
    } catch (error) {
      setErrorMessage("Ошибка входа. Проверьте логин или пароль.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        "space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl"
      }
    >
      <h2 className={"text-3xl font-bold text-black text-center"}>Log In</h2>

      {errorMessage && (
        <p className="text-red text-base text-center">{errorMessage}</p>
      )}

      {/* Поле Email */}
      <Controller
        name="userName"
        control={control}
        rules={{ required: "Email is required" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            placeholder="Введите email"
            error={errors.userName?.message}
          />
        )}
      />

      {/* Поле Password */}
      <Controller
        name="password"
        control={control}
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <Input
            {...field}
            label="Password"
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
