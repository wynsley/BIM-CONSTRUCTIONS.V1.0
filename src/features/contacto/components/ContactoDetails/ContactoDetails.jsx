import styles from "./ContactoDetails.module.css";
import { ContactCards } from "./parts/ContactCards";
import { ContactFooterInfo } from "./parts/ContactFooterInfo";
import { FormPanel } from "./parts/FormPanel";
import { ContactForm } from "@/shared/ui/ContactForm/ContactForm";

/**
 * ContactoDetails — section orchestrator.
 * Composes the left cards column, the slanted form panel, and the footer strip.
 *
 * @param {Object} props
 * @param {Object} props.dict - `contacto.details` dictionary slice
 * @returns {JSX.Element|null}
 */
export function ContactoDetails({ dict }) {
  if (!dict) return null;

  return (
    <section
      className={styles.section}
      aria-labelledby="contacto-details-heading"
    >
      <div className={styles.container}>

        <div className={styles.topGrid}>

          <div className={styles.leftCol}>
            <ContactCards dict={dict.cards} />
          </div>

          <div className={styles.rightCol}>
            <FormPanel>
              <ContactForm dict={dict.form} />
            </FormPanel>
          </div>

        </div>

        <ContactFooterInfo dict={dict.footer} />

      </div>
    </section>
  );
}
