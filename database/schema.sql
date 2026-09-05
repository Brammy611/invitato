CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL CHECK (char_length(btrim(name)) > 0),
  attendance VARCHAR(15) NOT NULL CHECK (attendance IN ('ATTENDING', 'NOT_ATTENDING')),
  guest_count INTEGER NOT NULL CHECK (guest_count BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL CHECK (char_length(btrim(name)) > 0),
  message VARCHAR(500) NOT NULL CHECK (char_length(btrim(message)) > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS wishes_created_at_idx ON wishes (created_at DESC);
