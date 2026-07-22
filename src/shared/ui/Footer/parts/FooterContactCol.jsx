import { Title } from '../../Title/Title';
import { Text } from '../../Text/Text';
import { Icon } from '../../Icon/Icon';
import styles from './FooterContactCol.module.css';

export function FooterContactCol({ dict }) {
  return (
    <div className={styles.col}>
      <Title level="h3" variant="white" className={styles.title}>{dict.contact.title}</Title>
      <ul className={styles.contactList}>
        <li className={styles.contactItem}>
          <div className={styles.iconCircle}>
            <Icon name="mapPin" size={16} />
          </div>
          <Text variant="muted" className={styles.contactText}>{dict.contact.address}</Text>
        </li>
        <li className={styles.contactItem}>
          <div className={styles.iconCircle}>
            <Icon name="mail" size={16} />
          </div>
          <Text variant="muted" className={styles.contactText}>{dict.contact.email}</Text>
        </li>
        <li className={styles.contactItem}>
          <div className={styles.iconCircle}>
            <Icon name="phone" size={16} />
          </div>
          <Text variant="muted" className={styles.contactText}>{dict.contact.phone}</Text>
        </li>
      </ul>
      
      <div className={styles.hoursGroup}>
        <Text variant="white" className={styles.menuTitle}>{dict.contact.hoursTitle}</Text>
        <div className={styles.hoursBox}>
          <div className={styles.clockIcon}>
            <Icon name="clock" size={24} />
          </div>
          <div className={styles.hoursLines}>
            <div className={styles.hourLine}>
              <Text variant="white" className={styles.hourDay}>{dict.contact.hoursText1}</Text>
              <Text variant="muted" className={styles.hourTime}>{dict.contact.hoursTime1}</Text>
            </div>
            <div className={styles.hourLine}>
              <Text variant="white" className={styles.hourDay}>{dict.contact.hoursText2}</Text>
              <Text variant="muted" className={styles.hourTime}>{dict.contact.hoursTime2}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
