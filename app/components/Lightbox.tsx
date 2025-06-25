'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LightboxProps } from '../../types';

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
    <div className="flex items-center justify-center w-full max-w-screen-lg mx-auto">
      {images.length > 1 && (
        <button
          className="bg-white bg-opacity-80 border-none p-2.5 cursor-pointer text-2xl mx-2"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          {'<'}
        </button>
      )}
      <Image
        className="max-w-full max-h-full"
        src={images[currentIndex]}
        alt={`Gallery image ${currentIndex + 1}`}
        width={800}
        height={600}
        layout="intrinsic"
      />
      {images.length > 1 && (
        <button
          className="bg-white bg-opacity-80 border-none p-2.5 cursor-pointer text-2xl mx-2"
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
