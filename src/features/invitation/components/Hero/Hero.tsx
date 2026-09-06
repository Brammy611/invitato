import type { InvitationData } from '../../types/invitation.types'
import styles from './Hero.module.css'

interface HeroProps {
  data: Pick<InvitationData, 'couple' | 'weddingDate'>
}

export default function Hero({ data }: HeroProps) {
  const { couple } = data
  const groomDisplay = couple.groom.displayName.toUpperCase()
  const brideDisplay = couple.bride.displayName.toUpperCase()

  return (
    <section className={styles.hero} aria-label="Wedding invitation hero">

      {/* ── Upper band: floral corner + guest greeting ───── */}
      <div className={styles.upperBand}>
        {/* Floral corner art (corner.png — lily line illustration) */}
        <img
            src="/assets/images/icons/corner.png"
            alt=""
            className={styles.floralCorner}
            aria-hidden="true"
          />

        {/* Guest greeting — "Dear Mr/Mrs/Ms. / Invitato" */}
        <div className={styles.greeting}>
          <p className={styles.greetingLabel}>Dear Mr/Mrs/Ms.</p>
          <p className={styles.greetingName}>Invitato</p>
        </div>
      </div>

      {/* ── Couple names ─────────────────────────────────── */}
      <div className={styles.namesBlock}>
        <p className={styles.youreInvited}>You&apos;re Invited</p>

        <h1 className={styles.coupleNames}>
          <span className={styles.nameSerif}>{groomDisplay}</span>
          <span className={styles.nameScript}> and </span>
          <span className={styles.nameSerif}>{brideDisplay}</span>
        </h1>

        {/* Couple quote */}
        {couple.quote && (
          <p className={styles.quote}>{couple.quote}</p>
        )}
      </div>

      {/* ── Polaroid-style photo card ─────────────────────── */}
      <div className={styles.photoArea}>
        <div className={styles.cardStack}>
          {/* Back card — creates stacked depth */}
          <div className={styles.cardBack} aria-hidden="true" />

          {/* Front card — polaroid frame */}
          <div className={styles.card}>
            <img
              src="/assets/images/hero/1.png"
              alt={`${couple.groom.displayName} and ${couple.bride.displayName}`}
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>

    </section>
  )
}
