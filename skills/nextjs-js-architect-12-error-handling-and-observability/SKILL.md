---
name: nextjs-js-architect-12-error-handling-and-observability
description: Section 12 of the Next.js JS Architect skill: Error Handling and Observability
---

## 12. Error Handling and Observability

### Next.js Error Boundaries (`error.jsx`)

Next.js App Router has built-in error boundary support via `error.jsx` files:

```jsx
// app/error.jsx — Global error boundary
"use client"; // error.jsx MUST be a Client Component

import styles from "./error.module.css";

/**
 * Global error boundary. Catches unhandled errors in the route tree.
 *
 * @param {Object} props
 * @param {Error} props.error - The thrown error.
 * @param {() => void} props.reset - Function to retry rendering the segment.
 * @returns {JSX.Element}
 */
export default function GlobalError({ error, reset }) {
  // Log to monitoring service in production
  if (process.env.NODE_ENV === "production") {
    // Sentry.captureException(error);
  }

  return (
    <main className={styles.errorPage} role="alert">
      <h1>Something went wrong</h1>
      <p>
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button onClick={reset}>Try again</button>
      <a href="/">Go home</a>
    </main>
  );
}
```

```jsx
// app/blog/error.jsx — Feature-specific error boundary
"use client";

/**
 * Blog section error boundary.
 *
 * @param {Object} props
 * @param {Error} props.error
 * @param {() => void} props.reset
 * @returns {JSX.Element}
 */
export default function BlogError({ error, reset }) {
  return (
    <div role="alert">
      <h2>Failed to load blog content</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

### Loading states (`loading.jsx`)

```jsx
// app/blog/loading.jsx — Automatic loading UI with Suspense
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

/**
 * Loading UI shown while the blog page segment is loading.
 * @returns {JSX.Element}
 */
export default function BlogLoading() {
  return (
    <main>
      <Skeleton width="200px" height="2rem" />
      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
      </div>
    </main>
  );
}
```

### Not Found pages

```jsx
// app/not-found.jsx — Global 404
/**
 * @returns {JSX.Element}
 */
export default function NotFound() {
  return (
    <main role="alert">
      <h1>404 — Page Not Found</h1>
      <p>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a href="/">Go home</a>
    </main>
  );
}
```

### Error boundary placement strategy

```
app/
  layout.jsx        → Root layout (wraps everything)
  error.jsx         → Global error boundary (catches unhandled errors)
  loading.jsx       → Global loading state
  not-found.jsx     → Global 404

  blog/
    error.jsx       → Blog-specific error boundary
    loading.jsx     → Blog-specific loading state
    page.jsx        → Blog list (RSC)
    [slug]/
      error.jsx     → Post-specific error boundary
      loading.jsx   → Post-specific loading state
      page.jsx      → Blog post detail (RSC)

  dashboard/
    error.jsx       → Dashboard-specific error boundary
    loading.jsx
    page.jsx
```

### Reusable Client-side Error Boundary

For widget-level error isolation within a page (not route-level):

```jsx
// src/shared/middleware/ErrorBoundary.jsx
"use client";

import { Component } from "react";

/**
 * Reusable error boundary for client-side component isolation.
 * Use for widget-level error handling within a page.
 *
 * @extends {Component<{children: React.ReactNode, fallback?: React.ReactNode | ((error: Error, reset: () => void) => React.ReactNode), onError?: (error: Error, errorInfo: import('react').ErrorInfo) => void, name?: string}, {hasError: boolean, error: Error|null}>}
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `[ErrorBoundary${this.props.name ? `:${this.props.name}` : ""}]`,
      error,
      errorInfo,
    );
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback(this.state.error, this.handleReset);
      }
      return (
        this.props.fallback || (
          <div role="alert">
            <h2>Something went wrong</h2>
            <p>
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button onClick={this.handleReset}>Try again</button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
```

### Monitoring and telemetry

```js
// src/shared/middleware/monitoring.js

/**
 * @typedef {Object} LogEntry
 * @property {'info' | 'warn' | 'error'} level
 * @property {string} message
 * @property {string} timestamp
 * @property {string} [component]
 * @property {string} [action]
 * @property {string} [userId]
 * @property {number} [duration]
 * @property {Object} [metadata]
 */

class MonitoringService {
  /** @type {MonitoringService | null} */
  static instance = null;

  static getInstance() {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  /**
   * Logs a structured entry to console (dev) or external service (prod).
   *
   * @param {Omit<LogEntry, 'timestamp'>} entry
   */
  log(entry) {
    /** @type {LogEntry} */
    const fullEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    };

    if (process.env.NODE_ENV === "development") {
      const fn =
        entry.level === "error"
          ? console.error
          : entry.level === "warn"
            ? console.warn
            : console.log;
      fn(`[${entry.level.toUpperCase()}]`, entry.message, entry.metadata ?? "");
    }

    if (process.env.NODE_ENV === "production") {
      this.sendToExternal(fullEntry);
    }
  }

  /**
   * @param {LogEntry} entry
   * @private
   */
  sendToExternal(entry) {
    // POST /api/monitoring/logs or use Sentry/Datadog SDK
  }
}

export const monitoring = MonitoringService.getInstance();
```

---
