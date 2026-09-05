import type { InvitationData } from '../../types/invitation.types'
import styles from './Location.module.css'

interface LocationProps {
  data: Pick<InvitationData, 'location'>
}

/**
 * Location
 *
 * WHERE TO FIND US section.
 * Visual reference: 8.png — warm ivory background, top botanical decorations,
 * centered heading + intro, map preview, and address with external link button.
 */
export default function Location({ data }: LocationProps) {
  const { location } = data

  return (
    <section className={styles.location} aria-labelledby="location-heading">

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
        <h2 id="location-heading" className={styles.heading}>
          Where to Find Us
        </h2>
        <hr className={styles.headingRule} aria-hidden="true" />
      </div>

      {/* ── Introduction ───────────────────────── */}
      {location.introduction && (
        <p className={styles.intro}>{location.introduction}</p>
      )}

      {/* ── Map Preview ────────────────────────── */}
      <div className={styles.mapWrapper}>
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapLink}
          aria-label={`Open map for ${location.venueName}`}
        >
          {location.mapImage ? (
            <img
              src={location.mapImage}
              alt={`Map showing ${location.venueName}`}
              className={styles.mapImage}
            />
          ) : (
            <div className={styles.mapPlaceholder} aria-hidden="true">
              <div className={styles.mapGrid} />
              
              {/* Center Map Marker */}
              <svg
                width="36"
                height="48"
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.markerPin}
              >
                <path
                  d="M12 0C5.372 0 0 5.373 0 12c0 8.5 12 20 12 20s12-11.5 12-20c0-6.627-5.373-12-12-12z"
                  className={styles.markerPinBg}
                />
                <circle cx="12" cy="12" r="5" className={styles.markerPinIcon} />
              </svg>
            </div>
          )}

          {/* "Open in Maps" Overlay Pill */}
          <div className={styles.openInMaps} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.openInMapsIcon}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Open in Maps
          </div>
        </a>
      </div>

      {/* ── Address ────────────────────────────── */}
      <div className={styles.addressBlock}>
        <p className={styles.venueName}>{location.venueName}</p>
        <p className={styles.addressText}>
          {location.address}
          <br />
          {location.city}
        </p>
      </div>

      {/* ── View on Google Maps Button ───────── */}
      <div className={styles.mapsButtonWrapper}>
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapsButton}
        >
          View on Google Maps
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.mapsButtonIcon}
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <path d="M14 8h3v3" />
            <path d="M17 8l-5 5" />
          </svg>
        </a>
      </div>

    </section>
  )
}
