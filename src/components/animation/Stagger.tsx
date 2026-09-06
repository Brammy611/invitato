import { Children, type ReactNode } from 'react'
import Reveal, { type RevealVariant } from './Reveal'

interface StaggerProps {
  children: ReactNode
  step?: number
  variant?: RevealVariant
  className?: string
}

export default function Stagger({
  children,
  step = 90,
  variant = 'fade-up',
  className,
}: StaggerProps) {
  return (
    <>
      {Children.map(children, (child, index) => (
        <Reveal
          key={index}
          variant={variant}
          delay={index * step}
          className={className}
        >
          {child}
        </Reveal>
      ))}
    </>
  )
}