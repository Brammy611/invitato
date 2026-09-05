# Invitato

Invitato is a responsive wedding invitation website developed for the Invitato
Software Engineer Homework Assessment.

## Features

- Responsive wedding invitation experience
- RSVP submission with attendance and guest count
- Public wishes submission and display
- Client-side and server-side validation
- Persistent PostgreSQL storage
- Vercel Serverless Functions API

## Technology Stack

- React
- TypeScript
- Vite
- Vercel Serverless Functions
- PostgreSQL
- `pg` PostgreSQL client

## Local Development

### Prerequisites

Install the following tools:

- Node.js
- npm
- PostgreSQL
- Vercel CLI

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Brammy611/invitato.git
cd invitato
npm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Set the PostgreSQL connection string in `.env.local`:

```env
DATABASE_URL=your_postgresql_connection_string
```

The environment file must remain local and must not contain production
credentials in the repository.

### Database Setup

The schema is located at `database/schema.sql`. Run it against the configured
database:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

The schema creates the following tables:

- `rsvps`: guest name, attendance status, guest count, and submission timestamp
- `wishes`: guest name, message, and submission timestamp

### Run the Application

Run the Vite frontend:

```bash
npm run dev
```

To run the frontend with Vercel Serverless Functions locally:

```bash
npm run dev:vercel
```

The Vercel development server uses the local `DATABASE_URL` environment
variable. Use the URL printed in the terminal to test the complete frontend and
API flow.

### Build and Preview

Create a production build:

```bash
npm run build
```

Preview the production frontend locally:

```bash
npm run preview
```

## Architecture

Invitato uses a Vite React frontend and Vercel Serverless Functions for the
backend API. PostgreSQL is the persistent source of truth for RSVP and wishes
data. The browser does not use `localStorage` as the primary persistence layer.

### Application Flow

```text
User
 │
 ▼
React + TypeScript Frontend
 │
 ├── RSVP Form
 │      │
 │      ▼
 │   POST /api/rsvp
 │
 └── Wishes
        │
        ├── GET /api/wishes
        └── POST /api/wishes
               │
               ▼
        Vercel Serverless Functions
               │
               ▼
           PostgreSQL
```

### Frontend

The frontend is responsible for:

- Rendering the wedding invitation
- Responsive UI, animations, and transitions
- RSVP and wishes interactions
- Client-side input validation
- Communicating with the backend API

React with TypeScript provides a component-based structure and type safety.
Vite provides the frontend build tool and development workflow.

### Backend

The backend uses Vercel Serverless Functions to handle:

- RSVP submission
- Wishes submission
- Retrieving submitted wishes
- Server-side validation
- Database interaction
- Safe error handling

### Database Connection

Database access is performed server-side through a reusable PostgreSQL
connection pool. The browser never connects directly to PostgreSQL, and
`DATABASE_URL` is never exposed to client-side code.

```text
Frontend
   │
   ▼
API
   │
   ▼
PostgreSQL
```

## API Endpoints

### Submit RSVP

```text
POST /api/rsvp
```

Submits a guest confirmation with the guest name, attendance status, and guest
count.

### Submit Wish

```text
POST /api/wishes
```

Submits a guest's name and message.

### Get Wishes

```text
GET /api/wishes
```

Returns previously submitted wishes, sorted newest first.

## Technical Decisions

### Client and Server Validation

Input validation is implemented at both the client and server layers:

```text
User Input
   ↓
Client Validation
   ↓
API Request
   ↓
Server Validation
   ↓
PostgreSQL Constraints
```

This prevents invalid input from being accepted when client-side validation is
bypassed.

### Parameterized SQL

Database queries use parameterized values rather than interpolating user input
directly into SQL statements.

### Separation of Responsibilities

The application separates:

- UI components
- Frontend services
- API routes
- Server-side validation
- Database access

This keeps the code easier to maintain, test, and debug.

## Data Persistence

RSVP and wishes data are stored persistently in PostgreSQL. The database is the
single source of truth, and the application does not rely on browser
`localStorage` for production persistence.

## AI Tools and Agents Disclosure

AI tools were used as development assistance during this project. The final
implementation, architecture, code, and technical decisions were reviewed and
verified by the developer.

### ChatGPT

ChatGPT was used for:

- Application architecture discussions
- Implementation approaches
- Frontend and backend development assistance
- Code structure suggestions
- TypeScript and build error debugging
- API and validation implementation guidance
- UI/UX ideas
- Animation and interaction ideas
- Technical decision discussions
- README and documentation assistance

ChatGPT was used primarily as a development assistant and problem-solving tool.

### Google Antigravity

Google Antigravity was used for:

- Assisting with code modifications
- Connecting frontend services to API endpoints
- Implementing API routes
- PostgreSQL integration
- Validation and error handling
- Debugging
- Refactoring

### Developer Responsibility

AI-generated suggestions and code were not treated as automatically correct.
The developer remained responsible for:

- Reviewing generated code
- Understanding the implementation
- Making technical decisions
- Testing the application
- Debugging issues
- Verifying final behavior
- Ensuring the implementation meets the homework requirements

AI tools were used to accelerate development and exploration, while the final
implementation was reviewed and adapted according to the project's requirements.
