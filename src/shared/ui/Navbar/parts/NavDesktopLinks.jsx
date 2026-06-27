import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./NavDesktopLinks.module.css";

import { ChevronDown } from "lucide-react";

/**
 * NavDesktopLinks Molecule
 *
 * @param {Object} props
 * @param {import('../Navbar').NavItem[]} props.items
 * @param {string} props.pathname
 * @param {string|null} props.activeDropdown
 * @param {(label: string) => void} props.toggleDropdown
 * @param {(label: string) => void} props.handleMouseEnter
 * @param {() => void} props.handleMouseLeave
 * @returns {JSX.Element}
 */
export function NavDesktopLinks({
  items,
  pathname,
  activeDropdown,
  toggleDropdown,
  handleMouseEnter,
  handleMouseLeave
}) {
  return (
    <ul className={styles.links}>
      {items.map((item) => {
        const isActive = item.href && pathname.startsWith(item.href);
        const hasSubItems = Boolean(item.subItems);

        return (
          <li key={item.label} className={styles.navItem}>
            {hasSubItems ? (
              <div
                className={styles.dropdownContainer}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <button
                  className={cn(styles.link, styles.dropdownTrigger, activeDropdown === item.label && styles.linkActive)}
                  onClick={() => toggleDropdown(item.label)}
                  aria-expanded={activeDropdown === item.label}
                >
                  <Text 
                    as="span" 
                    variant="inherit"
                    size="inherit"
                    weight={activeDropdown === item.label ? "semibold" : "medium"}>
                    {item.label}
                  </Text>
                  <ChevronDown className={styles.chevron} />
                </button>

                <ul className={cn(styles.dropdownMenu, activeDropdown === item.label && styles.dropdownMenuOpen)}>
                  {item.subItems.map(sub => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        className={cn(styles.dropdownItem, pathname === sub.href && styles.dropdownItemActive)}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  styles.link,
                  isActive && styles.linkActive
                )}
              >
                <Text as="span" variant="inherit" size="inherit" weight={isActive ? "semibold" : "medium"}>
                  {item.label}
                </Text>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
