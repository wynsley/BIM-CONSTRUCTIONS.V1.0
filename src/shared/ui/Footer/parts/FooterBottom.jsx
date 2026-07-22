import { Text } from '../../Text/Text';
import { SocialIcon } from '../../SocialIcon/SocialIcon';
import styles from './FooterBottom.module.css';

export function FooterBottom({ dict }) {
  return (
    <div className={styles.bottomArea}>
      <div className={styles.bottomContainer}>
        <Text variant="muted" className={styles.copyright}>
          {dict.bottom.copyright.replace('{year}', new Date().getFullYear().toString())}
        </Text>
        <div className={styles.socialBox}>
          <Text variant="muted" className={styles.socialTitle}>{dict.bottom.socialTitle}</Text>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <SocialIcon name="facebook" size={20} />
            </a>
            <a href="https://whatsapp.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <SocialIcon name="whatsapp" size={20} />
            </a>
            <a href="https://x.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <SocialIcon name="x" size={20} />
            </a>
            <a href="https://tiktok.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <SocialIcon name="tiktok" size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
