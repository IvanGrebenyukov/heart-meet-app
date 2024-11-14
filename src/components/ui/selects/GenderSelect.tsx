import clsx from 'clsx'
import type { FC } from 'react'


interface IGenderSelectProps {
	selectedGender: string;
	onSelect: (gender: string) => void;
}

export const GenderSelect: FC<IGenderSelectProps> = ({
	selectedGender,
	onSelect
}) => {
	
	const options = [
		{value: 'male', label: 'Male'},
		{ value: 'female', label: 'Female'}
	]
	
	return (
		<div className={'flex space-x-4'}>
			{options.map((option) => (
				<button
					key={option.value}
					type={'button'}
					onClick={() => onSelect(option.value)}
					className={clsx(
						'px-4 py-2 rounded-full font-semibold text-sm',
						selectedGender === option.value
							? 'bg-pink text-white'
							: 'bg-gray-200 text-black'
					)}
				>
					{option.label}
				</button>
			))}
		</div>
	)
}