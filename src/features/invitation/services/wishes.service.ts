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

/**
 * Validate for immediate UX feedback, then submit to the server API.
 */
export async function submitWish(payload: WishPayload): Promise<WishesResponse> {
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
    const response = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name.trim(),
        message: payload.message.trim(),
      }),
    })
    const result = (await response.json()) as WishesResponse

    if (!response.ok || !result.success) {
      return { success: false, error: result.error ?? 'Could not submit your wish.' }
    }

    return result
  } catch {
    return {
      success: false,
      error: 'Could not reach the server. Please try again.',
    }
  }
}

/**
 * fetchWishes
 *
 * Returns all wishes from the server, newest first.
 */
export async function fetchWishes(): Promise<WishesListResponse> {
  try {
    const response = await fetch('/api/wishes')
    const result = (await response.json()) as WishesListResponse

    if (!response.ok || !result.success) {
      return { success: false, error: result.error ?? 'Could not load wishes.' }
    }

    return result
  } catch {
    return {
      success: false,
      error: 'Could not load wishes.',
    }
  }
}
