import { cn } from "@/shared/lib/cn";
import styles from "./Title.module.css";

/**
 * Title atom component.
 *
 * @param {Object} props
 * @param {string} [props.text]
 * @param {React.ReactNode} [props.children]
 * @param {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'} [props.level='h1']
 * @param {'default'|'primary'|'secondary'|'white'} [props.variant='default']
 * @param {'light'|'normal'|'bold'} [props.weight='normal']
 * @param {'left'|'center'|'right'} [props.align='left']
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
export function Title({
  text,
  children,
  level = "h1",
  variant = "default",
  weight = "normal",
  align = "left",
  className = "",
  ...props
}) {
  const Tag = level;

  return (
    <Tag
      className={cn(
        styles.title,
        styles[`level-${level}`],
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
