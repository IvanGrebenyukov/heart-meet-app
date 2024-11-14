import { create } from 'zustand'


interface IRegistrationData {
	email: string;
	password: string
	firstName: string
	lastName: string
	gender: string
	birthDate: string
	city: string
	telegramLink?: string
	bio?: string
	interests?: string[]
}

interface IRegistrationStore {
	data: IRegistrationData
	setData: (data: Partial<IRegistrationData>) => void
	reset: () => void
}

export const useRegistrationStore = create<IRegistrationStore>((set) => ({
	data: {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		gender: '',
		birthDate: '',
		city: '',
		telegramLink: '',
		bio: '',
		interests: [],
	},
	setData: (newData) => set((state) => ({data: {...state.data, ...newData}})),
	reset: () => set({
		data: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			gender: '',
			birthDate: '',
			city: '',
			telegramLink: '',
			bio: '',
			interests: [],
		},
	}),
}))