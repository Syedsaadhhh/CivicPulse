# CivicPulse — Devpost submission

## Project name
CivicPulse

## Elevator pitch (152/200 characters)
Help your neighbourhood bloom: explore local proposals, compare before-and-after street designs, and allocate 100 Civic Tokens to the changes you value.

## Built with
react, typescript, vite, tailwindcss, framer-motion, lucide-react, svg, css, vercel

## Try it out links
- Live demo: https://hyperbloom-civicpulse.vercel.app/
- Source code: https://github.com/Syedsaadhhh/CivicPulse

## About the project

## Inspiration

Neighbourhood improvements can feel distant when residents are asked to choose between technical descriptions and numbers without seeing what those choices mean on their own streets. We wanted to explore a more approachable participatory-budgeting experience: one that helps people understand a proposal before asking them to support it.

CivicPulse treats a neighbourhood as something residents can tend together. Its planting metaphor connects individual choices to visible progress, while a limited token budget makes the trade-offs concrete.

## What it does

CivicPulse is an interactive frontend prototype where residents explore neighbourhood improvement ideas and decide how to distribute 100 Civic Tokens.

Visitors can:
- Find one of four sample neighbourhoods through search or an illustrated map.
- Explore 12 proposals across Greening, Mobility, Water, Community, and Play.
- Read what each idea changes, inspect its token cost, and compare illustrated before-and-after street scenes with explanatory annotations.
- Add or withdraw tokens in steps of five, with a shared budget that prevents overspending and caps each idea at its stated cost.
- Review allocations across neighbourhoods and confirm a demo ballot.
- Keep a Community Impact Passport showing their choices, budget distribution, remaining tokens, and reference. The passport can be downloaded as text or JSON, or printed.
- Amend a confirmed allocation or start a fresh demo round.

All neighbourhoods, proposals, costs, and impact figures are fictional. Tokens are simulated budget units. Confirmation stays inside the demo; no official vote is transmitted or counted, and the current session resets on reload.

## How we built it

We built CivicPulse with React, TypeScript, and Vite. Tailwind CSS v4 supplies a reusable design system, Framer Motion handles transitions, and Lucide React provides interface icons. Fraunces and Plus Jakarta Sans are bundled with the app.

The neighbourhood map and transformation scenes use SVG components, allowing the illustrations, annotations, and selected proposals to stay connected. Discovery state coordinates search, map selection, proposal cards, and category filters. A shared allocation reducer powers the token controls, budget panel, review, and passport.

The visual direction pairs warm paper surfaces with sage and forest greens. Tokens progress from seed to bloom as support grows. Accessibility considerations include visible focus states, labelled controls, live status messages, reduced-motion preferences, and keyboard controls for the before-and-after slider.

## Challenges we ran into

The main interaction challenge was keeping one decision consistent across several views. A token placed on a proposal must update the budget and review immediately, and the final passport must preserve exactly what was confirmed. Shared state and derived totals keep those views aligned.

Another challenge was making visual exploration work alongside direct controls. The map has a searchable neighbourhood alternative, and the comparison slider supports keyboard input alongside dragging.

We also needed to distinguish an engaging civic concept from a functioning public voting service. The interface and downloadable receipts explicitly identify this as a demonstration.

## Accomplishments that we're proud of

We connected the full journey from discovering a neighbourhood to keeping a record of a decision. The result goes beyond a landing page: proposal selection, comparison, token allocation, confirmation, amendment, and receipt exports work together.

We are particularly proud of the illustrated transformation views and the Community Impact Passport. One helps people understand a possible change; the other makes their own choices visible after they finish.

## What we learned

Building this prototype reinforced how much civic UX depends on clarity. People need to understand what a proposal changes, what a limited budget allows, whether an action can be revised, and what confirmation actually means.

The strongest design decisions were the ones that supported that understanding: plain-language cards, visible remaining tokens, reversible allocation, and a receipt derived from the confirmed choices.

## What's next for CivicPulse

Our next step is to test the flow with residents and community organizers, including keyboard and screen-reader users, and use their feedback to improve comprehension and completion.

A real pilot would need validated local proposals, real costs, resident eligibility checks, persistent storage, an auditable allocation process, privacy controls, and organizer tools. We would also explore multilingual content and updates showing what happens to proposals after a budgeting round ends.

## Media checklist
Use screenshots of the actual application, not the form reference images in this folder. Suggested gallery sequence: landing page; map and proposals; before/after comparison; allocated token review; confirmed passport. The supplied Devpost form requests JPG/PNG/GIF, up to 5 MB each, ideally 3:2, with up to 15 images.

## Event notes
- Event: https://hyperbloom-october.devpost.com/
- Deadline listed: October 19, 2026 at 5:00 pm EDT = October 20, 2026 at 2:00 am Pakistan time.
- Frontend implementations and polished prototypes are accepted.
- Rules allow AI tools and existing libraries, require a new project, and prohibit multiple project submissions.
- Do not claim Deployxa usage: it is not present in this codebase.
- This draft does not claim user research, official civic deployment, measured impact, or certified accessibility.

## Verification
- npm ci: passed.
- npm run build: passed (TypeScript and Vite production build).
- npm run lint: passed.
- Existing demo URL returned HTTP 200 with the CivicPulse title. This does not establish that the deployed asset version matches the uploaded source.
