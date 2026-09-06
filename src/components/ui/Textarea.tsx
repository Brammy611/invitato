import type { TextareaHTMLAttributes } from 'react'
import styles from './FormControls.module.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean
}

export default function Textarea({ error = false, className = '', ...props }: TextareaProps) {
	return (
		<textarea
			{...props}
			className={[styles.control, styles.textarea, error ? styles.error : '', className]
				.filter(Boolean)
				.join(' ')}
		/>
	)
}
