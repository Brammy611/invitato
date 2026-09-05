import type { VercelRequest, VercelResponse } from '@vercel/node'
import { query } from '../../src/lib/server/db'
import { parseRSVP } from '../../src/lib/server/validation'
import { methodNotAllowed, readJsonBody, sendJson } from '../_lib/http'

interface RSVPRow {
  id: string
  name: string
  attendance: 'ATTENDING' | 'NOT_ATTENDING'
  guest_count: number
  created_at: Date
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<void> {
  if (request.method !== 'POST') {
    methodNotAllowed(response, 'POST')
    return
  }

  try {
    const parsed = parseRSVP(await readJsonBody(request))
    if ('error' in parsed) {
      sendJson(response, 400, { success: false, error: parsed.error })
      return
    }

    const result = await query<RSVPRow>(
      `INSERT INTO rsvps (name, attendance, guest_count)
       VALUES ($1, $2, $3)
       RETURNING id, name, attendance, guest_count, created_at`,
      [parsed.value.name, parsed.value.attendance, parsed.value.guestCount]
    )
    const row = result.rows[0]

    sendJson(response, 201, {
      success: true,
      data: {
        id: row.id,
        name: row.name,
        attendance: row.attendance,
        guestCount: row.guest_count,
        createdAt: row.created_at.toISOString(),
      },
    })
  } catch (error) {
    console.error('RSVP API error', error)
    sendJson(response, 500, {
      success: false,
      error: 'Something went wrong. Please try again.',
    })
  }
}
