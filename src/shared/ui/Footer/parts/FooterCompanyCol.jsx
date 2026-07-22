import Link from 'next/link';
import { Title } from '../../Title/Title';
import { Text } from '../../Text/Text';
import styles from './FooterCompanyCol.module.css';

export function FooterCompanyCol({ dict, lang }) {
  return (
    <div className={styles.col}>
      <Title level="h3" variant="white" className={styles.title}>{dict.company.title}</Title>
      <Text variant="muted" className={styles.text}>{dict.company.desc}</Text>
      
      <div className={styles.menuGroup}>
        <Text variant="white" className={styles.menuTitle}>{dict.company.menuTitle}</Text>
        <ul className={styles.links}>
          <li className={styles.listItem}><Link href={`/${lang}`} className={styles.linkItem}>{dict.company.links.about}</Link></li>
          <li className={styles.listItem}><Link href={`/${lang}/servicios`} className={styles.linkItem}>{dict.company.links.services}</Link></li>
          <li className={styles.listItem}><Link href={`/${lang}/proyectos`} className={styles.linkItem}>{dict.company.links.projects}</Link></li>
          <li className={styles.listItem}><Link href={`/${lang}/contacto`} className={styles.linkItem}>{dict.company.links.contact}</Link></li>
        </ul>
      </div>
    </div>
  );
}
