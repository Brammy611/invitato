import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	loading?: boolean
	loadingText?: string
	icon?: ReactNode
	iconPosition?: 'start' | 'end'
}

export default function Button({
	variant = 'primary',
	size = 'md',
	loading = false,
	loadingText,
	icon,
	iconPosition = 'end',
	className = '',
	children,
	disabled,
	type = 'button',
	...props
}: ButtonProps) {
	const content = loading ? (loadingText ?? children) : children
	const classes = [styles.button, styles[variant], styles[size], className]
		.filter(Boolean)
		.join(' ')

	return (
		<button
			{...props}
			type={type}
			className={classes}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
		>
			{!loading && icon && iconPosition === 'start' && icon}
			{content}
			{!loading && icon && iconPosition === 'end' && icon}
		</button>
	)
}
