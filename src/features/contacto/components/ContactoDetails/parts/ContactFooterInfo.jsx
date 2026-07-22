import styles from "./ContactFooterInfo.module.css";
import { Clock } from "lucide-react";
import { Title } from "@/shared/ui/Title/Title";
import { HourBlock } from "./HourBlock";
import { SocialIcon } from "@/shared/ui/SocialIcon/SocialIcon";

/**
 * Bottom strip: schedule blocks + social network links.
 *
 * @param {Object} props
 * @param {Object} props.dict - `contacto.details.footer` dictionary slice
 * @returns {JSX.Element|null}
 */
export function ContactFooterInfo({ dict }) {
  if (!dict) return null;

  const SOCIALS = [
    { name: "facebook",  href: "#", label: "Facebook"  },
    { name: "whatsapp",  href: "#", label: "WhatsApp"  },
    { name: "youtube",   href: "#", label: "YouTube"   },
    { name: "instagram", href: "#", label: "Instagram" },
  ];

  return (
    <div className={styles.footerContainer}>

      <div className={styles.hoursWrapper}>
        <Clock size={36} className={styles.clockIcon} aria-hidden="true" />
        <HourBlock title={dict.weekdaysTitle} hours={dict.weekdaysHours} />
        <HourBlock title={dict.weekendTitle}  hours={dict.weekendHours}  />
      </div>

      <div className={styles.socialsWrapper}>
        <Title level="h4" className={styles.socialsTitle}>
          {dict.socialsTitle}
        </Title>
        <div className={styles.socialIcons}>
          {SOCIALS.map(({ name, href, label }) => (
            <a
              key={name}
              href={href}
              className={`${styles.iconLink} ${styles[name]}`}
              aria-label={label}
            >
              <SocialIcon name={name} size={22} />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
