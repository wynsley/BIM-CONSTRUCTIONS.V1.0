import styles from "./BannerLeft.module.css";
import { AnimatedTitle } from "./AnimatedTitle";

/**
 * Left side of ConoceBanner: animated title + accent separator.
 *
 * @param {Object} props
 * @param {string} props.title
 * @returns {JSX.Element}
 */
export function BannerLeft({ title }) {
  return (
    <div className={styles.left}>
      <AnimatedTitle text={title} />
      <div className={styles.separator} />
    </div>
  );
}

