## Mentorship Compass: React Server Components

**Clarification:** React Server Components depend heavily on framework context. Are you learning them in Next.js App Router, Remix, or raw React?

*(The provisional compass below assumes Next.js App Router because that is the most common production context. Adjust the sources if the framework changes.)*

**Assumptions:**
- Level: Intermediate React developer familiar with client-side React
- Goal: Understand the server/client component model without wasting time on outdated material
- Time budget: A focused weekend
- Context: Assumes Next.js App Router unless corrected

**Why this topic is tricky:** React Server Components moved faster than the surrounding documentation and blog ecosystem for a while. Many older posts describe pre-stable behavior or framework-specific details as if they were universal React rules.

---

### Learning Compass

#### Iteration 1 - The React-Level Mental Model
- **Read first:** `[Official Docs]` `[Read first]` [React docs: Server Components](https://react.dev/reference/rsc/server-components) - Start with React's own model so framework behavior does not become your only definition of Server Components.
- **Check next:** `[Official Docs]` `[Read next]` [React docs: 'use client'](https://react.dev/reference/rsc/use-client) - This is the boundary marker you will keep revisiting, so read it before framework-specific routing and data conventions.
- **What to notice:** Server Components are not "SSR components"; they define where component code runs and what JavaScript reaches the client.
- **Stop before:** Do not read old RSC blog posts until you know whether they describe current React and your framework.

#### Iteration 2 - The Framework Boundary
- **Read first:** `[Official Docs]` `[Read first]` [Next.js: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) - Read this after React's docs because Next.js is where most developers encounter the model in routing, layouts, and data boundaries.
- **Check next:** `[Official Docs]` `[Skim for context]` [Next.js: App Router](https://nextjs.org/docs/app/building-your-application/routing) - Skim routing and layouts to understand why Server Components feel native in the App Router.
- **What to notice:** Next.js makes Server Components the default in the App Router, so client interactivity becomes the explicit opt-in.
- **Stop before:** Do not mix Pages Router mental models with App Router rules.

#### Iteration 3 - Data and Mutations
- **Read first:** `[Official Docs]` `[Read first]` [Next.js: Data Fetching and Caching](https://nextjs.org/docs/app/building-your-application/data-fetching) - Read this to understand why RSC changes where data access belongs and how caching enters the design.
- **Check next:** `[Official Docs]` `[Bookmark]` [React docs: Server Functions](https://react.dev/reference/rsc/server-functions) - Bookmark this as the adjacent mutation model; it is related but should not be conflated with Server Components.
- **What to notice:** RSC changes data placement decisions before it changes UI syntax.
- **Stop before:** Do not jump into Server Actions, forms, or cache invalidation details before you can explain the server/client split.

#### Iteration 4 - Architectural Rationale
- **Read first:** `[Vendor Blog]` `[Read next]` [Vercel: Understanding React Server Components](https://vercel.com/blog/understanding-react-server-components) - Use this for architectural framing and performance motivation that the reference docs do not fully narrate.
- **Check next:** `[Official Docs]` `[Bookmark]` [Next.js: Caching](https://nextjs.org/docs/app/building-your-application/caching) - Bookmark caching because it becomes the next source of confusion after the component boundary.
- **What to notice:** Most RSC mistakes come from losing track of which boundary you are reasoning about: component execution, data access, serialization, or caching.
- **Stop before:** Do not treat every performance issue as an RSC issue.

---

### Explore Later

**Migration context** - Useful if you have an existing Next.js app.
- `[Official Docs]` `[Skim for context]` [Next.js: Migrating from Pages Router](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration) - Skim this only when migration from old Next.js patterns is part of your situation.

**Practice later** - Use only after the model is clear.
- `[Official Tutorial]` `[Practice later]` [Next.js Learn](https://nextjs.org/learn) - Save this for a guided pass after you understand the server/client vocabulary.

---

### Checkpoints
- [ ] I can explain why Server Components are not the same thing as traditional SSR.
- [ ] I can decide whether a concept belongs to React RSC or to my framework's implementation.
- [ ] I can explain what the `"use client"` boundary means.
- [ ] I can identify outdated RSC content before trusting it.

### Avoid for Now
- Do not read pre-stable RSC posts unless they clearly state current React and framework versions.
- Do not mix Pages Router and App Router guidance.
- Do not begin with Server Actions or caching internals.
- Do not assume every framework implements RSC the same way.

### Next Topics
- Server Functions and Server Actions
- Streaming and Suspense
- Next.js caching and revalidation
- RSC outside Next.js

---

**Navigator's Note:** Anchor yourself on current React docs first, then layer the framework-specific rules on top. RSC is easy to misunderstand when examples, framework defaults, and old blog posts are mixed together. Keep asking which boundary a resource is explaining before you trust its advice.
