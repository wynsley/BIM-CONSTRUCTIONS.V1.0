---
name: nextjs-js-architect-2-jsdoc-mandatory-type-documentation
description: Section 2 of the Next.js JS Architect skill: JSDoc — Mandatory Type Documentation
---

## 2. JSDoc — Mandatory Type Documentation

> **Rule:** Every exported function, component, hook, action, and constant MUST have complete JSDoc annotations. Undocumented exports are treated as bugs.

### Type definitions (`@typedef`)

```js
// src/shared/types/jsdoc.js
// This file exists solely for shared JSDoc type definitions.
// It is never imported at runtime — only referenced via @typedef imports in JSDoc comments.

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} [message]
 * @property {Object} [errors]
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'admin' | 'user'} role
 * @property {string} [avatarUrl]
 */

/**
 * @typedef {Object} PaginatedResult
 * @property {Array<Object>} items
 * @property {number} totalCount
 * @property {number} page
 * @property {number} pageSize
 * @property {boolean} hasNextPage
 */
```

### Component documentation

```jsx
// src/shared/ui/Card/Card.jsx
import styles from "./Card.module.css";
import { cn } from "@/shared/lib/cn";

/**
 * Presentational card component for displaying content blocks.
 *
 * @param {Object} props
 * @param {string} props.title - The card heading text.
 * @param {string} props.description - Short description under the title.
 * @param {'default' | 'elevated'} [props.variant='default'] - Visual variant.
 * @param {React.ReactNode} [props.children] - Optional body content.
 * @param {string} [props.className] - Additional CSS class names.
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

### Hook documentation

```js
// src/shared/hooks/useDebounce.js
import { useState, useEffect } from "react";

/**
 * Debounces a value by the given delay.
 *
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} [delay=300] - Debounce delay in milliseconds.
 * @returns {T} The debounced value.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

### Server Action documentation

```js
// app/blog/actions/createPost.js
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.enum(["tech", "design", "business"]),
});

/**
 * Server Action: Creates a new blog post.
 * Validates input with Zod, persists to database, and revalidates the blog listing.
 *
 * @param {Object|null} prevState - Previous action state (from useActionState).
 * @param {FormData} formData - The submitted form data.
 * @returns {Promise<{errors?: Object, message?: string}>} Action result.
 */
export async function createPost(prevState, formData) {
  const raw = {
    title: formData.get("title"),
    content: formData.get("content"),
    category: formData.get("category"),
  };

  const parsed = createPostSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  try {
    // await db.posts.create({ data: parsed.data });
    revalidatePath("/blog");
  } catch (error) {
    return { message: "Failed to create post. Please try again." };
  }

  redirect("/blog");
}
```

---
