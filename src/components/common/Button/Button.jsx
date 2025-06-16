//button
import React from 'react';
import { useCustomizer } from '@/context/CustomizerContext';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const { theme } = useCustomizer();
  
  const variants = {
    primary: `${theme.primary} ${theme.primaryHover} text-white`,
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button 
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-lg font-medium transition-colors duration-200 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;