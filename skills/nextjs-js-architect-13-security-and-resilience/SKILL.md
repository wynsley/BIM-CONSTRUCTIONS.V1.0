---
name: nextjs-js-architect-13-security-and-resilience
description: Section 13 of the Next.js JS Architect skill: Security and Resilience
---

## 13. Security and Resilience

### Next.js security headers

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "0" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires these in dev
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https: data:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.example.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Environment variable security

```
# .env.local — NEVER commit to git

# Server-only variables (no NEXT_PUBLIC_ prefix — invisible to the browser)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
API_SECRET_KEY=sk_live_xxx
JWT_SECRET=your-secret-key
SMTP_PASSWORD=your-smtp-password

# Client-safe variables (NEXT_PUBLIC_ prefix — visible in browser bundle)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=GA-XXXXX
```

> **Rule:** Never put secrets in `NEXT_PUBLIC_` variables. They are embedded in the client JavaScript bundle and visible to anyone.

### CSRF protection with Server Actions

Next.js Server Actions have built-in CSRF protection:

- Actions are invoked via POST with a special action ID
- Next.js validates the `Origin` header automatically
- The action ID is not guessable

For additional protection:

```js
// middleware.js
import { NextResponse } from "next/server";

/**
 * Next.js middleware for security checks.
 *
 * @param {import('next/server').NextRequest} request
 * @returns {NextResponse}
 */
export function middleware(request) {
  const response = NextResponse.next();

  // Validate Origin header for mutations
  if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      "http://localhost:3000",
    ];

    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
```

### XSS prevention

```jsx
// [NO] NEVER use dangerouslySetInnerHTML with unsanitized content
<div dangerouslySetInnerHTML={{ __html: userContent }} /> // HIGHLY DANGEROUS

// [OK] Use DOMPurify if HTML rendering is required
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />

// [OK] Prefer React's built-in escaping
<div>{userContent}</div> // React escapes all text content by default

// [OK] For URLs, validate protocols
/**
 * Validates and sanitizes a URL to prevent javascript: protocol attacks.
 *
 * @param {string} url
 * @returns {string} Sanitized URL or empty string.
 */
function safeUrl(url) {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.toString();
  } catch {
    return '';
  }
}
```

### Server Action input validation (mandatory)

**Every Server Action MUST validate all inputs with Zod before processing.** No exceptions.

```js
// app/auth/actions/login.js
"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * Server Action: Authenticate user.
 *
 * @param {Object|null} prevState
 * @param {FormData} formData
 * @returns {Promise<{error?: string}>}
 */
export async function login(prevState, formData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    // const user = await authService.authenticate(parsed.data);
    // const cookieStore = await cookies();
    // cookieStore.set('session', token, { httpOnly: true, secure: true, sameSite: 'lax' });
  } catch (error) {
    return { error: "Invalid credentials" };
  }

  redirect("/dashboard");
}
```

### Authentication middleware

```js
// middleware.js
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/admin", "/settings"];
const authRoutes = ["/auth/login", "/auth/register"];

/**
 * @param {import('next/server').NextRequest} request
 * @returns {NextResponse}
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session")?.value;

  // Redirect unauthenticated users away from protected routes
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !sessionToken
  ) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth routes
  if (authRoutes.some((route) => pathname.startsWith(route)) && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/health).*)"],
};
```

### Security checklist

- [ ] Security headers configured in `next.config.js`
- [ ] CSP headers configured (adjusted for Next.js requirements)
- [ ] No secrets in `NEXT_PUBLIC_` environment variables
- [ ] All Server Actions validate inputs with Zod
- [ ] Session tokens stored in `httpOnly`, `secure`, `sameSite` cookies
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] Authentication middleware protects private routes
- [ ] Origin validation for API Route Handlers
- [ ] Rate limiting on login/registration Server Actions
- [ ] No sensitive data in client bundle or URL params
- [ ] Permissions Policy restricts powerful browser APIs

---
