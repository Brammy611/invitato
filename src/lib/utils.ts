/**
 * utils.ts
 * Utility functions for the invitation application.
 */

/**
 * Formats an ISO 8601 datetime string into "Weekday, DD Month YYYY"
 * Example: "Thursday, 26 December 2030"
 */
export function formatEventDate(isoString: string): string {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/**
 * Formats an ISO 8601 datetime string into "HH:MM"
 * Example: "11:00"
 */
export function formatEventTime(isoString: string): string {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}
