import { cn } from "@/shared/lib/cn";
import styles from "./Text.module.css";

/**
 * Text atom component for paragraphs and spans.
 *
 * @param {Object} props
 * @param {string} [props.text]
 * @param {React.ReactNode} [props.children]
 * @param {'p'|'span'|'div'} [props.as='p']
 * @param {'default'|'primary'|'secondary'|'muted'|'white'|'inherit'} [props.variant='default']
 * @param {'sm'|'base'|'lg'|'xl'|'inherit'} [props.size='base']
 * @param {'light'|'normal'|'medium'|'bold'} [props.weight='normal']
 * @param {'left'|'center'|'right'} [props.align='left']
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
export function Text({
  text,
  children,
  as = "p",
  variant = "default",
  size = "base",
  weight = "normal",
  align = "left",
  className = "",
  ...props
}) {
  const Tag = as;

  return (
    <Tag
      className={cn(
        styles.text,
        styles[`size-${size}`],
        styles[`variant-${variant}`],
        styles[`weight-${weight}`],
        styles[`align-${align}`],
        className
      )}
      {...props}
    >
      {text || children}
    </Tag>
  );
}
