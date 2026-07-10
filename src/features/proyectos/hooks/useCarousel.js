'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for managing a simple auto-advancing carousel.
 * 
 * @param {number} totalItems - Total number of items in the carousel.
 * @param {number} intervalMs - Autoplay interval in milliseconds.
 * @returns {{ currentIndex: number, next: () => void, prev: () => void, goTo: (index: number) => void }}
 */
export function useCarousel(totalItems, intervalMs = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goTo = (index) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (totalItems <= 1) return;
    
    const timer = setInterval(() => {
      next();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [totalItems, intervalMs]);

  return { currentIndex, next, prev, goTo };
}
