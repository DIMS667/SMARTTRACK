//customizebutton
import React from 'react';
import { Settings } from 'lucide-react';
import { useCustomizer } from '@/context/CustomizerContext';

function CustomizeButton() {
  const { setIsCustomizerOpen, theme } = useCustomizer();

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      <button
        onClick={() => setIsCustomizerOpen(true)}
        className={`
          ${theme.primary} ${theme.primaryHover} text-white px-3 py-6 rounded-l-lg shadow-lg 
          transition-all duration-200 flex items-center group hover:px-4
        `}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <Settings className="w-4 h-4 mb-2 animate-spin group-hover:animate-spin" />
        <span className="text-sm font-medium">CUSTOMIZE</span>
      </button>
    </div>
  );
}

export default CustomizeButton;