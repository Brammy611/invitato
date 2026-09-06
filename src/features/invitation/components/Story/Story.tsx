import { useState } from 'react'
import Stagger from '../../../../components/animation/Stagger'
import type { InvitationData } from '../../types/invitation.types'
import type { StoryItem } from '../../types/invitation.types'
import styles from './Story.module.css'

interface StoryProps {
  data: Pick<InvitationData, 'story' | 'couple'>
}

/** How many characters of description to show as the preview */
const PREVIEW_LENGTH = 120

interface TimelineItemProps {
  item: StoryItem
  index: number
}

/** Single expandable timeline entry */
function TimelineEntry({ item, index }: TimelineItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasLongContent = item.description.length > PREVIEW_LENGTH
  const preview = hasLongContent
    ? item.description.slice(0, PREVIEW_LENGTH).trimEnd() + '…'
    : item.description

  const contentId = `story-content-${index}`

  return (
    <div className={styles.timelineItem}>
      {/* ── Left column: circular image marker ─── */}
      <div className={styles.markerCol}>
        <div className={styles.marker}>
          {item.photoUrl ? (
            <img
              src={item.photoUrl}
              alt={item.title ?? `Story milestone ${item.year}`}
              className={styles.markerImage}
            />
          ) : (
            <div className={styles.markerPlaceholder} aria-hidden="true">
              <span className={styles.markerPlaceholderDot} />
            </div>
          )}
        </div>
      </div>

      {/* ── Right column: year + text + toggle ── */}
      <div className={styles.contentCol}>
        <p className={styles.year}>{item.year}</p>
        {item.title && <p className={styles.title}>{item.title}</p>}

        {/* Always-visible preview */}
        <p className={styles.description}>
          {isOpen ? item.description : preview}
        </p>

        {/* Expandable additional content — only when description has been truncated */}
        {hasLongContent && (
          <button
            type="button"
            className={styles.toggleButton}
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Story
 *
 * OUR STORY section — vertical editorial timeline.
 * Visual reference: 5.png
 *
 * Layout:
 *   [leftDivider]          [rightDivider]
 *           OUR STORY
 *              ────
 *    From a chance meeting to a journey…
 *
 *   ○ 2019  Lorem ipsum…  [Read More]
 *   │
 *   ○ 2020  Lorem ipsum…  [Read More]
 *   │
 *   ○ 2022  Lorem ipsum…  [Read More]
 *
 *   Better Together          [corner.png]
 *
 * All content sourced from invitation.data.ts.
 */
export default function Story({ data }: StoryProps) {
  const { story, couple } = data

  return (
    <section className={styles.story} aria-label="Our Story">

      {/* ── Top botanical dividers ──────────────── */}
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

      {/* ── Section heading ─────────────────────── */}
      <div className={styles.headingBlock}>
        <h2 className={styles.heading}>{story.heading}</h2>
        <hr className={styles.headingRule} />
      </div>

      {/* ── Introduction ───────────────────────── */}
      <p className={styles.intro}>{story.intro}</p>

      {/* ── Timeline ───────────────────────────── */}
      <div className={styles.timeline} role="list">
        <Stagger step={90}>
          {story.timeline.map((item, i) => (
            <div key={`${item.year}-${i}`} role="listitem">
              <TimelineEntry item={item} index={i} />
            </div>
          ))}
        </Stagger>
      </div>

      {/* ── Script tagline (bottom-left) ─────────── */}
      {couple.tagline && (
        <p className={styles.scriptTagline} aria-hidden="true">
          {couple.tagline}
        </p>
      )}

      {/* ── Corner botanical (bottom-right) ─────── */}
      <img
        src="/assets/images/icons/corner.png"
        alt=""
        aria-hidden="true"
        className={styles.bottomDecoration}
      />

    </section>
  )
}
