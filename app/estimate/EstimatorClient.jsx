'use client'
import { useMemo, useState } from 'react'

const money = n => `$${Math.round(Number(n||0)).toLocaleString()}`

export default function EstimatorClient({ c }){
 const tiers=(c.estimator?.tiers||[]).filter(t=>t.enabled!==false)
 const services=(c.estimator?.services||[]).filter(s=>s.enabled!==false)
 const [tierId,setTierId]=useState(tiers[0]?.id||'small')
 const [selected,setSelected]=useState([])
 const [extra,setExtra]=useState(false)
 const [form,setForm]=useState({name:'',phone:'',email:'',address:'',message:''})
 const [sent,setSent]=useState(false)
 const tier=tiers.find(t=>t.id===tierId)||tiers[0]||{}
 const picked=services.filter(s=>selected.includes(s.id))
 const points=picked.reduce((a,s)=>a+Number(s.points||0),0)
 const contractor=picked.reduce((a,s)=>a+Number(s.contractorCost||0),0)
 const pointsCost=points*Number(tier.pricePerPoint||0)
 const extraCost=extra?Number(tier.mowingUpgrade||0):0
 const monthly=Number(tier.basePrice||0)+pointsCost+extraCost
 const annual=monthly*12
 const annualCost=(Number(tier.basePrice||0)*.55*12)+contractor+(extraCost*.55*12)
 const margin=annual?Math.round(((annual-annualCost)/annual)*100):0
 function toggle(id){ setSelected(x=>x.includes(id)?x.filter(y=>y!==id):[...x,id]) }
 async function submit(e){ e.preventDefault(); const body={...form,source:'Estimator',tier:tier.name,selectedServices:picked.map(s=>`${s.name} ${s.frequency}`).join(', '),points,monthly,annual,status:'New',notes:''}; const r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); if(r.ok)setSent(true) }
 if(sent) return <div className="estimateSuccess"><h2>Estimate sent to Yard Loop.</h2><p>We received your preliminary estimate request. Yard Loop will review the property details and follow up.</p><a className="btn" href="/">Back Home</a></div>
 return <div className="estimatorGrid">
  <div className="estimateBuilder">
   <section className="estimateStep"><div className="stepHead"><b>1</b><div><h2>Choose property size</h2><p>This controls base monthly price and price per point.</p></div></div><div className="tierGrid">{tiers.map(t=><button type="button" key={t.id} className={tierId===t.id?'tier active':'tier'} onClick={()=>setTierId(t.id)}><strong>{t.name}</strong><span>{t.yardRange}</span><span>{t.homeRange}</span><small>{money(t.basePrice)}/mo base • {money(t.pricePerPoint)}/point</small></button>)}</div></section>
   <section className="estimateStep"><div className="stepHead"><b>2</b><div><h2>Select services</h2><p>Push buttons to add or remove services. Points total automatically.</p></div></div><div className="servicePickGrid">{services.map(s=><button type="button" key={s.id} className={selected.includes(s.id)?'servicePick active':'servicePick'} onClick={()=>toggle(s.id)}><span>{s.name}</span><small>{s.frequency}</small><b>{s.points} pts</b></button>)}</div></section>
   <section className="estimateStep"><div className="stepHead"><b>3</b><div><h2>Optional mowing upgrade</h2><p>Add 12 extra cuts per year if the lawn needs a tighter schedule.</p></div></div><button type="button" className={extra?'wideToggle active':'wideToggle'} onClick={()=>setExtra(!extra)}>{extra?'✓ Extra mowing upgrade added':'Add extra mowing upgrade'} <strong>{money(tier.mowingUpgrade)}/mo</strong></button></section>
   <section className="estimateStep"><div className="stepHead"><b>4</b><div><h2>Send estimate request</h2><p>This saves into the admin lead dashboard with the quote details.</p></div></div><form className="leadMiniForm" onSubmit={submit}><input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input placeholder="Service address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/><textarea placeholder="Notes, gate code, concerns, timing, etc." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/><button className="btn" type="submit">Send My Estimate Request</button></form></section>
  </div>
  <aside className="estimateSummary"><div className="stickySummary"><p className="eyebrow">Live estimate</p><h2>{money(monthly)}<span>/month</span></h2><div className="sumRows"><p><span>Base price</span><b>{money(tier.basePrice)}</b></p><p><span>Total points</span><b>{points}</b></p><p><span>Point cost</span><b>{money(pointsCost)}</b></p><p><span>Extra mowing</span><b>{money(extraCost)}</b></p><p className="total"><span>Annual plan value</span><b>{money(annual)}</b></p></div>{c.modules?.marginProtection && <div className={margin < Number(c.estimator.marginTarget||0) ? 'marginWarn bad':'marginWarn'}><b>Internal margin estimate: {margin}%</b><span>{margin < Number(c.estimator.marginTarget||0) ? 'Below target — review pricing before approving.' : 'At or above target based on admin cost estimates.'}</span></div>}<div className="selectedList"><b>Selected services</b>{picked.length?picked.map(s=><span key={s.id}>{s.name} — {s.frequency}</span>):<span>No services selected yet.</span>}</div><p className="fine">{c.estimator.disclaimer}</p><p className="fine">{c.estimator.correction}</p></div></aside>
 </div>
}
