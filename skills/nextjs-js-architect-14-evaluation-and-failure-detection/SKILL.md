---
name: nextjs-js-architect-14-evaluation-and-failure-detection
description: Section 14 of the Next.js JS Architect skill: Evaluation and Failure Detection
---

## 14. Evaluation and Failure Detection

### Anti-pattern Mapping

| #   | Anti-pattern                                      | Severity | Description                                                       | Solution                                                                           |
| --- | ------------------------------------------------- | -------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1   | **Unnecessary `'use client'`**                    | CRITICAL | Adding the directive to components that don't need interactivity  | Default is Server Component; only add `'use client'` for hooks/events/browser APIs |
| 2   | **Fetching data in Client Components**            | CRITICAL | Using `useEffect` + `fetch` when data could be fetched in an RSC  | Fetch in Server Components; pass data as props                                     |
| 3   | **Missing Zod validation in Server Actions**      | CRITICAL | Processing form data without validation                           | Always `safeParse` with Zod before any DB/API operation                            |
| 4   | **Importing server modules in Client Components** | CRITICAL | Using `fs`, `db`, or server-only env vars in `'use client'` files | Keep server logic in Server Components and Server Actions                          |
| 5   | **Missing key props in lists**                    | CRITICAL | Using array index as `key` or omitting `key`                      | Use stable unique IDs; never use index                                             |
| 6   | **Swallowing errors**                             | CRITICAL | Empty `catch(e) {}` or `try/catch` without feedback               | Always log errors; show user feedback; use monitoring                              |
| 7   | **No form validation**                            | CRITICAL | Submitting forms without validation                               | Use Zod schemas; validate in Server Actions AND client-side                        |
| 8   | **Secrets in `NEXT_PUBLIC_`**                     | CRITICAL | Exposing API keys or passwords in client bundle                   | Use server-only env vars (no prefix)                                               |
| 9   | **Unnecessary effects**                           | HIGH     | `useEffect` for derived state or event handlers                   | Compute at render; use event handlers directly                                     |
| 10  | **Giant components**                              | HIGH     | Components > 200 lines with multiple responsibilities             | Split into smaller components; use composition                                     |
| 11  | **Memory leaks**                                  | HIGH     | Subscriptions, intervals, or listeners without cleanup            | Always return cleanup from `useEffect`; use AbortController                        |
| 12  | **Ignoring error boundaries**                     | HIGH     | No `error.jsx` files in route segments                            | Add `error.jsx` at route level and feature level                                   |
| 13  | **Raw style values**                              | MEDIUM   | Using hardcoded colors/spacing instead of CSS custom properties   | Use design tokens from `globals.css`                                               |
| 14  | **Inline styles for layout**                      | MEDIUM   | Using `style={{ margin: '16px' }}` for layout                     | Use CSS Modules classes                                                            |
| 15  | **Brittle selectors in tests**                    | MEDIUM   | Using CSS class names or DOM structure for queries                | Use `getByRole`, `getByLabelText`, `getByTestId`                                   |
| 16  | **Missing JSDoc**                                 | HIGH     | Exported functions/components without type annotations            | All exports must have complete JSDoc                                               |
| 17  | **No `loading.jsx`**                              | MEDIUM   | Missing loading states for async route segments                   | Add `loading.jsx` files or wrap with `<Suspense>`                                  |

### Rúbrica de Niveles de Dominio

#### Básico — Sintaxis y Componentes Simples

**Qué sabe hacer:**

- Crear componentes funcionales con JSDoc
- Distinguir Server Components de Client Components
- Usar `useState` y `useEffect` correctamente en Client Components
- Pasar props con documentación JSDoc
- Renderizar listas con `key`
- Crear rutas básicas con App Router

**Código esperado:**

```jsx
/**
 * @param {Object} props
 * @param {string} props.name
 * @param {(id: string) => void} props.onDelete
 * @returns {JSX.Element}
 */
export function Item({ name, onDelete }) {
  return (
    <li>
      {name}
      <button onClick={() => onDelete(name)}>Delete</button>
    </li>
  );
}
```

#### Intermedio — Server Actions, Data Fetching, Validaciones

**Qué sabe hacer:**

- Implementar Server Actions con Zod validation
- Usar `useActionState` y `useFormStatus` correctamente
- Fetch data en Server Components con caching strategies (ISR, SSR)
- Crear hooks personalizados con composición
- Implementar Context API en subtrees de Client Components
- Escribir CSS Modules siguiendo el sistema de tokens
- Escribir tests unitarios y de integración
- Implementar `loading.jsx` y `error.jsx`

#### Avanzado — Arquitectura, Optimización, Patrones Distribuidos

**Qué sabe hacer:**

- Diseñar arquitecturas RSC-first con islands de interactividad
- Implementar streaming con `<Suspense>` boundaries anidados
- Optimizar con parallel data fetching y `Promise.all`
- Manejar revalidación on-demand (`revalidatePath`, `revalidateTag`)
- Diseñar middleware de autenticación y seguridad
- Implementar `useOptimistic` para UX instantánea
- Diseñar estrategias de testing completas (unit + integration + E2E)
- Implementar monitoreo y telemetría custom
- Manejar Zustand con hydration safety en Next.js
- Implementar ISR, SSG y dynamic rendering strategies

### Cuellos de Botella (Common Failure Points in Production)

| #   | Bottleneck                            | Detection                               | Solution                                                                    |
| --- | ------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| 1   | **Unnecessary Client Components**     | Large JS bundle                         | Audit `'use client'` usage; move to RSC where possible                      |
| 2   | **Sequential data fetching**          | Slow page loads (waterfall)             | Use `Promise.all` for independent fetches                                   |
| 3   | **Missing ISR / over-fetching**       | High TTFB; excessive origin load        | Use `revalidate` option; cache appropriately                                |
| 4   | **Large images**                      | Slow LCP                                | Use `next/image` with proper sizes; add `priority` to above-the-fold images |
| 5   | **N+1 queries in RSC**                | Slow page render                        | Batch DB queries; use `Promise.all`                                         |
| 6   | **Memory leaks in Client Components** | Growing heap                            | Cleanup effects; remove event listeners; cancel fetch                       |
| 7   | **Unoptimized fonts**                 | CLS > 0.1                               | Use `next/font`; `font-display: swap`                                       |
| 8   | **Missing CDN/edge caching**          | Slow TTFB for static assets             | Set `Cache-Control` headers; deploy to edge                                 |
| 9   | **State thrashing**                   | Frequent `setState` in quick succession | Debounce; batch updates; use `useReducer`                                   |
| 10  | **Giant Server Component trees**      | Slow streaming start                    | Split into Suspense boundaries for progressive rendering                    |

---
