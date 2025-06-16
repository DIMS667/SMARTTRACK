// src/pages/LibraryPage/components/Etiquettes/EtiquetteModal.jsx
import React, { useState } from 'react';
import { useSharedEtiquettes } from './hooks/useSharedEtiquettes';
import EtiquetteBadge from './EtiquetteBadge';

const EtiquetteModal = ({ isOpen, onClose, article }) => {
  const {
    etiquettes,
    obtenirEtiquettesArticle,
    associerEtiquetteArticle,
    dissocierEtiquetteArticle,
    creerEtiquette,
    modifierEtiquette,
    supprimerEtiquette,
    couleursPredefinies
  } = useSharedEtiquettes();

  const [activeTab, setActiveTab] = useState('associer'); // 'associer' ou 'gerer'
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEtiquette, setNewEtiquette] = useState({ nom: '', couleur: couleursPredefinies[0] });
  const [editingEtiquette, setEditingEtiquette] = useState(null);

  const etiquettesArticle = article ? obtenirEtiquettesArticle(article.id) : [];

  // Filtrer les étiquettes selon le terme de recherche
  const etiquettesFiltrees = etiquettes.filter(etiquette =>
    etiquette.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleEtiquette = (etiquette) => {
    if (!article) return;
    
    const estAssociee = etiquettesArticle.some(e => e.id === etiquette.id);
    
    if (estAssociee) {
      dissocierEtiquetteArticle(article.id, etiquette.id);
    } else {
      associerEtiquetteArticle(article.id, etiquette.id);
    }
  };

  const handleCreateEtiquette = () => {
    if (!newEtiquette.nom.trim()) return;

    const nouvelleEtiquette = creerEtiquette(newEtiquette.nom, newEtiquette.couleur);
    if (nouvelleEtiquette && article) {
      associerEtiquetteArticle(article.id, nouvelleEtiquette.id);
    }
    
    setNewEtiquette({ nom: '', couleur: couleursPredefinies[0] });
    setShowCreateForm(false);
  };

  const handleEditEtiquette = (etiquette, nouvelleDonnees) => {
    modifierEtiquette(etiquette.id, nouvelleDonnees);
    setEditingEtiquette(null);
  };

  const handleDeleteEtiquette = (etiquette) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'étiquette "${etiquette.nom}" ? Cette action est irréversible.`)) {
      supprimerEtiquette(etiquette.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gestion des étiquettes
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('associer')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'associer'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Associer à l'article
            </button>
            <button
              onClick={() => setActiveTab('gerer')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'gerer'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Gérer les étiquettes
            </button>
          </div>

          {/* Contenu */}
          <div className="p-6">
            {/* Barre de recherche */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une étiquette..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {activeTab === 'associer' && (
              <div>
                {/* Étiquettes actuelles de l'article */}
                {article && etiquettesArticle.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Étiquettes actuelles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {etiquettesArticle.map(etiquette => (
                        <EtiquetteBadge
                          key={etiquette.id}
                          etiquette={etiquette}
                          supprimable={true}
                          onSupprimer={() => article && dissocierEtiquetteArticle(article.id, etiquette.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Liste des étiquettes disponibles */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Étiquettes disponibles
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {etiquettesFiltrees.map(etiquette => {
                      const estAssociee = article && etiquettesArticle.some(e => e.id === etiquette.id);
                      
                      return (
                        <div
                          key={etiquette.id}
                          onClick={() => handleToggleEtiquette(etiquette)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            estAssociee
                              ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                              : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                          }`}
                        >
                          {/* Checkbox */}
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            estAssociee 
                              ? 'bg-blue-600 border-blue-600' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {estAssociee && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          <EtiquetteBadge etiquette={etiquette} />
                          
                          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                            {etiquette.nombreUtilisations || 0} articles
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gerer' && (
              <div>
                {/* Bouton créer nouvelle étiquette */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Créer une étiquette
                  </button>
                </div>

                {/* Formulaire de création */}
                {showCreateForm && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Nouvelle étiquette
                    </h5>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newEtiquette.nom}
                        onChange={(e) => setNewEtiquette({...newEtiquette, nom: e.target.value})}
                        placeholder="Nom de l'étiquette"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      
                      {/* Sélecteur de couleur */}
                      <div>
                        <label className="block text-xs text-gray-600 dark:text-gray-400 mb-2">Couleur</label>
                        <div className="flex gap-2">
                          {couleursPredefinies.map(couleur => (
                            <button
                              key={couleur}
                              onClick={() => setNewEtiquette({...newEtiquette, couleur})}
                              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                                newEtiquette.couleur === couleur 
                                  ? 'border-gray-800 dark:border-white scale-110' 
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                              style={{ backgroundColor: couleur }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={handleCreateEtiquette}
                          disabled={!newEtiquette.nom.trim()}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Créer
                        </button>
                        <button
                          onClick={() => {
                            setShowCreateForm(false);
                            setNewEtiquette({ nom: '', couleur: couleursPredefinies[0] });
                          }}
                          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Liste des étiquettes existantes */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {etiquettesFiltrees.map(etiquette => (
                    <div key={etiquette.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <EtiquetteBadge etiquette={etiquette} />
                      
                      <span className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                        {etiquette.nombreUtilisations || 0} articles
                      </span>
                      
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingEtiquette(etiquette)}
                          className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Modifier"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteEtiquette(etiquette)}
                          className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{etiquettes.length} étiquettes au total</span>
              {article && (
                <span>{etiquettesArticle.length} étiquettes sur cet article</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'édition d'étiquette */}
      {editingEtiquette && (
        <EditEtiquetteModal
          etiquette={editingEtiquette}
          couleursPredefinies={couleursPredefinies}
          onSave={(nouvelleDonnees) => handleEditEtiquette(editingEtiquette, nouvelleDonnees)}
          onClose={() => setEditingEtiquette(null)}
        />
      )}
    </div>
  );
};

// Modal d'édition d'étiquette
const EditEtiquetteModal = ({ etiquette, couleursPredefinies, onSave, onClose }) => {
  const [nom, setNom] = useState(etiquette.nom);
  const [couleur, setCouleur] = useState(etiquette.couleur);

  const handleSave = () => {
    if (nom.trim()) {
      onSave({ nom: nom.trim(), couleur });
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Modifier l'étiquette
        </h3>
        
        <div className="space-y-4">
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nom de l'étiquette"
          />
          
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Couleur</label>
            <div className="flex gap-2">
              {couleursPredefinies.map(c => (
                <button
                  key={c}
                  onClick={() => setCouleur(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    couleur === c 
                      ? 'border-gray-800 dark:border-white scale-110' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            disabled={!nom.trim()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Sauvegarder
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EtiquetteModal;