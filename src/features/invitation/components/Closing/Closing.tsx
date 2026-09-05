import type { InvitationData } from '../../types/invitation.types'
import styles from './Closing.module.css'

interface ClosingProps {
  data: Pick<InvitationData, 'couple' | 'closing'>
}

/**
 * Closing
 *
 * Final section of the invitation.
 * Full-screen background image, dark overlay, white centered text.
 */
export default function Closing({ data }: ClosingProps) {
  const { couple, closing } = data

  // Extract display names for the final couple signature
  const groomName = couple.groom.displayName
  const brideName = couple.bride.displayName

  return (
    <section className={styles.closing} aria-label="Closing">
      
      {/* ── Layer 1: Background Image ────────────────────── */}
      {closing.backgroundImage && (
        <img
          src={closing.backgroundImage}
          alt=""
          className={styles.backgroundImage}
          aria-hidden="true"
        />
      )}

      {/* ── Layer 2: Dark Overlay ────────────────────────── */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* ── Layer 3: Content ─────────────────────────────── */}
      <div className={styles.content}>
        
        <h2 className={styles.heading}>
          {closing.heading}
        </h2>
        
        <div className={styles.namesBlock}>
          <span className={styles.name}>{groomName}</span>
          <span className={styles.and}>and</span>
          <span className={styles.name}>{brideName}</span>
        </div>

        {closing.hashtag && (
          <p className={styles.hashtag}>
            {closing.hashtag}
          </p>
        )}
        
      </div>

      {/* ── Layer 4: Bottom Decorative Artwork ───────────── */}
      {closing.decorationImage && (
        <img
          src={closing.decorationImage}
          alt=""
          className={styles.bottomDecoration}
          aria-hidden="true"
        />
      )}

    </section>
  )
}
