import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export const Input = ({children, error, ...props}): IInputProps => {
	return (
		<div className={'flex flex-col space-y-2'}>
			{props.label && <label className={'font-semibold text-black text-base '}>{props.label}</label>}
			<input
				className={clsx(
					'px-4 py-2 border rounded-lg focus:outline-none',
					'border-gray-300 focus:border-pink',
					error ? 'border-red-500' : ''
				)}
				{...props}
			/>
			{error && <span className={'text-red text-sm'}>{error}</span>}
		</div>
	)
}