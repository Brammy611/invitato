import { useEffect, useState } from 'react'
import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'

interface InvitationLayoutProps {
  children: React.ReactNode
  /**
   * isScrollLocked — controls whether the invitation content
   * column is scrollable. Designed to be wired to the Opening
   * section's open/close state in a future phase.
   * Defaults to false (scroll enabled).
   */
  isScrollLocked?: boolean
}

/** Breakpoint (px) at which the desktop split-screen activates */
const DESKTOP_BREAKPOINT = 1024

export default function InvitationLayout({
  children,
  isScrollLocked = false,
}: InvitationLayoutProps) {
  const [isDesktop, setIsDesktop] = useState<boolean>(
    () => window.innerWidth >= DESKTOP_BREAKPOINT
  )

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)

    // Sync on mount in case SSR/hydration ever applies
    setIsDesktop(mq.matches)

    return () => mq.removeEventListener('change', handler)
  }, [])

  if (isDesktop) {
    return (
      <DesktopLayout isScrollLocked={isScrollLocked}>
        {children}
      </DesktopLayout>
    )
  }

  return (
    <MobileLayout isScrollLocked={isScrollLocked}>
      {children}
    </MobileLayout>
  )
}
