---
name: nextjs-js-architect-3-component-architecture-rsc-first
description: Section 3 of the Next.js JS Architect skill: Component Architecture — RSC-First
---

## 3. Component Architecture — RSC-First

### The Server/Client boundary — core principle

> **Default is Server.** Every component in the `app/` directory and `src/` directory is a React Server Component (RSC) unless explicitly marked with `'use client'`. Only add `'use client'` when the component requires interactivity, browser APIs, or React hooks that run on the client (`useState`, `useEffect`, event handlers, etc.).

```
Server Component (default)          Client Component ('use client')
─────────────────────────────       ─────────────────────────────────
✓ Direct DB/API access              ✓ useState, useEffect, useRef
✓ Access to fs, env vars            ✓ Event handlers (onClick, onChange)
✓ async/await in component body     ✓ Browser APIs (window, localStorage)
✓ Zero client JS bundle impact      ✓ Third-party client libs (Zustand, etc.)
✗ No useState/useEffect             ✗ Cannot access server-only resources
✗ No event handlers                 ✗ Adds to client JS bundle
✗ No browser APIs                   ✗ No async component body
```

### Server Component (RSC) — Data fetching

```jsx
// app/blog/page.jsx — Server Component (default, no directive)
import { BlogGrid } from "@/features/blog/components/BlogGrid/BlogGrid";
import { Suspense } from "react";
import { BlogGridSkeleton } from "@/features/blog/components/BlogGrid/BlogGridSkeleton";

/**
 * Blog listing page. Fetches posts on the server and renders a grid.
 *
 * @returns {Promise<JSX.Element>}
 */
export default async function BlogPage() {
  return (
    <main>
      <h1>Blog</h1>
      <Suspense fallback={<BlogGridSkeleton />}>
        <BlogPostsList />
      </Suspense>
    </main>
  );
}

/**
 * Async RSC that fetches and renders blog posts.
 * Wrapped in Suspense by the parent for streaming.
 *
 * @returns {Promise<JSX.Element>}
 */
async function BlogPostsList() {
  const posts = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  }).then((res) => res.json());

  return <BlogGrid posts={posts} />;
}
```

### Client Component — Interactivity

```jsx
// src/features/blog/components/LikeButton/LikeButton.jsx
"use client";

import { useState, useTransition } from "react";
import styles from "./LikeButton.module.css";

/**
 * Interactive like button for blog posts. Client Component.
 *
 * @param {Object} props
 * @param {string} props.postId - The post ID to like.
 * @param {number} props.initialLikes - Initial like count from server.
 * @param {Function} props.onLike - Server Action to persist the like.
 * @returns {JSX.Element}
 */
export function LikeButton({ postId, initialLikes, onLike }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    setLikes((prev) => prev + 1); // Optimistic update
    startTransition(async () => {
      await onLike(postId);
    });
  };

  return (
    <button
      className={styles.likeButton}
      onClick={handleLike}
      disabled={isPending}
      aria-label={`Like post, current count: ${likes}`}
    >
      ♥ {likes}
    </button>
  );
}
```

### Presentational Components (Pure/Stateless)

Receive data via props, no side effects, no state (or only UI state). These are Server Components by default.

```jsx
// src/shared/ui/Card/Card.jsx — Server Component (no directive needed)
import styles from "./Card.module.css";
import { cn } from "@/shared/lib/cn";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {'default' | 'elevated'} [props.variant='default']
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
export function Card({
  title,
  description,
  variant = "default",
  children,
  className,
}) {
  return (
    <article className={cn(styles.card, styles[variant], className)}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.content}>{children}</div>}
    </article>
  );
}
```

### Container Pattern — RSC Shell + Client Island

```jsx
// app/blog/[slug]/page.jsx — Server Component (fetches data, delegates to client for interactivity)
import { notFound } from "next/navigation";
import { Card } from "@/shared/ui/Card/Card";
import { LikeButton } from "@/features/blog/components/LikeButton/LikeButton";
import { likePost } from "@/features/blog/actions/likePost";

/**
 * Blog post detail page. Server Component shell with client interactive islands.
 *
 * @param {Object} props
 * @param {Object} props.params
 * @param {string} props.params.slug
 * @returns {Promise<JSX.Element>}
 */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 },
  }).then((res) => {
    if (!res.ok) return null;
    return res.json();
  });

  if (!post) notFound();

  return (
    <main>
      <article>
        <Card title={post.title} description={post.excerpt} />
        <div>{post.content}</div>
        {/* Client island for interactivity */}
        <LikeButton
          postId={post.id}
          initialLikes={post.likes}
          onLike={likePost}
        />
      </article>
    </main>
  );
}
```

### Compound Components (Client-side shared state)

```jsx
// src/shared/ui/Tabs/Tabs.jsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Tabs.module.css";

/** @type {React.Context<{activeTab: string, setActiveTab: (tab: string) => void} | null>} */
const TabsContext = createContext(null);

/**
 * @returns {{activeTab: string, setActiveTab: (tab: string) => void}}
 */
function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx)
    throw new Error("Tabs compound components must be used within <Tabs>");
  return ctx;
}

/**
 * Root Tabs container. Manages active tab state.
 *
 * @param {Object} props
 * @param {string} props.defaultTab - Initially active tab ID.
 * @param {React.ReactNode} props.children
 * @param {(tab: string) => void} [props.onChange] - Called when active tab changes.
 * @returns {JSX.Element}
 */
export function Tabs({ defaultTab, children, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const handleChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      onChange?.(tab);
    },
    [onChange],
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange }}>
      <div role="tablist" className={styles.tabs}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/**
 * Individual tab button.
 *
 * @param {Object} props
 * @param {string} props.id - Unique tab identifier.
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <button
      role="tab"
      id={`tab-${id}`}
      aria-selected={activeTab === id}
      aria-controls={`panel-${id}`}
      tabIndex={activeTab === id ? 0 : -1}
      onClick={() => setActiveTab(id)}
      className={cn(styles.tab, activeTab === id && styles.tabActive)}
    >
      {children}
    </button>
  );
}

/**
 * Tab panel — renders content for the active tab.
 *
 * @param {Object} props
 * @param {string} props.id - Must match a Tab's id.
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element|null}
 */
export function TabPanel({ id, children }) {
  const { activeTab } = useTabsContext();
  if (activeTab !== id) return null;
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className={styles.panel}
    >
      {children}
    </div>
  );
}
```

### Sub-folder Pattern for Complex Components

When a component grows beyond ~150 lines or accumulates sub-parts, promote it to a folder:

```
shared/ui/DataTable/
  DataTable.jsx            → main component ('use client' if interactive)
  DataTable.module.css
  DataTable.test.jsx
  parts/
    TableHeader.jsx
    TableRow.jsx
    TablePagination.jsx
    TableFilters.jsx
  hooks/
    useTableSort.js
    useTableSelection.js
  utils/
    columnHelpers.js
  index.js                 → re-exports public API
```

`DataTable/index.js`:

```js
export { DataTable } from "./DataTable";
```

---
