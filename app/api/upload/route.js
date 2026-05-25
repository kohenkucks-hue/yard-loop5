export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

const DEFAULT_PASSWORD = 'Kohenmichael2!'
function getPassword() { return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD }

export async function POST(req) {
  const pass = req.headers.get('x-admin-password')
  if (pass !== getPassword()) return NextResponse.json({ error: 'Wrong admin password.' }, { status: 401 })
  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!file) return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
    const { put } = await import('@vercel/blob')
    const blob = await put(`yard-loop/${Date.now()}-${file.name}`, file, { access: 'public' })
    return NextResponse.json({ url: blob.url })
  } catch {
    return NextResponse.json({ error: 'Image upload requires Vercel Blob to be connected in your Vercel project. You can still paste image URLs directly.' }, { status: 500 })
  }
}
