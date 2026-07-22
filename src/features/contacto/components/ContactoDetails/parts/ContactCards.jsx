import styles from "./ContactCards.module.css";
import { MapPin, Mail, Phone } from "lucide-react";
import { ContactCard } from "./ContactCard";

/**
 * Left column — three stacked contact info cards.
 * Iterates over a static data array and delegates rendering to ContactCard.
 *
 * @param {Object} props
 * @param {Object} props.dict - `contacto.details.cards` dictionary slice
 * @returns {JSX.Element|null}
 */
export function ContactCards({ dict }) {
  if (!dict) return null;

  const CARDS = [
    { id: "office",   icon: <MapPin  size={28} />, highlighted: false },
    { id: "email",    icon: <Mail    size={28} />, highlighted: true  },
    { id: "phone",    icon: <Phone   size={28} />, highlighted: false },
  ];

  return (
    <div className={styles.container}>
      {CARDS.map(({ id, icon, highlighted }) => (
        <ContactCard
          key={id}
          icon={icon}
          title={dict[id]?.title}
          text={dict[id]?.text}
          highlighted={highlighted}
        />
      ))}
    </div>
  );
}
