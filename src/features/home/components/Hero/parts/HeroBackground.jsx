import styles from "./HeroBackground.module.css";

/**
 * Background video layer for the Hero component.
 * 
 * @param {Object} props
 * @param {string} props.videoUrl
 * @returns {JSX.Element}
 */
export function HeroBackground({ videoUrl }) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoBg}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className={styles.overlay}></div>
    </>
  );
}
