import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { 
  X, 
  Folder, 
  Plus, 
  Trash2, 
  Edit3, 
  Mail,
  Check,
  AlertCircle,
  Search
} from 'lucide-react';

const ManageCollectionModal = ({ 
  collection, 
  onClose, 
  onUpdateCollection, 
  onDeleteCollection,
  availableNewsletters = [] 
}) => {
  const [activeTab, setActiveTab] = useState('newsletters'); // 'newsletters', 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: collection.name,
    description: collection.description,
    color: collection.color,
    icon: collection.icon
  });

  // Newsletters dans cette collection
  const [collectionNewsletters, setCollectionNewsletters] = useState(
    availableNewsletters.filter(newsletter => 
      collection.newsletterIds.includes(newsletter.id)
    )
  );

  // Newsletters disponibles pour ajouter
  const availableToAdd = availableNewsletters.filter(newsletter => 
    !collection.newsletterIds.includes(newsletter.id) &&
    newsletter.isSubscribed &&
    newsletter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const colors = [
    { value: 'blue', label: 'Bleu', class: 'bg-blue-500' },
    { value: 'green', label: 'Vert', class: 'bg-green-500' },
    { value: 'purple', label: 'Violet', class: 'bg-purple-500' },
    { value: 'red', label: 'Rouge', class: 'bg-red-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'pink', label: 'Rose', class: 'bg-pink-500' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
    { value: 'yellow', label: 'Jaune', class: 'bg-yellow-500' }
  ];

  const icons = ['📁', '🚀', '💼', '🎨', '📱', '💡', '📊', '🔬', '📰', '💰', '🏥', '🎓'];

  const handleAddToCollection = (newsletter) => {
    // Vérifier si la newsletter n'est pas déjà dans la collection
    if (collectionNewsletters.find(n => n.id === newsletter.id)) {
      console.log('Newsletter déjà dans la collection');
      return;
    }
    
    setCollectionNewsletters(prev => [...prev, newsletter]);
    
    // Mettre à jour la collection
    const updatedCollection = {
      ...collection,
      newsletterIds: [...collection.newsletterIds, newsletter.id]
    };
    onUpdateCollection(updatedCollection);
  };

  const handleRemoveFromCollection = (newsletterId) => {
    setCollectionNewsletters(prev => prev.filter(n => n.id !== newsletterId));
    
    // Mettre à jour la collection
    const updatedCollection = {
      ...collection,
      newsletterIds: collection.newsletterIds.filter(id => id !== newsletterId)
    };
    onUpdateCollection(updatedCollection);
  };

  const handleSaveEdit = () => {
    const updatedCollection = {
      ...collection,
      ...editData
    };
    onUpdateCollection(updatedCollection);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la collection "${collection.name}" ?`)) {
      onDeleteCollection(collection.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              colors.find(c => c.value === (isEditing ? editData.color : collection.color))?.class
            }`}>
              <span className="text-lg">{isEditing ? editData.icon : collection.icon}</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isEditing ? editData.name : collection.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {collectionNewsletters.length} newsletter{collectionNewsletters.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-600 dark:text-gray-400"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? 'Annuler' : 'Modifier'}
            </Button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('newsletters')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'newsletters'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Newsletters ({collectionNewsletters.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Paramètres
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            {activeTab === 'newsletters' && (
              <div className="space-y-6">
                {/* Newsletters dans la collection */}
                {collectionNewsletters.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Newsletters dans cette collection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {collectionNewsletters.map((newsletter) => (
                        <Card key={newsletter.id} className="p-4 bg-white dark:bg-gray-800">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {newsletter.logo ? (
                                <img
                                  src={newsletter.logo}
                                  alt={newsletter.name}
                                  className="w-8 h-8 rounded object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                  <Mail className="h-4 w-4 text-white" />
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white text-sm">
                                  {newsletter.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {newsletter.publisher}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCollection(newsletter.id)}
                              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                              title="Retirer de la collection"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ajouter des newsletters */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Ajouter des newsletters
                  </h3>
                  
                  {/* Recherche */}
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher une newsletter..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Liste des newsletters disponibles */}
                  {availableToAdd.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableToAdd.map((newsletter) => {
                        const isAlreadyInCollection = collectionNewsletters.find(n => n.id === newsletter.id);
                        return (
                          <Card key={newsletter.id} className={`p-4 ${
                            isAlreadyInCollection 
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                              : 'bg-gray-50 dark:bg-gray-900'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {newsletter.logo ? (
                                  <img
                                    src={newsletter.logo}
                                    alt={newsletter.name}
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                    <Mail className="h-4 w-4 text-white" />
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                                    {newsletter.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {newsletter.publisher}
                                  </div>
                                </div>
                              </div>
                              {isAlreadyInCollection ? (
                                <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                                  <Check className="h-4 w-4" />
                                  <span className="text-xs">Ajoutée</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleAddToCollection(newsletter)}
                                  className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                                  title="Ajouter à la collection"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      {searchQuery ? 'Aucune newsletter trouvée' : 'Toutes vos newsletters sont déjà dans des collections'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {isEditing ? (
                  <>
                    {/* Édition du nom */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom de la collection
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Édition de la description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editData.description}
                        onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    {/* Édition de la couleur */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Couleur
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {colors.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            onClick={() => setEditData(prev => ({ ...prev, color: color.value }))}
                            className={`relative w-full h-12 rounded-lg ${color.class} transition-all duration-200 hover:scale-105 ${
                              editData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-300' : ''
                            }`}
                          >
                            {editData.color === color.value && (
                              <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Édition de l'icône */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Icône
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {icons.map((icon) => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => setEditData(prev => ({ ...prev, icon }))}
                            className={`w-full h-10 rounded-md border-2 transition-all duration-200 hover:scale-105 ${
                              editData.icon === icon 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                          >
                            <span className="text-lg">{icon}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Boutons d'édition */}
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handleSaveEdit}
                        variant="primary"
                        className="flex-1"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Informations de la collection */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Informations
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Nom : </span>
                          <span className="text-gray-900 dark:text-white">{collection.name}</span>
                        </div>
                        {collection.description && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Description : </span>
                            <span className="text-gray-900 dark:text-white">{collection.description}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Créée le : </span>
                          <span className="text-gray-900 dark:text-white">
                            {new Date(collection.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Zone de danger */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                        Zone de danger
                      </h3>
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-red-800 dark:text-red-400">
                              Supprimer cette collection
                            </h4>
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                              Cette action est irréversible. Les newsletters ne seront pas supprimées.
                            </p>
                          </div>
                          <Button
                            onClick={handleDelete}
                            variant="outline"
                            className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCollectionModal;