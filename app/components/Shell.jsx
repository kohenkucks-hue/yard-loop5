import Link from 'next/link'
import { notFound } from 'next/navigation'
import { publicPages, isVisible } from '../lib/content'

export function arr(x){ return Array.isArray(x) ? x : [] }
export function money(n){ return `$${Number(n || 0).toLocaleString()}` }
export function phoneHref(phone=''){ return 'tel:' + String(phone).replace(/[^0-9+]/g,'') }

export function Img({ src, label, className='' }){
  if(src) return <img className={className} src={src} alt={label || ''} loading="lazy" />
  return <div className={`imgPh ${className}`}>{label || 'Add image in admin'}</div>
}

export function SiteNav({ c }){
  const links = publicPages(c)
  return <>
    {c.alertEnabled !== false && c.alert && <div className="alert">{c.alert}</div>}
    <header className="nav">
      <Link className="brand" href="/">
        <div className="logoMark">{c.brand.logoImage ? <img src={c.brand.logoImage} alt={c.brand.name}/> : c.brand.logoText}</div>
        <span><b>{c.brand.name}</b><small>{c.brand.tagline}</small></span>
      </Link>
      <nav className="navLinks">
        {links.slice(0,6).map(l => <Link href={l.href} key={l.key}>{l.label}</Link>)}
        <Link className="pill" href={isVisible(c,'estimate') ? '/estimate' : '/contact'}>Get Quote</Link>
      </nav>
    </header>
  </>
}

export function SiteFooter({ c }){
  const links = publicPages(c)
  return <footer>
    <div className="footerGrid">
      <div className="footerBrand">
        <div className="footerLogo"><div className="footerLogoMark">{c.brand.logoImage ? <img src={c.brand.logoImage} alt=""/> : c.brand.logoText}</div><b>{c.brand.name}</b></div>
        <p>{c.brand.tagline}</p>
        <div className="footerContact"><a href={phoneHref(c.brand.phone)}>{c.brand.phone}</a><a href={`mailto:${c.brand.email}`}>{c.brand.email}</a>{c.brand.domain&&<a href={c.brand.domain.startsWith('http')?c.brand.domain:`https://${c.brand.domain}`} target="_blank" rel="noreferrer">{c.brand.domain.replace(/^https?:\/\//,'')}</a>}</div>
      </div>
      <div className="footerCol"><h4>Pages</h4>{links.slice(0,8).map(l => <Link href={l.href} key={l.key}>{l.label}</Link>)}{isVisible(c,'legal') && <Link href="/legal">Legal</Link>}</div>
      <div className="footerCol"><h4>Get Started</h4>{isVisible(c,'estimate') && <Link href="/estimate">Build Estimate</Link>}<Link href="/contact">Contact Yard Loop</Link><a href={phoneHref(c.brand.phone)}>Call Us</a>{c.googleReviewUrl && <a href={c.googleReviewUrl} target="_blank" rel="noreferrer">⭐ Leave a Google Review</a>}{(c.socialLinks||[]).filter(x=>x.enabled&&x.url).map(x=><a key={x.label} href={x.url.startsWith('http')?x.url:`https://${x.url}`} target="_blank" rel="noreferrer">{x.label}</a>)}</div>
    </div>
    <div className="footerBottom"><span>© {new Date().getFullYear()} {c.brand.name}. All rights reserved.</span><span>{c.brand.domain}</span></div>
  </footer>
}

export function FinalCta({ c }){
  return <section className="offer"><p className="eyebrow light">Next step</p><h2>{c.finalCta?.headline}</h2><p>{c.finalCta?.text}</p><Link className="btn" href="/estimate">{c.finalCta?.button}</Link></section>
}

export function HiddenPage(){
  notFound()
}
