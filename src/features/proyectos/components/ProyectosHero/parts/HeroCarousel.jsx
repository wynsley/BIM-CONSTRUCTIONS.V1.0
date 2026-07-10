'use client';

import Image from "next/image";
import { useCarousel } from "../../../hooks/useCarousel";
import styles from "./HeroCarousel.module.css";

const CAROUSEL_IMAGES = [
  { id: 1, src: "/images/proyectos/carousel/dos.png", alt: "Residencial Moderno" },
  { id: 2, src: "/images/proyectos/carousel/uno.png", alt: "Edificio Comercial" },
  { id: 3, src: "/images/proyectos/carousel/tres.png", alt: "Complejo Residencial" }
];

/**
 * Client component carousel displaying 3D images with a spill-over effect.
 *
 * @returns {JSX.Element}
 */
export function HeroCarousel() {
  const { currentIndex } = useCarousel(CAROUSEL_IMAGES.length, 5000);

  return (
    <div className={styles.carouselContainer} aria-roledescription="carousel">
      <div className={styles.imagesWrapper}>
        {CAROUSEL_IMAGES.map((img, index) => {
          const isActive = index === currentIndex;
          return (
            <div 
              key={img.id} 
              className={`${styles.imageSlide} ${isActive ? styles.active : ''}`}
              aria-hidden={!isActive}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
