import { useState } from 'react'
import { submitRSVP } from '../../services/rsvp.service'
import { validateRSVP } from '../../../../lib/validation'
import styles from './RSVP.module.css'

type AttendanceValue = 'ATTENDING' | 'NOT_ATTENDING'

interface FormState {
  name: string
  attendance: AttendanceValue | ''
  guestCount: number
}

interface FormErrors {
  name?: string
  attendance?: string
  guestCount?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

function SendIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.submitIcon}
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.successIcon}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

/**
 * RSVPForm
 *
 * Handles the RSVP form logic:
 * - Three required fields: name, attendance (radio), guestCount (select)
 * - Client-side validation via src/lib/validation.ts
 * - Submission via src/features/invitation/services/rsvp.service.ts
 * - Loading / success / error states
 * - Duplicate submission prevention
 */
export default function RSVPForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    attendance: '',
    guestCount: 1,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [formError, setFormError] = useState<string>('')

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setForm((prev) => ({ ...prev, name: value }))
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
  }

  function handleAttendanceChange(value: AttendanceValue) {
    setForm((prev) => ({ ...prev, attendance: value }))
    if (errors.attendance) setErrors((prev) => ({ ...prev, attendance: undefined }))
  }

  function handleGuestCountChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(e.target.value, 10)
    setForm((prev) => ({ ...prev, guestCount: value }))
    if (errors.guestCount) setErrors((prev) => ({ ...prev, guestCount: undefined }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isLoading || isSuccess) return

    // Client-side validation
    const validation = validateRSVP({
      name: form.name,
      attendance: form.attendance,
      guestCount: form.guestCount,
    })

    if (!validation.valid) {
      setErrors(validation.errors as FormErrors)
      return
    }

    setStatus('loading')
    setFormError('')

    const result = await submitRSVP({
      name: form.name.trim(),
      attendance: form.attendance as AttendanceValue,
      guestCount: form.guestCount,
    })

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
      setFormError(result.error ?? 'Sorry, something went wrong. Please try again.')
    }
  }

  /* ── Success State ───────────────────────────────────────── */
  if (isSuccess) {
    return (
      <div className={styles.successBox} role="status" aria-live="polite">
        <CheckCircleIcon />
        <h3 className={styles.successTitle}>Thank You!</h3>
        <p className={styles.successMessage}>
          Your RSVP has been recorded. We look forward to celebrating with you!
        </p>
      </div>
    )
  }

  /* ── Form ────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate aria-label="RSVP form">

      {/* ── Name Field ─────────────────────────── */}
      <div className={styles.fieldGroup}>
        <label htmlFor="rsvp-name" className={styles.label}>
          Your Name
        </label>
        <input
          id="rsvp-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleNameChange}
          placeholder="e.g. Invitato"
          maxLength={100}
          autoComplete="name"
          required
          disabled={isLoading}
          aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
          aria-invalid={!!errors.name}
          className={`${styles.input} ${errors.name ? styles.error : ''}`}
        />
        {errors.name && (
          <p id="rsvp-name-error" className={styles.fieldError} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* ── Attendance Field ────────────────────── */}
      <div className={styles.fieldGroup}>
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend className={styles.label}>
            Will you attend the wedding?
          </legend>
          <div
            className={styles.radioGroup}
            role="radiogroup"
            aria-describedby={errors.attendance ? 'rsvp-attendance-error' : undefined}
          >
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="attendance"
                value="ATTENDING"
                checked={form.attendance === 'ATTENDING'}
                onChange={() => handleAttendanceChange('ATTENDING')}
                disabled={isLoading}
                className={styles.radioInput}
              />
              Hadir
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="attendance"
                value="NOT_ATTENDING"
                checked={form.attendance === 'NOT_ATTENDING'}
                onChange={() => handleAttendanceChange('NOT_ATTENDING')}
                disabled={isLoading}
                className={styles.radioInput}
              />
              Tidak Hadir
            </label>
          </div>
        </fieldset>
        {errors.attendance && (
          <p id="rsvp-attendance-error" className={styles.fieldError} role="alert">
            {errors.attendance}
          </p>
        )}
      </div>

      {/* ── Number of Guests ────────────────────── */}
      <div className={styles.fieldGroup}>
        <label htmlFor="rsvp-guests" className={styles.label}>
          Number of Guests
        </label>
        <select
          id="rsvp-guests"
          name="guestCount"
          value={form.guestCount}
          onChange={handleGuestCountChange}
          disabled={isLoading || form.attendance === 'NOT_ATTENDING'}
          aria-describedby={errors.guestCount ? 'rsvp-guests-error' : undefined}
          aria-invalid={!!errors.guestCount}
          className={styles.select}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {errors.guestCount && (
          <p id="rsvp-guests-error" className={styles.fieldError} role="alert">
            {errors.guestCount}
          </p>
        )}
      </div>

      {/* ── Form-level error ────────────────────── */}
      {status === 'error' && formError && (
        <p className={styles.formError} role="alert">
          {formError}
        </p>
      )}

      {/* ── Submit Button ────────────────────────── */}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className={styles.submitBtn}
      >
        {isLoading ? 'Submitting...' : (
          <>
            Submit RSVP
            <SendIcon />
          </>
        )}
      </button>

    </form>
  )
}
