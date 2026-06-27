"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button/Button";
import { NavLogo } from "./parts/NavLogo";
import { NavDesktopLinks } from "./parts/NavDesktopLinks";
import { NavMobileMenu } from "./parts/NavMobileMenu";
import { NavHamburger } from "./parts/NavHamburger";
import styles from "./Navbar.module.css";

/**
 * @typedef {Object} SubNavItem
 * @property {string} label
 * @property {string} href
 */

/**
 * @typedef {Object} NavItem
 * @property {string} label - Display text for the link.
 * @property {string} [href] - Route path (optional if it has subItems).
 * @property {SubNavItem[]} [subItems] - Sub-menu items.
 */

import { Mail } from "lucide-react";

import { NavLanguageToggle } from "./parts/NavLanguageToggle";

/**
 * Main navigation bar for BIM Constructions.
 * Refactored using Atomic Design. Acts as the Organism container.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS class names.
 * @param {Object} props.dict - Dictionary translations for the navbar.
 * @param {string} props.lang - Current language locale.
 * @returns {JSX.Element}
 */
export function Navbar({ className, dict, lang }) {
  const pathname = usePathname();
  
  const navItems = [
    { label: dict.about, href: `/${lang}/sobre-nosotros` },
    { 
      label: dict.projects.title, 
      subItems: [
        { label: dict.projects.inProgress, href: `/${lang}/proyectos/en-progreso` },
        { label: dict.projects.finished, href: `/${lang}/proyectos/terminado` },
      ]
    },
    { label: dict.services, href: `/${lang}/servicios` },
    { label: dict.contact, href: `/${lang}/contacto` },
  ];
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [lockedDropdown, setLockedDropdown] = useState(null);
  
  const navRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setLockedDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
    setActiveDropdown(null); // Reset dropdowns on toggle
    setLockedDropdown(null);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
    setLockedDropdown(null);
  }, []);

  const handleMouseEnter = useCallback((label) => {
    if (!lockedDropdown) setActiveDropdown(label);
  }, [lockedDropdown]);

  const handleMouseLeave = useCallback(() => {
    if (!lockedDropdown) setActiveDropdown(null);
  }, [lockedDropdown]);

  const toggleDropdown = useCallback((label) => {
    if (lockedDropdown === label) {
      setLockedDropdown(null);
      setActiveDropdown(null);
    } else {
      setLockedDropdown(label);
      setActiveDropdown(label);
    }
  }, [lockedDropdown]);

  return (
    <header className={cn(styles.header, className)} ref={navRef}>
      <nav className={styles.nav} aria-label="Navegación principal">
        
        <NavLogo onClick={closeMobile} />

        <NavDesktopLinks 
          items={navItems} 
          pathname={pathname}
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />

        <div className={styles.actions}>
          <NavLanguageToggle />
          <Button href={`/${lang}/contacto`} variant="primary" size="md" ariaLabel={dict.cta}>
            <Mail className={styles.ctaIcon} />
            {dict.cta}
          </Button>
        </div>
    
        <NavHamburger isOpen={isMobileOpen} onClick={toggleMobile} />

        <NavMobileMenu 
          isOpen={isMobileOpen}
          items={navItems}
          pathname={pathname}
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
          onClose={closeMobile}
          dict={dict}
          lang={lang}
        />

      </nav>
    </header>
  );
}
