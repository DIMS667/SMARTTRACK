// src/pages/CanauxPage/components/shared/TagsList.jsx
import React from 'react';
import { Hash } from 'lucide-react';

const TagsList = ({ tags, size = 'sm' }) => {
  if (!tags || tags.length === 0) return null;

  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1'
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`inline-flex items-center rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${sizeClasses[size]}`}
        >
          <Hash className="h-3 w-3 mr-1" />
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagsList;