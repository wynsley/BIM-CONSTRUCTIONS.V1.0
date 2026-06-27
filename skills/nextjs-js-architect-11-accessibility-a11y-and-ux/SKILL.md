---
name: nextjs-js-architect-11-accessibility-a11y-and-ux
description: Section 11 of the Next.js JS Architect skill: Accessibility (a11y) and UX
---

## 11. Accessibility (a11y) and UX

### Semantic HTML requirements

**Never use generic elements that should be semantic:**

```jsx
// [NO] Wrong
<div onClick={() => {}} role="button" tabIndex={0}>Click me</div>

// [OK] Correct
<button onClick={() => {}}>Click me</button>

// [NO] Wrong — nav as div
<div className="navigation"><a href="/">Home</a></div>

// [OK] Correct
<nav aria-label="Main navigation"><a href="/">Home</a></nav>

// [NO] Wrong — heading without hierarchy
<div className="title">Page Title</div>

// [OK] Correct
<h1>Page Title</h1>

// [NO] Wrong — image without alt
<img src="logo.png" />

// [OK] Correct — use next/image
import Image from 'next/image';
<Image src="/logo.png" alt="Company Name" width={120} height={40} />
<Image src="/icon.png" alt="" width={24} height={24} /> {/* decorative: empty alt */}
```

### ARIA and keyboard navigation for modals

```jsx
// src/shared/ui/Modal/Modal.jsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

/**
 * Accessible modal dialog with focus trap and keyboard navigation.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {() => void} props.onClose - Called when the modal should close.
 * @param {string} props.title - Modal heading text (used for aria-labelledby).
 * @param {React.ReactNode} props.children - Modal body content.
 * @returns {JSX.Element|null}
 */
export function Modal({ isOpen, onClose, title, children }) {
  /** @type {React.RefObject<HTMLDivElement>} */
  const dialogRef = useRef(null);
  /** @type {React.RefObject<HTMLElement|null>} */
  const previousFocusRef = useRef(null);

  // Save and restore focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = /** @type {HTMLElement} */ (
        document.activeElement
      );
      requestAnimationFrame(() => dialogRef.current?.focus());
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    /** @param {KeyboardEvent} e */
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Trap focus within modal
  const handleKeyDown = useCallback((e) => {
    if (e.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={styles.modal}
        onKeyDown={handleKeyDown}
      >
        <header className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={styles.closeButton}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
```

### Focus management hook

```js
// src/shared/hooks/useFocusTrap.js
"use client";

import { useEffect, useRef } from "react";

/**
 * Traps focus within a container element while active.
 * Restores focus to the previously focused element on deactivation.
 *
 * @param {boolean} isActive - Whether the focus trap is active.
 * @returns {React.RefObject<HTMLDivElement>} Ref to attach to the container.
 */
export function useFocusTrap(isActive) {
  /** @type {React.RefObject<HTMLDivElement>} */
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocused = /** @type {HTMLElement} */ (
      document.activeElement
    );

    const getFocusable = () =>
      container.querySelectorAll(
        "a[href], button:not([disabled]), textarea:not([disabled]), " +
          'input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

    const focusable = getFocusable();
    if (focusable.length > 0) focusable[0].focus();

    /** @param {KeyboardEvent} e */
    const handler = (e) => {
      if (e.key !== "Tab") return;
      const current = getFocusable();
      const first = current[0];
      const last = current[current.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      previouslyFocused?.focus();
    };
  }, [isActive]);

  return containerRef;
}
```

### Accessibility checklist

- [ ] All images have `alt` text (empty `alt=""` for decorative) — use `next/image`
- [ ] All form inputs have associated `<label>` or `aria-label`
- [ ] All buttons have accessible names (visible text or `aria-label`)
- [ ] Custom controls have appropriate `role` and `aria-*` attributes
- [ ] Keyboard navigation works: Tab, Shift+Tab, Enter, Escape, Arrow keys
- [ ] Focus order follows visual order
- [ ] Visible focus indicators (`:focus-visible`) on all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large)
- [ ] Error messages are associated with inputs via `aria-describedby` or `aria-errormessage`
- [ ] Live regions (`aria-live`, `role="status"`, `role="alert"`) for dynamic content
- [ ] Skip navigation link present on pages with repetitive navigation
- [ ] Language attribute set on `<html>` element (in root layout)
- [ ] Zoom/scale works without horizontal scroll up to 400%

---
