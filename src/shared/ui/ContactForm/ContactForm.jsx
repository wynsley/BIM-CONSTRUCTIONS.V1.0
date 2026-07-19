"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";

/**
 * Reusable Contact Form.
 * Fully i18n-driven — all labels, placeholders and service options
 * come from the `contacto.details.form` dictionary slice.
 *
 * NOTE: Submission logic is a frontend stub. The Server Action
 * integration (Phase 2) will replace `handleSubmit`.
 *
 * @param {Object} props
 * @param {Object} props.dict - `contacto.details.form` dictionary slice
 * @returns {JSX.Element|null}
 */
export function ContactForm({ dict }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!dict) return null;

  /** Derive ordered service options from the dictionary */
  const SERVICE_OPTION_KEYS = ["construccion", "diseno", "consultoria", "supervision"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Phase 1 stub — will be replaced by a Server Action in Phase 2
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-label={dict.title}
      noValidate
    >
      {/* ── Header ── */}
      <Title level="h2" className={styles.title}>
        {dict.title}
      </Title>
      <Text as="p" variant="muted" size="sm" className={styles.subtitle}>
        {dict.subtitle}
      </Text>

      {/* ── Fields grid ── */}
      <div className={styles.formGrid}>

        <div className={styles.inputGroup}>
          <Input
            type="text"
            name="name"
            placeholder={dict.fields.name}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <Input
            type="email"
            name="email"
            placeholder={dict.fields.email}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <Input
            type="tel"
            name="phone"
            placeholder={dict.fields.phone}
          />
        </div>

        <div className={styles.inputGroup}>
          <Input
            type="text"
            name="address"
            placeholder={dict.fields.address}
          />
        </div>

        {/* Service selector — options sourced from i18n dict */}
        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
          <Input
            as="select"
            name="services"
            required
            defaultValue=""
          >
            <option value="" disabled hidden>
              {dict.serviceOptions?.placeholder || dict.fields.services}
            </option>
            {SERVICE_OPTION_KEYS.map((key) => (
              <option key={key} value={key}>
                {dict.serviceOptions?.[key] ?? key}
              </option>
            ))}
          </Input>
        </div>

        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
          <Input
            as="textarea"
            name="message"
            placeholder={dict.fields.message}
            required
            rows={5}
          />
        </div>

      </div>

      {/* ── Submit ── */}
      <div className={styles.submitWrapper}>
        <Button
          type="submit"
          variant="primary"
          className={styles.submitBtn}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? dict.submitting : dict.submit}
        </Button>
      </div>
    </form>
  );
}
