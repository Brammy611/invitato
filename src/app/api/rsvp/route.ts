/* ============================================================
   route.ts  (mock API route for Vite SPA)

   NOTE: This project is a pure Vite SPA — there is no Next.js
   and no real server-side API routes. This file documents the
   intended API contract. Actual persistence is handled by
   rsvp.service.ts → src/lib/db.ts (localStorage).

   If the project is ever migrated to Next.js, this file
   becomes the real POST /api/rsvp handler.

   Expected POST body:
     { name: string, attendance: "ATTENDING"|"NOT_ATTENDING", guestCount: number }

   Success response (200):
     { success: true, data: RSVPRecord }

   Validation error response (400):
     { success: false, error: string, errors: Record<string, string> }

   Server error response (500):
     { success: false, error: "Internal server error" }
   ============================================================ */

// This file is intentionally left as a contract document only.
// See: src/features/invitation/services/rsvp.service.ts
export {}
