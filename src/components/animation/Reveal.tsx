import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './Reveal.module.css'

export type RevealVariant = 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale'

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export default function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration,
  className = '',
  once = true,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        if (once) observer.unobserve(element)
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once])

  const style = {
    '--reveal-delay': `${delay}ms`,
    ...(duration ? { '--reveal-duration': `${duration}ms` } : {}),
  } as React.CSSProperties

  return (
    <div
      ref={elementRef}
      className={[
        styles.reveal,
        styles[variant],
        isVisible ? styles.visible : '',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </div>
  )
}