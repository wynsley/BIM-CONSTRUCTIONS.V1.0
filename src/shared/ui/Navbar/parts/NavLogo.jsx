import Link from "next/link";
import Image from "next/image";
import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./NavLogo.module.css";

/**
 * NavLogo Molecule
 *
 * @param {Object} props
 * @param {() => void} [props.onClick]
 * @returns {JSX.Element}
 */
export function NavLogo({ onClick }) {
  return (
    <Link href="/" className={styles.logo} aria-label="BIM Constructions — Inicio" onClick={onClick}>
      <div className={styles.logoImageWrapper}>
        <Image 
          src="/images/LOGO_BIM.png" 
          alt="BIM Constructions Logo" 
          width={44} 
          height={44} 
          className={styles.logoImage}
        />
      </div>
      <div className={styles.logoTextGroup}>
        <Title 
          level="h4" 
          variant="primary" 
          weight="bold" 
          className={styles.logoBim}>
          BIM
        </Title>
        <Text 
          as="span" 
          size="sm" 
          variant="secondary" 
          weight="medium" 
          className={styles.logoSub}>
          Constructions
        </Text>
      </div>
    </Link>
  );
}
