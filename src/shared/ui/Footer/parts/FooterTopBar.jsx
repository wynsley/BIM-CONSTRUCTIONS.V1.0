import { Text } from '../../Text/Text';
import { Title } from '../../Title/Title';
import { Icon } from '../../Icon/Icon';
import styles from './FooterTopBar.module.css';

export function FooterTopBar({ dict }) {
  return (
    <div className={styles.topBar}>
      <div className={styles.topContainer}>
        <div className={styles.logo}>
          <Text variant="white" className={styles.logoWhite}>BIM</Text>
          <Text variant="secondary" className={styles.logoOrange}>CONSTRUCTIONS</Text>
        </div>
        <Text variant="muted" className={styles.slogan}>
          {dict.tagline}
        </Text>
        <div className={styles.ctaBox}>
          <div className={styles.ctaIconWrapper}>
            <Icon name="phoneCTA" size={24} />
          </div>
          <div className={styles.ctaTextContainer}>
            <Title level="h4" variant="white" className={styles.ctaTitle}>{dict.ctaText}</Title>
            <Text variant="white" className={styles.ctaPhone}>{dict.contact.phone}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
