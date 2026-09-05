/* ============================================================
   wishes.service.ts
   Client-side Wishes service.

   Since this is a pure Vite SPA (no Next.js / no server),
   persistence is handled via src/lib/db.ts (localStorage).
   The service validates the payload and delegates to the db layer.
   ============================================================ */

import { saveWish, getAllWishes, type WishRecord } from '../../../lib/db'
import { validateWish } from '../../../lib/validation'

export interface WishPayload {
  name: string
  message: string
}

export interface WishResult {
  id: string
  name: string
  message: string
  createdAt: string
}

export interface WishesResponse {
  success: boolean
  data?: WishResult
  error?: string
}

export interface WishesListResponse {
  success: boolean
  wishes?: WishResult[]
  error?: string
}

/** Map a WishRecord to a WishResult (public-safe shape) */
function toResult(record: WishRecord): WishResult {
  return {
    id: record.id,
    name: record.name,
    message: record.message,
    createdAt: record.createdAt,
  }
}

/**
 * submitWish
 *
 * Validates + persists a wish via localStorage.
 * Simulates ~600ms network latency for realistic UX.
 */
export async function submitWish(payload: WishPayload): Promise<WishesResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600))

  const validation = validateWish({
    name: payload.name,
    message: payload.message,
  })

  if (!validation.valid) {
    return {
      success: false,
      error: Object.values(validation.errors)[0] ?? 'Validation failed.',
    }
  }

  try {
    const record = saveWish({
      name: payload.name.trim(),
      message: payload.message.trim(),
    })
    return { success: true, data: toResult(record) }
  } catch {
    return {
      success: false,
      error: 'Sorry, something went wrong. Please try again.',
    }
  }
}

/**
 * fetchWishes
 *
 * Returns all stored wishes, newest first.
 */
export async function fetchWishes(): Promise<WishesListResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 400))

  try {
    const all = getAllWishes()
    // Newest first
    const sorted = [...all].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return { success: true, wishes: sorted.map(toResult) }
  } catch {
    return {
      success: false,
      error: 'Could not load wishes.',
    }
  }
}
