import { useForm } from 'react-hook-form'
import { Button } from '../ui/buttons/Button.tsx'
import { Input } from '../ui/inputs/Input.tsx'

export const Login = () => {
	const {register, handleSubmit, formState: {errors}} = useForm()
	
	const onSubmit = (data: any) => {
			console.log(data);
	}
	
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={'space-y-6 w-96'}>
			<h2 className={'text-3xl font-bold text-black text-center'}>Log In</h2>
			
			<Input
				label={'Email'}
				type={'email'}
				placeholder={'Введите email'}
				{...register('email', {required: 'Email is required'})}
				error={errors.email?.message}
			
			/>
			<Input
				label={'Password'}
				type={'password'}
				placeholder={'Введите пароль'}
				{...register('password', { required: 'Password is required'})}
				error={errors.password?.message}
			/>
			
			<Button className={'mt-2 w-full flex justify-center'} type={'submit'}>Log In</Button>
			
			
		</form>
	)
}