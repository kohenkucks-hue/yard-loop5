# Yard Loop QA Report

Date: 2026-05-25

## QA Passes Completed

1. Code inspection of public pages, admin page, API routes, estimator, legal system, footer/nav, and CMS defaults.
2. Production build test with `npm run build`.
3. Local HTTP/API smoke testing through Next dev server.

## Results

### Passed
- Production build completes successfully.
- Public pages load: home, services, how-it-works, pricing, estimate, gallery, contact, legal, admin.
- Hidden modules are not publicly exposed; inactive packages, referrals, customer, and contractor routes return 404 until enabled.
- Phone links use `tel:` format.
- Email links use `mailto:` format.
- Estimator includes property tiers, service point selections, optional mowing upgrade, live monthly total, annual value, selected services, disclaimer, and pricing correction language.
- Contact and estimator forms POST to `/api/lead`.
- Lead status and notes API routes exist and enforce admin password.
- Admin content save route enforces admin password.
- Legal page is CMS-controlled and includes recurring billing, annualized service balance, cancellation, privacy, damage/liability, estimate disclaimer, and pricing correction sections.
- Footer links respect estimator/legal visibility after QA correction.
- Package dependencies are pinned instead of using `latest` for Next/React to reduce future deployment surprises.

### Expected External Setup Required
- Vercel KV must be connected for CMS edits and leads to persist.
- Vercel Blob must be connected for image uploads to persist.
- `ADMIN_PASSWORD` must be set in Vercel before production use.
- Stripe account/API setup must be completed before payment activation.
- Email sending is not active yet; current lead capture stores in KV once configured.
- Legal wording should be reviewed by a local attorney before high-volume use.

### QA Fixes Made
- Fixed production build hang by forcing dynamic rendering for KV-backed routes/pages.
- Pinned Next/React versions in `package.json` and `package-lock.json`.
- Changed hidden/inactive modules from public “coming soon” pages to true 404 behavior.
- Updated footer behavior so hidden estimator/legal pages do not remain linked publicly.

## Current Verdict

This ZIP is deployable as a strong Yard Loop platform foundation once Vercel KV/Blob and environment variables are configured. Core website, estimator, legal, admin, and lead infrastructure are operational locally. External integrations still require their provider-side setup.
