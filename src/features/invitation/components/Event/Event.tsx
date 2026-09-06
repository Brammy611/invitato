import type { InvitationData } from '../../types/invitation.types'
import Stagger from '../../../../components/animation/Stagger'
import { formatEventDate, formatEventTime } from '../../../../lib/utils'
import SectionHeader from '../../../../components/common/SectionHeader'
import styles from './Event.module.css'

interface EventProps {
  data: Pick<InvitationData, 'events' | 'eventIntro'>
}

export default function Event({ data }: EventProps) {
  const { events, eventIntro } = data

  return (
    <section className={styles.event} aria-labelledby="wedding-day-heading">
      
      <SectionHeader title="The Wedding Day" headingId="wedding-day-heading" />

      {/* ── Introduction ───────────────────────── */}
      {eventIntro && (
        <p className={styles.intro}>{eventIntro}</p>
      )}

      {/* ── Event Cards ────────────────────────── */}
      <div className={styles.cardsContainer}>
        <Stagger step={90}>
          {events.map((event) => (
            <div key={event.id} className={styles.card}>
            
            {/* Icon */}
            {event.icon && (
              <img
                src={`/assets/images/icons/${event.icon}`}
                alt=""
                className={styles.icon}
                aria-hidden="true"
              />
            )}

            {/* Event Title */}
            <h3 className={styles.title}>{event.name}</h3>

            {/* Date & Time */}
            <p className={styles.date}>{formatEventDate(event.datetime)}</p>
            <p className={styles.time}>
              {formatEventTime(event.datetime)} {event.timezone}
            </p>

            {/* Venue & Location */}
            <p className={styles.venue}>{event.venue}</p>
            <p className={styles.address}>
              {event.address}
              <br />
              {event.city}
            </p>

            </div>
          ))}
        </Stagger>
      </div>

    </section>
  )
}
