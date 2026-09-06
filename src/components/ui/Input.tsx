import type { InputHTMLAttributes } from 'react'
import styles from './FormControls.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
}

export default function Input({ error = false, className = '', ...props }: InputProps) {
	return (
		<input
			{...props}
			className={[styles.control, error ? styles.error : '', className].filter(Boolean).join(' ')}
		/>
	)
}
