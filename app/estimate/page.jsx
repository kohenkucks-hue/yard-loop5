export const dynamic = 'force-dynamic'
import { getContent, styleVars, isVisible } from '../lib/content'
import { SiteNav, SiteFooter, HiddenPage } from '../components/Shell'
import EstimatorClient from './EstimatorClient'

export default async function EstimatePage(){
 const c=await getContent(); if(!isVisible(c,'estimate')) return <HiddenPage c={c} name="Estimator" />
 return <main style={styleVars(c)}><SiteNav c={c}/><section className="pageHero"><p className="eyebrow">Point-based estimator</p><h1>{c.estimator.headline}</h1><p>{c.estimator.subheadline}</p></section><EstimatorClient c={c}/><SiteFooter c={c}/></main>
}
