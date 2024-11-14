import { data } from 'autoprefixer'
import { useState } from 'react'
import { useRegistrationStore } from '../../stores/useRegistrationStore.ts'
import { GenderSelect } from '../ui/selects/GenderSelect.tsx'


interface ISignUpSecondProps {
	firstName: string;
	lastName: string;
	city: string;
	birthDate: string;
	telegramLink?: string;
	bio?: string;
}

export const SignUpSecond = () => {
	const { data, setData } = useRegistrationStore()
	const [selectedGender, setSelectedGender] = useState(data.gender)
	
	
	return (
		<form className={'space-y-6 w-96'}>
			<GenderSelect selectedGender={selectedGender} onSelect={setSelectedGender}/>
		</form>
	)
}