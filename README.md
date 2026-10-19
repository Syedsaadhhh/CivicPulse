# CivicPulse

**Your neighbourhood. Your say.**

A participatory-budgeting frontend prototype built for Hyperbloom October 2026. Explore neighbourhood proposals, compare illustrated street transformations, allocate a fixed budget of 100 Civic Tokens, and keep a Community Impact Passport of your choices.

## Try the flow

1. Choose one of four fictional neighbourhoods using search or the illustrated map.
2. Browse proposals and filter by Greening, Mobility, Water, Community, or Play.
3. Open an idea and compare its before/after street illustration, annotations, and proposed changes.
4. Place or withdraw tokens in steps of five. A shared budget prevents overspending and each proposal is capped at its stated token cost.
5. Review and confirm the allocation. Confirmation locks the token map until you explicitly amend it.
6. Download the Community Impact Passport as text or JSON, or print it. Amend your choices or start a fresh round.

## Run locally

Use a current Node.js LTS release supported by Vite 8 (Node 22.12+ or Node 24 recommended).

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
npm run lint
```

The production output is `dist/`. No environment variables, database, or API keys are required.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React, and self-hosted Fraunces / Plus Jakarta Sans variable fonts. The neighbourhood plan and street scenes are SVG illustrations rendered by React components.

## Design and interaction

- Warm paper surfaces, forest and sage colours, readable typography, and plant growth stages that reflect allocation progress.
- Responsive layouts, visible focus styles, labelled controls, live status updates, and reduced-motion preferences.
- The before/after slider supports pointer input and keyboard controls.
- One allocation state supplies the cards, budget, review, and passport so totals remain consistent.

## Prototype boundaries

All neighbourhoods, proposals, costs, and impact figures are fictional sample content. The map is illustrative, not a navigation map. Civic Tokens are simulated budget units, not money or cryptocurrency. Confirmation happens only in the browser: no ballot is transmitted, officially counted, verified, or stored by a civic service. State resets on reload. Downloaded receipts can be saved separately. Production use would require resident eligibility, durable storage, auditing, privacy controls, and real community validation.

## Repository layout

- `src/components/` — discovery, map, proposals, transformation scenes, allocation review, and passport UI
- `src/data/` — fictional neighbourhoods, proposals, categories, and round configuration
- `src/state/` — discovery and allocation reducers/providers
- `src/lib/passport.ts` — passport derivation and receipt exports
- `src/styles/` — design tokens, shared styles, and print layout
- `docs/submission/` — copy-ready Devpost text and the supplied form reference screenshots

The uploaded `blooms.zip` was unpacked into the repository root. Generated `node_modules/`, `dist/`, and local `.vercel/` metadata are intentionally excluded; dependencies and production assets are reproducible from the lockfile and build command.
