import { create } from "zustand";

interface IRegistrationData {
  userName: string;
  password: string;
  avatar: string;
  name: string;
  gender: string;
  birthDate: string;
  city: string;
  phoneNumber?: string;
  telegramUserName?: string;
  bio?: string;
  interests?: string[];
}

export const useRegistrationStore = create<IRegistrationData>((set) => ({
  data: JSON.parse(localStorage.getItem("userData") || "{}") || {
    userName: "",
    password: "",
    avatar: "",
    name: "",
    gender: "",
    birthDate: "",
    city: "",
    phoneNumber: "",
    telegramUserName: "",
    bio: "",
    interests: [],
  },
  setData: (newData) =>
    set((state) => {
      const updatedData = { ...state.data, ...newData };
      localStorage.setItem("userData", JSON.stringify(updatedData)); // Сохранение в localStorage
      return { data: updatedData };
    }),
  reset: () => {
    localStorage.removeItem("userData"); // Очистка localStorage
    set({
      data: {
        userName: "",
        password: "",
        avatar: "",
        name: "",
        gender: "",
        birthDate: "",
        city: "",
        phoneNumber: "",
        telegramUserName: "",
        bio: "",
        interests: [],
      },
    });
  },
}));
