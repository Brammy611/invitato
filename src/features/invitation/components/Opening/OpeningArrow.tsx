import styles from './OpeningArrow.module.css'

interface OpeningArrowProps {
  onClick: () => void
  label?: string
}

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
