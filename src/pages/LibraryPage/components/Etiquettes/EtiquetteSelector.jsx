

// src/pages/LibraryPage/components/Etiquettes/EtiquetteSelector.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useSharedEtiquettes } from './hooks/useSharedEtiquettes';
import EtiquetteBadge from './EtiquetteBadge';

const EtiquetteSelector = ({ 
  article, 
  isOpen, 
  onClose, 
  onToggle,
  etiquettesHook,
  className = '' 
}) => {
  // Utiliser le hook passé en props ou créer une nouvelle instance si pas fourni
  const defaultHook = useSharedEtiquettes();
  const hook = etiquettesHook || defaultHook;
  
  const {
    etiquettes,
    obtenirEtiquettesArticle,
    associerEtiquetteArticle,
    dissocierEtiquetteArticle,
    creerEtiquette,
    rechercherEtiquettes
  } = hook;

  const [termesRecherche, setTermesRecherche] = useState('');
  const [etiquettesFiltrees, setEtiquettesFiltrees] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [nouvelleEtiquetteNom, setNouvelleEtiquetteNom] = useState('');

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const etiquettesArticle = obtenirEtiquettesArticle(article.id);

  // Filtrer les étiquettes en fonction de la recherche
  useEffect(() => {
    const resultats = rechercherEtiquettes(termesRecherche);
    setEtiquettesFiltrees(resultats);
  }, [termesRecherche, etiquettes, rechercherEtiquettes]);

  // Gérer les clics en dehors du dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus sur l'input quand le dropdown s'ouvre
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleToggleEtiquette = (etiquette) => {
    const estAssociee = etiquettesArticle.some(e => e.id === etiquette.id);
    
    if (estAssociee) {
      dissocierEtiquetteArticle(article.id, etiquette.id);
    } else {
      associerEtiquetteArticle(article.id, etiquette.id);
    }
  };

  const handleCreerEtiquette = () => {
    if (!nouvelleEtiquetteNom.trim()) return;

    const nouvelleEtiquette = creerEtiquette(nouvelleEtiquetteNom);
    if (nouvelleEtiquette) {
      // Associer immédiatement la nouvelle étiquette à l'article
      associerEtiquetteArticle(article.id, nouvelleEtiquette.id);
      setNouvelleEtiquetteNom('');
      setShowCreateForm(false);
      setTermesRecherche('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showCreateForm) {
        handleCreerEtiquette();
      } else if (termesRecherche.trim() && etiquettesFiltrees.length === 0) {
        setNouvelleEtiquetteNom(termesRecherche);
        setShowCreateForm(true);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className={`absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Gérer les étiquettes
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Champ de recherche */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={showCreateForm ? nouvelleEtiquetteNom : termesRecherche}
            onChange={(e) => {
              if (showCreateForm) {
                setNouvelleEtiquetteNom(e.target.value);
              } else {
                setTermesRecherche(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={showCreateForm ? "Nom de la nouvelle étiquette..." : "Rechercher ou créer une étiquette..."}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-2 top-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Étiquettes actuelles de l'article */}
      {etiquettesArticle.length > 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Étiquettes actuelles
          </h4>
          <div className="flex flex-wrap gap-2">
            {etiquettesArticle.map(etiquette => (
              <EtiquetteBadge
                key={etiquette.id}
                etiquette={etiquette}
                taille="petit"
                supprimable={true}
                onSupprimer={() => dissocierEtiquetteArticle(article.id, etiquette.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Form de création */}
      {showCreateForm && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Créer une nouvelle étiquette
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreerEtiquette}
              disabled={!nouvelleEtiquetteNom.trim()}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Créer
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNouvelleEtiquetteNom('');
              }}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste des étiquettes */}
      <div className="max-h-60 overflow-y-auto">
        {etiquettesFiltrees.length > 0 ? (
          <div className="p-2">
            {etiquettesFiltrees.map(etiquette => {
              const estAssociee = etiquettesArticle.some(e => e.id === etiquette.id);
              
              return (
                <button
                  key={etiquette.id}
                  onClick={() => handleToggleEtiquette(etiquette)}
                  className={`
                    w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors
                    ${estAssociee 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {/* Checkbox */}
                  <div className={`
                    w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                    ${estAssociee 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'border-gray-300 dark:border-gray-600'
                    }
                  `}>
                    {estAssociee && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Badge de l'étiquette */}
                  <EtiquetteBadge
                    etiquette={etiquette}
                    taille="petit"
                  />

                  {/* Nombre d'utilisations */}
                  {etiquette.nombreUtilisations > 0 && (
                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                      {etiquette.nombreUtilisations}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-4 text-center">
            {termesRecherche ? (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Aucune étiquette trouvée pour "{termesRecherche}"
                </p>
                <button
                  onClick={() => {
                    setNouvelleEtiquetteNom(termesRecherche);
                    setShowCreateForm(true);
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Créer l'étiquette "{termesRecherche}"
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aucune étiquette disponible
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tapez Entrée pour créer une nouvelle étiquette
        </p>
      </div>
    </div>
  );
};

export default EtiquetteSelector;