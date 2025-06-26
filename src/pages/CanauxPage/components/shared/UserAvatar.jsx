// src/pages/CanauxPage/components/shared/UserAvatar.jsx
import React from 'react';
import { Check } from 'lucide-react';

const UserAvatar = ({ user, size = 'md', showVerification = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const verificationSizes = {
    sm: 'w-4 h-4 -bottom-0.5 -right-0.5',
    md: 'w-5 h-5 -bottom-1 -right-1',
    lg: 'w-6 h-6 -bottom-1 -right-1',
    xl: 'w-8 h-8 -bottom-1 -right-1'
  };

  return (
    <div className="relative">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center`}>
          <span className="text-white font-medium">
            {user.name.charAt(0)}
          </span>
        </div>
      )}
      {showVerification && user.isVerified && (
        <div className={`absolute ${verificationSizes[size]} bg-blue-500 rounded-full flex items-center justify-center`}>
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;