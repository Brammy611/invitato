import { useState, useEffect } from 'react'
import type { InvitationData } from '../../types/invitation.types'
import { fetchWishes } from '../../services/wishes.service'
import type { WishResult } from '../../services/wishes.service'
import WishesForm from './WishesForm'
import WishesList from './WishesList'
import styles from './Wishes.module.css'

interface WishesProps {
  data: Pick<InvitationData, 'wishes'>
}

/**
 * Wishes
 *
 * Section shell — heading, botanical decorations, intro,
 * form (WishesForm), and wishes list (WishesList).
 *
 * State management:
 * - wishes: the full list fetched from service
 * - isLoading: initial fetch in progress
 * - listError: fetch error message
 *
 * On form submit success, prepends the new wish to the top
 * of the list without a page refresh.
 */
export default function Wishes({ data }: WishesProps) {
  const { wishes: section } = data

  const [wishes, setWishes] = useState<WishResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [listError, setListError] = useState<string>('')

  // Initial fetch of all wishes
  useEffect(() => {
    let cancelled = false

    async function loadWishes() {
      setIsLoading(true)
      setListError('')
      const result = await fetchWishes()
      if (cancelled) return
      if (result.success && result.wishes) {
        setWishes(result.wishes)
      } else {
        setListError(result.error ?? 'Could not load wishes.')
      }
      setIsLoading(false)
    }

    loadWishes()

    return () => {
      cancelled = true
    }
  }, [])

  /** Prepend newly submitted wish to the top of the list */
  function handleWishAdded(wish: WishResult) {
    setWishes((prev) => [wish, ...prev])
  }

  return (
    <section className={styles.wishes} aria-labelledby="wishes-heading">

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
        <h2 id="wishes-heading" className={styles.heading}>
          {section?.heading ?? 'KIND WORDS'}
        </h2>
        <hr className={styles.headingRule} aria-hidden="true" />
      </div>

      {/* ── Introduction ───────────────────────── */}
      {section?.description && (
        <p className={styles.intro}>{section.description}</p>
      )}

      {/* ── Form Card ──────────────────────────── */}
      <div className={styles.formCard}>
        <WishesForm onWishAdded={handleWishAdded} />
      </div>

      {/* ── Wishes List ────────────────────────── */}
      <div className={styles.listSection}>
        <WishesList
          wishes={wishes}
          isLoading={isLoading}
          error={listError}
        />
      </div>

    </section>
  )
}
