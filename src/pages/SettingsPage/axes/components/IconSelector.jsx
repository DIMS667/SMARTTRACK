// // src/pages/SettingsPage/axes/components/IconSelector.jsx
// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import * as LucideIcons from 'lucide-react';

// // Collection exhaustive d'icônes professionnelles
// // Organisées par catégories pour faciliter la recherche
// const ICON_CATEGORIES = {
//   "Analytique": [
//     "BarChart", "LineChart", "PieChart", "AreaChart", "Activity", "TrendingUp", 
//     "TrendingDown", "BarChart2", "BarChart3", "BarChart4", "Radar", "ChartBar"
//   ],
//   "Business": [
//     "Briefcase", "Building", "Building2", "Landmark", "Factory", "Store", 
//     "ShoppingBag", "ShoppingCart", "CreditCard", "DollarSign", "Percent", 
//     "Calculator", "FileSpreadsheet", "Wallet", "Receipt", "BadgeDollarSign"
//   ],
//   "Communication": [
//     "Mail", "MessageCircle", "MessageSquare", "Send", "Share", "Share2", 
//     "Phone", "PhoneCall", "PhoneForwarded", "PhoneIncoming", "PhoneOutgoing", 
//     "Headphones", "Voicemail", "AtSign", "BellRing", "Megaphone"
//   ],
//   "Documents": [
//     "File", "FileText", "FilePlus", "FileCheck", "FileBarChart", "FileMinus", 
//     "FileSearch", "Copy", "Clipboard", "ClipboardCheck", "ClipboardCopy", 
//     "Book", "BookOpen", "Paperclip", "Archive", "FolderOpen"
//   ],
//   "Education": [
//     "GraduationCap", "BookOpen", "Library", "School", "PenTool", "Edit", 
//     "Pencil", "Highlighter", "Book", "LampDesk", "ChalkboardTeacher", 
//     "Notebook", "Calculator", "Brain"
//   ],
//   "Environnement": [
//     "Leaf", "Cloud", "CloudRain", "CloudSnow", "Wind", "Droplet", "Sun", 
//     "Sunrise", "Sunset", "Thermometer", "Umbrella", "FlowerBlossom", 
//     "Mountain", "TreePine", "Mountain", "Waves"
//   ],
//   "Finance": [
//     "DollarSign", "EuroSign", "PoundSterling", "Coins", "CreditCard", "Wallet", 
//     "BankBuilding", "TrendingUp", "TrendingDown", "LineChart", "PieChart", 
//     "BarChart", "Receipt", "Percent", "BadgeDollarSign", "Landmark"
//   ],
//   "Général": [
//     "Home", "Settings", "User", "Users", "Star", "Heart", "Clock", "Calendar", 
//     "Map", "MapPin", "Compass", "Flag", "Bell", "Info", "HelpCircle", 
//     "AlertCircle", "CheckCircle", "XCircle", "Filter", "Search"
//   ],
//   "Gouvernement": [
//     "Landmark", "Scale", "Gavel", "FileSignature", "Stamp", "Award", "Vote", 
//     "Building2", "Globe", "Flag", "Shield", "UserCheck", "FileText", "BookLock",
//     "FileAttachment", "HandCoins"
//   ],
//   "Industries": [
//     "Factory", "Truck", "Wrench", "Tool", "Hammer", "HardHat", "Cog", "Anchor", 
//     "Plane", "Tractor", "Ship", "Construction", "Drill", "Hammer", "FlameWrench"
//   ],
//   "Juridique": [
//     "Scale", "Gavel", "FileSignature", "Stamp", "Award", "Vote", "Building2", 
//     "ScrollText", "Bookmark", "BookMarked", "FileCheck", "FileWarning", 
//     "FileLock", "FileKey", "FileStack", "FilePlus2"
//   ],
//   "Management": [
//     "Target", "Flag", "Award", "Trophy", "CheckSquare", "Clock", "Calendar", 
//     "CalendarCheck", "List", "ListChecks", "ListTodo", "ClipboardCheck", 
//     "Kanban", "GanttChart", "Workflow", "GitBranch"
//   ],
//   "Médical": [
//     "Heart", "Activity", "Stethoscope", "Thermometer", "Pill", "Microscope", 
//     "FirstAid", "Pulse", "Vaccine", "Virus", "Lungs", "Brain", 
//     "HeartPulse", "Bandage", "Hospital", "Dna"
//   ],
//   "Politique": [
//     "Vote", "Landmark", "Flag", "Globe", "Users", "UserCheck", "Scale", 
//     "MessageSquare", "Megaphone", "Building2", "FileSignature", "HandCoins", 
//     "Gavel", "ScrollText", "FileCheck"
//   ],
//   "Ressources": [
//     "Database", "Server", "HardDrive", "Cpu", "Memory", "Battery", "BatteryCharging", 
//     "BatteryFull", "BatteryLow", "BatteryMedium", "BatteryWarning", "Power", 
//     "Plug", "PlugZap", "Cloud", "CloudCog"
//   ],
//   "Sécurité": [
//     "Lock", "Unlock", "Shield", "ShieldAlert", "ShieldCheck", "ShieldOff", 
//     "Key", "KeyRound", "Fingerprint", "Scan", "ScanFace", "Eye", "EyeOff", 
//     "AlertTriangle", "BellRing", "BellOff"
//   ],
//   "Social": [
//     "Users", "UserPlus", "UserMinus", "UserCheck", "UserX", "UserCog", 
//     "MessageCircle", "MessageSquare", "Share", "Share2", "ThumbsUp", 
//     "ThumbsDown", "Heart", "Award", "Trophy", "Handshake"
//   ],
//   "Stratégie": [
//     "Target", "Flag", "Compass", "Map", "Crosshair", "Navigation", 
//     "GitBranch", "GitFork", "GitMerge", "GitPullRequest", "GitCommit", 
//     "Workflow", "Milestone", "Layers", "Puzzle"
//   ],
//   "Technologie": [
//     "Cpu", "Server", "Database", "Cloud", "Code", "CodeSquare", "Terminal", 
//     "GitBranch", "Wifi", "Bluetooth", "Radio", "Smartphone", "Tablet", 
//     "Laptop", "Monitor", "Plug", "PlugZap", "Chip"
//   ]
// };

// /**
//  * Composant de sélection d'icônes professionnelles
//  * 
//  * @param {Object} props
//  * @param {string} props.selectedIcon - Nom de l'icône actuellement sélectionnée
//  * @param {Function} props.onChange - Fonction appelée lors du changement d'icône
//  * @param {string} props.colorClass - Classe CSS pour la couleur d'arrière-plan
//  */
// const IconSelector = ({ selectedIcon, onChange, colorClass = "bg-blue-500" }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(Object.keys(ICON_CATEGORIES)[0]);
//   const [showAllIcons, setShowAllIcons] = useState(false);

//   // Obtenir le composant d'icône à partir du nom
//   const getIconComponent = (iconName) => {
//     return LucideIcons[iconName] || LucideIcons.HelpCircle;
//   };

//   // Filtrer les icônes en fonction du terme de recherche
//   const getFilteredIcons = () => {
//     if (!searchTerm.trim()) {
//       return showAllIcons 
//         ? Object.entries(ICON_CATEGORIES).flatMap(([category, icons]) => 
//             icons.map(icon => ({ name: icon, category }))
//           )
//         : ICON_CATEGORIES[selectedCategory]?.map(icon => ({ 
//             name: icon, 
//             category: selectedCategory 
//           })) || [];
//     }

//     const term = searchTerm.toLowerCase();
//     return Object.entries(ICON_CATEGORIES)
//       .flatMap(([category, icons]) => 
//         icons
//           .filter(icon => icon.toLowerCase().includes(term))
//           .map(icon => ({ name: icon, category }))
//       );
//   };

//   const filteredIcons = getFilteredIcons();

//   // Afficher le composant d'icône sélectionné
//   const SelectedIconComponent = selectedIcon ? getIconComponent(selectedIcon) : null;

//   return (
//     <div className="space-y-4">
//       {/* En-tête avec l'aperçu de l'icône sélectionnée */}
//       {selectedIcon && (
//         <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//           <div className={`p-2 ${colorClass} rounded-lg`}>
//             {SelectedIconComponent && <SelectedIconComponent className="w-5 h-5 text-white" />}
//           </div>
//           <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
//             {selectedIcon}
//           </div>
//         </div>
//       )}

//       {/* Barre de recherche */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setShowAllIcons(e.target.value.trim() !== '');
//           }}
//           placeholder="Rechercher une icône..."
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Sélecteur de catégories (visible seulement si pas de recherche) */}
//       {!searchTerm && (
//         <div className="flex flex-wrap gap-2 pb-2 max-h-28 overflow-y-auto">
//           {Object.keys(ICON_CATEGORIES).map((category) => (
//             <button
//               key={category}
//               type="button"
//               onClick={() => {
//                 setSelectedCategory(category);
//                 setShowAllIcons(false);
//               }}
//               className={`px-3 py-1 text-xs rounded-full transition-colors ${
//                 selectedCategory === category && !showAllIcons
//                   ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200'
//                   : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//           <button
//             type="button"
//             onClick={() => setShowAllIcons(true)}
//             className={`px-3 py-1 text-xs rounded-full transition-colors ${
//               showAllIcons
//                 ? 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200'
//                 : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//             }`}
//           >
//             Toutes les icônes
//           </button>
//         </div>
//       )}

//       {/* Grille d'icônes */}
//       <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto p-1">
//         {filteredIcons.length > 0 ? (
//           filteredIcons.map(({ name, category }) => {
//             const IconComponent = getIconComponent(name);
//             const isSelected = selectedIcon === name;
            
//             return (
//               <button
//                 key={name}
//                 type="button"
//                 title={`${name} (${category})`}
//                 onClick={() => onChange(name)}
//                 className={`relative p-3 rounded-lg border-2 transition-all ${
//                   isSelected
//                     ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
//                     : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
//                 }`}
//               >
//                 <div className="flex items-center justify-center">
//                   <IconComponent className={`w-5 h-5 ${
//                     isSelected 
//                       ? 'text-blue-600 dark:text-blue-400' 
//                       : 'text-gray-700 dark:text-gray-300'
//                   }`} />
//                 </div>
//               </button>
//             );
//           })
//         ) : (
//           <div className="col-span-6 text-center py-8 text-gray-500 dark:text-gray-400">
//             Aucune icône trouvée pour "{searchTerm}"
//           </div>
//         )}
//       </div>

//       {/* Informations sur le nombre d'icônes */}
//       <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
//         <span>
//           {searchTerm 
//             ? `${filteredIcons.length} icône${filteredIcons.length > 1 ? 's' : ''} trouvée${filteredIcons.length > 1 ? 's' : ''}`
//             : showAllIcons
//               ? `Toutes les icônes (${filteredIcons.length})`
//               : `${selectedCategory} (${filteredIcons.length})`
//           }
//         </span>
//         <button 
//           type="button" 
//           onClick={() => onChange(null)}
//           className="text-blue-600 dark:text-blue-400 hover:underline"
//         >
//           Réinitialiser
//         </button>
//       </div>
//     </div>
//   );
// };

// export default IconSelector;

// src/pages/SettingsPage/axes/components/IconSelector.jsx
import React, { useState, useEffect } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Catégories d'icônes organisées par thème
const ICON_CATEGORIES = {
  "Analytique": [
    "BarChart", "LineChart", "PieChart", "AreaChart", "Activity", "TrendingUp", 
    "TrendingDown", "BarChart2", "BarChart3", "BarChart4", "Radar", "ChartBar"
  ],
  "Business": [
    "Briefcase", "Building", "Building2", "Landmark", "Factory", "Store", 
    "ShoppingBag", "ShoppingCart", "CreditCard", "DollarSign", "Percent", 
    "Calculator", "FileSpreadsheet", "Wallet", "Receipt", "BadgeDollarSign"
  ],
  "Communication": [
    "Mail", "MessageCircle", "MessageSquare", "Send", "Share", "Share2", 
    "Phone", "PhoneCall", "PhoneForwarded", "PhoneIncoming", "PhoneOutgoing", 
    "Headphones", "Voicemail", "AtSign", "BellRing", "Megaphone"
  ],
  "Documents": [
    "File", "FileText", "FilePlus", "FileCheck", "FileBarChart", "FileMinus", 
    "FileSearch", "Copy", "Clipboard", "ClipboardCheck", "ClipboardCopy", 
    "Book", "BookOpen", "Paperclip", "Archive", "FolderOpen"
  ],
  "Education": [
    "GraduationCap", "BookOpen", "Library", "School", "PenTool", "Edit", 
    "Pencil", "Highlighter", "Book", "LampDesk", "Award", 
    "Notebook", "Calculator", "Brain"
  ],
  "Environnement": [
    "Leaf", "Cloud", "CloudRain", "CloudSnow", "Wind", "Droplet", "Sun", 
    "Sunrise", "Sunset", "Thermometer", "Umbrella", "Flower", 
    "Mountain", "TreePine", "Mountain", "Waves"
  ],
  "Finance": [
    "DollarSign", "Euro", "PoundSterling", "Bitcoin", "CreditCard", "Wallet", 
    "Bank", "TrendingUp", "TrendingDown", "LineChart", "PieChart", 
    "BarChart", "Receipt", "Percent", "BadgeDollarSign", "Landmark"
  ],
  "Général": [
    "Home", "Settings", "User", "Users", "Star", "Heart", "Clock", "Calendar", 
    "Map", "MapPin", "Compass", "Flag", "Bell", "Info", "HelpCircle", 
    "AlertCircle", "CheckCircle", "XCircle", "Filter", "Search"
  ],
  "Gouvernement": [
    "Landmark", "Scale", "Gavel", "FileSignature", "Stamp", "Award", "Vote", 
    "Building2", "Globe", "Flag", "Shield", "UserCheck", "FileText", "BookLock",
    "FileAttachment", "Coins"
  ],
  "Industries": [
    "Factory", "Truck", "Wrench", "Tool", "Hammer", "HardHat", "Cog", "Anchor", 
    "Plane", "Tractor", "Ship", "Construction", "Drill", "Hammer", "FlameKindling"
  ],
  "Juridique": [
    "Scale", "Gavel", "FileSignature", "Stamp", "Award", "Vote", "Building2", 
    "ScrollText", "Bookmark", "BookMarked", "FileCheck", "FileWarning", 
    "FileLock", "FileKey", "FileStack", "FilePlus2"
  ],
  "Management": [
    "Target", "Flag", "Award", "Trophy", "CheckSquare", "Clock", "Calendar", 
    "CalendarCheck", "List", "ListChecks", "ListTodo", "ClipboardCheck", 
    "Kanban", "Gantt", "GitBranch", "GitMerge"
  ],
  "Médical": [
    "Heart", "Activity", "Stethoscope", "Thermometer", "Pill", "Microscope", 
    "FirstAid", "Activity", "Vaccine", "Virus", "Lungs", "Brain", 
    "HeartPulse", "Bandage", "Hospital", "Dna"
  ],
  "Politique": [
    "Vote", "Landmark", "Flag", "Globe", "Users", "UserCheck", "Scale", 
    "MessageSquare", "Megaphone", "Building2", "FileSignature", "Coins", 
    "Gavel", "ScrollText", "FileCheck"
  ],
  "Ressources": [
    "Database", "Server", "HardDrive", "Cpu", "Memory", "Battery", "BatteryCharging", 
    "BatteryFull", "BatteryLow", "BatteryMedium", "BatteryWarning", "Power", 
    "Plug", "PlugZap", "Cloud", "CloudCog"
  ],
  "Sécurité": [
    "Lock", "Unlock", "Shield", "ShieldAlert", "ShieldCheck", "ShieldOff", 
    "Key", "KeyRound", "Fingerprint", "Scan", "ScanFace", "Eye", "EyeOff", 
    "AlertTriangle", "BellRing", "BellOff"
  ],
  "Social": [
    "Users", "UserPlus", "UserMinus", "UserCheck", "UserX", "UserCog", 
    "MessageCircle", "MessageSquare", "Share", "Share2", "ThumbsUp", 
    "ThumbsDown", "Heart", "Award", "Trophy", "Handshake"
  ],
  "Stratégie": [
    "Target", "Flag", "Compass", "Map", "Crosshair", "Navigation", 
    "GitBranch", "GitFork", "GitMerge", "GitPullRequest", "GitCommit", 
    "Workflow", "Milestone", "Layers", "Puzzle"
  ],
  "Technologie": [
    "Cpu", "Server", "Database", "Cloud", "Code", "CodeSquare", "Terminal", 
    "GitBranch", "Wifi", "Bluetooth", "Radio", "Smartphone", "Tablet", 
    "Laptop", "Monitor", "Plug", "PlugZap", "Chip"
  ]
};

// Récupérer toutes les icônes disponibles dans Lucide
const getAllIconNames = () => {
  const allIcons = [];
  
  // Vérifier si les icônes existent réellement dans Lucide
  Object.values(ICON_CATEGORIES).forEach(category => {
    category.forEach(iconName => {
      if (LucideIcons[iconName] && !allIcons.includes(iconName)) {
        allIcons.push(iconName);
      }
    });
  });
  
  return allIcons;
};

// Catégories ordonnées pour l'affichage
const ORDERED_CATEGORIES = Object.keys(ICON_CATEGORIES);

/**
 * Composant de sélection d'icônes professionnelles
 * 
 * @param {Object} props
 * @param {string} props.selectedIcon - Nom de l'icône actuellement sélectionnée
 * @param {Function} props.onChange - Fonction appelée lors du changement d'icône
 * @param {string} props.colorClass - Classe CSS pour la couleur d'arrière-plan
 */
const IconSelector = ({ selectedIcon, onChange, colorClass = "bg-blue-500" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ORDERED_CATEGORIES[0]);
  const [showAllIcons, setShowAllIcons] = useState(false);
  const [availableIcons, setAvailableIcons] = useState([]);

  // Initialiser la liste des icônes disponibles
  useEffect(() => {
    setAvailableIcons(getAllIconNames());
  }, []);

  // Obtenir le composant d'icône à partir du nom
  const getIconComponent = (iconName) => {
    return LucideIcons[iconName] || HelpCircle;
  };

  // Filtrer les icônes en fonction du terme de recherche
  const getFilteredIcons = () => {
    if (!searchTerm.trim()) {
      return showAllIcons 
        ? Object.entries(ICON_CATEGORIES).flatMap(([category, icons]) => 
            icons.filter(iconName => LucideIcons[iconName]).map(iconName => ({ 
              name: iconName, 
              category 
            }))
          )
        : ICON_CATEGORIES[selectedCategory]?.filter(iconName => LucideIcons[iconName]).map(iconName => ({ 
            name: iconName, 
            category: selectedCategory 
          })) || [];
    }

    const term = searchTerm.toLowerCase();
    return Object.entries(ICON_CATEGORIES)
      .flatMap(([category, icons]) => 
        icons
          .filter(iconName => LucideIcons[iconName] && iconName.toLowerCase().includes(term))
          .map(iconName => ({ name: iconName, category }))
      );
  };

  const filteredIcons = getFilteredIcons();

  // Obtenir le composant d'icône sélectionné
  const SelectedIconComponent = selectedIcon && LucideIcons[selectedIcon] 
    ? getIconComponent(selectedIcon) 
    : null;

  return (
    <div className="space-y-4">
      {/* En-tête avec l'aperçu de l'icône sélectionnée */}
      {selectedIcon && SelectedIconComponent && (
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className={`p-2 ${colorClass} rounded-lg`}>
            <SelectedIconComponent className="w-5 h-5 text-white" />
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selectedIcon}
          </div>
        </div>
      )}

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowAllIcons(e.target.value.trim() !== '');
          }}
          placeholder="Rechercher une icône..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sélecteur de catégories (visible seulement si pas de recherche) */}
      {!searchTerm && (
        <div className="flex flex-wrap gap-2 pb-2 max-h-28 overflow-y-auto">
          {ORDERED_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setShowAllIcons(false);
              }}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === category && !showAllIcons
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowAllIcons(true)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              showAllIcons
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Toutes les icônes
          </button>
        </div>
      )}

      {/* Grille d'icônes */}
      <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto p-1">
        {filteredIcons.length > 0 ? (
          filteredIcons.map(({ name, category }) => {
            const IconComponent = getIconComponent(name);
            const isSelected = selectedIcon === name;
            
            return (
              <button
                key={name}
                type="button"
                title={`${name} (${category})`}
                onClick={() => onChange(name)}
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-center">
                  <IconComponent className={`w-5 h-5 ${
                    isSelected 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`} />
                </div>
              </button>
            );
          })
        ) : (
          <div className="col-span-6 text-center py-8 text-gray-500 dark:text-gray-400">
            Aucune icône trouvée pour "{searchTerm}"
          </div>
        )}
      </div>

      {/* Informations sur le nombre d'icônes */}
      <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
        <span>
          {searchTerm 
            ? `${filteredIcons.length} icône${filteredIcons.length > 1 ? 's' : ''} trouvée${filteredIcons.length > 1 ? 's' : ''}`
            : showAllIcons
              ? `Toutes les icônes (${filteredIcons.length})`
              : `${selectedCategory} (${filteredIcons.length})`
          }
        </span>
        <button 
          type="button" 
          onClick={() => onChange(null)}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default IconSelector;

// /**
//  * Composant de sélection d'icônes professionnelles
//  * 
//  * @param {Object} props
//  * @param {string} props.selectedIcon - Nom de l'icône actuellement sélectionnée
//  * @param {Function} props.onChange - Fonction appelée lors du changement d'icône
//  * @param {string} props.colorClass - Classe CSS pour la couleur d'arrière-plan
//  */
// const IconSelector = ({ selectedIcon, onChange, colorClass = "bg-blue-500" }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(Object.keys(ICON_CATEGORIES)[0]);
//   const [showAllIcons, setShowAllIcons] = useState(false);

//   // Obtenir le composant d'icône à partir du nom
//   const getIconComponent = (iconName) => {
//     return LucideIcons[iconName] || LucideIcons.HelpCircle;
//   };

//   // Filtrer les icônes en fonction du terme de recherche
//   const getFilteredIcons = () => {
//     if (!searchTerm.trim()) {
//       return showAllIcons 
//         ? Object.entries(ICON_CATEGORIES).flatMap(([category, icons]) => 
//             icons.map(icon => ({ name: icon, category }))
//           )
//         : ICON_CATEGORIES[selectedCategory]?.map(icon => ({ 
//             name: icon, 
//             category: selectedCategory 
//           })) || [];
//     }

//     const term = searchTerm.toLowerCase();
//     return Object.entries(ICON_CATEGORIES)
//       .flatMap(([category, icons]) => 
//         icons
//           .filter(icon => icon.toLowerCase().includes(term))
//           .map(icon => ({ name: icon, category }))
//       );
//   };

//   const filteredIcons = getFilteredIcons();

//   // Afficher le composant d'icône sélectionné
//   const SelectedIconComponent = selectedIcon ? getIconComponent(selectedIcon) : null;

//   return (
//     <div className="space-y-4">
//       {/* En-tête avec l'aperçu de l'icône sélectionnée */}
//       {selectedIcon && (
//         <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//           <div className={`p-2 ${colorClass} rounded-lg`}>
//             {SelectedIconComponent && <SelectedIconComponent className="w-5 h-5 text-white" />}
//           </div>
//           <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
//             {selectedIcon}
//           </div>
//         </div>
//       )}

//       {/* Barre de recherche */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setShowAllIcons(e.target.value.trim() !== '');
//           }}
//           placeholder="Rechercher une icône..."
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Sélecteur de catégories (visible seulement si pas de recherche) */}
//       {!searchTerm && (
//         <div className="flex flex-wrap gap-2 pb-2 max-h-28 overflow-y-auto">
//           {Object.keys(ICON_CATEGORIES).map((category) => (
//             <button
//               key={category}
//               type="button"
//               onClick={() => {
//                 setSelectedCategory(category);
//                 setShowAllIcons(false);
//               }}
//               className={`px-3 py-1 text-xs rounded-full transition-colors ${
//                 selectedCategory === category && !showAllIcons
//                   ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200'
//                   : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//           <button
//             type="button"
//             onClick={() => setShowAllIcons(true)}
//             className={`px-3 py-1 text-xs rounded-full transition-colors ${
//               showAllIcons
//                 ? 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200'
//                 : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//             }`}
//           >
//             Toutes les icônes
//           </button>
//         </div>
//       )}

//       {/* Grille d'icônes */}
//       <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto p-1">
//         {filteredIcons.length > 0 ? (
//           filteredIcons.map(({ name, category }) => {
//             const IconComponent = getIconComponent(name);
//             const isSelected = selectedIcon === name;
            
//             return (
//               <button
//                 key={name}
//                 type="button"
//                 title={`${name} (${category})`}
//                 onClick={() => onChange(name)}
//                 className={`relative p-3 rounded-lg border-2 transition-all ${
//                   isSelected
//                     ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
//                     : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
//                 }`}
//               >
//                 <div className="flex items-center justify-center">
//                   <IconComponent className={`w-5 h-5 ${
//                     isSelected 
//                       ? 'text-blue-600 dark:text-blue-400' 
//                       : 'text-gray-700 dark:text-gray-300'
//                   }`} />
//                 </div>
//               </button>
//             );
//           })
//         ) : (
//           <div className="col-span-6 text-center py-8 text-gray-500 dark:text-gray-400">
//             Aucune icône trouvée pour "{searchTerm}"
//           </div>
//         )}
//       </div>

//       {/* Informations sur le nombre d'icônes */}
//       <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
//         <span>
//           {searchTerm 
//             ? `${filteredIcons.length} icône${filteredIcons.length > 1 ? 's' : ''} trouvée${filteredIcons.length > 1 ? 's' : ''}`
//             : showAllIcons
//               ? `Toutes les icônes (${filteredIcons.length})`
//               : `${selectedCategory} (${filteredIcons.length})`
//           }
//         </span>
//         <button 
//           type="button" 
//           onClick={() => onChange(null)}
//           className="text-blue-600 dark:text-blue-400 hover:underline"
//         >
//           Réinitialiser
//         </button>
//       </div>
//     </div>
//   );
// };

// export default IconSelector;