'use client';

import React, { useState } from 'react';
import styles from './Lightbox.module.css';

interface LightboxProps {
  images: string[];
}

const Lightbox: React.FC<LightboxProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className={styles.lightboxContent}>
      {images.length > 1 && (
        <button
          className={styles.navButton + ' ' + styles.prev}
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          {'<'}
        </button>
      )}
      <img
        src={images[currentIndex]}
        alt={`Gallery image ${currentIndex + 1}`}
      />
      {images.length > 1 && (
        <button
          className={styles.navButton + ' ' + styles.next}
          onClick={goToNext}
          aria-label="Next image"
        >
          {'>'}
        </button>
      )}
    </div>
  );
};

export default Lightbox;
