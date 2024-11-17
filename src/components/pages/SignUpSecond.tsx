import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interestsList } from "../../constants/interestsList.ts";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { Button } from "../ui/buttons/Button.tsx";
import { Input } from "../ui/inputs/Input.tsx";
import { TextArea } from "../ui/inputs/TextArea.tsx";
import { GenderSelect } from "../ui/selects/GenderSelect.tsx";
import { InterestCard } from "../ui/selects/InterestCard.tsx";
import "../../styles/formStyles.css";

interface ISignUpSecondProps {
  firstName: string;
  lastName: string;
  city: string;
  birthDate: string;
  telegramLink?: string;
  bio?: string;
}

export const SignUpSecond = () => {
  const { data, setData } = useRegistrationStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpSecondProps>();
  const [selectedGender, setSelectedGender] = useState(data.gender);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const onSubmit: SubmitHandler<ISignUpSecondProps> = (formData) => {
    console.log("Before setData:", data);
    setData({
      ...formData,
      gender: selectedGender,
      interests: selectedInterests,
    });
    console.log("After setData:", data);
    console.log("Final data: ", { ...data, ...formData });
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] custom-scroll"
      style={{ maxHeight: "90vh" }}
    >
      <h2 className={"text-3xl font-bold text-black text-center"}>
        Настройка профиля
      </h2>
      <Input
        label={"Имя"}
        register={register("firstName", { required: "Email required" })}
        error={errors.firstName?.message}
      />
      <Input
        label={"Фамилия"}
        register={register("lastName", { required: "Введите фамилию" })}
        error={errors.lastName?.message}
      />
      <GenderSelect
        selectedGender={selectedGender}
        onSelect={setSelectedGender}
      />
      <Input
        label={"Дата рождения"}
        type={"date"}
        register={register("birthDate", { required: "Выберите дату рождения" })}
        error={errors.birthDate?.message}
      />
      <Input
        label="Город"
        {...register("city", { required: "Введите ваш город" })}
      />
      <Input
        label="Ссылка Telegram"
        {...register("telegramLink")}
        placeholder="Необязательно"
      />
      <TextArea
        label="О себе"
        {...register("bio")}
        placeholder="Расскажите другим о себе"
      />

      <div>
        <label className={"font-semibold text-black"}>Интересы</label>
        <div className={"grid grid-cols-3 gap-4 mt-2"}>
          {interestsList.map((interest) => (
            <InterestCard
              key={interest.label}
              label={interest.label}
              icon={interest.icon as string}
              isSelected={selectedInterests.includes(interest.label)}
              onClick={() => toggleInterest(interest.label)}
            />
          ))}
        </div>
      </div>
      <Button type={"submit"} className="mt-4 w-full">
        Завершить регистрацию
      </Button>
    </form>
  );
};
