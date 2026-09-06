import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  title: string
  headingId: string
}

export default function SectionHeader({ title, headingId }: SectionHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <img
        src="/assets/images/icons/leftDivider.png"
        alt=""
        className={styles.dividerLeft}
        aria-hidden="true"
      />
      <div className={styles.headingBlock}>
        <h2 id={headingId} className={styles.heading}>
          {title}
        </h2>
        <hr className={styles.headingRule} aria-hidden="true" />
      </div>
      <img
        src="/assets/images/icons/rightDivider.png"
        alt=""
        className={styles.dividerRight}
        aria-hidden="true"
      />
    </div>
  )
}