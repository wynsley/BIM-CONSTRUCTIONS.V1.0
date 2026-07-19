import styles from "./FormPanel.module.css";

/**
 * Slanted panel wrapper for the contact form.
 * Extracts the clip-path container from the orchestrator,
 * following the same parts pattern as ContactoHeroBg.
 *
 * @param {Object}        props
 * @param {JSX.Element}   props.children - Form content to render inside the panel
 * @returns {JSX.Element}
 */
export function FormPanel({ children }) {
  return (
    <div className={styles.slantedWrapper}>
      <div className={styles.innerPadding}>
        {children}
      </div>
    </div>
  );
}
