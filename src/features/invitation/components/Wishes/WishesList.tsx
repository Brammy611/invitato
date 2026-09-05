import type { WishResult } from '../../services/wishes.service'
import styles from './Wishes.module.css'

interface WishesListProps {
  wishes: WishResult[]
  isLoading: boolean
  error?: string
}

/** Format ISO datetime to a readable date string, e.g. "5 Sep 2026" */
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

/**
 * WishesList
 *
 * Displays a list of submitted wedding wishes.
 * Handles loading, empty, and error states gracefully.
 * Renders user content as plain text (no dangerouslySetInnerHTML).
 */
export default function WishesList({ wishes, isLoading, error }: WishesListProps) {

  if (isLoading) {
    return (
      <p className={styles.loadingState} aria-live="polite">
        Loading wishes…
      </p>
    )
  }

  if (error) {
    return (
      <p className={styles.emptyState} role="alert">
        {error}
      </p>
    )
  }

  if (wishes.length === 0) {
    return (
      <p className={styles.emptyState}>
        Be the first to leave a wish.
      </p>
    )
  }

  return (
    <section aria-label="Submitted wishes">
      <h3 className={styles.listHeading}>
        {wishes.length} {wishes.length === 1 ? 'Wish' : 'Wishes'}
      </h3>
      <ul className={styles.wishList} role="list">
        {wishes.map((wish) => (
          <li key={wish.id} className={styles.wishCard}>
            <p className={styles.wishName}>
              {wish.name}
            </p>
            <p className={styles.wishMessage}>
              {wish.message}
            </p>
            {wish.createdAt && (
              <time
                dateTime={wish.createdAt}
                style={{
                  display: 'block',
                  marginTop: '8px',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {formatDate(wish.createdAt)}
              </time>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
