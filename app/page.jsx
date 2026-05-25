export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { getContent, styleVars, isVisible } from './lib/content'
import { SiteNav, SiteFooter, Img, arr, FinalCta } from './components/Shell'

export default async function Home(){
 const c=await getContent(); const estOn=isVisible(c,'estimate')
 return <main style={styleVars(c)}><SiteNav c={c}/>
  <section className="hero" style={c.hero.backgroundImage ? {backgroundImage:`linear-gradient(100deg,rgba(12,34,63,.94),rgba(12,34,63,.62)),url(${c.hero.backgroundImage})`} : undefined}>
   <div className="heroText"><p className="eyebrow">{c.hero.eyebrow}</p><h1>{c.hero.headline}</h1><p className="subhead">{c.hero.subheadline}</p><div className="actions"><Link className="btn large" href={estOn?'/estimate':'/contact'}>{c.hero.primaryCta}</Link><Link className="btn ghost large" href="/how-it-works">{c.hero.secondaryCta}</Link></div><div className="trustLine">{arr(c.trust).map((t,i)=><span key={i}>✓ {t}</span>)}</div></div>
   <div className="heroCard"><Img src={c.hero.image} label="Yard Loop service"/><div className="floatCard"><b>{c.hero.overlayTitle}</b>{arr(c.hero.overlayItems).map((x,i)=><span key={i}>{x}</span>)}</div></div>
  </section>
  <section className="section pain"><h2>{c.painHeadline}</h2><div className="grid4">{arr(c.problem).map((p,i)=><div className="mini" key={i}>{p}</div>)}</div></section>
  <section className="section split"><div><p className="eyebrow">The Yard Loop model</p><h2>{c.splitHeadline}</h2><p className="lead">{c.splitText}</p><Link className="btn" href="/estimate">Build a Plan →</Link></div><div className="stack">{arr(c.promise).map((p,i)=><article className="feature" key={i}><Img src={p.image} label={p.title}/><div><h3>{p.title}</h3><p>{p.text}</p></div></article>)}</div></section>
  <section className="section muted"><p className="eyebrow">Point-based pricing</p><h2>Easy for customers. Controlled by you in admin.</h2><div className="steps"><article><b>01</b><h3>Choose property size</h3><p>Small, medium, or large controls base price and price per point.</p></article><article><b>02</b><h3>Select services</h3><p>Each service and frequency has an editable point value.</p></article><article><b>03</b><h3>Auto-calculate plan</h3><p>Base price + points + upgrades = monthly subscription and annual value.</p></article></div></section>
  <section className="section"><p className="eyebrow">What can be included</p><h2>Exterior services your home already needs, organized into one plan.</h2><div className="cards">{arr(c.included).map((s,i)=><article className="card" key={i}><Img src={s.image} label={s.title}/><h3>{s.icon} {s.title}</h3><p>{s.text}</p></article>)}</div></section>
  <section className="band"><p className="eyebrow light">How it works</p><h2>Simple outside. Organized underneath.</h2><div className="steps">{arr(c.how).map((h,i)=><article key={i}><b>{h.step}</b><h3>{h.title}</h3><p>{h.text}</p></article>)}</div></section>
  <section className="section pricingBlock"><div><p className="eyebrow">Pricing</p><h2>{c.pricing.headline}</h2><p>{c.pricing.text}</p><div className="priceRange"><span>{c.pricing.rangeLabel}</span><strong>{c.pricing.rangeValue}</strong><small>{c.pricing.rangeNote}</small></div><p className="fine">{c.pricing.note}</p></div><aside><h3>{c.estimator.headline}</h3>{arr(c.estimator.tiers).filter(t=>t.enabled).map(t=><span key={t.id}>{t.name}: ${t.basePrice}/mo + ${t.pricePerPoint}/point</span>)}<Link className="btn" href="/estimate">Open Estimator</Link></aside></section>
  {arr(c.testimonials).filter(t=>t.enabled&&t.quote).length>0 && <section className="testimonials"><p className="eyebrow">Reviews</p><h2>What homeowners say.</h2><div className="testimCards">{arr(c.testimonials).filter(t=>t.enabled&&t.quote).map((t,i)=><div className="testimCard" key={i}><div className="stars">★★★★★</div><blockquote>“{t.quote}”</blockquote><cite>{t.name}<small>{t.location}</small></cite></div>)}</div></section>}
  <FinalCta c={c}/><SiteFooter c={c}/></main>
}
