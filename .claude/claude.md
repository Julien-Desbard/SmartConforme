# SmartConform

Document compliance tracker for regulatory documents in the French construction industry (BTP). SaaS B2B targeting SMEs, mid-size companies, and compliance officers who need to track expiration dates, missing documents, and regulatory changes across subcontractors and projects.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **ORM:** Prisma with PostgreSQL (Neon)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Auth:** NextAuth v5
- **Queue:** BullMQ (background jobs, cron-based document checks)
- **AI:** Claude API (document analysis, data extraction)
- **Rate Limiting:** Upstash Redis
- **Monitoring:** Sentry
- **CI/CD:** GitHub Actions
- **Hosting:** Vercel (frontend), Fly.io (backend/workers)

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm test         # Run tests (Vitest)
pnpm db:push      # Push Prisma schema to DB
pnpm db:migrate   # Run Prisma migrations
pnpm db:studio    # Open Prisma Studio
pnpm db:seed      # Seed database
```

## Package Manager

Always use `pnpm`. Never use `npm` or `yarn`.

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── (auth)/       # Auth-related routes (login, register)
│   ├── (dashboard)/  # Protected dashboard routes
│   └── api/          # API routes
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   └── features/     # Feature-specific components
├── lib/              # Shared utilities
│   ├── db.ts         # Prisma client singleton
│   ├── auth.ts       # NextAuth v5 config
│   └── utils.ts      # Helper functions
├── services/         # Business logic layer
├── workers/          # BullMQ job processors
└── types/            # Shared TypeScript types
prisma/
├── schema.prisma     # Database schema
├── migrations/       # Migration history
└── seed.ts           # Seed data
```

## Coding Conventions

- Use server components by default. Add `"use client"` only when hooks or interactivity are required.
- All code, variable names, comments, and commit messages in English.
- Use named exports, not default exports (except for Next.js pages).
- Prefer explicit types over `any`. Use `unknown` when type is truly unknown.
- Error handling: use try/catch with typed errors, never silently swallow errors.
- Prisma for all DB access. No raw SQL unless absolutely necessary (and document why).
- API routes return consistent shape: `{ data, error, message }`.
- Use verbose instead of oneliners, i am a junior developper and must understand your code

## Testing

- Use Vitest (not Jest).
- Follow AAA pattern: Arrange, Act, Assert.
- Test files go in `__tests__/` directories next to source files.
- Mock external dependencies with `vi.mock()`.
- Cover edge cases and error paths.

## Key Domain Concepts

- **Document:** A regulatory document (e.g., Kbis, attestation d'assurance, URSSAF) uploaded by or required from a subcontractor.
- **Subcontractor (Sous-traitant):** An external company whose compliance documents must be tracked.
- **Project (Chantier):** A construction project requiring specific document sets from subcontractors.
- **Compliance Rule:** A rule defining which documents are required, their validity period, and renewal deadlines.
- **Alert:** A notification triggered when a document is expiring, missing, or non-compliant.

## Gotchas

- NextAuth v5 config is in `auth.ts` at project root, not in `src/`.
- Rate limiting middleware uses Upstash Redis — check `middleware.ts` for config.
- BullMQ workers run as separate processes, not inside Next.js API routes.
- Claude API calls for document extraction must include rate limiting and error handling.
- Tailwind v4 uses CSS-based config, not `tailwind.config.ts`.

## design
design is detailed in DESIGN.md and exemples are available in smartconform-design-preview.html

## Backlogs

Refer to smartconform-backlog-v1.md and subsequent files for next steps in developpement