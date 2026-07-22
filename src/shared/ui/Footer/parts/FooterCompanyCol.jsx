import Link from 'next/link';
import { Title } from '../../Title/Title';
import { Text } from '../../Text/Text';
import styles from './FooterCompanyCol.module.css';

export function FooterCompanyCol({ dict, lang }) {
  return (
    <div className={styles.col}>
      <Title level="h3" className={styles.title}>{dict.company.title}</Title>
      <Text className={styles.text}>{dict.company.desc}</Text>
      
      <div className={styles.menuGroup}>
        <Text className={styles.menuTitle}>{dict.company.menuTitle}</Text>
        <ul className={styles.links}>
          <li><Link href={`/${lang}`}>{dict.company.links.about}</Link></li>
          <li><Link href={`/${lang}/servicios`}>{dict.company.links.services}</Link></li>
          <li><Link href={`/${lang}/proyectos`}>{dict.company.links.projects}</Link></li>
          <li><Link href={`/${lang}/contacto`}>{dict.company.links.contact}</Link></li>
        </ul>
      </div>
    </div>
  );
}
