import { useEffect, useState } from "react";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interestsList } from "../../constants/interestsList";
import { useRegistrationStore } from "../../stores/useRegistrationStore";
import { Button } from "../ui/buttons/Button";
import { Input } from "../ui/inputs/Input";
import { TextArea } from "../ui/inputs/TextArea";
import { GenderSelect } from "../ui/selects/GenderSelect";
import { InterestCard } from "../ui/selects/InterestCard";
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
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignUpSecondProps>();
  const [selectedGender, setSelectedGender] = useState<string>(
    data.gender || "",
  );
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
    // Обновляем данные перед переходом
    setData({
      ...formData,
      gender: selectedGender,
      interests: selectedInterests,
    });

    console.log("Final data:", { ...data, ...formData });

    // Переход на главную страницу после сохранения данных
    // navigate("/");
  };

  useEffect(() => {
    console.log(data);
  }, [data]); // Следим за изменением data

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] custom-scroll"
      style={{ maxHeight: "90vh" }}
    >
      <h2 className="text-3xl font-bold text-black text-center">
        Настройка профиля
      </h2>

      <Controller
        name="firstName"
        control={control}
        rules={{ required: "Введите имя" }}
        render={({ field }) => (
          <Input {...field} label="Имя" error={errors.firstName?.message} />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{ required: "Введите фамилию" }}
        render={({ field }) => (
          <Input {...field} label="Фамилия" error={errors.lastName?.message} />
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

      <Controller
        name="telegramLink"
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

      <Button type="submit" className="mt-4 w-full">
        Завершить регистрацию
      </Button>
    </form>
  );
};
