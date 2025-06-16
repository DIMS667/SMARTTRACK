// SidebarItem.jsx - Version avec support des thèmes dynamiques
import React from 'react';
import { useCustomizer } from '@/context/CustomizerContext';

function SidebarItem({ 
  icon: Icon, 
  label, 
  active = false, 
  collapsed = false, 
  onClick, 
  disabled = false,
  count = null 
}) {
  const { sidebarTheme } = useCustomizer();

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative
        ${active && !disabled
          ? 'bg-white text-gray-900 shadow-sm' 
          : disabled
          ? 'text-white/30 cursor-not-allowed'
          : 'text-white/80 hover:text-white hover:bg-black/20'
        }
      `}
      title={collapsed ? label : ''}
    >
      {/* Indicateur actif */}
      {active && !collapsed && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
      )}
      
      <Icon className={`
        h-5 w-5 flex-shrink-0 ${collapsed ? '' : 'mr-3'} 
        ${disabled ? 'opacity-30' : ''}
        ${active ? 'text-gray-900' : 'text-white/80 group-hover:text-white'}
      `} />
      
      {!collapsed && (
        <>
          <span className={`flex-1 text-left ${disabled ? 'opacity-30' : ''}`}>
            {label}
          </span>
          {count && !disabled && (
            <span className={`${active ? 'bg-gray-100 text-gray-600' : 'bg-white/20 text-white'} text-xs rounded-full px-2 py-1 ml-2 font-medium`}>
              {count}
            </span>
          )}
        </>
      )}
    </button>
  );
}

export default SidebarItem;