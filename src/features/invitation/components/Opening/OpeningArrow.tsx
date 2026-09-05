import styles from './OpeningArrow.module.css'

interface OpeningArrowProps {
  onClick: () => void
  label?: string
}

/**
 * OpeningArrow
 *
 * Animated downward arrow + "OPEN INVITATION" text.
 * Positioned at the bottom-center of the Opening section.
 *
 * Visual reference: opening.png — minimal thin arrow with label below.
 */
export default function OpeningArrow({
  onClick,
  label = 'OPEN INVITATION',
}: OpeningArrowProps) {
  return (
    <button
      type="button"
      className={styles.wrapper}
      onClick={onClick}
      aria-label="Open the wedding invitation"
    >
      {/* Animated arrow icon */}
      <span className={styles.arrowContainer} aria-hidden="true">
        <img src="/assets/images/icons/arrow.svg" alt="" className={styles.arrowIcon} />
      </span>

      {/* Label */}
      <span className={styles.label}>{label}</span>
    </button>
  )
}
