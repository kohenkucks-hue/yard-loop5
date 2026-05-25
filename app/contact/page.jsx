export const dynamic = 'force-dynamic'
import { getContent, styleVars, isVisible } from '../lib/content'
import { SiteNav, SiteFooter, HiddenPage } from '../components/Shell'
import ContactClient from './ContactClient'
export default async function Contact(){const c=await getContent(); if(!isVisible(c,'contact')) return <HiddenPage c={c} name='Contact'/>; return <main style={styleVars(c)}><SiteNav c={c}/><section className='pageHero'><p className='eyebrow'>{c.contactPage.heroEyebrow}</p><h1>{c.contactPage.heroHeadline}</h1><p>{c.contactPage.heroSubtext}</p></section><ContactClient c={c}/><SiteFooter c={c}/></main>}
