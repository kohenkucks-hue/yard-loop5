export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
const DEFAULT_PASSWORD='Kohenmichael2!'
function getPassword(){return process.env.ADMIN_PASSWORD||DEFAULT_PASSWORD}
export async function GET(req){const pass=req.headers.get('x-admin-password')||new URL(req.url).searchParams.get('p'); if(pass!==getPassword()) return NextResponse.json({error:'Unauthorized.'},{status:401}); try{const {kv}=await import('@vercel/kv'); return NextResponse.json({leads:(await kv.get('yard-loop-leads'))||[]})}catch{return NextResponse.json({leads:[],note:'KV not connected.'})}}
export async function DELETE(req){const pass=req.headers.get('x-admin-password'); if(pass!==getPassword()) return NextResponse.json({error:'Unauthorized.'},{status:401}); const {id}=await req.json().catch(()=>({})); try{const {kv}=await import('@vercel/kv'); const leads=(await kv.get('yard-loop-leads'))||[]; await kv.set('yard-loop-leads',leads.filter(l=>l.id!==id)); return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'KV not connected.'},{status:500})}}
