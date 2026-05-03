import React, { useState } from 'react';
import { FALLBACK_IMAGE_URL } from '../../config/constants';

export const FallbackImage = ({ src, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE_URL);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(FALLBACK_IMAGE_URL);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={`${className} ${hasError ? 'grayscale contrast-125' : ''}`}
      {...props}
    />
  );
};
