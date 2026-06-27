---
name: nextjs-js-architect-5-server-actions-and-forms
description: Section 5 of the Next.js JS Architect skill: Server Actions and Forms
---

## 5. Server Actions and Forms

### Server Actions — the mutation model

Server Actions replace API routes for mutations. They run on the server, have access to the database, and can be called from Client Components via form `action` or programmatically.

```js
// app/blog/actions/createPost.js
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createPostSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10),
  category: z.enum(["tech", "design", "business"]),
});

/**
 * Server Action: Create a new blog post.
 *
 * @param {Object|null} prevState - Previous state from useActionState.
 * @param {FormData} formData - Submitted form data.
 * @returns {Promise<{errors?: Object, message?: string}>}
 */
export async function createPost(prevState, formData) {
  const raw = Object.fromEntries(formData);
  const parsed = createPostSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  try {
    // await db.posts.create({ data: parsed.data });
  } catch (error) {
    console.error("[createPost]", error);
    return { message: "Database error. Please try again." };
  }

  revalidatePath("/blog");
  redirect("/blog");
}
```

### Client form with `useActionState`

```jsx
// src/features/blog/components/CreatePostForm/CreatePostForm.jsx
"use client";

import { useActionState } from "react";
import { createPost } from "@/app/blog/actions/createPost";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";
import styles from "./CreatePostForm.module.css";

/**
 * Form for creating a new blog post.
 * Uses useActionState to manage Server Action state.
 *
 * @returns {JSX.Element}
 */
export function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPost, null);

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" required minLength={3} />
        {state?.errors?.title && (
          <p className={styles.error} role="alert">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          required
          minLength={10}
          rows={8}
        />
        {state?.errors?.content && (
          <p className={styles.error} role="alert">
            {state.errors.content[0]}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="category">Category</label>
        <select id="category" name="category" required>
          <option value="">Select a category</option>
          <option value="tech">Tech</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
        </select>
        {state?.errors?.category && (
          <p className={styles.error} role="alert">
            {state.errors.category[0]}
          </p>
        )}
      </div>

      {state?.message && !state?.errors && (
        <p className={styles.errorGeneral} role="alert">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
```

### `useFormStatus` — pending state for child components

`useFormStatus` must be used in a **child** of the `<form>`, not the form component itself:

```jsx
// src/shared/ui/SubmitButton/SubmitButton.jsx
"use client";

import { useFormStatus } from "react-dom";
import styles from "./SubmitButton.module.css";

/**
 * Submit button that automatically shows pending state.
 * MUST be rendered as a child of a <form> element.
 *
 * @param {Object} [props]
 * @param {string} [props.label='Submit'] - Button label text.
 * @param {string} [props.pendingLabel='Submitting...'] - Label while pending.
 * @returns {JSX.Element}
 */
export function SubmitButton({
  label = "Submit",
  pendingLabel = "Submitting...",
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.button}>
      {pending ? pendingLabel : label}
    </button>
  );
}
```

### `useOptimistic` — instant UI feedback

```jsx
// src/features/blog/components/CommentList/CommentList.jsx
"use client";

import { useOptimistic, useActionState } from "react";
import { addComment } from "@/app/blog/actions/addComment";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";
import styles from "./CommentList.module.css";

/**
 * Comment list with optimistic UI updates.
 *
 * @param {Object} props
 * @param {Array<{id: string, text: string}>} props.comments - Existing comments from server.
 * @returns {JSX.Element}
 */
export function CommentList({ comments }) {
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (state, newText) => [
      ...state,
      { id: "temp", text: newText, pending: true },
    ],
  );

  const [, formAction] = useActionState(async (_prevState, formData) => {
    const text = formData.get("comment");
    addOptimistic(text);
    await addComment(formData);
    return null;
  }, null);

  return (
    <>
      <ul className={styles.list}>
        {optimisticComments.map((c) => (
          <li key={c.id} className={c.pending ? styles.pending : ""}>
            {c.text}
          </li>
        ))}
      </ul>
      <form action={formAction} className={styles.form}>
        <label htmlFor="comment" className="sr-only">
          Add a comment
        </label>
        <input
          id="comment"
          name="comment"
          required
          placeholder="Write a comment..."
        />
        <SubmitButton label="Post" pendingLabel="Posting..." />
      </form>
    </>
  );
}
```

### When to use each form pattern

| Pattern                             | When to use                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| Server Action + `useActionState`    | Standard forms, CRUD, any mutation that talks to a database           |
| Traditional `useState` + `onSubmit` | Complex multi-step forms, or when you need fine-grained field control |
| `useOptimistic`                     | Immediately reflect UI changes before server confirms                 |
| Route Handler (`app/api/`)          | Webhooks, third-party integrations, long polling — NOT for forms      |

---
