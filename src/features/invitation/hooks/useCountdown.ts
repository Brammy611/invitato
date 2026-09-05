/* ============================================================
   useCountdown.ts
   Countdown hook — calculates remaining time until a target
   date and updates every second.
   ============================================================ */

import { useState, useEffect } from 'react'

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** true when the target date has passed */
  isComplete: boolean
}

function calculate(targetDate: string): CountdownValues {
  const diff = new Date(targetDate).getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days    = Math.floor(totalSeconds / 86400)
  const hours   = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, isComplete: false }
}

/**
 * useCountdown
 *
 * Returns live countdown values until `targetDate` (ISO 8601 string).
 * Updates every second. Cleans up its interval on unmount.
 *
 * @param targetDate - ISO datetime string, e.g. "2027-01-01T10:00:00+07:00"
 */
export function useCountdown(targetDate: string): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(() =>
    calculate(targetDate)
  )

  useEffect(() => {
    // Stop ticking once complete
    if (values.isComplete) return

    const id = setInterval(() => {
      setValues(calculate(targetDate))
    }, 1000)

    return () => clearInterval(id)
  }, [targetDate, values.isComplete])

  return values
}
