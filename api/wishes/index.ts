import type { VercelRequest, VercelResponse } from '@vercel/node'
import { query } from '../../src/lib/server/db'
import { parseWish } from '../../src/lib/server/validation'
import { methodNotAllowed, readJsonBody, sendJson } from '../_lib/http'

interface WishRow {
  id: string
  name: string
  message: string
  created_at: Date
}

function toWish(row: WishRow) {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at.toISOString(),
  }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<void> {
  if (request.method === 'GET') {
    try {
      const result = await query<WishRow>(
        `SELECT id, name, message, created_at
         FROM wishes
         ORDER BY created_at DESC`
      )
      sendJson(response, 200, {
        success: true,
        wishes: result.rows.map(toWish),
      })
    } catch (error) {
      console.error('Wishes list API error', error)
      sendJson(response, 500, {
        success: false,
        error: 'Something went wrong. Please try again.',
      })
    }
    return
  }

  if (request.method !== 'POST') {
    methodNotAllowed(response, 'GET, POST')
    return
  }

  try {
    const parsed = parseWish(await readJsonBody(request))
    if ('error' in parsed) {
      sendJson(response, 400, { success: false, error: parsed.error })
      return
    }

    const result = await query<WishRow>(
      `INSERT INTO wishes (name, message)
       VALUES ($1, $2)
       RETURNING id, name, message, created_at`,
      [parsed.value.name, parsed.value.message]
    )
    const row = result.rows[0]

    sendJson(response, 201, {
      success: true,
      data: toWish(row),
    })
  } catch (error) {
    console.error('Wish API error', error)
    sendJson(response, 500, {
      success: false,
      error: 'Something went wrong. Please try again.',
    })
  }
}
