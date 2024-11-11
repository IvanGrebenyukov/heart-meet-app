import clsx from 'clsx'
import React from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
}

export const Button = ({children, className, ...rest}: ButtonProps) => {
	return (
			<button {...rest} className={clsx(
				'px-6 py-3 rounded-lg text-white font-semibold',
				'bg-pink hover:bg-red transition-colors', className)}>
				{children}
			</button>
	)
}