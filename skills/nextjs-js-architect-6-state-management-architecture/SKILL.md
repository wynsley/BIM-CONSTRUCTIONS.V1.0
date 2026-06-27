---
name: nextjs-js-architect-6-state-management-architecture
description: Section 6 of the Next.js JS Architect skill: State Management Architecture
---

## 6. State Management Architecture

### Decision tree for state placement

```
Is the state used by only one component?
  YES → useState / useReducer (local state in a Client Component)
  NO  → Is it used by a component and its direct children?
          YES → Prop drilling (lift state up)
          NO  → Is it used across unrelated parts of the tree?
                  YES → Is it low/medium frequency updates?
                          YES → React Context (in a Client Component subtree)
                          NO  → Zustand store (high frequency or complex state)
```

> **In Next.js App Router, prefer passing data as props from Server Components.** Only use Context or Zustand for truly client-side, interactive state that cannot be derived from the server.

### Local State

```jsx
// UI state — component-scoped (always 'use client')
"use client";
import { useState, useReducer } from "react";

const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState(
  /** @type {{ name: string, email: string }} */ ({ name: "", email: "" }),
);
const [validationErrors, dispatch] = useReducer(errorsReducer, {});
```

### Shared State via Context

```jsx
// src/features/auth/context/AuthContext.jsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'admin' | 'user'} role
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {AuthUser | null} user
 * @property {boolean} isLoading
 * @property {(email: string, password: string) => Promise<void>} login
 * @property {() => Promise<void>} logout
 * @property {boolean} isAuthenticated
 */

/** @type {React.Context<AuthContextValue | null>} */
const AuthContext = createContext(null);

/**
 * Authentication provider. Wraps the client-side subtree that needs auth state.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(/** @type {AuthUser | null} */ (null));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication state. Must be used within AuthProvider.
 *
 * @returns {AuthContextValue}
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
```

### Complex Global State (Zustand — for Client Components)

> **Zustand in Next.js:** Zustand stores run on the client only. Import them only in `'use client'` components. Never import a Zustand store in a Server Component.

```js
// src/store/cartStore.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartState
 * @property {CartItem[]} items
 * @property {number} totalItems
 * @property {number} totalPrice
 * @property {(item: Omit<CartItem, 'quantity'>) => void} addItem
 * @property {(id: string) => void} removeItem
 * @property {(id: string, quantity: number) => void} updateQuantity
 * @property {() => void} clearCart
 */

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<CartState>>} */
export const useCartStore = create(
  devtools(
    persist(
      (set) => ({
        items: [],
        totalItems: 0,
        totalPrice: 0,

        addItem: (item) =>
          set((state) => {
            const existing = state.items.find((i) => i.id === item.id);
            const newItems = existing
              ? state.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
                )
              : [...state.items, { ...item, quantity: 1 }];
            return {
              items: newItems,
              totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
              totalPrice: newItems.reduce(
                (acc, i) => acc + i.price * i.quantity,
                0,
              ),
            };
          }),

        removeItem: (id) =>
          set((state) => {
            const newItems = state.items.filter((i) => i.id !== id);
            return {
              items: newItems,
              totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
              totalPrice: newItems.reduce(
                (acc, i) => acc + i.price * i.quantity,
                0,
              ),
            };
          }),

        updateQuantity: (id, quantity) =>
          set((state) => {
            const newItems = state.items.map((i) =>
              i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i,
            );
            return {
              items: newItems,
              totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
              totalPrice: newItems.reduce(
                (acc, i) => acc + i.price * i.quantity,
                0,
              ),
            };
          }),

        clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
      }),
      { name: "cart-storage", partialize: (state) => ({ items: state.items }) },
    ),
  ),
);
```

### Zustand Hydration Safety in Next.js

```jsx
// src/shared/hooks/useHydrated.js
"use client";

import { useState, useEffect } from "react";

/**
 * Returns true only after the component has hydrated on the client.
 * Use to prevent hydration mismatches with persisted Zustand stores.
 *
 * @returns {boolean}
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
```

```jsx
// Usage in a Client Component
"use client";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/shared/hooks/useHydrated";

export function CartBadge() {
  const hydrated = useHydrated();
  const totalItems = useCartStore((state) => state.totalItems);

  if (!hydrated) return <span>0</span>; // SSR-safe fallback
  return <span>{totalItems}</span>;
}
```

---
