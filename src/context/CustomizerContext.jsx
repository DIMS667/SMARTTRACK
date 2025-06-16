// //CustomizerContext.jsx
// import React, { useState, createContext, useContext, useEffect } from 'react';

// const CustomizerContext = createContext();

// const themes = {
//   blue: {
//     name: 'Blue',
//     primary: 'bg-blue-600',
//     primaryHover: 'hover:bg-blue-700',
//     primaryLight: 'bg-blue-50',
//     primaryText: 'text-blue-600',
//     sidebar: 'bg-blue-600',
//     sidebarHover: 'hover:bg-blue-700'
//   },
//   purple: {
//     name: 'Purple',
//     primary: 'bg-purple-600',
//     primaryHover: 'hover:bg-purple-700',
//     primaryLight: 'bg-purple-50',
//     primaryText: 'text-purple-600',
//     sidebar: 'bg-purple-600',
//     sidebarHover: 'hover:bg-purple-700'
//   },
//   green: {
//     name: 'Green',
//     primary: 'bg-green-600',
//     primaryHover: 'hover:bg-green-700',
//     primaryLight: 'bg-green-50',
//     primaryText: 'text-green-600',
//     sidebar: 'bg-green-600',
//     sidebarHover: 'hover:bg-green-700'
//   },
//   red: {
//     name: 'Red',
//     primary: 'bg-red-600',
//     primaryHover: 'hover:bg-red-700',
//     primaryLight: 'bg-red-50',
//     primaryText: 'text-red-600',
//     sidebar: 'bg-red-600',
//     sidebarHover: 'hover:bg-red-700'
//   },
//   orange: {
//     name: 'Orange',
//     primary: 'bg-orange-600',
//     primaryHover: 'hover:bg-orange-700',
//     primaryLight: 'bg-orange-50',
//     primaryText: 'text-orange-600',
//     sidebar: 'bg-orange-600',
//     sidebarHover: 'hover:bg-orange-700'
//   },
//   indigo: {
//     name: 'Indigo',
//     primary: 'bg-indigo-600',
//     primaryHover: 'hover:bg-indigo-700',
//     primaryLight: 'bg-indigo-50',
//     primaryText: 'text-indigo-600',
//     sidebar: 'bg-indigo-600',
//     sidebarHover: 'hover:bg-indigo-700'
//   }
// };

// const navigationTypes = {
//   vertical: {
//     name: 'Vertical',
//     description: 'Sidebar navigation on the left'
//   },
//   horizontal: {
//     name: 'Horizontal',
//     description: 'Top navigation bar'
//   },
//   combo: {
//     name: 'Combo',
//     description: 'Both sidebar and top nav'
//   },
//   dual: {
//     name: 'Dual nav',
//     description: 'Collapsible dual navigation'
//   }
// };

// function CustomizerProvider({ children }) {
//   const [isDark, setIsDark] = useState(false);
//   const [currentTheme, setCurrentTheme] = useState('purple');
//   // Nouvelles propriétés pour couleurs séparées
//   const [sidebarColor, setSidebarColor] = useState('purple');
//   const [navbarColor, setNavbarColor] = useState('purple');
//   const [navType, setNavType] = useState('vertical');
//   const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
//   // Nouvelles options de layout
//   const [containerWidth, setContainerWidth] = useState('full');
//   const [borderRadius, setBorderRadius] = useState('rounded');

//   useEffect(() => {
//     const saved = localStorage.getItem('customizer-settings');
//     if (saved) {
//       const settings = JSON.parse(saved);
//       setIsDark(settings.isDark || false);
//       setCurrentTheme(settings.theme || 'purple');
//       setSidebarColor(settings.sidebarColor || settings.theme || 'purple');
//       setNavbarColor(settings.navbarColor || settings.theme || 'purple');
//       setNavType(settings.navType || 'vertical');
//       setSidebarCollapsed(settings.sidebarCollapsed || false);
//       setContainerWidth(settings.containerWidth || 'full');
//       setBorderRadius(settings.borderRadius || 'rounded');
//     }
//   }, []);

//   useEffect(() => {
//     const settings = {
//       isDark,
//       theme: currentTheme,
//       sidebarColor,
//       navbarColor,
//       navType,
//       sidebarCollapsed,
//       containerWidth,
//       borderRadius
//     };
//     localStorage.setItem('customizer-settings', JSON.stringify(settings));
    
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }

//     // Appliquer les classes CSS pour les options de layout
//     const root = document.documentElement;
    
//     // Container width
//     root.classList.remove('container-full', 'container-boxed');
//     root.classList.add(`container-${containerWidth}`);
    
//     // Border radius
//     root.classList.remove('radius-rounded', 'radius-square', 'radius-more');
//     root.classList.add(`radius-${borderRadius}`);
    
//   }, [isDark, currentTheme, sidebarColor, navbarColor, navType, sidebarCollapsed, containerWidth, borderRadius]);

//   const resetToDefault = () => {
//     setIsDark(false);
//     setCurrentTheme('purple');
//     setSidebarColor('purple');
//     setNavbarColor('purple');
//     setNavType('vertical');
//     setSidebarCollapsed(false);
//     setContainerWidth('full');
//     setBorderRadius('rounded');
//     localStorage.removeItem('customizer-settings');
//   };

//   // Fonction pour synchroniser les couleurs quand on change le thème global
//   const setGlobalTheme = (themeKey) => {
//     setCurrentTheme(themeKey);
//     setSidebarColor(themeKey);
//     setNavbarColor(themeKey);
//   };

//   return (
//     <CustomizerContext.Provider value={{ 
//       isDark, setIsDark,
//       currentTheme, setCurrentTheme,
//       sidebarColor, setSidebarColor,
//       navbarColor, setNavbarColor,
//       navType, setNavType,
//       isCustomizerOpen, setIsCustomizerOpen,
//       sidebarCollapsed, setSidebarCollapsed,
//       containerWidth, setContainerWidth,
//       borderRadius, setBorderRadius,
//       theme: themes[currentTheme],
//       sidebarTheme: themes[sidebarColor],
//       navbarTheme: themes[navbarColor],
//       setGlobalTheme,
//       resetToDefault,
//       themes,
//       navigationTypes
//     }}>
//       {children}
//     </CustomizerContext.Provider>
//   );
// }

// export function useCustomizer() {
//   return useContext(CustomizerContext);
// }

// export default CustomizerProvider;



//CustomizerContext.jsx
import React, { useState, createContext, useContext, useEffect } from 'react';

const CustomizerContext = createContext();

const themes = {
  blue: {
    name: 'Blue',
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryLight: 'bg-blue-50',
    primaryText: 'text-blue-600',
    primaryDark: 'dark:text-blue-400',
    // Sidebar complet
    sidebar: 'bg-gray-50 dark:bg-gray-900',
    sidebarHover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    // États actifs
    activeItem: 'bg-white dark:bg-gray-800',
    activeText: 'text-gray-900 dark:text-white',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    // Zones de contenu
    background: 'bg-gray-50 dark:bg-gray-900',
    content: 'bg-white dark:bg-gray-800',
    quickActions: 'bg-white dark:bg-gray-800',
    badge: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  },
  purple: {
    name: 'Purple',
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    primaryLight: 'bg-purple-50',
    primaryText: 'text-purple-600',
    primaryDark: 'dark:text-purple-400',
    // Sidebar complet
    sidebar: 'bg-gray-50 dark:bg-gray-900',
    sidebarHover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    // États actifs
    activeItem: 'bg-white dark:bg-gray-800',
    activeText: 'text-gray-900 dark:text-white',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    // Zones de contenu
    background: 'bg-gray-50 dark:bg-gray-900',
    content: 'bg-white dark:bg-gray-800',
    quickActions: 'bg-white dark:bg-gray-800',
    badge: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  },
  green: {
    name: 'Green',
    primary: 'bg-green-600',
    primaryHover: 'hover:bg-green-700',
    primaryLight: 'bg-green-50',
    primaryText: 'text-green-600',
    primaryDark: 'dark:text-green-400',
    // Sidebar complet
    sidebar: 'bg-gray-50 dark:bg-gray-900',
    sidebarHover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    // États actifs
    activeItem: 'bg-white dark:bg-gray-800',
    activeText: 'text-gray-900 dark:text-white',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    // Zones de contenu
    background: 'bg-gray-50 dark:bg-gray-900',
    content: 'bg-white dark:bg-gray-800',
    quickActions: 'bg-white dark:bg-gray-800',
    badge: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  },
  red: {
    name: 'Red',
    primary: 'bg-red-600',
    primaryHover: 'hover:bg-red-700',
    primaryLight: 'bg-red-50',
    primaryText: 'text-red-600',
    primaryDark: 'dark:text-red-400',
    // Sidebar complet
    sidebar: 'bg-gray-50 dark:bg-gray-900',
    sidebarHover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    // États actifs
    activeItem: 'bg-white dark:bg-gray-800',
    activeText: 'text-gray-900 dark:text-white',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    // Zones de contenu
    background: 'bg-gray-50 dark:bg-gray-900',
    content: 'bg-white dark:bg-gray-800',
    quickActions: 'bg-white dark:bg-gray-800',
    badge: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  },
  orange: {
    name: 'Orange',
    primary: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    primaryLight: 'bg-orange-50',
    primaryText: 'text-orange-600',
    primaryDark: 'dark:text-orange-400',
    // Sidebar complet
    sidebar: 'bg-gray-50 dark:bg-gray-900',
    sidebarHover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    // États actifs
    activeItem: 'bg-white dark:bg-gray-800',
    activeText: 'text-gray-900 dark:text-white',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    // Zones de contenu
    background: 'bg-gray-50 dark:bg-gray-900',
    content: 'bg-white dark:bg-gray-800',
    quickActions: 'bg-white dark:bg-gray-800',
    badge: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  },
  indigo: {
    name: 'Indigo',
    primary: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    primaryLight: 'bg-indigo-50',
    primaryText: 'text-indigo-600',
    primaryDark: 'dark:text-indigo-400',
    // Sidebar complet
    sidebar: 'bg-gray-50 dark:bg-gray-900',
    sidebarHover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    // États actifs
    activeItem: 'bg-white dark:bg-gray-800',
    activeText: 'text-gray-900 dark:text-white',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    // Zones de contenu
    background: 'bg-gray-50 dark:bg-gray-900',
    content: 'bg-white dark:bg-gray-800',
    quickActions: 'bg-white dark:bg-gray-800',
    badge: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  }
};

const navigationTypes = {
  vertical: {
    name: 'Vertical',
    description: 'Sidebar navigation on the left'
  },
  horizontal: {
    name: 'Horizontal',
    description: 'Top navigation bar'
  },
  combo: {
    name: 'Combo',
    description: 'Both sidebar and top nav'
  },
  dual: {
    name: 'Dual nav',
    description: 'Collapsible dual navigation'
  }
};

function CustomizerProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('purple');
  // Nouvelles propriétés pour couleurs séparées
  const [sidebarColor, setSidebarColor] = useState('purple');
  const [navbarColor, setNavbarColor] = useState('purple');
  const [navType, setNavType] = useState('vertical');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Nouvelles options de layout
  const [containerWidth, setContainerWidth] = useState('full');
  const [borderRadius, setBorderRadius] = useState('rounded');

  // Fonction pour basculer la sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const saved = localStorage.getItem('customizer-settings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        setIsDark(settings.isDark || false);
        setCurrentTheme(settings.theme || 'purple');
        setSidebarColor(settings.sidebarColor || settings.theme || 'purple');
        setNavbarColor(settings.navbarColor || settings.theme || 'purple');
        setNavType(settings.navType || 'vertical');
        setSidebarCollapsed(settings.sidebarCollapsed || false);
        setContainerWidth(settings.containerWidth || 'full');
        setBorderRadius(settings.borderRadius || 'rounded');
      } catch (error) {
        console.warn('Erreur lors du chargement des paramètres:', error);
      }
    }
  }, []);

  useEffect(() => {
    const settings = {
      isDark,
      theme: currentTheme,
      sidebarColor,
      navbarColor,
      navType,
      sidebarCollapsed,
      containerWidth,
      borderRadius
    };
    
    try {
      localStorage.setItem('customizer-settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde des paramètres:', error);
    }
    
    // Gestion du mode sombre
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Appliquer les classes CSS pour les options de layout
    const root = document.documentElement;
    
    // Container width
    root.classList.remove('container-full', 'container-boxed');
    root.classList.add(`container-${containerWidth}`);
    
    // Border radius
    root.classList.remove('radius-rounded', 'radius-square', 'radius-more');
    root.classList.add(`radius-${borderRadius}`);
    
  }, [isDark, currentTheme, sidebarColor, navbarColor, navType, sidebarCollapsed, containerWidth, borderRadius]);

  const resetToDefault = () => {
    setIsDark(false);
    setCurrentTheme('purple');
    setSidebarColor('purple');
    setNavbarColor('purple');
    setNavType('vertical');
    setSidebarCollapsed(false);
    setContainerWidth('full');
    setBorderRadius('rounded');
    localStorage.removeItem('customizer-settings');
  };

  // Fonction pour synchroniser les couleurs quand on change le thème global
  const setGlobalTheme = (themeKey) => {
    setCurrentTheme(themeKey);
    setSidebarColor(themeKey);
    setNavbarColor(themeKey);
  };

  return (
    <CustomizerContext.Provider value={{ 
      isDark, setIsDark,
      currentTheme, setCurrentTheme,
      sidebarColor, setSidebarColor,
      navbarColor, setNavbarColor,
      navType, setNavType,
      isCustomizerOpen, setIsCustomizerOpen,
      sidebarCollapsed, setSidebarCollapsed,
      toggleSidebar,
      containerWidth, setContainerWidth,
      borderRadius, setBorderRadius,
      theme: themes[currentTheme],
      sidebarTheme: themes[sidebarColor],
      navbarTheme: themes[navbarColor],
      setGlobalTheme,
      resetToDefault,
      themes,
      navigationTypes
    }}>
      {children}
    </CustomizerContext.Provider>
  );
}

export function useCustomizer() {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
}

export default CustomizerProvider;