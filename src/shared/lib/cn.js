import { clsx } from "clsx";

/**
 * Merges multiple class name values into a single string.
 * Thin wrapper around clsx for consistent className composition across the project.
 *
 * @param {...(string | Record<string, boolean> | undefined | null | false)} inputs - Class name values to merge.
 * @returns {string} Merged class name string.
 *
 * @example
 * cn(styles.base, isActive && styles.active, className)
 */
export function cn(...inputs) {
  return clsx(inputs);
}
