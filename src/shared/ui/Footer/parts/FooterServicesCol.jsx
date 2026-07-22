import Link from 'next/link';
import { Title } from '../../Title/Title';
import { Text } from '../../Text/Text';
import styles from './FooterServicesCol.module.css';

export function FooterServicesCol({ dict, lang }) {
  return (
    <div className={styles.col}>
      <Title level="h3" variant="white" className={styles.title}>{dict.services.title}</Title>
      <ul className={styles.links}>
        {dict.services.items.map((item, i) => (
          <li key={i} className={styles.listItem}><Text variant="white">{item}</Text></li>
        ))}
      </ul>
      <Link href={`/${lang}/servicios`} className={styles.viewAll}>
        {dict.services.viewAll}
      </Link>
    </div>
  );
}
