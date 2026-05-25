import './style.css'

export async function generateMetadata() {
  try {
    const { kv } = await import('@vercel/kv')
    const c = await kv.get('yard-loop-premium-content')
    if (c?.seo) return { title: c.seo.title, description: c.seo.description }
  } catch {}
  return {
    title: 'Yard Loop | One Plan. All Year. Total Peace of Mind.',
    description: 'Managed exterior home maintenance subscriptions for Omaha and Council Bluffs homeowners.',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
