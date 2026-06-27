---
name: nextjs-js-architect-0-before-you-write-any-code-consistency-protocol
description: Section 0 of the Next.js JS Architect skill: BEFORE YOU WRITE ANY CODE — Consistency Protocol
---

## 0. BEFORE YOU WRITE ANY CODE — Consistency Protocol

> **This section is mandatory. Skip it and you will break project consistency.**

Every time you are asked to create or modify anything in an existing Next.js project, you MUST run this audit first. No exceptions.

### Step 1 — Audit existing components

```
Does a similar component already exist in src/shared/ui/?
  YES → extend or compose it. Never create a duplicate.
  NO  → create it there if it's reusable, or in src/features/<name>/components/ if it's feature-specific.
```

### Step 2 — Read the design system

Before writing a single style value, check:

- `app/globals.css` for CSS custom properties (design tokens)
- Existing CSS Module files in `src/shared/ui/`
- Existing component patterns in `src/shared/ui/`

- **ONLY use tokens that already exist.**
- Never introduce raw color or spacing values outside of the design tokens.
- If a needed token is missing, ADD IT to `app/globals.css` first, then use it.

### Step 3 — Inherit naming conventions

Before naming a new component, hook, or file, look at 2–3 existing components and match their pattern exactly.

| Type                   | Convention                           | Example                                    |
| ---------------------- | ------------------------------------ | ------------------------------------------ |
| React Components       | PascalCase                           | `BlogCard.jsx`, `AuthGuard.jsx`            |
| Server Components      | PascalCase, no directive             | `BlogList.jsx` (default RSC)               |
| Client Components      | PascalCase, `'use client'` top       | `LikeButton.jsx`                           |
| Hooks                  | camelCase, prefixed `use`            | `useAuth.js`, `usePagination.js`           |
| Server Actions         | camelCase, `'use server'` top        | `createPost.js`, `deleteComment.js`        |
| Utilities              | camelCase                            | `formatDate.js`, `cn.js`                   |
| Context providers      | PascalCase + `Provider`              | `AuthProvider.jsx`                         |
| JSDoc type definitions | PascalCase via `@typedef`            | `@typedef {Object} UserProfile`            |
| Feature folders        | kebab-case                           | `blog/`, `user-profile/`                   |
| Route segments         | kebab-case                           | `app/blog/[slug]/page.jsx`                 |
| Constants              | SCREAMING_SNAKE_CASE                 | `MAX_POSTS_PER_PAGE`                       |
| CSS Modules            | PascalCase import, camelCase classes | `import styles from './Button.module.css'` |

### Step 4 — Check the rendering strategy

Before adding data-fetching or interactivity:

- **Is this component interactive?** Does it use `useState`, `useEffect`, event handlers, or browser APIs?
  - YES → Add `'use client'` directive at the top. This is a Client Component.
  - NO → Leave it as a Server Component (default). **Never add `'use client'` unless required.**
- Does the route segment already have a `loading.jsx` or `error.jsx`?
- Match the existing caching and revalidation strategy — don't introduce conflicting `revalidate` values.

### Step 5 — Consistency checklist before delivering code

Before responding with any code, verify:

- [ ] No raw color or spacing values outside the design tokens in `globals.css`
- [ ] No duplicate component that already exists in `shared/ui/`
- [ ] Components follow PascalCase; hooks follow `use` prefix
- [ ] All component props are documented with `@param` JSDoc annotations
- [ ] All functions have `@returns` JSDoc annotations
- [ ] New shared components placed in `shared/ui/`, feature-specific in `features/<name>/`
- [ ] No inline `style={{}}` for layout (use CSS Modules only)
- [ ] All form elements have associated `<label>` or `aria-label`
- [ ] No missing key props in lists
- [ ] No direct DOM manipulations — use `useRef` + effects
- [ ] All async operations have proper error handling (try/catch or `.catch`)
- [ ] `'use client'` is only present where strictly necessary
- [ ] Server Actions validate all inputs with Zod before processing

---
