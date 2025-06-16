import React, { useState } from 'react';

const PLACEHOLDER_IMAGE = '/src/assets/undraw_hot-air-balloon_6knx.svg';

const SmartImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = PLACEHOLDER_IMAGE,
  onError,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      setIsLoading(false);
      
      // Appeler la fonction onError si fournie (pour useArticles)
      if (onError && src !== fallbackSrc) {
        onError(src);
      }
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Si l'URL source est déjà invalide, utiliser directement le placeholder
  React.useEffect(() => {
    if (!src || 
        src === null || 
        src === undefined || 
        src.trim() === "" ||
        src === "data:invalid") {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
    } else {
      setImgSrc(src);
      setHasError(false);
      setIsLoading(true);
    }
  }, [src, fallbackSrc]);

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton de chargement */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      
      {/* Image principale */}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
      
      {/* Indicateur pour les images de fallback */}
      {hasError && imgSrc === fallbackSrc && (
        <div className="absolute top-2 right-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>Image par défaut</span>
        </div>
      )}
    </div>
  );
};

export default SmartImage;