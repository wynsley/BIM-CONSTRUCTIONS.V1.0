---
name: nextjs-js-architect-7-hooks-architecture
description: Section 7 of the Next.js JS Architect skill: Hooks Architecture
---

## 7. Hooks Architecture

### Rules of Hooks (strict)

- **Call hooks only at the top level** — never inside conditions, loops, or nested functions.
- **Call hooks only from React functions** — components or custom hooks.
- **Name custom hooks with `use` prefix** — this enables the linter.
- **Hooks only work in `'use client'` components** — Server Components cannot use hooks.

### Custom hook patterns

```js
// src/shared/hooks/useMediaQuery.js
"use client";

import { useState, useEffect } from "react";

/**
 * Listens to a CSS media query and returns whether it matches.
 *
 * @param {string} query - CSS media query string (e.g., '(min-width: 768px)').
 * @returns {boolean} Whether the media query matches.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    /** @param {MediaQueryListEvent} e */
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
```

### Hook composition pattern

```js
// src/features/blog/hooks/useBlogPostActions.js
"use client";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useTransition } from "react";

/**
 * Composes authentication and blog post action logic.
 *
 * @param {Object} post - The blog post object.
 * @param {string} post.id
 * @param {string} post.authorId
 * @param {Function} likeAction - Server Action to like the post.
 * @returns {{ canEdit: boolean, likePost: () => void, isPending: boolean }}
 */
export function useBlogPostActions(post, likeAction) {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();

  const canEdit = user?.role === "admin" || user?.id === post.authorId;

  const likePost = () => {
    startTransition(async () => {
      await likeAction(post.id);
    });
  };

  return { canEdit, likePost, isPending };
}
```

---
