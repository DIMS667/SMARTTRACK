// // src/pages/SettingsPage/SettingsPage.jsx
// import React, { useState } from 'react';
// import { Settings } from 'lucide-react';
// import AxesManagement from './AxesManagement';
// import TasksManagement from './TasksManagement';
// import PricingPage from '../PricingPage/PricingPage';

// function SettingsPage({ activeSection = 'axes' }) {
//   const renderContent = () => {
//     switch (activeSection) {
//       case 'axes':
//         return <AxesManagement />;
//       case 'tasks':
//         return <TasksManagement />;
//       case 'pricing':
//         return <PricingPage />;
//       default:
//         return <AxesManagement />;
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
//       {/* Header */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//             <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               Paramètres
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Configurez votre application SMARTTRACK
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Contenu */}
//       <div className="flex-1 overflow-auto">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default SettingsPage;


// src/pages/SettingsPage/SettingsPage.jsx
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import AxesManagement from './axes'; // Mise à jour du chemin d'importation
import TasksManagement from './TasksManagement';
import PricingPage from '../PricingPage/PricingPage';

function SettingsPage({ activeSection = 'axes' }) {
  const renderContent = () => {
    switch (activeSection) {
      case 'axes':
        return <AxesManagement />;
      case 'tasks':
        return <TasksManagement />;
      case 'pricing':
        return <PricingPage />;
      default:
        return <AxesManagement />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Paramètres
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configurez votre application SMARTTRACK
            </p>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default SettingsPage;