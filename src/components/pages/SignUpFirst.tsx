import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRegistrationStore } from '../../stores/useRegistrationStore.ts'
import { Button } from '../ui/buttons/Button.tsx'
import { Input } from '../ui/inputs/Input.tsx'


interface ISignUpFirstProps {
	email: string;
	password: string;
	confirmPassword: string;
}

export const SignUpFirst = () => {
	const {data, setData} = useRegistrationStore()
	const {register, handleSubmit, formState: {errors}} = useForm<ISignUpFirstProps>()
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	
	const onSubmit : SubmitHandler<ISignUpFirstProps> = (formData) => {
		if (formData.password !== formData.confirmPassword){
			setErrorMessage("Пароли не совпадают");
			return;
		}
		setErrorMessage(null);
		setData({email: formData.email, password: formData.password})
		console.log(data);
		navigate('/signup-second')
	}
	
	
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={'space-y-6 w-[500px] mx-auto p-6 bg-white rounded-2xl shadow-xl'}>
			<h2 className={'text-3xl font-bold text-black text-center'}>Регистрация</h2>
			
			{errorMessage && (
				<p className="text-red text-base text-center">{errorMessage}</p>
			)}
			
			<Input
				label={'Email'}
				type={'email'}
				register={register("email", { required: "Введите email" })}
				error={errors.email?.message}/>
			<Input
				label={'Password'}
				type={'password'}
				register={register('password', { required: 'Введите пароль' })}
				error={errors.password?.message}/>
			
			<Input
				label={'Confirm Password'}
				type={'password'}
				register={register('confirmPassword', { required: 'Введите пароль еще раз' })}
				error={errors.confirmPassword?.message}/>
			
			<Button type="submit" className="mt-4 w-full">Continue</Button>
		</form>
	)
	
}