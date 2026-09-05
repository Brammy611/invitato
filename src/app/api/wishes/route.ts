/* ============================================================
   route.ts  (mock API route contract for Vite SPA)

   NOTE: This project is a pure Vite SPA — no Next.js, no server.
   Actual persistence is handled via wishes.service.ts → db.ts.

   API Contract (for future Next.js migration):

   POST /api/wishes
     Body: { name: string, message: string }
     200: { success: true, data: WishResult }
     400: { success: false, error: string }
     500: { success: false, error: "Internal server error" }

   GET /api/wishes
     200: { success: true, wishes: WishResult[] }  (newest first)
     500: { success: false, error: "Internal server error" }
   ============================================================ */

export {}
