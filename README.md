# Invitato

Invitato is a responsive wedding invitation website developed for the Invitato Software Engineer Homework Assessment.

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
cp .env.example .env
```

Set the PostgreSQL connection string in `.env`:

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

Invitato uses a Vite React frontend and Vercel Serverless Functions for the backend API. PostgreSQL is the persistent source of truth for RSVP and wishes data. The browser does not use `localStorage` as the primary persistence layer.

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

Frontend digunakan untuk menangani seluruh tampilan dan interaksi pada wedding invitation, termasuk:

- Menampilkan halaman wedding invitation
- Responsive UI, animation, dan transition
- Interaksi RSVP dan wishes
- Validasi input dari sisi client
- Komunikasi dengan backend API

Project ini menggunakan React dengan TypeScript agar struktur component lebih mudah dikelola dan membantu menjaga type safety.

Vite digunakan sebagai build tool sekaligus development environment untuk frontend.

### Backend

Backend menggunakan Vercel Serverless Functions untuk menangani kebutuhan API, seperti:

- Menyimpan data RSVP
- Menyimpan wishes
- Mengambil wishes yang sudah dikirim
- Validasi data dari sisi server
- Interaksi dengan database
- Menangani error dengan aman

### Database Connection

Koneksi ke PostgreSQL dilakukan dari sisi server menggunakan reusable connection pool.

Browser tidak pernah terhubung langsung ke PostgreSQL. `DATABASE_URL` juga hanya digunakan di server dan tidak pernah diekspos ke client.

Alur sederhananya:

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

Endpoint ini digunakan untuk mengirim konfirmasi kehadiran tamu, yang terdiri dari nama tamu, status kehadiran, dan jumlah tamu.

### Submit Wish

```text
POST /api/wishes
```

Endpoint ini digunakan untuk mengirim nama dan pesan dari tamu.

### Get Wishes

```text
GET /api/wishes
```

Endpoint ini digunakan untuk mengambil wishes yang sudah dikirim sebelumnya. Data diurutkan dari yang paling baru.

## Technical Decisions

### Client and Server Validation

Validasi input dilakukan di dua sisi, yaitu client dan server.

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

Validasi di sisi server tetap diperlukan karena validasi client dapat dilewati atau dimanipulasi oleh user.

### Parameterized SQL

Query ke database menggunakan parameterized values, bukan memasukkan input user secara langsung ke dalam SQL query.

Hal ini digunakan untuk menjaga query tetap aman ketika memproses data dari user.

### Separation of Responsibilities

Codebase dipisahkan berdasarkan tanggung jawabnya, seperti:

UI components
Frontend services
API routes
Server-side validation
Database access

Dengan pemisahan ini, setiap bagian memiliki tanggung jawab yang lebih jelas sehingga lebih mudah untuk dikembangkan, di-test, dan di-debug.

## Data Persistence

Data RSVP dan wishes disimpan secara persistent di PostgreSQL.

Database digunakan sebagai single source of truth. Untuk persistence production, aplikasi tidak menggunakan browser 'localStorage'.

## AI Tools and Agents Disclosure

Dalam proses pengerjaan homework ini, saya menggunakan beberapa AI tools sebagai development assistant.

AI digunakan untuk membantu proses eksplorasi, problem solving, debugging, dan development. Namun, hasil dari AI tidak langsung dianggap benar. Final implementation, architecture, code, dan technical decisions tetap saya review dan sesuaikan dengan kebutuhan project.

### ChatGPT

ChatGPT saya gunakan untuk membantu:

- Diskusi mengenai application architecture
- Menentukan implementation approach
- Membantu proses frontend dan backend development
- Memberikan saran mengenai code structure
- Membantu debugging TypeScript dan build error
- Membantu implementasi API dan validation
- Eksplorasi UI/UX
- Eksplorasi animation dan interaction
- Diskusi technical decisions
- Membantu penyusunan README dan dokumentasi

Saya menggunakan ChatGPT terutama sebagai development assistant dan problem-solving partner selama proses pengerjaan.

### Google Antigravity

Google Antigravity saya gunakan untuk membantu proses development secara langsung, terutama dalam:

- Code modification
- Menghubungkan frontend service dengan API endpoint
- Implementasi API routes
- Integrasi PostgreSQL
- Validation dan error handling
- Debugging
- Refactoring code

### Developer Responsibility

AI-generated suggestions dan code tidak saya anggap sebagai hasil akhir tanpa review.

Saya tetap bertanggung jawab terhadap:

- Review terhadap code yang dihasilkan
- Memahami implementation yang digunakan
- Menentukan technical decisions
- Testing aplikasi
- Debugging
- Memastikan behavior aplikasi berjalan sesuai kebutuhan
- Memastikan implementation memenuhi requirement homework

AI tools digunakan untuk mempercepat proses development dan eksplorasi solusi, sementara final implementation tetap saya review, test, dan sesuaikan dengan kebutuhan project.
