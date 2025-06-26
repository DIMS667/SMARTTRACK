// src/pages/CanauxPage/components/Collections/CreateCollectionModal.jsx
import React, { useState } from 'react';
import { X, Globe, Lock, Users, Tag, Image } from 'lucide-react';
import Button from '@/components/common/Button';

const CreateCollectionModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'private',
    allowCollaboration: false,
    tags: [],
    category: 'general'
  });
  const [newTag, setNewTag] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
    setFormData({
      title: '',
      description: '',
      visibility: 'private',
      allowCollaboration: false,
      tags: [],
      category: 'general'
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const categories = [
    { id: 'general', label: 'Général' },
    { id: 'ia', label: 'Intelligence Artificielle' },
    { id: 'fintech', label: 'FinTech' },
    { id: 'cybersec', label: 'Cybersécurité' },
    { id: 'innovation', label: 'Innovation' },
    { id: 'digital', label: 'Transformation Digitale' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Créer une nouvelle collection
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Titre de la collection *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ex: Tendances IA 2025"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Décrivez le contenu et l'objectif de cette collection..."
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ajouter un tag..."
              />
              <Button type="button" onClick={addTag} size="sm">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-purple-600 hover:text-purple-800 dark:text-purple-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Visibilité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Visibilité
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={formData.visibility === 'private'}
                  onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                  className="mr-3"
                />
                <Lock className="h-4 w-4 mr-2 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Privée</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Seul vous pouvez voir cette collection</div>
                </div>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="team"
                  checked={formData.visibility === 'team'}
                  onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                  className="mr-3"
                />
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Équipe</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Visible par votre équipe</div>
                </div>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === 'public'}
                  onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                  className="mr-3"
                />
                <Globe className="h-4 w-4 mr-2 text-green-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Publique</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Visible par tous les utilisateurs</div>
                </div>
              </label>
            </div>
          </div>

          {/* Collaboration */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.allowCollaboration}
                onChange={(e) => setFormData(prev => ({ ...prev, allowCollaboration: e.target.checked }))}
                className="mr-3"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Autoriser la collaboration</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Permettre à d'autres utilisateurs de contribuer à cette collection
                </div>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Créer la collection
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionModal;