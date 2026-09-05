import type { InvitationData } from '../../types/invitation.types'
import OpeningArrow from './OpeningArrow'
import styles from './Opening.module.css'

interface OpeningProps {
  data: Pick<InvitationData, 'couple' | 'opening'>
  isExiting: boolean
  onOpen: () => void
}

export default function Opening({ data, isExiting, onOpen }: OpeningProps) {
  const { couple, opening } = data
  const groomName = couple.groom.displayName.toUpperCase()
  const brideName = couple.bride.displayName.toUpperCase()
  const hashtag = couple.hashtag ?? '#WeAreGettingMarried'

  return (
    <section
      className={`${styles.opening} ${isExiting ? styles.exiting : ''}`}
      aria-label="Wedding invitation opening"
    >
      {/* ── Background photo ──────────────────────────────── */}
      <div className={styles.imageWrapper}>
        <img
          src="/assets/images/hero/opening.png"
          alt={`${couple.groom.displayName} and ${couple.bride.displayName} wedding`}
          className={styles.image}
          draggable={false}
        />
        {/* Very subtle dark vignette at top and bottom for text contrast */}
        <div className={styles.vignette} aria-hidden="true" />
      </div>

      {/* ── Text overlay — top area ───────────────────────── */}
      <div className={styles.textTop}>
        {/* RICKY and FELLYCIA */}
        <h1 className={styles.coupleNames}>
          <span className={styles.nameSerif}>{groomName}</span>
          <span className={styles.nameScript}> and </span>
          <span className={styles.nameSerif}>{brideName}</span>
        </h1>

        {/* #We are getting married */}
        <p className={styles.hashtag}>{hashtag}</p>
      </div>

      {/* ── CTA — bottom area ────────────────────────────── */}
      <div className={styles.cta}>
        <OpeningArrow
          onClick={onOpen}
          label={opening.ctaLabel.toUpperCase()}
        />
      </div>
    </section>
  )
}
