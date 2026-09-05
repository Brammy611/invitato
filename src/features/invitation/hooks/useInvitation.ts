import { useState, useCallback } from 'react'

/**
 * useInvitation
 *
 * Manages the invitation open/closed state.
 *
 * - isOpen: false  → Opening screen is visible, invitation content is scroll-locked.
 * - isOpen: true   → Opening has been dismissed, invitation content scrolls freely.
 *
 * isExiting: true for a brief window during the exit animation of the Opening,
 * allowing CSS transitions to complete before the Opening unmounts.
 */
export interface UseInvitationReturn {
  /** Whether the invitation has been opened by the user */
  isOpen: boolean
  /** Whether the Opening is mid-exit-animation (true for OPENING_EXIT_MS ms) */
  isExiting: boolean
  /** Call this to trigger the open animation and unlock scroll */
  openInvitation: () => void
}

/** Duration (ms) of the Opening exit animation — must match CSS transition */
export const OPENING_EXIT_MS = 900

export function useInvitation(): UseInvitationReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const openInvitation = useCallback(() => {
    if (isOpen || isExiting) return

    // 1. Start exit animation
    setIsExiting(true)

    // 2. After animation completes, mark as fully open
    setTimeout(() => {
      setIsOpen(true)
      setIsExiting(false)
    }, OPENING_EXIT_MS)
  }, [isOpen, isExiting])

  return { isOpen, isExiting, openInvitation }
}
