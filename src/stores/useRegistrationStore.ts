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

interface IRegistrationStore {
  data: IRegistrationData;
  setData: (data: {
    password: string;
    phoneNumber?: string;
    gender: string;
    city: string;
    name: string;
    bio?: string;
    avatar: string;
    userName: string;
    interests: number[];
    birthDate: string;
    telegramUserName?: string;
  }) => void;
  reset: () => void;
}

export const useRegistrationStore = create<IRegistrationStore>((set) => ({
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
  setData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  reset: () =>
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
    }),
}));
