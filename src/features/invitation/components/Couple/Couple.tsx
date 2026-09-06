import type { InvitationData } from '../../types/invitation.types'
import type { Person } from '../../types/invitation.types'
import styles from './Couple.module.css'

interface CoupleProps {
  data: Pick<InvitationData, 'couple'>
}

/** Renders one person (groom or bride) profile block */
function PersonProfile({ person, photoSrc }: { person: Person; photoSrc: string }) {
  const roleLabel = person.role === 'groom' ? 'The Son of' : 'The Daughter of'

  return (
    <div className={styles.profile}>
      {/* Portrait */}
      <div className={styles.photoWrapper}>
        <img
          src={photoSrc}
          alt={person.fullName}
          className={styles.photo}
        />
      </div>

      {/* Full name with title */}
      <h2 className={styles.name}>{person.fullName}</h2>

      {/* Parent information */}
      <div className={styles.family}>
        <p className={styles.familyLabel}>{roleLabel}</p>
        <p className={styles.familyLabel}>{person.parents.father}</p>
        <span className={styles.familyAmpersand}>&amp;</span>
        <p className={styles.familyLabel}>{person.parents.mother}</p>
      </div>

      {/* Social handle */}
      {person.socialHandle && (
        <a
          href={`https://instagram.com/${person.socialHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialButton}
          aria-label={`Visit ${person.displayName}'s Instagram @${person.socialHandle}`}
        >
          @{person.socialHandle}
        </a>
      )}
    </div>
  )
}

export default function Couple({ data }: CoupleProps) {
  const { couple } = data

  return (
    <section className={styles.couple} aria-label="Groom and Bride">

      {/* ── Section heading ───────────────────────────── */}
      <h2 className={styles.sectionHeading}>The Groom &amp; Bride</h2>

      {/* ── GROOM ─────────────────────────────────────── */}
      <PersonProfile
        person={couple.groom}
        photoSrc="/assets/images/couple/bride.png"
      />

      {/* Small flower divider between groom and bride */}
      <img
        src="/assets/images/icons/middleDivider.png"
        alt=""
        aria-hidden="true"
        className={styles.floralDivider}
      />

      {/* ── BRIDE ─────────────────────────────────────── */}
      <PersonProfile
        person={couple.bride}
        photoSrc="/assets/images/couple/groom.png"
      />

    </section>
  )
}
