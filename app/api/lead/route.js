export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
export async function POST(req){
  const body=await req.json().catch(()=>({}))
  const lead={id:crypto.randomUUID(),date:new Date().toISOString(),status:body.status||'New',notes:body.notes||'',...body}
  try{const {kv}=await import('@vercel/kv'); const leads=(await kv.get('yard-loop-leads'))||[]; await kv.set('yard-loop-leads',[lead,...leads]); return NextResponse.json({ok:true,lead})}
  catch{return NextResponse.json({ok:true,lead,note:'Lead accepted, but Vercel KV is not connected so it will not persist until KV is added.'})}
}
