import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/buttons/Button.tsx";
import { Input } from "../ui/inputs/Input.tsx";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl"}>
      <h2 className={"text-3xl font-bold text-black text-center"}>Log In</h2>

      <Input
        label={"Email"}
        type={"email"}
        placeholder={"Введите email"}
        register={register("Email", { required: "Email required" })}
        error={errors.email?.message}
      />
      <Input
        label={"Password"}
        type={"password"}
        placeholder={"Введите пароль"}
        register={register("password", { required: "password required" })}
        error={errors.password?.message}
      />

      <Button className={"mt-2 w-full flex justify-center"} type={"submit"}>
        Log In
      </Button>
    </form>
  );
};
