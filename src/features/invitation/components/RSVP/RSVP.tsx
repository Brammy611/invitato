import type { InvitationData } from '../../types/invitation.types'
import RSVPForm from './RSVPForm'
import styles from './RSVP.module.css'

interface RSVPProps {
  data: Pick<InvitationData, 'rsvp'>
}

/**
 * RSVP
 *
 * Section shell — handles layout, heading, botanical decorations,
 * and intro text. Delegates all form logic to RSVPForm.
 *
 * Visual reference: 11.png
 */
export default function RSVP({ data }: RSVPProps) {
  const { rsvp } = data

  return (
    <section className={styles.rsvp} aria-labelledby="rsvp-heading">

      {/* ── Top botanical decorations ──────────── */}
      <div className={styles.topDecoration} aria-hidden="true">
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

      {/* ── Section heading ────────────────────── */}
      <div className={styles.headingBlock}>
        <h2 id="rsvp-heading" className={styles.heading}>
          {rsvp.heading ?? 'RSVP'}
        </h2>
        <hr className={styles.headingRule} aria-hidden="true" />
      </div>

      {/* ── Introduction ───────────────────────── */}
      {rsvp.description && (
        <p className={styles.intro}>{rsvp.description}</p>
      )}

      {/* ── Form Card ──────────────────────────── */}
      <div className={styles.formCard}>
        <RSVPForm />
      </div>

    </section>
  )
}
