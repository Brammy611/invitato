import '../app/globals.css'

interface LayoutProps {
  children: React.ReactNode
}

/**
 * RootLayout — global wrapper rendered once for the entire app.
 * Applies Google Fonts, base typography, and background color
 * defined in globals.css design tokens.
 *
 * Font stack:
 *   Serif    → Cormorant Garamond  (headings, couple names)
 *   Sans     → Montserrat          (body copy, labels)
 *   Script   → Great Vibes         (decorative accents)
 */
export default function RootLayout({ children }: LayoutProps) {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--color-bg-primary)",
        color: "var(--color-text-secondary)",
        minHeight: "100svh",
      }}
    >
      {children}
    </div>
  )
}
