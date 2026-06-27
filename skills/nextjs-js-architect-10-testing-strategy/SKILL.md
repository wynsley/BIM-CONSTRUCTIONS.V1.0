---
name: nextjs-js-architect-10-testing-strategy
description: Section 10 of the Next.js JS Architect skill: Testing Strategy
---

## 10. Testing Strategy

### Unit tests

Test pure functions, utilities, validators, and isolated logic.

```js
// src/shared/lib/__tests__/validators.test.js
import { describe, it, expect } from "vitest";
import { validateEmail, validatePassword } from "../validators";

describe("validateEmail", () => {
  it("returns true for valid emails", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("test@sub.domain.co")).toBe(true);
  });

  it("returns false for invalid emails", () => {
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("not-an-email")).toBe(false);
  });
});
```

### Component/Integration tests

Test component rendering, user interactions, and state changes. Use `@testing-library/react`.

```jsx
// src/shared/ui/Button/__tests__/Button.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders loading state", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button").className).toContain("primary");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button").className).toContain("ghost");
  });
});
```

### Server Action tests

```js
// app/blog/actions/__tests__/createPost.test.js
import { describe, it, expect, vi } from "vitest";
// Note: Server Actions need a special test setup to mock the 'use server' environment

describe("createPost", () => {
  it("returns validation errors for invalid input", async () => {
    const { createPost } = await import("../createPost");
    const formData = new FormData();
    formData.set("title", "ab"); // too short
    formData.set("content", "short");
    formData.set("category", "invalid");

    const result = await createPost(null, formData);
    expect(result.errors).toBeDefined();
    expect(result.errors.title).toBeDefined();
  });
});
```

### E2E tests (Playwright)

```js
// e2e/blog.spec.js
import { test, expect } from "@playwright/test";

test.describe("Blog CRUD", () => {
  test("user can view blog post list", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText("Blog");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("user can navigate to a blog post", async ({ page }) => {
    await page.goto("/blog");
    await page.click("article:first-child a");
    await expect(page.locator("article")).toBeVisible();
  });

  test("admin can create a new post", async ({ page }) => {
    // Login as admin first
    await page.goto("/auth/login");
    await page.fill('[name="email"]', "admin@example.com");
    await page.fill('[name="password"]', "AdminPass123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard");

    // Create post
    await page.goto("/blog/new");
    await page.fill('[name="title"]', "E2E Test Post");
    await page.fill(
      '[name="content"]',
      "This is test content for the E2E test.",
    );
    await page.selectOption('[name="category"]', "tech");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/blog/);
  });
});
```

### Testing configuration

```js
// vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,jsx}", "app/**/*.{js,jsx}"],
      exclude: ["src/**/*.test.*", "src/**/*.stories.*", "**/*.d.ts"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

```js
// src/test/setup.js
import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/server";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";

// MSW setup
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
```

---
