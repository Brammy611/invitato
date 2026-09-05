# Invitato

Wedding invitation SPA with persistent RSVP and wishes storage.

## Architecture

Frontend:

- React
- TypeScript
- Vite

Backend:

- Vercel Serverless Functions
- `pg` PostgreSQL client

Database:

- PostgreSQL

Request flow:

```text
Browser
  -> React UI
  -> Frontend service
  -> /api/*
  -> Vercel Serverless Function
  -> PostgreSQL
```

PostgreSQL is the only persistence source. RSVP and wishes data is not stored in
browser localStorage.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/rsvp` | Validate and create an RSVP |
| POST | `/api/wishes` | Validate and create a wish |
| GET | `/api/wishes` | Return wishes newest first |

The API validates request bodies independently from the client, uses parameterized
SQL, and returns safe error messages without database details.

## Database Setup

1. Create a PostgreSQL database and obtain its connection string.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` in `.env.local`.
4. Run the schema against the database:

   ```bash
   psql "$DATABASE_URL" -f database/schema.sql
   ```

The schema creates `rsvps` and `wishes`, including validation constraints and a
newest-first index for wishes.

## Local Development

Install dependencies:

```bash
npm install
```

For the frontend only:

```bash
npm run dev
```

To run the Vite frontend together with Vercel Functions locally, with
`DATABASE_URL` configured:

```bash
npm run dev:vercel
```

The Vercel CLI is installed as a local development dependency. Use the URL
printed by the command and test RSVP submission, wish submission, and wish
loading there.

Build verification:

```bash
npm run build
```

## Vercel Deployment

1. Import this repository into Vercel.
2. Keep the Vite project defaults for the frontend build.
3. Add `DATABASE_URL` in the Vercel project Environment Variables settings.
4. Run `database/schema.sql` against the production PostgreSQL database.
5. Deploy and verify `/api/rsvp` and `/api/wishes` through the invitation UI.

The database connection string is read only by serverless functions and is never
included in browser code.

## AI Usage Disclosure

AI coding tools were used as implementation assistance for inspecting the
existing data flow, suggesting the API and database structure, implementing
server-side validation and PostgreSQL integration, debugging TypeScript issues,
and reviewing the resulting changes. The project decisions, verification, and
final code review remain the developer's responsibility.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
