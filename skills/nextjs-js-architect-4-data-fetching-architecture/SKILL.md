---
name: nextjs-js-architect-4-data-fetching-architecture
description: Section 4 of the Next.js JS Architect skill: Data Fetching Architecture
---

## 4. Data Fetching Architecture

### Decision tree for data fetching

```
Is this data needed at render time (page load)?
  YES → Fetch in a Server Component with native fetch()
        → Use { next: { revalidate: N } } for ISR
        → Use { cache: 'no-store' } for dynamic data
  NO  → Is this triggered by a user action (form submit, button click)?
          YES → Use a Server Action ('use server')
          NO  → Is this a client-side interaction (search, filter, infinite scroll)?
                  YES → Use fetch in a Client Component inside useEffect or event handler
                  NO  → Re-evaluate: it should be server-fetched.
```

### Server-side data fetching (RSC)

```jsx
// src/features/blog/lib/blogService.js
// This module runs ONLY on the server — imported by Server Components and Server Actions.

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} authorId
 * @property {string} createdAt
 * @property {number} likes
 */

const API_BASE = process.env.API_URL; // Server-only env var (no NEXT_PUBLIC_ prefix)

/**
 * Fetches all blog posts with optional category filter.
 * Uses ISR with 60-second revalidation.
 *
 * @param {{ category?: string, page?: number }} [filters]
 * @returns {Promise<BlogPost[]>}
 */
export async function getBlogPosts(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.page) params.set("page", String(filters.page));

  const res = await fetch(`${API_BASE}/posts?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetches a single blog post by slug.
 *
 * @param {string} slug
 * @returns {Promise<BlogPost | null>}
 */
export async function getBlogPost(slug) {
  const res = await fetch(`${API_BASE}/posts/${slug}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);

  return res.json();
}
```

```jsx
// app/blog/page.jsx — uses the service in a Server Component
import { getBlogPosts } from "@/features/blog/lib/blogService";
import { BlogGrid } from "@/features/blog/components/BlogGrid/BlogGrid";

/**
 * @param {Object} props
 * @param {Object} props.searchParams
 * @returns {Promise<JSX.Element>}
 */
export default async function BlogPage({ searchParams }) {
  const { category, page } = await searchParams;
  const posts = await getBlogPosts({ category, page: Number(page) || 1 });

  return (
    <main>
      <h1>Blog</h1>
      <BlogGrid posts={posts} />
    </main>
  );
}
```

### Next.js fetch caching strategies

| Strategy      | fetch option                           | When to use                     |
| ------------- | -------------------------------------- | ------------------------------- |
| Static (SSG)  | `{ cache: 'force-cache' }` (default)   | Content that rarely changes     |
| ISR           | `{ next: { revalidate: 60 } }`         | Content updated periodically    |
| Dynamic (SSR) | `{ cache: 'no-store' }`                | User-specific or real-time data |
| On-demand     | `revalidatePath()` / `revalidateTag()` | After Server Action mutations   |

### Parallel and sequential data fetching

```jsx
// app/dashboard/page.jsx — parallel fetching for independent data
import {
  getStats,
  getRecentActivity,
  getNotifications,
} from "@/features/dashboard/lib/dashboardService";

/**
 * Dashboard page with parallel data fetching for maximum performance.
 * @returns {Promise<JSX.Element>}
 */
export default async function DashboardPage() {
  // Parallel: all three requests fire simultaneously
  const [stats, activity, notifications] = await Promise.all([
    getStats(),
    getRecentActivity(),
    getNotifications(),
  ]);

  return (
    <main>
      <h1>Dashboard</h1>
      <StatsPanel stats={stats} />
      <ActivityFeed activity={activity} />
      <NotificationList notifications={notifications} />
    </main>
  );
}
```

```jsx
// Sequential: when one fetch depends on another's result
export default async function UserPostsPage({ params }) {
  const { userId } = await params;
  const user = await getUser(userId); // must complete first
  const posts = await getPostsByAuthor(user.id); // depends on user.id

  return (
    <main>
      <h1>Posts by {user.name}</h1>
      <BlogGrid posts={posts} />
    </main>
  );
}
```

---
