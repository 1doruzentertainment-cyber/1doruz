<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

## Convex Deployment

- **Dev deployment**: `dev:third-jellyfish-302` (VITE_CONVEX_URL: `https://third-jellyfish-302.eu-west-1.convex.cloud`)
- **Production deploy**: Run `npx convex deploy` to create production deployment, then update `VITE_CONVEX_URL` in Vercel env vars
- **Auth**: Custom magic link auth via Resend (actions in `convex/emails.ts`). Convex env vars needed: `RESEND_API_KEY`, `SITE_URL`
- **Vercel env vars required**: `VITE_CONVEX_URL`, `RESEND_API_KEY`, `SITE_URL`, `AUTH_DOMAIN`

<!-- convex-ai-end -->
