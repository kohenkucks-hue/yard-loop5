# Yard Loop Modular Website Platform

This ZIP builds on the current Yard Loop v5 website and adds the next major platform upgrades without starting over.

## What is included

- Full CMS-controlled Yard Loop branding, colors, fonts, images, wording, pages, and modules
- Dynamic point-based estimator based on the YardLoop paper contract
- Editable property tiers: base monthly price, yard/home ranges, price per point, mowing upgrade pricing
- Editable services: name, frequency, points, estimated contractor cost, enabled/hidden status
- Automatic monthly estimate, annual contract value, point totals, and margin warning
- Lead capture from contact form and estimator
- Admin lead status tracking: New, Contacted, Quoted, Follow Up, Won, Lost
- Internal lead notes
- Legal/terms page with CMS-controlled sections
- Cancellation, recurring billing, annualized service balance, estimate disclaimer, and pricing correction wording
- Page/module toggles with published/draft/hidden/admin states
- Simple Mode / Advanced Mode admin layout
- Stripe-ready settings foundation with test/live mode and public toggle
- Hidden future modules: customer portal, contractor portal, referrals, packages, reviews, analytics foundation
- Launch checklist/admin health panel
- Tap-to-call phone links and mailto email links

## Deployment

1. Upload this project to GitHub or Vercel.
2. In Vercel, add integrations:
   - Vercel KV for CMS content and leads
   - Vercel Blob for uploads
3. Add environment variable:
   - `ADMIN_PASSWORD` = your private admin password
4. Deploy.
5. Visit `/admin` and save your settings.

## Important

The default fallback admin password is still present in code only so the site can work before environment variables are configured. For production, set `ADMIN_PASSWORD` in Vercel immediately.

Stripe is integration-ready but not active until you configure Stripe on the Stripe/Vercel side and turn the payment module on in admin.

Legal wording is a strong operational starter, but a local attorney should review final production terms before high-volume use.
