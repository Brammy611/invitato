import styles from './MobileLayout.module.css'

interface MobileLayoutProps {
  children: React.ReactNode
  /**
   * isScrollLocked — future hook-point for the Opening section.
   * When true, the page body prevents scrolling (overflow:hidden).
   * Set to false (default) until Opening is implemented.
   */
  isScrollLocked?: boolean
}

/**
 * MobileLayout
 *
 * Renders the single-column layout used on screens < 1024px.
 *
 * - No fixed left panel.
 * - Full-width single column, cream background.
 * - Normal vertical document scrolling.
 * - Max content width capped at var(--invite-width) but expands
 *   to 100% on very small screens.
 */
export default function MobileLayout({ children, isScrollLocked = false }: MobileLayoutProps) {
  return (
    <main
      id="invitation-content"
      className={`${styles.wrapper} ${isScrollLocked ? styles.scrollLocked : ''}`}
      aria-label="Wedding invitation"
    >
      {children}
    </main>
  )
}
