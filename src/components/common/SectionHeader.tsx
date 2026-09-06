import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  title: string
  headingId: string
}

export default function SectionHeader({ title, headingId }: SectionHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dividerRow} aria-hidden="true">
        <img
          src="/assets/images/icons/leftDivider.png"
          alt=""
          className={styles.dividerLeft}
        />
        <img
          src="/assets/images/icons/rightDivider.png"
          alt=""
          className={styles.dividerRight}
        />
      </div>
      <div className={styles.headingBlock}>
        <h2 id={headingId} className={styles.heading}>
          {title}
        </h2>
        <hr className={styles.headingRule} aria-hidden="true" />
      </div>
    </div>
  )
}