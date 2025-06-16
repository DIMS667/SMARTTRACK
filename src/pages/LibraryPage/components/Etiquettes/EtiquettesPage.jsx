// src/pages/LibraryPage/components/Etiquettes/EtiquettesPage.jsx
import React, { useState } from 'react';
import { useSharedEtiquettes } from './hooks/useSharedEtiquettes';
import EtiquetteBadge from './EtiquetteBadge';

const EtiquettesPage = () => {
  const {
    etiquettes,
    creerEtiquette,
    modifierEtiquette,
    supprimerEtiquette,
    obtenirArticlesEtiquette,
    couleursPredefinies,
    nombreEtiquettes,
    nombreArticlesEtiquetes
  } = useSharedEtiquettes();

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEtiquette, setNewEtiquette] = useState({ nom: '', couleur: couleursPredefinies[0] });
  const [editingEtiquette, setEditingEtiquette] = useState(null);
  const [sortBy, setSortBy] = useState('nom'); // 'nom', 'utilisations', 'recent'

  // Filtrer les étiquettes
  const etiquettesFiltrees = etiquettes
    .filter(etiquette => 
      etiquette.nom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'utilisations':
          return (b.nombreUtilisations || 0) - (a.nombreUtilisations || 0);
        case 'recent':
          return new Date(b.dateCreation) - new Date(a.dateCreation);
        case 'nom':
        default:
          return a.nom.localeCompare(b.nom);
      }
    });

  const handleCreateEtiquette = () => {
    if (!newEtiquette.nom.trim()) return;

    creerEtiquette(newEtiquette.nom, newEtiquette.couleur);
    setNewEtiquette({ nom: '', couleur: couleursPredefinies[0] });
    setShowCreateForm(false);
  };

  const handleEditEtiquette = (etiquette, nouvelleDonnees) => {
    modifierEtiquette(etiquette.id, nouvelleDonnees);
    setEditingEtiquette(null);
  };

  const handleDeleteEtiquette = (etiquette) => {
    const articlesAssocies = obtenirArticlesEtiquette(etiquette.id);
    const message = articlesAssocies.length > 0 
      ? `L'étiquette "${etiquette.nom}" est utilisée sur ${articlesAssocies.length} article(s). Êtes-vous sûr de vouloir la supprimer ?`
      : `Êtes-vous sûr de vouloir supprimer l'étiquette "${etiquette.nom}" ?`;
    
    if (window.confirm(message)) {
      supprimerEtiquette(etiquette.id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gestion des étiquettes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organisez vos articles avec des étiquettes personnalisées
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5l5.5 5.5a1 1 0 010 1.414L12.414 15a1 1 0 01-1.414 0L5.5 9.5A1 1 0 015 8.5V3a1 1 0 011-1z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total étiquettes</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{nombreEtiquettes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Articles étiquetés</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{nombreArticlesEtiquetes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Utilisation moyenne</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {nombreEtiquettes > 0 ? Math.round(nombreArticlesEtiquetes / nombreEtiquettes * 10) / 10 : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Recherche */}
        <div className="relative flex-1">
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

        {/* Tri */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="nom">Trier par nom</option>
          <option value="utilisations">Trier par utilisation</option>
          <option value="recent">Plus récentes</option>
        </select>

        {/* Bouton créer */}
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nouvelle étiquette
        </button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Créer une nouvelle étiquette
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de l'étiquette
              </label>
              <input
                type="text"
                value={newEtiquette.nom}
                onChange={(e) => setNewEtiquette({...newEtiquette, nom: e.target.value})}
                placeholder="Ex: Important, À lire plus tard, Favoris..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Couleur
              </label>
              <div className="flex gap-3">
                {couleursPredefinies.map(couleur => (
                  <button
                    key={couleur}
                    onClick={() => setNewEtiquette({...newEtiquette, couleur})}
                    className={`w-10 h-10 rounded-full border-3 transition-all duration-200 ${
                      newEtiquette.couleur === couleur 
                        ? 'border-gray-800 dark:border-white scale-110 shadow-lg' 
                        : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: couleur }}
                    title={`Couleur ${couleur}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Aperçu */}
            {newEtiquette.nom && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aperçu
                </label>
                <EtiquetteBadge 
                  etiquette={{
                    ...newEtiquette,
                    id: 'preview'
                  }}
                />
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={handleCreateEtiquette}
                disabled={!newEtiquette.nom.trim()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Créer l'étiquette
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewEtiquette({ nom: '', couleur: couleursPredefinies[0] });
                }}
                className="px-6 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des étiquettes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Mes étiquettes
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {etiquettesFiltrees.length} sur {nombreEtiquettes}
            </span>
          </div>

          {etiquettesFiltrees.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 7h.01M7 3h5l5.5 5.5a1 1 0 010 1.414L12.414 15a1 1 0 01-1.414 0L5.5 9.5A1 1 0 015 8.5V3a1 1 0 011-1z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {searchTerm ? 'Aucune étiquette trouvée' : 'Aucune étiquette créée'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Créer votre première étiquette
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {etiquettesFiltrees.map(etiquette => (
                <div
                  key={etiquette.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <EtiquetteBadge etiquette={etiquette} />
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{etiquette.nombreUtilisations || 0}</span> article{(etiquette.nombreUtilisations || 0) !== 1 ? 's' : ''}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Créée le {new Date(etiquette.dateCreation).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingEtiquette(etiquette)}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      title="Modifier l'étiquette"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => handleDeleteEtiquette(etiquette)}
                      className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      title="Supprimer l'étiquette"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal d'édition */}
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

// Modal d'édition d'étiquette (réutilisée depuis EtiquetteModal)
const EditEtiquetteModal = ({ etiquette, couleursPredefinies, onSave, onClose }) => {
  const [nom, setNom] = useState(etiquette.nom);
  const [couleur, setCouleur] = useState(etiquette.couleur);

  const handleSave = () => {
    if (nom.trim()) {
      onSave({ nom: nom.trim(), couleur });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Modifier l'étiquette
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
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom de l'étiquette
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nom de l'étiquette"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Couleur
            </label>
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

          {/* Aperçu */}
          {nom && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aperçu
              </label>
              <EtiquetteBadge 
                etiquette={{
                  ...etiquette,
                  nom: nom.trim(),
                  couleur
                }}
              />
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={!nom.trim()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
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

export default EtiquettesPage;