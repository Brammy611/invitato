import { useState } from 'react'
import type { InvitationData, MediaItem } from '../../types/invitation.types'
import styles from './Memories.module.css'

interface MemoriesProps {
  data: Pick<InvitationData, 'gallery' | 'media'>
}

/**
 * YouTube SVG Icon Component
 * Used inside the YouTube buttons
 */
function YouTubeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.youtubeIcon}
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  )
}

/**
 * Play Icon Component
 * Used in the video preview play button
 */
function PlayIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={styles.playIcon}
      aria-hidden="true"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

/**
 * Reusable Video Subsection Component
 */
function MediaSection({ item }: { item: MediaItem }) {
  return (
    <div className={styles.mediaContainer}>
      
      {/* ── Heading ──────────────────────────── */}
      <div className={styles.headingBlock}>
        <h3 className={styles.heading}>{item.title}</h3>
      </div>

      {/* ── Video Preview ────────────────────── */}
      <div className={styles.videoWrapper}>
        <img
          src={item.thumbnail}
          alt={`Preview of ${item.title} video`}
          className={styles.videoThumbnail}
        />
        
        {/* Play Button - acts as an external link for now or visual affordance */}
        <a
          href={item.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.playButton}
          aria-label={`Play ${item.title} video`}
        >
          <PlayIcon />
        </a>
        
        <span className={styles.videoTimestamp} aria-hidden="true">00:24</span>
      </div>

      {/* ── YouTube Button ───────────────────── */}
      <div className={styles.youtubeButtonWrapper}>
        <a
          href={item.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.youtubeButton}
        >
          <YouTubeIcon />
          Open via Youtube
        </a>
      </div>

    </div>
  )
}


/**
 * Memories / Moments Component
 * 
 * Order of subsections:
 * 1. A PORTRAIT OF US (Gallery)
 * 2. PRE WEDDING (Media)
 * 3. LIVE STREAMING (Media)
 */
export default function Memories({ data }: MemoriesProps) {
  const { gallery, media } = data
  const images = gallery.images

  // Local state for main gallery image
  const [activeImageId, setActiveImageId] = useState(images[0]?.id)

  const activeImage = images.find((img) => img.id === activeImageId) || images[0]
  const thumbnails = images.slice(0, 3) // Safely grab up to 3 thumbnails

  return (
    <section className={styles.memories} aria-labelledby="memories-heading">

      {/* ── 1. A PORTRAIT OF US (Gallery) ────────────────────────── */}
      <div className={styles.galleryContainer}>
        
        {/* Top botanical decorations */}
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

        {/* Heading */}
        <div className={styles.headingBlock}>
          <h2 id="memories-heading" className={styles.heading}>
            {gallery.heading || 'A Portrait of Us'}
          </h2>
          <hr className={styles.headingRule} aria-hidden="true" />
        </div>

        {/* Description */}
        {gallery.description && (
          <p className={styles.description}>{gallery.description}</p>
        )}

        {/* Main Image */}
        {activeImage && (
          <div className={styles.mainImageWrapper}>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className={styles.mainImage}
            />
          </div>
        )}

        {/* Thumbnails */}
        {thumbnails.length > 0 && (
          <div className={styles.thumbnailsRow} role="tablist" aria-label="Gallery thumbnails">
            {thumbnails.map((img) => {
              const isActive = img.id === activeImageId
              return (
                <button
                  key={img.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.thumbnailButton} ${isActive ? styles.active : ''}`}
                  onClick={() => setActiveImageId(img.id)}
                >
                  <img
                    src={img.src}
                    alt={`Thumbnail for ${img.alt}`}
                    className={styles.thumbnailImage}
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── 2. PRE WEDDING (Media) ─────────────────────────────── */}
      {media?.preWedding && (
        <MediaSection item={media.preWedding} />
      )}

      {/* ── 3. LIVE STREAMING (Media) ──────────────────────────── */}
      {media?.liveStreaming && (
        <MediaSection item={media.liveStreaming} />
      )}

    </section>
  )
}
