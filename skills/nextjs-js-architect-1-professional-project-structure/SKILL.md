---
name: nextjs-js-architect-1-professional-project-structure
description: Section 1 of the Next.js JS Architect skill: Professional Project Structure
---

## 1. Professional Project Structure

Next.js App Router hierarchy — each feature owns its components, hooks, styles, and actions.

```
app/                              → Next.js App Router (routes)
  layout.jsx                      → Root layout (RSC)
  globals.css                     → Global styles, reset, CSS custom properties
  page.jsx                        → Home page (RSC)
  loading.jsx                     → Global loading UI
  error.jsx                       → Global error UI ('use client')
  not-found.jsx                   → 404 page
  blog/
    page.jsx                      → Blog list page (RSC)
    [slug]/
      page.jsx                    → Blog post page (RSC)
      loading.jsx                 → Blog-specific loading
      error.jsx                   → Blog-specific error
    actions/
      createPost.js               → Server Action
      deletePost.js               → Server Action
  auth/
    login/
      page.jsx                    → Login page (RSC shell + client form)
    register/
      page.jsx                    → Register page
  dashboard/
    layout.jsx                    → Dashboard layout (RSC, auth-protected)
    page.jsx
  api/                            → Route Handlers (if needed)
    health/
      route.js
src/
  features/
    blog/
      components/
        BlogCard/
          BlogCard.jsx            → RSC or Client Component
          BlogCard.module.css
          BlogCard.test.jsx
        BlogGrid/
          BlogGrid.jsx
          BlogGrid.module.css
      hooks/
        useLikePost.js            → Client-only hook
      lib/
        blogService.js            → Data access layer (server-side)
        blogValidators.js         → Zod schemas
      index.js                    → Re-exports public API
    auth/
      components/
        LoginForm/
          LoginForm.jsx           → 'use client'
          LoginForm.module.css
          LoginForm.test.jsx
        AuthGuard.jsx
      hooks/
        useAuth.js
      lib/
        authService.js
        authValidators.js
      context/
        AuthContext.jsx           → 'use client'
      index.js
  shared/
    ui/                           → Atomic, reusable UI components
      Button/
        Button.jsx
        Button.module.css
        Button.test.jsx
      Modal/
        Modal.jsx                 → 'use client'
        Modal.module.css
        Modal.test.jsx
      Input/
        Input.jsx
        Input.test.jsx
        Input.module.css
      Card/
        Card.jsx
        Card.module.css
      Skeleton/
        Skeleton.jsx
        Skeleton.module.css
    hooks/
      useDebounce.js
      useMediaQuery.js
      useIntersectionObserver.js
    lib/
      constants.js
      utils.js
      cn.js                       → className utility (clsx)
      validators.js               → Shared Zod schemas
    types/
      jsdoc.js                    → Shared @typedef definitions (JSDoc only)
    middleware/
      ErrorBoundary.jsx           → 'use client'
    styles/
      tokens.css                  → Additional design token partials (imported by globals.css)
  store/                          → Zustand stores (client-only global state)
    cartStore.js
    uiStore.js
  test/
    setup.js                      → Test configuration
    mocks/
      handlers.js                 → MSW handlers
      server.js                   → MSW server
middleware.js                     → Next.js middleware (auth, redirects, headers)
next.config.js                    → Next.js configuration
jsconfig.json                     → Path aliases (@/ → src/)
```

### Where does a new file go? Decision tree

```
Is it used in more than one feature?
  YES → src/shared/ui/ (component) or src/shared/lib/ (utility)
  NO  → src/features/<feature-name>/components/

Is it a page/route?
  YES → app/<route-segment>/page.jsx

Is it a layout or template?
  YES → app/<route-segment>/layout.jsx or template.jsx

Is it a Server Action?
  YES → app/<route-segment>/actions/<actionName>.js or co-located in the feature

Is it a custom hook?
  YES → src/shared/hooks/ (global) or src/features/<name>/hooks/ (feature)

Is it a data service (DB queries, external APIs)?
  YES → src/features/<name>/lib/ (feature) or src/shared/lib/ (global)

Is it a React context?
  YES → src/features/<name>/context/ (feature)
```

### Configuration files

| File                   | Purpose                                                         |
| ---------------------- | --------------------------------------------------------------- |
| `jsconfig.json`        | Path aliases (`@/` → `src/`), editor intellisense for JSDoc     |
| `next.config.js`       | Next.js build, images, redirects, headers, env                  |
| `vitest.config.js`     | Test runner config                                              |
| `playwright.config.js` | E2E test config                                                 |
| `.eslintrc.cjs`        | Linting with `eslint-config-next` + `eslint-plugin-react-hooks` |
| `.prettierrc`          | Code formatting                                                 |
| `middleware.js`        | Request-level auth, redirects, security headers                 |

### JSDoc configuration (`jsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "checkJs": true,
    "strictNullChecks": true,
    "moduleResolution": "bundler",
    "target": "es2022",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*", "app/**/*"],
  "exclude": ["node_modules"]
}
```

> Enable `checkJs: true` so your editor validates JSDoc annotations as if they were TypeScript types. This catches type mismatches at edit time without a `.ts` file.

---
