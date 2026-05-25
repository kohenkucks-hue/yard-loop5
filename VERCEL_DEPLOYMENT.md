# Yard Loop Vercel Deployment Checklist

## Correct upload method
Download this ZIP to your device first, then upload it to Vercel or push it to GitHub. Do not paste a ChatGPT sandbox link into Vercel as an import URL.

## Vercel project settings
- Framework preset: Next.js
- Root directory: project root where `package.json` is located
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: leave blank / default

## Required before public launch
Set this environment variable in Vercel:

`ADMIN_PASSWORD=your-new-private-password`

## Full website URL
The default website URL is set as:

`https://www.yard-loop.com`

Change it in admin after deployment if needed.

## External services to connect later
- Vercel KV / Redis for CMS and lead persistence
- Vercel Blob for image uploads
- Stripe keys for payment activation
- Email provider for live email notifications
- Google Analytics / Google Business links

## Important
The ZIP itself is not password locked. The admin password is for the website admin dashboard only.
