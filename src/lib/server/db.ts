import { Pool, type QueryResult, type QueryResultRow } from 'pg'

const globalForDb = globalThis as typeof globalThis & {
  __invitatoPool?: Pool
}

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured')
  }

  globalForDb.__invitatoPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    idleTimeoutMillis: 10_000,
  })

  return globalForDb.__invitatoPool
}

export function query<T extends QueryResultRow>(
  text: string,
  values: unknown[] = []
): Promise<QueryResult<T>> {
  return getPool().query<T>(text, values)
}
