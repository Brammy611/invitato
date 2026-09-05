/* ============================================================
   validation.ts
   Client-side validation utilities for the invitation forms.
   ============================================================ */

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

/** Validate RSVP form payload before submission */
export function validateRSVP(data: {
  name: string
  attendance: string
  guestCount: number
}): ValidationResult {
  const errors: Record<string, string> = {}

  // Name
  if (!data.name || !data.name.trim()) {
    errors.name = 'Please enter your name.'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer.'
  }

  // Attendance
  if (!data.attendance || !['ATTENDING', 'NOT_ATTENDING'].includes(data.attendance)) {
    errors.attendance = 'Please select your attendance.'
  }

  // Guest count
  if (!Number.isInteger(data.guestCount) || data.guestCount < 1 || data.guestCount > 10) {
    errors.guestCount = 'Please select a valid number of guests.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

/** Validate Wishes form payload */
export function validateWish(data: {
  name: string
  message: string
}): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.name || !data.name.trim()) {
    errors.name = 'Please enter your name.'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer.'
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Please enter your message.'
  } else if (data.message.trim().length > 500) {
    errors.message = 'Message must be 500 characters or fewer.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
