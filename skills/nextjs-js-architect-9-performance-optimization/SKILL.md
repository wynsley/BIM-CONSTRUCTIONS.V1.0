---
name: nextjs-js-architect-9-performance-optimization
description: Section 9 of the Next.js JS Architect skill: Performance Optimization
---

## 9. Performance Optimization

### React Compiler — automatic memoization (React 19+)

React Compiler analyzes your components at **build time** and automatically inserts memoization. With the compiler enabled, **most manual `useMemo`, `useCallback`, and `React.memo` usage becomes unnecessary**.

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};

module.exports = nextConfig;
```

**What the compiler handles automatically:**

- Memoizing expensive computations (replaces `useMemo`)
- Stabilizing callback references (replaces `useCallback`)
- Skipping re-renders for unchanged props (replaces `React.memo`)

**When manual memoization is still needed:**

- Components with **side effects** that depend on specific reference identity
- Libraries/utilities that the compiler can't statically analyze
- Situations where you need **correctness guarantees** (not just performance)

> **For new projects:** Enable React Compiler and drop manual `useMemo`/`useCallback`/`React.memo` by default.

### Next.js-specific optimizations

```jsx
// Image optimization — always use next/image
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero banner"
  width={1200}
  height={600}
  priority            // Above the fold → preload
  placeholder="blur"  // Show blurred version while loading
/>

// Font optimization — use next/font
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

// In root layout:
<html className={inter.variable}>
```

### Code splitting in Next.js

```jsx
// Dynamic imports for heavy client components
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/shared/ui/RichTextEditor/RichTextEditor"),
  {
    loading: () => <p>Loading editor...</p>,
    ssr: false, // Client-only component
  },
);

const ChartWidget = dynamic(
  () => import("@/shared/ui/ChartWidget/ChartWidget"),
  { ssr: false },
);
```

### Performance anti-patterns — NEVER do these

```jsx
// [NO] Index as key
{items.map((item, i) => <Item key={i} />)}

// [OK] Stable unique key
{items.map(item => <Item key={item.id} />)}

// [NO] Unnecessary 'use client' on a component that doesn't need it
'use client'; // Don't add this if the component has no interactivity!

// [NO] Fetching data in a Client Component when it could be a Server Component
'use client';
useEffect(() => { fetch('/api/data')... }, []); // Should be RSC fetch

// [NO] Unnecessary useEffect for derived state
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState(''); // [NO] Derived state
useEffect(() => setFullName(`${firstName} ${lastName}`), [firstName, lastName]);

// [OK] Compute at render
const fullName = `${firstName} ${lastName}`;

// [NO] Importing a Zustand store in a Server Component
// Server Components cannot use client-only stores

// [NO] Using { cache: 'no-store' } when ISR would suffice
// Unnecessary dynamic rendering kills performance
```

---
