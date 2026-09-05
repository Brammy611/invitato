/* ============================================================
   db.ts
   Client-side "database" using localStorage for a pure SPA
   (no backend/Prisma available in this Vite-only project).

   This simulates the persistence layer that would normally
   be backed by a real database.
   ============================================================ */

const RSVP_KEY = 'invitato_rsvp_submissions'
const WISHES_KEY = 'invitato_wishes'

export interface RSVPRecord {
  id: string
  name: string
  attendance: 'ATTENDING' | 'NOT_ATTENDING'
  guestCount: number
  createdAt: string
}

export interface WishRecord {
  id: string
  name: string
  message: string
  createdAt: string
}

/** Generate a simple unique ID */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/* RSVP helpers */

export function saveRSVP(
  data: Omit<RSVPRecord, 'id' | 'createdAt'>
): RSVPRecord {
  const record: RSVPRecord = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  const all = getAllRSVPs()
  all.push(record)
  localStorage.setItem(RSVP_KEY, JSON.stringify(all))
  return record
}

export function getAllRSVPs(): RSVPRecord[] {
  try {
    const raw = localStorage.getItem(RSVP_KEY)
    return raw ? (JSON.parse(raw) as RSVPRecord[]) : []
  } catch {
    return []
  }
}

/* Wishes helpers */

export function saveWish(
  data: Omit<WishRecord, 'id' | 'createdAt'>
): WishRecord {
  const record: WishRecord = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  const all = getAllWishes()
  all.push(record)
  localStorage.setItem(WISHES_KEY, JSON.stringify(all))
  return record
}

export function getAllWishes(): WishRecord[] {
  try {
    const raw = localStorage.getItem(WISHES_KEY)
    return raw ? (JSON.parse(raw) as WishRecord[]) : []
  } catch {
    return []
  }
}
