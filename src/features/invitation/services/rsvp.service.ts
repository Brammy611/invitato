import { validateRSVP } from '../../../lib/validation'

export interface RSVPPayload {
  name: string
  attendance: 'ATTENDING' | 'NOT_ATTENDING'
  guestCount: number
}

export interface RSVPResponse {
  success: boolean
  data?: RSVPResult
  error?: string
}

export interface RSVPResult {
  id: string
  name: string
  attendance: RSVPPayload['attendance']
  guestCount: number
  createdAt: string
}

/**
 * submitRSVP
 *
 * Validate for immediate UX feedback, then submit to the server API.
 */
export async function submitRSVP(payload: RSVPPayload): Promise<RSVPResponse> {
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
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name.trim(),
        attendance: payload.attendance,
        guestCount: payload.guestCount,
      }),
    })
    const result = (await response.json()) as RSVPResponse

    if (!response.ok || !result.success) {
      return { success: false, error: result.error ?? 'Could not submit your RSVP.' }
    }

    return result
  } catch {
    return {
      success: false,
      error: 'Could not reach the server. Please try again.',
    }
  }
}
