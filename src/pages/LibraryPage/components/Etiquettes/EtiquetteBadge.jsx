// // src/pages/LibraryPage/components/Etiquettes/EtiquetteBadge.jsx
// import React from 'react';

// const EtiquetteBadge = ({ 
//   etiquette, 
//   taille = 'normal', 
//   supprimable = false, 
//   onSupprimer = null,
//   onClick = null,
//   className = ''
// }) => {
//   if (!etiquette) return null;

//   const tailles = {
//     petit: 'px-2 py-0.5 text-xs',
//     normal: 'px-2.5 py-1 text-sm',
//     grand: 'px-3 py-1.5 text-base'
//   };

//   const tailleClasse = tailles[taille] || tailles.normal;

//   // Fonction pour calculer la couleur du texte basée sur la luminosité de la couleur de fond
//   const obtenirCouleurTexte = (couleurFond) => {
//     // Convertir la couleur hex en RGB
//     const hex = couleurFond.replace('#', '');
//     const r = parseInt(hex.substr(0, 2), 16);
//     const g = parseInt(hex.substr(2, 2), 16);
//     const b = parseInt(hex.substr(4, 2), 16);
    
//     // Calculer la luminosité
//     const luminosite = (r * 299 + g * 587 + b * 114) / 1000;
    
//     // Retourner blanc pour les couleurs sombres, noir pour les couleurs claires
//     return luminosite > 128 ? '#000000' : '#ffffff';
//   };

//   const couleurTexte = obtenirCouleurTexte(etiquette.couleur);
  
//   const handleClick = (e) => {
//     e.stopPropagation();
//     if (onClick) {
//       onClick(etiquette);
//     }
//   };

//   const handleSupprimer = (e) => {
//     e.stopPropagation();
//     if (onSupprimer) {
//       onSupprimer(etiquette);
//     }
//   };

//   return (
//     <span
//       className={`
//         inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200
//         ${tailleClasse}
//         ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-md' : ''}
//         ${className}
//       `}
//       style={{
//         backgroundColor: etiquette.couleur,
//         color: couleurTexte
//       }}
//       onClick={handleClick}
//       title={`${etiquette.nom}${etiquette.nombreUtilisations ? ` (${etiquette.nombreUtilisations} utilisations)` : ''}`}
//     >
//       {/* Icône d'étiquette */}
//       <svg 
//         className={`${taille === 'petit' ? 'w-3 h-3' : taille === 'grand' ? 'w-5 h-5' : 'w-4 h-4'}`} 
//         fill="none" 
//         stroke="currentColor" 
//         viewBox="0 0 24 24"
//       >
//         <path 
//           strokeLinecap="round" 
//           strokeLinejoin="round" 
//           strokeWidth="2" 
//           d="M7 7h.01M7 3h5l5.5 5.5a1 1 0 010 1.414L12.414 15a1 1 0 01-1.414 0L5.5 9.5A1 1 0 015 8.5V3a1 1 0 011-1z" 
//         />
//       </svg>
      
//       {/* Nom de l'étiquette */}
//       <span className="truncate max-w-24">
//         {etiquette.nom}
//       </span>
      
//       {/* Bouton de suppression */}
//       {supprimable && onSupprimer && (
//         <button
//           onClick={handleSupprimer}
//           className={`
//             flex-shrink-0 rounded-full hover:bg-black/10 transition-colors
//             ${taille === 'petit' ? 'p-0.5' : 'p-1'}
//           `}
//           title={`Supprimer l'étiquette "${etiquette.nom}"`}
//         >
//           <svg 
//             className={`${taille === 'petit' ? 'w-3 h-3' : 'w-4 h-4'}`} 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth="2" 
//               d="M6 18L18 6M6 6l12 12" 
//             />
//           </svg>
//         </button>
//       )}
//     </span>
//   );
// };

// export default EtiquetteBadge;

// src/pages/LibraryPage/components/Etiquettes/EtiquetteBadge.jsx
import React from 'react';

const EtiquetteBadge = ({ 
  etiquette, 
  taille = 'normal', 
  supprimable = false, 
  onSupprimer = null,
  onClick = null,
  onEtiquetteClick = null, // Nouveau: callback spécifique pour navigation vers la page étiquette
  className = ''
}) => {
  if (!etiquette) return null;

  const tailles = {
    petit: 'px-2 py-0.5 text-xs',
    normal: 'px-2.5 py-1 text-sm',
    grand: 'px-3 py-1.5 text-base'
  };

  const tailleClasse = tailles[taille] || tailles.normal;

  // Fonction pour calculer la couleur du texte basée sur la luminosité de la couleur de fond
  const obtenirCouleurTexte = (couleurFond) => {
    // Convertir la couleur hex en RGB
    const hex = couleurFond.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculer la luminosité
    const luminosite = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Retourner blanc pour les couleurs sombres, noir pour les couleurs claires
    return luminosite > 128 ? '#000000' : '#ffffff';
  };

  const couleurTexte = obtenirCouleurTexte(etiquette.couleur);
  
  const handleClick = (e) => {
    e.stopPropagation();
    
    // Priorité à onEtiquetteClick (navigation vers page étiquette)
    if (onEtiquetteClick) {
      console.log('🏷️ Navigation vers étiquette:', etiquette.nom);
      onEtiquetteClick(etiquette);
      return;
    }
    
    // Fallback vers onClick générique
    if (onClick) {
      onClick(etiquette);
    }
  };

  const handleSupprimer = (e) => {
    e.stopPropagation();
    if (onSupprimer) {
      onSupprimer(etiquette);
    }
  };

  const isClickable = onEtiquetteClick || onClick;

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200
        ${tailleClasse}
        ${isClickable ? 'cursor-pointer hover:scale-105 hover:shadow-md hover:ring-2 hover:ring-offset-1' : ''}
        ${className}
      `}
      style={{
        backgroundColor: etiquette.couleur,
        color: couleurTexte,
        '--hover-ring-color': etiquette.couleur + '40' // Version transparente pour le ring
      }}
      onClick={handleClick}
      title={`${etiquette.nom}${etiquette.nombreUtilisations ? ` (${etiquette.nombreUtilisations} utilisations)` : ''}${isClickable ? ' - Cliquer pour voir les articles' : ''}`}
    >
      {/* Icône d'étiquette */}
      <svg 
        className={`${taille === 'petit' ? 'w-3 h-3' : taille === 'grand' ? 'w-5 h-5' : 'w-4 h-4'}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M7 7h.01M7 3h5l5.5 5.5a1 1 0 010 1.414L12.414 15a1 1 0 01-1.414 0L5.5 9.5A1 1 0 015 8.5V3a1 1 0 011-1z" 
        />
      </svg>
      
      {/* Nom de l'étiquette */}
      <span className="truncate max-w-24">
        {etiquette.nom}
      </span>
      
      {/* Bouton de suppression */}
      {supprimable && onSupprimer && (
        <button
          onClick={handleSupprimer}
          className={`
            flex-shrink-0 rounded-full hover:bg-black/10 transition-colors
            ${taille === 'petit' ? 'p-0.5' : 'p-1'}
          `}
          title={`Supprimer l'étiquette "${etiquette.nom}"`}
        >
          <svg 
            className={`${taille === 'petit' ? 'w-3 h-3' : 'w-4 h-4'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      )}
      
      {/* Indicateur de navigation si cliquable */}
      {isClickable && !supprimable && (
        <svg 
          className={`${taille === 'petit' ? 'w-3 h-3' : 'w-4 h-4'} opacity-70`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      )}
    </span>
  );
};

export default EtiquetteBadge;