import { cn } from "@/shared/lib/cn";
import styles from "./Input.module.css";

/**
 * Input atom.
 * Renders a bottom-border-only underline input, select, or textarea.
 *
 * @param {Object}  props
 * @param {'input'|'select'|'textarea'}  [props.as='input']  - HTML element to render
 * @param {string}  [props.className]
 * @param {React.ReactNode} [props.children] - Only used when as="select"
 * @returns {JSX.Element}
 */
export function Input({ as = "input", className = "", children, ...props }) {
  const Tag = as;

  return (
    <Tag
      className={cn(
        styles.input,
        as === "textarea" && styles.textarea,
        as === "select"  && styles.select,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
