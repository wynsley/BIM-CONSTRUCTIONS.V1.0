"use client";

import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./AnimatedTitle.module.css";

/**
 * Title with a continuous wave animation per character.
 *
 * @param {Object} props
 * @param {string} props.text     – The title text to animate
 * @param {string} [props.className] – Optional extra class for the wrapper
 * @returns {JSX.Element}
 */
export function AnimatedTitle({ text, className = "" }) {
  const chars = Array.from(text);

  return (
    <Title
      level="h2"
      className={`${styles.title} ${className}`}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <Text
          as="span"
          key={i}
          aria-hidden="true"
          className={styles.char}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </Text>
      ))}
    </Title>
  );
}

