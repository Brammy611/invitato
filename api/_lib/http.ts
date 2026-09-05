import type { VercelRequest, VercelResponse } from '@vercel/node'

export async function readJsonBody(request: VercelRequest): Promise<unknown> {
  if (request.body !== undefined && request.body !== null) {
    return typeof request.body === 'string' ? JSON.parse(request.body) : request.body
  }

  const chunks: Buffer[] = []
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : null
}

export function sendJson(
  response: VercelResponse,
  status: number,
  body: Record<string, unknown>
): void {
  response.status(status).setHeader('Content-Type', 'application/json').json(body)
}

export function methodNotAllowed(
  response: VercelResponse,
  allowedMethod: string
): void {
  response.setHeader('Allow', allowedMethod)
  sendJson(response, 405, { success: false, error: 'Method not allowed.' })
}
