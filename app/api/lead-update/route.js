export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
const DEFAULT_PASSWORD='Kohenmichael2!'
function getPassword(){return process.env.ADMIN_PASSWORD||DEFAULT_PASSWORD}
export async function POST(req){
 const pass=req.headers.get('x-admin-password'); if(pass!==getPassword()) return NextResponse.json({error:'Unauthorized.'},{status:401})
 const {id,patch}=await req.json().catch(()=>({}))
 try{const {kv}=await import('@vercel/kv'); const leads=(await kv.get('yard-loop-leads'))||[]; const updated=leads.map(l=>l.id===id?{...l,...patch,updatedAt:new Date().toISOString()}:l); await kv.set('yard-loop-leads',updated); return NextResponse.json({ok:true})}
 catch{return NextResponse.json({error:'KV not connected.'},{status:500})}
}
