"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./NavLanguageToggle.module.css";

// SVG Flags inspired by circle-flags
function FlagES() {
  return (
    <svg className={styles.flagSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <mask id="es-mask"><circle cx="256" cy="256" r="256" fill="#fff"/></mask>
      <g mask="url(#es-mask)">
        <path fill="#c60b1e" d="M0 0h512v512H0z"/>
        <path fill="#ffc400" d="M0 128h512v256H0z"/>
      </g>
    </svg>
  );
}

function FlagUS() {
  return (
    <svg className={styles.flagSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <mask id="us-mask"><circle cx="256" cy="256" r="256" fill="#fff"/></mask>
      <g mask="url(#us-mask)">
        <path fill="#eeeeee" d="M0 0h512v512H0z"/>
        <path fill="#d80027" d="M0 0h512v42.7H0zm0 85.3h512v42.7H0zm0 85.4h512v42.7H0zm0 85.3h512v42.7H0zm0 85.4h512v42.7H0zm0 85.3h512v42.7H0z"/>
        <path fill="#0052b4" d="M0 0h256v256H0z"/>
        <path fill="#eeeeee" d="M35.6 195.6L57 202l13.6-17.6L84 202l21.4-6.4-13.5-17.7 13.5-17.7L84 153.8l-13.4-17.6L57 153.8l-21.4-6.4L49 165l-13.4 17.7 21.4-6.4-13.5 17.6zm0-85.3L57 116.7l13.6-17.6L84 116.7l21.4-6.4-13.5-17.7 13.5-17.7L84 68.5 70.6 51 57 68.5l-21.4-6.4L49 79.8 35.6 97.5l21.4-6.4-13.5 17.6zm85.3 85.3L142.3 202l13.6-17.6L169.4 202l21.3-6.4-13.4-17.7 13.4-17.7L169.3 153.8 156 136.2l-13.5 17.6-21.4-6.4 13.4 17.7-13.4 17.7 21.3-6.4-13.4 17.6zm0-85.3l21.4 6.4 13.6-17.6 13.5 17.6 21.3-6.4-13.4-17.7 13.4-17.7-21.3 6.4L156 51l-13.5 17.5-21.4-6.4 13.4 17.7-13.4 17.7 21.3-6.4-13.4 17.6zm85.4 85.3l21.3 6.4 13.5-17.6 13.5 17.6 21.3-6.4-13.4-17.7 13.4-17.7-21.3 6.4-13.5-17.6-13.5 17.6-21.3-6.4 13.4 17.7-13.4 17.7 21.3-6.4-13.4 17.6zm0-85.3l21.3 6.4 13.5-17.6 13.5 17.6 21.3-6.4-13.4-17.7 13.4-17.7-21.3 6.4-13.5-17.6-13.5 17.6-21.3-6.4 13.4 17.7-13.4 17.7 21.3-6.4-13.4 17.6zM78.3 162.2l21.3 6.4 13.5-17.6 13.5 17.6 21.3-6.4-13.4-17.6 13.4-17.7-21.3 6.4L113 115.7l-13.5 17.6-21.3-6.4 13.4 17.7-13.4 17.6 21.3-6.4-13.4 17.6zm0-85.3l21.3 6.4 13.5-17.6 13.5 17.6 21.3-6.4-13.4-17.6 13.4-17.7-21.3 6.4L113 30.4l-13.5 17.6-21.3-6.4 13.4 17.7-13.4 17.6 21.3-6.4-13.4 17.6zm85.3 85.3l21.4 6.4 13.5-17.6 13.5 17.6 21.3-6.4-13.4-17.6 13.4-17.7-21.3 6.4-13.5-17.6-13.5 17.6-21.4-6.4 13.4 17.7-13.4 17.6 21.4-6.4-13.4 17.6zm0-85.3l21.4 6.4 13.5-17.6 13.5 17.6 21.3-6.4-13.4-17.6 13.4-17.7-21.3 6.4-13.5-17.6-13.5 17.6-21.4-6.4 13.4 17.7-13.4 17.6 21.4-6.4-13.4 17.6z"/>
      </g>
    </svg>
  );
}

/**
 * NavLanguageToggle Molecule
 *
 * @returns {JSX.Element}
 */
export function NavLanguageToggle() {
  const pathname = usePathname();
  
  // Basic language detection from path
  const isEnglish = pathname.startsWith('/en');
  const targetLang = isEnglish ? 'es' : 'en';
  
  // Construct new pathname (replace current lang with target lang)
  // Assumes paths are like /es/about or /en/about
  const newPathname = pathname.replace(/^\/[^\/]+/, `/${targetLang}`);

  return (
    <Link href={newPathname} className={styles.toggle} prefetch={false}>
      <span className={styles.flagIcon}>
        {isEnglish ? <FlagUS /> : <FlagES />}
      </span>
      <Text as="span" size="sm" weight="medium">
        {isEnglish ? "EN" : "ES"}
      </Text>
    </Link>
  );
}
