import React, { useState } from 'react';

const PLACEHOLDER_IMAGE = '/src/assets/undraw_hot-air-balloon_6knx.svg';

const SecureImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = PLACEHOLDER_IMAGE,
  onError,
  loading = "lazy",
  ...props 
}) => {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
      if (onError) {
        onError(e);
      }
    }
  };

  const handleLoad = () => {
    // Reset error state when image loads successfully
    if (hasError && currentSrc === fallbackSrc) {
      setHasError(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <img
        src={currentSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${className}`}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading}
        {...props}
      />
      
      {/* Indicateur visuel si c'est l'image placeholder */}
      {currentSrc === fallbackSrc && hasError && (
        <div className="absolute top-2 right-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-md text-xs font-medium">
          <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Image manquante
        </div>
      )}
    </div>
  );
};

export default SecureImage;