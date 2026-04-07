## Learning Path: React Server Components

**Clarification:** React Server Components work differently depending on the framework you're using. Are you building with Next.js (App Router), Remix, or working with raw React? This changes which docs and patterns are most relevant.

*(The path below assumes Next.js App Router, which is the most common RSC context. Adjust if the user specifies otherwise.)*

**Assumptions:**
- **Level:** Intermediate React developer, familiar with client-side React
- **Goal:** Understand what Server Components are, how they differ from client components, and how to use them in practice
- **Time budget:** A focused weekend
- **Style:** Official docs first, current sources only

**Why this topic is tricky:** RSC documentation lagged the implementation significantly, and many early blog posts are outdated or describe pre-release behavior. The mental model shift — components that run only on the server and never ship JS to the client — breaks assumptions built from years of client-side React.

---

### Core Path

#### Phase 1 — Mental Model
- `[Official Docs]` `[Read now]` [React docs: Server Components](https://react.dev/reference/rsc/server-components) — The official React reference for what Server Components are and how they fit into the React model; start here for the canonical mental model before any framework-specific docs. ⏱ ~20 min
- `[Official Docs]` `[Read now]` [Next.js: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) — Next.js is where most developers encounter RSC in practice; this page explains the server/client boundary in the context of a real framework. ⏱ ~25 min

#### Phase 2 — Core Mechanics
- `[Official Docs]` `[Read now]` [Next.js: App Router fundamentals](https://nextjs.org/docs/app/building-your-application/routing) — The App Router is built around Server Components by default; understanding routing and layouts is essential before composition patterns make sense. ⏱ ~30 min
- `[Official Docs]` `[Read now]` [Next.js: Data fetching patterns](https://nextjs.org/docs/app/building-your-application/data-fetching) — Server Components change how and where you fetch data; this replaces the old getServerSideProps mental model. ⏱ ~25 min
- `[Official Docs]` `[Read now]` [React docs: use client directive](https://react.dev/reference/rsc/use-client) — Understanding when and why to opt into client components is the key decision you'll make repeatedly; the official docs are the cleanest source for the boundary rules. ⏱ ~15 min

#### Phase 3 — Applied Patterns
- `[Official Docs]` `[Hands-on]` [Next.js: App Router tutorial](https://nextjs.org/learn) — The official Next.js tutorial uses the App Router and Server Components throughout; this is the best hands-on reinforcement after reading the docs. ⏱ ~2–3 hours ⚡ Optional
- `[Vendor Blog]` `[Read now]` [Vercel: Understanding React Server Components](https://vercel.com/blog/understanding-react-server-components) — Vercel's explainer covers the architectural reasoning and performance implications in a way the reference docs don't; included because official React docs are still reference-heavy on the "why". ⏱ ~20 min

---

### Explore Further

**Deep internals** — Understand the RSC protocol and rendering pipeline
- `[Official Docs]` `[Bookmark as reference]` [React docs: Server Functions](https://react.dev/reference/rsc/server-functions) — The companion to Server Components for mutations and actions; read this when you start building interactive features.

**Migration patterns** — Moving from Pages Router or client-only React
- `[Official Docs]` `[Skim]` [Next.js: Migrating from Pages Router](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration) — Useful if you have an existing Next.js app and need to adopt RSC incrementally.

---

### Checkpoints
- [ ] I can explain what runs on the server vs. the client and why that distinction matters for bundle size and data fetching.
- [ ] I can decide when to add "use client" and articulate the tradeoff.
- [ ] I can build a simple page with server-rendered data and a client-interactive section.
- [ ] I can identify outdated RSC content (pre-stable, pre-App Router) and skip it.

### Avoid for Now
- Do not read pre-2024 blog posts about RSC — the API and mental model changed significantly before stabilization.
- Do not try to understand the RSC wire protocol before you can build a working page with the App Router.
- Do not mix Pages Router and App Router patterns in the same learning session; pick one.

### Next Topics
- Server Actions and form handling in Next.js
- Streaming and Suspense with Server Components
- Caching and revalidation strategies in the App Router
- RSC outside Next.js (Remix, Waku, raw React)

---

**Navigator's Note:** RSC is still settling — the ecosystem moves fast and blog content ages quickly. Anchor yourself on the official React docs and Next.js docs, and be skeptical of anything that doesn't specify which React/Next.js version it covers. The best way to internalize the server/client boundary is to build a small page and move a component back and forth across the "use client" line to see what breaks.
