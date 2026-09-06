import { useState } from 'react'
import { submitWish } from '../../services/wishes.service'
import { validateWish } from '../../../../lib/validation'
import type { WishResult } from '../../services/wishes.service'
import Button from '../../../../components/ui/Button'
import Input from '../../../../components/ui/Input'
import Textarea from '../../../../components/ui/Textarea'
import Stagger from '../../../../components/animation/Stagger'
import styles from './Wishes.module.css'

interface WishesFormProps {
  /** Called with the newly created wish after successful submission */
  onWishAdded: (wish: WishResult) => void
}

interface FormState {
  name: string
  message: string
}

interface FormErrors {
  name?: string
  message?: string
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

/**
 * WishesForm
 *
 * Handles all form logic for submitting a wedding wish:
 * - name + message fields
 * - client-side validation (mirrored in service)
 * - loading / success / error states
 * - notifies parent with the new wish via onWishAdded
 * - clears form only on success, preserves on error
 */
export default function WishesForm({ onWishAdded }: WishesFormProps) {
  const [form, setForm] = useState<FormState>({ name: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [formError, setFormError] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')

  const isLoading = status === 'loading'

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLoading) return

    // Client-side validation
    const validation = validateWish({ name: form.name, message: form.message })
    if (!validation.valid) {
      setErrors(validation.errors as FormErrors)
      return
    }

    setStatus('loading')
    setFormError('')
    setSuccessMsg('')

    const result = await submitWish({ name: form.name, message: form.message })

    if (result.success && result.data) {
      setStatus('success')
      setSuccessMsg('Thank you for your kind words.')
      setForm({ name: '', message: '' }) // Clear only on success
      setErrors({})
      onWishAdded(result.data)

      // Reset status to idle after a moment to allow re-submission
      setTimeout(() => {
        setStatus('idle')
        setSuccessMsg('')
      }, 3500)
    } else {
      setStatus('error')
      setFormError(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Leave a wish">

      {/* Success banner */}
      {successMsg && (
        <p className={styles.successMessage} role="status" aria-live="polite">
          {successMsg}
        </p>
      )}

      <Stagger step={70}>
      {/* ── Name field ────────────────────────────── */}
      <div className={styles.fieldGroup}>
        <label htmlFor="wish-name" className={styles.label}>
          Your Name
        </label>
        <Input
          id="wish-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Invitato"
          maxLength={100}
          autoComplete="name"
          required
          disabled={isLoading}
          aria-describedby={errors.name ? 'wish-name-error' : undefined}
          aria-invalid={!!errors.name}
          error={!!errors.name}
        />
        {errors.name && (
          <p id="wish-name-error" className={styles.fieldError} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* ── Message field ─────────────────────────── */}
      <div className={styles.fieldGroup}>
        <label htmlFor="wish-message" className={styles.label}>
          Your Message
        </label>
        <Textarea
          id="wish-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Dear Ricky &amp; Fellycia…"
          maxLength={500}
          required
          disabled={isLoading}
          rows={4}
          aria-describedby={errors.message ? 'wish-message-error' : undefined}
          aria-invalid={!!errors.message}
          error={!!errors.message}
        />
        {errors.message && (
          <p id="wish-message-error" className={styles.fieldError} role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Form-level error */}
      {status === 'error' && formError && (
        <p className={styles.formError} role="alert">
          {formError}
        </p>
      )}
      </Stagger>

      {/* ── Submit button ─────────────────────────── */}
        <Button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className={styles.submitBtn}
        loading={isLoading}
        loadingText="Sending..."
        icon={<SendIcon />}
      >
        Send Wishes
      </Button>

    </form>
  )
}
