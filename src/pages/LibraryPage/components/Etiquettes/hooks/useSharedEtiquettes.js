// // src/pages/LibraryPage/components/Etiquettes/hooks/useSharedEtiquettes.js
// import { useState, useEffect, useCallback } from 'react';

// const STORAGE_KEY = 'inoreader_etiquettes';
// const ARTICLES_ETIQUETTES_KEY = 'inoreader_articles_etiquettes';

// export const useSharedEtiquettes = () => {
//   const [etiquettes, setEtiquettes] = useState([]);
//   const [articlesEtiquettes, setArticlesEtiquettes] = useState({});

//   // Couleurs prédéfinies pour les étiquettes
//   const couleursPredefinies = [
//     '#ef4444', // Rouge
//     '#f97316', // Orange
//     '#eab308', // Jaune
//     '#22c55e', // Vert
//     '#06b6d4', // Cyan
//     '#3b82f6', // Bleu
//     '#8b5cf6', // Violet
//     '#ec4899', // Rose
//     '#6b7280', // Gris
//     '#10b981', // Emeraude
//   ];

//   // Charger les données depuis localStorage
//   useEffect(() => {
//     try {
//       console.log('🔄 Début chargement localStorage...');
      
//       const savedEtiquettes = localStorage.getItem(STORAGE_KEY);
//       const savedArticlesEtiquettes = localStorage.getItem(ARTICLES_ETIQUETTES_KEY);
      
//       console.log('📦 Raw localStorage data:', { 
//         savedEtiquettes: savedEtiquettes?.substring(0, 100) + '...', 
//         savedArticlesEtiquettes: savedArticlesEtiquettes?.substring(0, 100) + '...'
//       });
      
//       if (savedEtiquettes && savedEtiquettes !== 'null') {
//         try {
//           const parsedEtiquettes = JSON.parse(savedEtiquettes);
//           console.log('📚 Étiquettes parsées:', parsedEtiquettes);
//           console.log('📚 Nombre d\'étiquettes:', parsedEtiquettes.length);
//           setEtiquettes(parsedEtiquettes);
//         } catch (parseError) {
//           console.error('❌ Erreur parsing étiquettes:', parseError);
//           setEtiquettes([]);
//         }
//       } else {
//         console.log('📭 Aucune étiquette en localStorage');
//         setEtiquettes([]);
//       }
      
//       if (savedArticlesEtiquettes && savedArticlesEtiquettes !== 'null') {
//         try {
//           const parsedAssociations = JSON.parse(savedArticlesEtiquettes);
//           console.log('🔗 Associations parsées:', parsedAssociations);
//           console.log('🔗 Nombre d\'articles avec étiquettes:', Object.keys(parsedAssociations).length);
//           setArticlesEtiquettes(parsedAssociations);
//         } catch (parseError) {
//           console.error('❌ Erreur parsing associations:', parseError);
//           setArticlesEtiquettes({});
//         }
//       } else {
//         console.log('📭 Aucune association en localStorage');
//         setArticlesEtiquettes({});
//       }
      
//       console.log('✅ Fin chargement localStorage');
//     } catch (error) {
//       console.error('❌ Erreur générale lors du chargement:', error);
//     }
//   }, []);

//   // Sauvegarder les étiquettes
//   const sauvegarderEtiquettes = useCallback((nouvellesEtiquettes) => {
//     try {
//       console.log('💾 Sauvegarde étiquettes:', nouvellesEtiquettes);
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(nouvellesEtiquettes));
//       setEtiquettes(nouvellesEtiquettes);
//       console.log('✅ État étiquettes mis à jour');
//     } catch (error) {
//       console.error('❌ Erreur lors de la sauvegarde des étiquettes:', error);
//     }
//   }, []);

//   // Sauvegarder les associations articles-étiquettes
//   const sauvegarderArticlesEtiquettes = useCallback((nouvellesAssociations) => {
//     try {
//       console.log('💾 Sauvegarde associations:', nouvellesAssociations);
//       localStorage.setItem(ARTICLES_ETIQUETTES_KEY, JSON.stringify(nouvellesAssociations));
//       setArticlesEtiquettes(nouvellesAssociations);
//       console.log('✅ État associations mis à jour');
//     } catch (error) {
//       console.error('❌ Erreur lors de la sauvegarde des associations:', error);
//     }
//   }, []);

//   // Créer une nouvelle étiquette
//   const creerEtiquette = useCallback((nom, couleur = null) => {
//     if (!nom.trim()) {
//       console.log('❌ Nom vide pour l\'étiquette');
//       return null;
//     }
    
//     console.log('🏷️ Création étiquette:', { nom, couleur });
    
//     // Vérifier si l'étiquette existe déjà
//     const etiquetteExistante = etiquettes.find(
//       e => e.nom.toLowerCase() === nom.toLowerCase()
//     );
    
//     if (etiquetteExistante) {
//       console.log('⚠️ Étiquette existante:', etiquetteExistante);
//       return etiquetteExistante;
//     }

//     const nouvelleEtiquette = {
//       id: Date.now().toString(),
//       nom: nom.trim(),
//       couleur: couleur || couleursPredefinies[etiquettes.length % couleursPredefinies.length],
//       dateCreation: new Date().toISOString(),
//       nombreUtilisations: 0
//     };

//     console.log('➕ Nouvelle étiquette créée:', nouvelleEtiquette);

//     const nouvellesEtiquettes = [...etiquettes, nouvelleEtiquette];
//     sauvegarderEtiquettes(nouvellesEtiquettes);
    
//     return nouvelleEtiquette;
//   }, [etiquettes, sauvegarderEtiquettes, couleursPredefinies]);

//   // Modifier une étiquette
//   const modifierEtiquette = useCallback((id, modifications) => {
//     console.log('✏️ Modification étiquette:', { id, modifications });
//     const nouvellesEtiquettes = etiquettes.map(etiquette => 
//       etiquette.id === id 
//         ? { ...etiquette, ...modifications }
//         : etiquette
//     );
//     sauvegarderEtiquettes(nouvellesEtiquettes);
//   }, [etiquettes, sauvegarderEtiquettes]);

//   // Supprimer une étiquette
//   const supprimerEtiquette = useCallback((id) => {
//     console.log('🗑️ Suppression étiquette:', id);
//     // Supprimer l'étiquette
//     const nouvellesEtiquettes = etiquettes.filter(e => e.id !== id);
//     sauvegarderEtiquettes(nouvellesEtiquettes);

//     // Supprimer toutes les associations avec cette étiquette
//     const nouvellesAssociations = { ...articlesEtiquettes };
//     Object.keys(nouvellesAssociations).forEach(articleId => {
//       nouvellesAssociations[articleId] = nouvellesAssociations[articleId].filter(
//         etiquetteId => etiquetteId !== id
//       );
//       // Supprimer l'entrée si aucune étiquette n'est associée
//       if (nouvellesAssociations[articleId].length === 0) {
//         delete nouvellesAssociations[articleId];
//       }
//     });
//     sauvegarderArticlesEtiquettes(nouvellesAssociations);
//   }, [etiquettes, articlesEtiquettes, sauvegarderEtiquettes, sauvegarderArticlesEtiquettes]);

//   // Associer une étiquette à un article
//   const associerEtiquetteArticle = useCallback((articleId, etiquetteId) => {
//     console.log('🔗 Association étiquette-article:', { articleId, etiquetteId });
//     console.log('📊 État actuel:', { etiquettes: etiquettes.length, articlesEtiquettes });
    
//     const etiquettesArticle = articlesEtiquettes[articleId] || [];
//     console.log('📝 Étiquettes actuelles de l\'article:', etiquettesArticle);
    
//     if (!etiquettesArticle.includes(etiquetteId)) {
//       // D'abord mettre à jour les associations
//       const nouvellesAssociations = {
//         ...articlesEtiquettes,
//         [articleId]: [...etiquettesArticle, etiquetteId]
//       };
//       console.log('📋 Nouvelles associations:', nouvellesAssociations);
//       sauvegarderArticlesEtiquettes(nouvellesAssociations);

//       // ENSUITE incrémenter le compteur d'utilisation - SEULEMENT si l'étiquette existe
//       const etiquetteTrouvee = etiquettes.find(e => e.id === etiquetteId);
//       if (etiquetteTrouvee) {
//         console.log('📈 Mise à jour compteur pour étiquette:', etiquetteTrouvee);
//         const nouvellesEtiquettes = etiquettes.map(etiquette => 
//           etiquette.id === etiquetteId 
//             ? { ...etiquette, nombreUtilisations: etiquette.nombreUtilisations + 1 }
//             : etiquette
//         );
//         console.log('📊 Nouvelles étiquettes avec compteur:', nouvellesEtiquettes);
//         sauvegarderEtiquettes(nouvellesEtiquettes);
//       } else {
//         console.warn('⚠️ Étiquette non trouvée pour mise à jour compteur:', etiquetteId);
//         console.log('📊 Étiquettes disponibles:', etiquettes.map(e => ({ id: e.id, nom: e.nom })));
//       }
      
//       console.log('✅ Association terminée');
//     } else {
//       console.log('⚠️ Étiquette déjà associée');
//     }
//   }, [articlesEtiquettes, etiquettes, sauvegarderArticlesEtiquettes, sauvegarderEtiquettes]);

//   // Dissocier une étiquette d'un article
//   const dissocierEtiquetteArticle = useCallback((articleId, etiquetteId) => {
//     console.log('❌ Dissociation étiquette-article:', { articleId, etiquetteId });
    
//     const etiquettesArticle = articlesEtiquettes[articleId] || [];
    
//     if (etiquettesArticle.includes(etiquetteId)) {
//       const nouvellesEtiquettesArticle = etiquettesArticle.filter(id => id !== etiquetteId);
      
//       const nouvellesAssociations = { ...articlesEtiquettes };
//       if (nouvellesEtiquettesArticle.length === 0) {
//         delete nouvellesAssociations[articleId];
//       } else {
//         nouvellesAssociations[articleId] = nouvellesEtiquettesArticle;
//       }
      
//       sauvegarderArticlesEtiquettes(nouvellesAssociations);

//       // Décrémenter le compteur d'utilisation
//       const nouvellesEtiquettes = etiquettes.map(etiquette => 
//         etiquette.id === etiquetteId 
//           ? { ...etiquette, nombreUtilisations: Math.max(0, etiquette.nombreUtilisations - 1) }
//           : etiquette
//       );
//       sauvegarderEtiquettes(nouvellesEtiquettes);
//     }
//   }, [articlesEtiquettes, etiquettes, sauvegarderArticlesEtiquettes, sauvegarderEtiquettes]);

//   // Obtenir les étiquettes d'un article
//   const obtenirEtiquettesArticle = useCallback((articleId) => {
//     const etiquetteIds = articlesEtiquettes[articleId] || [];
//     const etiquettesResult = etiquettes.filter(etiquette => etiquetteIds.includes(etiquette.id));
//     console.log('🔍 Obtenir étiquettes article:', { articleId, etiquetteIds, etiquettesResult });
//     return etiquettesResult;
//   }, [articlesEtiquettes, etiquettes]);

//   // Obtenir les articles associés à une étiquette
//   const obtenirArticlesEtiquette = useCallback((etiquetteId) => {
//     return Object.keys(articlesEtiquettes).filter(
//       articleId => articlesEtiquettes[articleId].includes(etiquetteId)
//     );
//   }, [articlesEtiquettes]);

//   // Rechercher des étiquettes
//   const rechercherEtiquettes = useCallback((terme) => {
//     if (!terme.trim()) return etiquettes;
    
//     const termeMinuscule = terme.toLowerCase();
//     return etiquettes.filter(etiquette => 
//       etiquette.nom.toLowerCase().includes(termeMinuscule)
//     );
//   }, [etiquettes]);

//   // Debug des états
//   console.log('🔎 Hook state:', { etiquettes: etiquettes.length, articlesEtiquettes: Object.keys(articlesEtiquettes).length });

//   return {
//     // État
//     etiquettes,
//     articlesEtiquettes,
//     couleursPredefinies,
    
//     // Actions sur les étiquettes
//     creerEtiquette,
//     modifierEtiquette,
//     supprimerEtiquette,
    
//     // Actions sur les associations
//     associerEtiquetteArticle,
//     dissocierEtiquetteArticle,
    
//     // Requêtes
//     obtenirEtiquettesArticle,
//     obtenirArticlesEtiquette,
//     rechercherEtiquettes,
    
//     // Statistiques
//     nombreEtiquettes: etiquettes.length,
//     nombreArticlesEtiquetes: Object.keys(articlesEtiquettes).length
//   };
// };

// src/pages/LibraryPage/components/Etiquettes/hooks/useSharedEtiquettes.js
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'inoreader_etiquettes';
const ARTICLES_ETIQUETTES_KEY = 'inoreader_articles_etiquettes';

export const useSharedEtiquettes = () => {
  const [etiquettes, setEtiquettes] = useState([]);
  const [articlesEtiquettes, setArticlesEtiquettes] = useState({});
  const [updateCounter, setUpdateCounter] = useState(0); // Compteur pour forcer les re-renders

  // Couleurs prédéfinies pour les étiquettes
  const couleursPredefinies = [
    '#ef4444', // Rouge
    '#f97316', // Orange
    '#eab308', // Jaune
    '#22c55e', // Vert
    '#06b6d4', // Cyan
    '#3b82f6', // Bleu
    '#8b5cf6', // Violet
    '#ec4899', // Rose
    '#6b7280', // Gris
    '#10b981', // Emeraude
  ];

  // Charger les données depuis localStorage
  useEffect(() => {
    try {
      console.log('🔄 Début chargement localStorage...');
      
      const savedEtiquettes = localStorage.getItem(STORAGE_KEY);
      const savedArticlesEtiquettes = localStorage.getItem(ARTICLES_ETIQUETTES_KEY);
      
      console.log('📦 Raw localStorage data:', { 
        savedEtiquettes: savedEtiquettes?.substring(0, 100) + '...', 
        savedArticlesEtiquettes: savedArticlesEtiquettes?.substring(0, 100) + '...'
      });
      
      if (savedEtiquettes && savedEtiquettes !== 'null') {
        try {
          const parsedEtiquettes = JSON.parse(savedEtiquettes);
          console.log('📚 Étiquettes parsées:', parsedEtiquettes);
          console.log('📚 Nombre d\'étiquettes:', parsedEtiquettes.length);
          setEtiquettes(parsedEtiquettes);
        } catch (parseError) {
          console.error('❌ Erreur parsing étiquettes:', parseError);
          setEtiquettes([]);
        }
      } else {
        console.log('📭 Aucune étiquette en localStorage');
        setEtiquettes([]);
      }
      
      if (savedArticlesEtiquettes && savedArticlesEtiquettes !== 'null') {
        try {
          const parsedAssociations = JSON.parse(savedArticlesEtiquettes);
          console.log('🔗 Associations parsées:', parsedAssociations);
          console.log('🔗 Nombre d\'articles avec étiquettes:', Object.keys(parsedAssociations).length);
          setArticlesEtiquettes(parsedAssociations);
        } catch (parseError) {
          console.error('❌ Erreur parsing associations:', parseError);
          setArticlesEtiquettes({});
        }
      } else {
        console.log('📭 Aucune association en localStorage');
        setArticlesEtiquettes({});
      }
      
      console.log('✅ Fin chargement localStorage');
    } catch (error) {
      console.error('❌ Erreur générale lors du chargement:', error);
    }
  }, []);

  // Sauvegarder les étiquettes
  const sauvegarderEtiquettes = useCallback((nouvellesEtiquettes) => {
    try {
      console.log('💾 Sauvegarde étiquettes:', nouvellesEtiquettes);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nouvellesEtiquettes));
      setEtiquettes(nouvellesEtiquettes);
      console.log('✅ État étiquettes mis à jour');
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde des étiquettes:', error);
    }
  }, []);

  // Sauvegarder les associations articles-étiquettes
  const sauvegarderArticlesEtiquettes = useCallback((nouvellesAssociations) => {
    try {
      console.log('💾 Sauvegarde associations:', nouvellesAssociations);
      localStorage.setItem(ARTICLES_ETIQUETTES_KEY, JSON.stringify(nouvellesAssociations));
      setArticlesEtiquettes(nouvellesAssociations);
      setUpdateCounter(prev => prev + 1); // Forcer une mise à jour
      console.log('✅ État associations mis à jour');
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde des associations:', error);
    }
  }, []);

  // Créer une nouvelle étiquette
  const creerEtiquette = useCallback((nom, couleur = null) => {
    if (!nom.trim()) {
      console.log('❌ Nom vide pour l\'étiquette');
      return null;
    }
    
    console.log('🏷️ Création étiquette:', { nom, couleur });
    
    // Vérifier si l'étiquette existe déjà
    const etiquetteExistante = etiquettes.find(
      e => e.nom.toLowerCase() === nom.toLowerCase()
    );
    
    if (etiquetteExistante) {
      console.log('⚠️ Étiquette existante:', etiquetteExistante);
      return etiquetteExistante;
    }

    const nouvelleEtiquette = {
      id: Date.now().toString(),
      nom: nom.trim(),
      couleur: couleur || couleursPredefinies[etiquettes.length % couleursPredefinies.length],
      dateCreation: new Date().toISOString(),
      nombreUtilisations: 0
    };

    console.log('➕ Nouvelle étiquette créée:', nouvelleEtiquette);

    const nouvellesEtiquettes = [...etiquettes, nouvelleEtiquette];
    sauvegarderEtiquettes(nouvellesEtiquettes);
    
    return nouvelleEtiquette;
  }, [etiquettes, sauvegarderEtiquettes, couleursPredefinies]);

  // Modifier une étiquette
  const modifierEtiquette = useCallback((id, modifications) => {
    console.log('✏️ Modification étiquette:', { id, modifications });
    const nouvellesEtiquettes = etiquettes.map(etiquette => 
      etiquette.id === id 
        ? { ...etiquette, ...modifications }
        : etiquette
    );
    sauvegarderEtiquettes(nouvellesEtiquettes);
  }, [etiquettes, sauvegarderEtiquettes]);

  // Supprimer une étiquette
  const supprimerEtiquette = useCallback((id) => {
    console.log('🗑️ Suppression étiquette:', id);
    // Supprimer l'étiquette
    const nouvellesEtiquettes = etiquettes.filter(e => e.id !== id);
    sauvegarderEtiquettes(nouvellesEtiquettes);

    // Supprimer toutes les associations avec cette étiquette
    const nouvellesAssociations = { ...articlesEtiquettes };
    Object.keys(nouvellesAssociations).forEach(articleId => {
      nouvellesAssociations[articleId] = nouvellesAssociations[articleId].filter(
        etiquetteId => etiquetteId !== id
      );
      // Supprimer l'entrée si aucune étiquette n'est associée
      if (nouvellesAssociations[articleId].length === 0) {
        delete nouvellesAssociations[articleId];
      }
    });
    sauvegarderArticlesEtiquettes(nouvellesAssociations);
  }, [etiquettes, articlesEtiquettes, sauvegarderEtiquettes, sauvegarderArticlesEtiquettes]);

  // Associer une étiquette à un article
  const associerEtiquetteArticle = useCallback((articleId, etiquetteId) => {
    console.log('🔗 Association étiquette-article:', { articleId, etiquetteId });
    console.log('📊 État actuel:', { etiquettes: etiquettes.length, articlesEtiquettes });
    
    const etiquettesArticle = articlesEtiquettes[articleId] || [];
    console.log('📝 Étiquettes actuelles de l\'article:', etiquettesArticle);
    
    if (!etiquettesArticle.includes(etiquetteId)) {
      // D'abord mettre à jour les associations
      const nouvellesAssociations = {
        ...articlesEtiquettes,
        [articleId]: [...etiquettesArticle, etiquetteId]
      };
      console.log('📋 Nouvelles associations:', nouvellesAssociations);
      sauvegarderArticlesEtiquettes(nouvellesAssociations);

      // ENSUITE incrémenter le compteur d'utilisation - SEULEMENT si l'étiquette existe
      const etiquetteTrouvee = etiquettes.find(e => e.id === etiquetteId);
      if (etiquetteTrouvee) {
        console.log('📈 Mise à jour compteur pour étiquette:', etiquetteTrouvee);
        const nouvellesEtiquettes = etiquettes.map(etiquette => 
          etiquette.id === etiquetteId 
            ? { ...etiquette, nombreUtilisations: etiquette.nombreUtilisations + 1 }
            : etiquette
        );
        console.log('📊 Nouvelles étiquettes avec compteur:', nouvellesEtiquettes);
        sauvegarderEtiquettes(nouvellesEtiquettes);
      } else {
        console.warn('⚠️ Étiquette non trouvée pour mise à jour compteur:', etiquetteId);
        console.log('📊 Étiquettes disponibles:', etiquettes.map(e => ({ id: e.id, nom: e.nom })));
      }
      
      console.log('✅ Association terminée');
    } else {
      console.log('⚠️ Étiquette déjà associée');
    }
  }, [articlesEtiquettes, etiquettes, sauvegarderArticlesEtiquettes, sauvegarderEtiquettes]);

  // Dissocier une étiquette d'un article
  const dissocierEtiquetteArticle = useCallback((articleId, etiquetteId) => {
    console.log('❌ Dissociation étiquette-article:', { articleId, etiquetteId });
    
    const etiquettesArticle = articlesEtiquettes[articleId] || [];
    
    if (etiquettesArticle.includes(etiquetteId)) {
      const nouvellesEtiquettesArticle = etiquettesArticle.filter(id => id !== etiquetteId);
      
      const nouvellesAssociations = { ...articlesEtiquettes };
      if (nouvellesEtiquettesArticle.length === 0) {
        delete nouvellesAssociations[articleId];
      } else {
        nouvellesAssociations[articleId] = nouvellesEtiquettesArticle;
      }
      
      sauvegarderArticlesEtiquettes(nouvellesAssociations);

      // Décrémenter le compteur d'utilisation
      const nouvellesEtiquettes = etiquettes.map(etiquette => 
        etiquette.id === etiquetteId 
          ? { ...etiquette, nombreUtilisations: Math.max(0, etiquette.nombreUtilisations - 1) }
          : etiquette
      );
      sauvegarderEtiquettes(nouvellesEtiquettes);
    }
  }, [articlesEtiquettes, etiquettes, sauvegarderArticlesEtiquettes, sauvegarderEtiquettes]);

  // Obtenir les étiquettes d'un article - avec clé de mise à jour
  const obtenirEtiquettesArticle = useCallback((articleId) => {
    const etiquetteIds = articlesEtiquettes[articleId] || [];
    const etiquettesResult = etiquettes.filter(etiquette => etiquetteIds.includes(etiquette.id));
    console.log('🔍 Obtenir étiquettes article:', { articleId, etiquetteIds, etiquettesResult, timestamp: Date.now() });
    return etiquettesResult;
  }, [articlesEtiquettes, etiquettes]); // Dépendances explicites pour forcer re-calcul

  // Obtenir les articles associés à une étiquette
  const obtenirArticlesEtiquette = useCallback((etiquetteId) => {
    return Object.keys(articlesEtiquettes).filter(
      articleId => articlesEtiquettes[articleId].includes(etiquetteId)
    );
  }, [articlesEtiquettes]);

  // Rechercher des étiquettes
  const rechercherEtiquettes = useCallback((terme) => {
    if (!terme.trim()) return etiquettes;
    
    const termeMinuscule = terme.toLowerCase();
    return etiquettes.filter(etiquette => 
      etiquette.nom.toLowerCase().includes(termeMinuscule)
    );
  }, [etiquettes]);

  // Debug des états
  console.log('🔎 Hook state:', { etiquettes: etiquettes.length, articlesEtiquettes: Object.keys(articlesEtiquettes).length });

  return {
    // État
    etiquettes,
    articlesEtiquettes,
    couleursPredefinies,
    
    // Actions sur les étiquettes
    creerEtiquette,
    modifierEtiquette,
    supprimerEtiquette,
    
    // Actions sur les associations
    associerEtiquetteArticle,
    dissocierEtiquetteArticle,
    
    // Requêtes
    obtenirEtiquettesArticle,
    obtenirArticlesEtiquette,
    rechercherEtiquettes,
    
    // Statistiques
    nombreEtiquettes: etiquettes.length,
    nombreArticlesEtiquetes: Object.keys(articlesEtiquettes).length,
    updateCounter // Export du compteur pour forcer les re-renders dans les composants
  };
};