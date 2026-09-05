import type { InvitationData } from '../../types/invitation.types'
import { formatEventDate, formatEventTime } from '../../../../lib/utils'
import styles from './Event.module.css'

interface EventProps {
  data: Pick<InvitationData, 'events' | 'eventIntro'>
}

/**
 * Event
 *
 * THE WEDDING DAY section.
 * Visual reference: 7.png — warm ivory background, top botanical decorations,
 * centered heading + intro, and vertically stacked rounded event cards.
 */
export default function Event({ data }: EventProps) {
  const { events, eventIntro } = data

  return (
    <section className={styles.event} aria-labelledby="wedding-day-heading">
      
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
        <h2 id="wedding-day-heading" className={styles.heading}>
          The Wedding Day
        </h2>
        <hr className={styles.headingRule} aria-hidden="true" />
      </div>

      {/* ── Introduction ───────────────────────── */}
      {eventIntro && (
        <p className={styles.intro}>{eventIntro}</p>
      )}

      {/* ── Event Cards ────────────────────────── */}
      <div className={styles.cardsContainer}>
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
      </div>

    </section>
  )
}
