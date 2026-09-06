import type { SelectHTMLAttributes } from 'react'
import styles from './FormControls.module.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export default function Select({ error = false, className = '', ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={[styles.control, styles.select, error ? styles.error : '', className]
        .filter(Boolean)
        .join(' ')}
    />
  )
}