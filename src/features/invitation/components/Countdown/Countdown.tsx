import type { InvitationData } from '../../types/invitation.types'
import Stagger from '../../../../components/animation/Stagger'
import { useCountdown } from '../../hooks/useCountdown'
import styles from './Countdown.module.css'

interface CountdownProps {
  data: Pick<InvitationData, 'weddingDate'>
}

/** Zero-pad a number to at least 2 digits */
function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/**
 * Countdown
 *
 * COUNTING THE DAYS section.
 * Visual reference: 6.png — full-bleed opening.png background,
 * dark cinematic overlay, live four-unit countdown, Remind Me button.
 *
 * Countdown logic is handled by useCountdown.
 * Wedding date is consumed from invitation.data.ts (no hardcoding).
 */
export default function Countdown({ data }: CountdownProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(
    data.weddingDate
  )

  const handleRemind = () => {
    // Remind Me — visual affordance. Future: hook into push notifications
    // or calendar export. For now, a friendly alert.
    alert('We will remind you closer to the wedding day!')
  }

  return (
    <section
      className={styles.countdown}
      aria-label="Wedding Countdown"
    >
      {/* ── Background photograph ──────────────── */}
      <img
        src="/assets/images/hero/opening.png"
        alt=""
        aria-hidden="true"
        className={styles.bg}
      />

      {/* ── Dark overlay ───────────────────────── */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* ── Foreground content ─────────────────── */}
      <div className={styles.content}>

        <h2 className={styles.heading}>Counting the Days</h2>

        {isComplete ? (
          /* Wedding day has arrived */
          <p className={styles.completeMessage}>It&apos;s Our Wedding Day!</p>
        ) : (
          /* Live countdown */
          <div
            className={styles.timerRow}
            aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
            aria-live="off"
          >
            <Stagger step={70} variant="fade-up">
            {/* Days */}
            <div className={styles.unit}>
              <span className={styles.number} aria-hidden="true">{days}</span>
              <span className={styles.unitLabel}>Days</span>
            </div>

            <span className={styles.colon} aria-hidden="true">:</span>

            {/* Hours */}
            <div className={styles.unit}>
              <span className={styles.number} aria-hidden="true">{pad(hours)}</span>
              <span className={styles.unitLabel}>Hours</span>
            </div>

            <span className={styles.colon} aria-hidden="true">:</span>

            {/* Minutes */}
            <div className={styles.unit}>
              <span className={styles.number} aria-hidden="true">{pad(minutes)}</span>
              <span className={styles.unitLabel}>Minutes</span>
            </div>

            <span className={styles.colon} aria-hidden="true">:</span>

            {/* Seconds */}
            <div className={styles.unit}>
              <span className={styles.number} aria-hidden="true">{pad(seconds)}</span>
              <span className={styles.unitLabel}>Seconds</span>
            </div>
            </Stagger>
          </div>
        )}

        {/* ── Remind Me button ─────────────────── */}
        {!isComplete && (
          <button
            type="button"
            className={styles.remindButton}
            onClick={handleRemind}
            aria-label="Set a reminder for the wedding day"
          >
            Remind Me
          </button>
        )}

      </div>
    </section>
  )
}
