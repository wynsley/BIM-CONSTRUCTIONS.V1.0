---
name: nextjs-js-architect-8-styling-architecture-css-modules-exclusively
description: Section 8 of the Next.js JS Architect skill: Styling Architecture — CSS Modules Exclusively
---

## 8. Styling Architecture — CSS Modules Exclusively

### Design tokens in `globals.css`

```css
/* app/globals.css */
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #dbeafe;
  --color-danger: #dc2626;
  --color-danger-hover: #b91c1c;
  --color-success: #16a34a;
  --color-warning: #d97706;

  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-muted: #f1f5f9;
  --color-muted-foreground: #64748b;
  --color-border: #e2e8f0;
  --color-ring: #93c5fd;

  /* Typography */
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  /* Borders */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}

/* Dark mode tokens */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-foreground: #f8fafc;
    --color-muted: #1e293b;
    --color-muted-foreground: #94a3b8;
    --color-border: #334155;
  }
}

/* Global reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--color-foreground);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Visually hidden utility (for screen readers) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### CSS Modules pattern

```css
/* src/shared/ui/Button/Button.module.css */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  font-family: var(--font-sans);
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base);
  line-height: 1.5;
}

.btn:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background-color: var(--color-primary);
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.danger {
  background-color: var(--color-danger);
  color: white;
}

.danger:hover:not(:disabled) {
  background-color: var(--color-danger-hover);
}

.ghost {
  background: transparent;
  color: var(--color-foreground);
}

.ghost:hover:not(:disabled) {
  background-color: var(--color-muted);
}

.sm {
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
}
.lg {
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-base);
}

.spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

```jsx
// src/shared/ui/Button/Button.jsx
import styles from "./Button.module.css";
import { cn } from "@/shared/lib/cn";

/**
 * Reusable button component with variants and sizes.
 *
 * @param {Object} props
 * @param {'primary' | 'ghost' | 'danger'} [props.variant='primary'] - Visual variant.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Size variant.
 * @param {boolean} [props.loading=false] - Show loading spinner.
 * @param {boolean} [props.disabled] - Disable the button.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.ReactNode} props.children - Button content.
 * @returns {JSX.Element}
 */
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        styles.btn,
        styles[variant],
        size !== "md" && styles[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
```

### className utility (no Tailwind merge needed)

```js
// src/shared/lib/cn.js
import clsx from "clsx";

/**
 * Merges class names conditionally using clsx.
 *
 * @param {...(string | Object | Array | undefined | null | false)} inputs - Class values.
 * @returns {string} Merged class string.
 */
export function cn(...inputs) {
  return clsx(inputs);
}
```

### Styling rules (enforced)

| Rule                                             | Rationale                                            |
| ------------------------------------------------ | ---------------------------------------------------- |
| **Only CSS Modules** for component styles        | Scoped by default, zero runtime cost, works with RSC |
| **Only CSS custom properties** for design tokens | Single source of truth in `globals.css`              |
| **No inline `style={{}}` for layout**            | Use CSS Modules classes instead                      |
| **No Tailwind**                                  | Project uses CSS Modules exclusively                 |
| **No CSS-in-JS** (styled-components, emotion)    | Incompatible with RSC, runtime cost                  |
| **Use `composes`** for CSS Module inheritance    | `composes: btn from './Button.module.css';`          |

---
