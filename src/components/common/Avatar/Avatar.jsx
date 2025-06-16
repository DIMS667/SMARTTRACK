//avatar
import React from 'react';

function Avatar({ src, alt, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  return (
    <div className={`${sizes[size]} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            {alt?.charAt(0)?.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

export default Avatar;