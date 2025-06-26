// src/pages/SourcesPage/components/GoogleNews/components/LocationSelector.jsx
import React from 'react';
import { MapPin } from 'lucide-react';
import { LOCATIONS } from '../constants';

const LocationSelector = ({ selectedLocation, onLocationChange }) => {
  return (
    <div className="flex items-center gap-2">
      <MapPin className="w-5 h-5 text-gray-400" />
      <select
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[140px]"
      >
        {LOCATIONS.map(location => (
          <option key={location.id} value={location.id}>
            {location.flag} {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;