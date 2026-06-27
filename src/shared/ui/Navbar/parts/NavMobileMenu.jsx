import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/Text/Text";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./NavMobileMenu.module.css";
import { NavLanguageToggle } from "./NavLanguageToggle";

import { ChevronDown, Mail } from "lucide-react";

/**
 * NavMobileMenu Molecule
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {import('../Navbar').NavItem[]} props.items
 * @param {string} props.pathname
 * @param {string|null} props.activeDropdown
 * @param {(label: string) => void} props.toggleDropdown
 * @param {() => void} props.onClose
 * @param {Object} props.dict
 * @param {string} props.lang
 * @returns {JSX.Element}
 */
export function NavMobileMenu({ isOpen, items, pathname, activeDropdown, toggleDropdown, onClose, dict, lang }) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        styles.mobileOverlay,
        isOpen && styles.mobileOverlayOpen
      )}
      aria-hidden={!isOpen}
    >
      <ul className={styles.mobileLinks}>
        {items.map((item) => {
          const hasSubItems = Boolean(item.subItems);
          const isActive = item.href && pathname.startsWith(item.href);

          return (
            <li key={item.label}>
              {hasSubItems ? (
                <div>
                  <button 
                    className={cn(styles.mobileLink, styles.mobileDropdownTrigger)}
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={activeDropdown === item.label}
                  >
                    <Text as="span" size="lg" weight="medium">
                      {item.label}
                    </Text>
                    <ChevronDown className={cn(styles.mobileChevron, activeDropdown === item.label && styles.mobileChevronOpen)} />
                  </button>
                  
                  <ul className={cn(styles.mobileSubLinks, activeDropdown === item.label && styles.mobileSubLinksOpen)}>
                    {item.subItems.map(sub => (
                      <li key={sub.href}>
                        <Link 
                          href={sub.href} 
                          className={cn(styles.mobileSubLink, pathname === sub.href && styles.mobileSubLinkActive)}
                          onClick={onClose}
                        >
                          <Text as="span" size="base" variant={pathname === sub.href ? "primary" : "muted"}>
                            {sub.label}
                          </Text>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    styles.mobileLink,
                    isActive && styles.mobileLinkActive
                  )}
                  onClick={onClose}
                >
                  <Text as="span" size="lg" weight={isActive ? "semibold" : "medium"}>
                    {item.label}
                  </Text>
                </Link>
              )}
            </li>
          );
        })}

      </ul>
      <div className={styles.mobileCta}>
        <div style={{ marginBottom: "var(--space-md)", display: "flex", justifyContent: "center" }}>
          <NavLanguageToggle />
        </div>
        <Button href={`/${lang}/contacto`} variant="primary" size="lg" ariaLabel={dict.cta} onClick={onClose}>
          <Mail className={styles.ctaIcon} />
          {dict.cta}
        </Button>
      </div>
    </div>
  );
}
