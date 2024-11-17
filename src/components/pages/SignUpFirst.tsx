import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../../stores/useRegistrationStore";
import { Button } from "../ui/buttons/Button";
import { Input } from "../ui/inputs/Input";

interface ISignUpFirstProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpFirst = () => {
  const { setData } = useRegistrationStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignUpFirstProps>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (formData: ISignUpFirstProps) => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Пароли не совпадают");
      return;
    }
    setErrorMessage(null);
    setData({ email: formData.email, password: formData.password });
    navigate("/signup-second");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-black text-center">Регистрация</h2>

      {errorMessage && (
        <p className="text-red text-base text-center">{errorMessage}</p>
      )}

      <Controller
        name="email"
        control={control}
        rules={{ required: "Введите email", pattern: /^\S+@\S+\.\S+$/ }}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            placeholder="Введите email"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Введите пароль",
          minLength: {
            value: 6,
            message: "Пароль должен содержать минимум 6 символов",
          },
        }}
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

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: "Введите пароль еще раз",
          validate: (value) =>
            value === watch("password") || "Пароли не совпадают",
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Повторите пароль"
            type="password"
            placeholder="Повторите пароль"
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <Button type="submit" className="mt-4 w-full">
        Continue
      </Button>
    </form>
  );
};
