const ATTENDANCE_VALUES = ['ATTENDING', 'NOT_ATTENDING'] as const

export type ServerAttendance = (typeof ATTENDANCE_VALUES)[number]

interface ParsedRSVP {
  name: string
  attendance: ServerAttendance
  guestCount: number
}

interface ParsedWish {
  name: string
  message: string
}

type ParseResult<T> = { value: T } | { error: string }

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getTrimmedString(
  value: unknown,
  field: string,
  maxLength: number
): { value: string } | { error: string } {
  if (typeof value !== 'string' || !value.trim()) {
    return { error: `${field} is required.` }
  }

  const trimmed = value.trim()
  if (trimmed.length > maxLength) {
    return { error: `${field} must be ${maxLength} characters or fewer.` }
  }

  return { value: trimmed }
}

export function parseRSVP(body: unknown): ParseResult<ParsedRSVP> {
  if (!isRecord(body)) return { error: 'Request body must be a JSON object.' }

  const name = getTrimmedString(body.name, 'Name', 100)
  if ('error' in name) return name

  const attendance = body.attendance
  if (!ATTENDANCE_VALUES.includes(attendance as ServerAttendance)) {
    return { error: 'Attendance must be ATTENDING or NOT_ATTENDING.' }
  }

  if (
    typeof body.guestCount !== 'number' ||
    !Number.isInteger(body.guestCount) ||
    body.guestCount < 1 ||
    body.guestCount > 10
  ) {
    return { error: 'Guest count must be a whole number between 1 and 10.' }
  }

  return {
    value: {
      name: name.value,
      attendance: attendance as ServerAttendance,
      guestCount: body.guestCount,
    },
  }
}

export function parseWish(body: unknown): ParseResult<ParsedWish> {
  if (!isRecord(body)) return { error: 'Request body must be a JSON object.' }

  const name = getTrimmedString(body.name, 'Name', 100)
  if ('error' in name) return name

  const message = getTrimmedString(body.message, 'Message', 500)
  if ('error' in message) return message

  return { value: { name: name.value, message: message.value } }
}
