import { cn } from "@/shared/lib/cn";
import styles from "./NavHamburger.module.css";

/**
 * NavHamburger Molecule
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClick
 * @returns {JSX.Element}
 */
export function NavHamburger({ isOpen, onClick }) {
  return (
    <button
      className={cn(styles.hamburger, isOpen && styles.hamburgerOpen)}
      onClick={onClick}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </button>
  );
}
