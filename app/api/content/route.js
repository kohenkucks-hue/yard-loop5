export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { defaultContent } from '../../defaultContent'
const KEY='yard-loop-premium-content'; const DEFAULT_PASSWORD='Kohenmichael2!'
function getPassword(){return process.env.ADMIN_PASSWORD||DEFAULT_PASSWORD}
export async function GET(){try{const {kv}=await import('@vercel/kv'); return NextResponse.json((await kv.get(KEY))||defaultContent)}catch{return NextResponse.json(defaultContent)}}
export async function POST(req){const pass=req.headers.get('x-admin-password'); if(pass!==getPassword()) return NextResponse.json({error:'Wrong admin password.'},{status:401}); const body=await req.json(); try{const {kv}=await import('@vercel/kv'); await kv.set(KEY,body); return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Vercel KV is not connected. Add KV in Vercel project settings, or use Backup to save locally.'},{status:500})}}
