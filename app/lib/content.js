import { defaultContent } from '../defaultContent'

export async function getContent() {
  try {
    const { kv } = await import('@vercel/kv')
    const saved = await kv.get('yard-loop-premium-content')
    return saved || defaultContent
  } catch {
    return defaultContent
  }
}

export function isVisible(c, key) {
  const pages = c?.pages || {}
  return pages[key]?.state !== 'hidden' && pages[key]?.enabled !== false
}

export function publicPages(c) {
  const labels = { services:'Services', howItWorks:'How It Works', pricing:'Pricing', estimate:'Estimator', gallery:'Gallery', legal:'Legal', packages:'Packages', referrals:'Referrals', customer:'Customer Portal', contractor:'Contractor Portal' }
  const hrefs = { services:'/services', howItWorks:'/how-it-works', pricing:'/pricing', estimate:'/estimate', gallery:'/gallery', legal:'/legal', packages:'/packages', referrals:'/referrals', customer:'/customer', contractor:'/contractor' }
  return Object.keys(labels).filter(k => isVisible(c,k) && (c.pages?.[k]?.showInNav !== false)).map(k => ({ key:k, label: labels[k], href: hrefs[k] }))
}

export function styleVars(c) {
  const b = c.brand || defaultContent.brand
  return { '--navy':b.primary, '--green':b.green, '--lime':b.lime, '--gold':b.gold, '--cream':b.cream, '--ink':b.ink, '--fontHeading': b.headingFont || 'Outfit', '--fontBody': b.bodyFont || 'DM Sans' }
}
