import type { InvitationData } from '../../types/invitation.types'
import SectionHeader from '../../../../components/common/SectionHeader'
import RSVPForm from './RSVPForm'
import styles from './RSVP.module.css'

interface RSVPProps {
  data: Pick<InvitationData, 'rsvp'>
}

export default function RSVP({ data }: RSVPProps) {
  const { rsvp } = data

  return (
    <section className={styles.rsvp} aria-labelledby="rsvp-heading">

      <SectionHeader title={rsvp.heading ?? 'RSVP'} headingId="rsvp-heading" />

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
