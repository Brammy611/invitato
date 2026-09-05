import styles from './DesktopLayout.module.css'

interface DesktopLayoutProps {
  children: React.ReactNode
  /**
   * isScrollLocked — future hook-point for the Opening section.
   * When true, the right content column prevents scrolling.
   * Set to false (default) until Opening is implemented.
   */
  isScrollLocked?: boolean
}

/**
 * DesktopLayout
 *
 * Renders the split-screen layout used on screens >= 1024px:
 *
 *   ┌─────────────────────┬──────────────────────────┐
 *   │                     │                          │
 *   │   FIXED IMAGE PANEL │   SCROLLABLE CONTENT     │
 *   │   (left ~55%)       │   (right ~45%, 430px max)│
 *   │                     │                          │
 *   └─────────────────────┴──────────────────────────┘
 *
 * - Left panel: position:sticky, full viewport height, image cover.
 * - Right panel: scrollable column, cream background, 430px max-width.
 * - Entire component fills 100dvh; only the right column overflows.
 */
export default function DesktopLayout({ children, isScrollLocked = false }: DesktopLayoutProps) {
  return (
    <div className={styles.wrapper}>
      {/* ── LEFT: Fixed image panel ────────────────────────────── */}
      <aside className={styles.imagePanel} aria-hidden="true">
        <div className={styles.imagePanelInner}>
          <img
            src="/assets/images/hero/fixedImage.png"
            alt="Ricky and Fellycia — pre-wedding photo"
            className={styles.fixedImage}
          />

          {/* Gradient overlay for text legibility */}
          <div className={styles.imageOverlay} />

          {/* Couple name + quote watermark */}
          <div className={styles.imageCaption}>
            <p className={styles.imageCaptionLabel}>The Wedding Of</p>
            <h2 className={styles.imageCaptionName}>
              <span className={styles.serifName}>Ricky</span>
              <span className={styles.scriptAnd}> and </span>
              <span className={styles.serifName}>Fellycia</span>
            </h2>
            <p className={styles.imageCaptionQuote}>
              &ldquo;I was sound asleep, but in my dreams I was wide awake.
              Oh, listen! It&apos;s the sound of my lover knocking, calling!&rdquo;
            </p>
          </div>
        </div>
      </aside>

      {/* ── RIGHT: Scrollable invitation content ───────────────── */}
      <main
        id="invitation-content"
        className={`${styles.contentPanel} ${isScrollLocked ? styles.scrollLocked : ''}`}
        aria-label="Wedding invitation"
      >
        <div className={styles.contentInner}>
          {children}
        </div>
      </main>
    </div>
  )
}
