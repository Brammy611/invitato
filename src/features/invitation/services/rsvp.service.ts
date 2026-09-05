/* ============================================================
   rsvp.service.ts
   Client-side RSVP service.

   Since this is a pure Vite SPA (no Next.js / no server),
   persistence is handled via src/lib/db.ts (localStorage).
   The service validates the payload and delegates to the db layer.
   ============================================================ */

import { saveRSVP, type RSVPRecord } from '../../../lib/db'
import { validateRSVP } from '../../../lib/validation'

export interface RSVPPayload {
  name: string
  attendance: 'ATTENDING' | 'NOT_ATTENDING'
  guestCount: number
}

export interface RSVPResponse {
  success: boolean
  data?: RSVPRecord
  error?: string
}

/**
 * submitRSVP
 *
 * Validates the payload server-side (in this context, client-side
 * since there is no backend), then persists the RSVP record.
 * Returns a structured response compatible with the async form flow.
 */
export async function submitRSVP(payload: RSVPPayload): Promise<RSVPResponse> {
  // Simulate network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Validate (mirrors what a real API route would do)
  const validation = validateRSVP({
    name: payload.name,
    attendance: payload.attendance,
    guestCount: payload.guestCount,
  })

  if (!validation.valid) {
    return {
      success: false,
      error: Object.values(validation.errors)[0] ?? 'Validation failed.',
    }
  }

  try {
    const record = saveRSVP({
      name: payload.name.trim(),
      attendance: payload.attendance,
      guestCount: payload.guestCount,
    })

    return { success: true, data: record }
  } catch {
    return {
      success: false,
      error: 'Sorry, something went wrong. Please try again.',
    }
  }
}
