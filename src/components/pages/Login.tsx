import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input } from "../ui/inputs/Input";
import { Button } from "../ui/buttons/Button";

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        "space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl"
      }
    >
      <h2 className={"text-3xl font-bold text-black text-center"}>Log In</h2>

      {/* Поле Email */}
      <Controller
        name="email"
        control={control}
        rules={{ required: "Email is required" }}
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
