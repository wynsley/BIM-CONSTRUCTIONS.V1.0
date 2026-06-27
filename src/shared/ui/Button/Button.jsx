import Link from "next/link";
import styles from "./Button.module.css";
import { cn } from "@/shared/lib/cn";

/**
 * Reusable button component. Renders as a Next.js Link when `href` is provided,
 * otherwise renders a native `<button>`.
 *
 * @param {Object} props
 * @param {'primary' | 'outline' | 'ghost'} [props.variant='primary'] - Visual variant.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Size preset.
 * @param {string} [props.href] - If provided, renders as a Next.js Link.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Button type attribute (ignored when href is set).
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.ariaLabel] - Accessible label for screen readers.
 * @param {string} [props.className] - Additional CSS class names.
 * @param {React.ReactNode} props.children - Button content.
 * @returns {JSX.Element}
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  ariaLabel,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
}
