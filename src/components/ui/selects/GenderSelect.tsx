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
		{value: 'male', label: 'Мужской'},
		{ value: 'female', label: 'Женский'}
	]
	
	return (
		<div className={'flex space-x-4'}>
			<label className="font-semibold text-black mt-2">Пол</label>
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