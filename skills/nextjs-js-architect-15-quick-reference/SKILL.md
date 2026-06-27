---
name: nextjs-js-architect-15-quick-reference
description: Section 15 of the Next.js JS Architect skill: Quick Reference
---

## 15. Quick Reference

### CLI commands

| Command                         | Purpose                             |
| ------------------------------- | ----------------------------------- |
| `npx create-next-app@latest ./` | Create new Next.js project          |
| `npm run dev`                   | Start dev server                    |
| `npm run build`                 | Build for production                |
| `npm run start`                 | Start production server             |
| `npm run lint`                  | Run ESLint (next lint)              |
| `npm run test`                  | Run unit/integration tests (Vitest) |
| `npm run test:e2e`              | Run Playwright E2E tests            |
| `npx playwright test`           | Run E2E tests directly              |

### Architecture principles

1. **Audit first, write second** — always check existing components and conventions before adding anything new
2. **RSC by default** — every component is a Server Component unless it needs `'use client'`
3. **JSDoc everywhere** — no undocumented exports; treat missing JSDoc as a bug
4. **CSS Modules only** — no Tailwind, no CSS-in-JS, no inline styles for layout
5. **Composition over inheritance** — prefer compound components, render props, and children
6. **Data down, events up** — fetch data in Server Components, pass as props, use Server Actions for mutations
7. **State as low as necessary** — keep state local; lift only when truly shared
8. **Validate all inputs** — Zod schemas in every Server Action, no exceptions
9. **Accessibility is not optional** — semantic HTML, keyboard nav, ARIA where needed
10. **Errors must be visible** — to users (`error.jsx` fallback) and to developers (monitoring)
11. **Performance is a feature** — use ISR over SSR; use `next/image` and `next/font`; measure before optimizing

### Component type decision guide

| Question                                       | Answer                                       |
| ---------------------------------------------- | -------------------------------------------- |
| Renders UI only, no state, no interactivity?   | Server Component (default — no directive)    |
| Needs `useState`, `useEffect`, event handlers? | Client Component (`'use client'`)            |
| Fetches data at render time?                   | Server Component with `async`                |
| Used in multiple features?                     | `src/shared/ui/`                             |
| Used in one feature only?                      | `src/features/<name>/components/`            |
| Wraps behavior around children?                | Compound component (Context, `'use client'`) |

### State placement decision guide

| Question                             | Answer                                                    |
| ------------------------------------ | --------------------------------------------------------- |
| Data from the server (page load)?    | Fetch in Server Component, pass as props                  |
| Used by one Client Component?        | `useState` / `useReducer`                                 |
| Used by parent + children (client)?  | Lift state up + pass as props                             |
| Used by unrelated Client Components? | React Context (low frequency) or Zustand (high frequency) |
| Persisted across sessions?           | Zustand `persist` middleware or cookies                   |
| URL-shareable state?                 | URL search params (`useSearchParams`)                     |
| Mutation / form submission?          | Server Action + `useActionState`                          |

### Data fetching decision guide

| Question                         | Answer                                  |
| -------------------------------- | --------------------------------------- |
| Page data needed at render?      | `fetch()` in Server Component           |
| Data rarely changes?             | `{ cache: 'force-cache' }` (default)    |
| Data changes periodically?       | `{ next: { revalidate: N } }` (ISR)     |
| Data is real-time/user-specific? | `{ cache: 'no-store' }` (dynamic)       |
| After a mutation?                | `revalidatePath()` or `revalidateTag()` |
| User-triggered mutation?         | Server Action                           |

### Accessibility checklist

- [ ] Semantic HTML elements used (`<nav>`, `<button>`, `<h1-h6>`, `<main>`, etc.)
- [ ] All images have `alt` text (use `next/image`)
- [ ] All form inputs have associated `<label>` or `aria-label`
- [ ] All interactive elements are keyboard accessible
- [ ] Visible focus indicators with `:focus-visible`
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Error messages linked to inputs via `aria-describedby`
- [ ] Dynamic content uses `aria-live` regions
- [ ] Skip navigation link present

### Error handling checklist

- [ ] `error.jsx` at root level (global catch)
- [ ] `error.jsx` per route section (feature-level)
- [ ] `loading.jsx` for async route segments
- [ ] `not-found.jsx` for 404 pages
- [ ] All Server Actions have try/catch with user-friendly messages
- [ ] All Server Actions validate inputs with Zod
- [ ] Errors are logged to monitoring service
- [ ] Retry mechanisms for recoverable errors (`reset()` in error.jsx)

### Security checklist

- [ ] Security headers in `next.config.js`
- [ ] CSP configured
- [ ] No secrets in `NEXT_PUBLIC_` env vars
- [ ] All Server Action inputs validated with Zod
- [ ] Session tokens in `httpOnly`, `secure` cookies (not `localStorage`)
- [ ] Authentication middleware protects private routes
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] Rate limiting on auth actions
- [ ] Permissions Policy restricts powerful APIs

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [React Official Docs](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [useActionState](https://react.dev/reference/react/useActionState)
- [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)
- [useOptimistic](https://react.dev/reference/react/useOptimistic)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [JSDoc Reference](https://jsdoc.app/)
- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/docs/intro)
- [Vitest](https://vitest.dev/guide/)
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [web.dev Performance](https://web.dev/learn-core-web-vitals/)
