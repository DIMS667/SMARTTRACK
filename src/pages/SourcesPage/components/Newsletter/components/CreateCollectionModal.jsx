import React, { useState } from 'react';
import Button from '@/components/common/Button';
import { X, Folder, Plus, Check, AlertCircle } from 'lucide-react';

const CreateCollectionModal = ({ onClose, onCreateCollection }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'blue',
    icon: '📁'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la collection est requis';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const collectionData = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        color: formData.color,
        icon: formData.icon,
        newsletterIds: [],
        createdAt: new Date().toISOString()
      };
      
      await onCreateCollection(collectionData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      setErrors({ submit: 'Erreur lors de la création de la collection' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Créer une collection
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nom de la collection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom de la collection
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Folder className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ex: Technologie, Business, Design..."
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Description (optionnelle) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (optionnelle)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Décrivez brièvement cette collection..."
              rows={3}
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            />
          </div>

          {/* Sélection de couleur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Couleur
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleChange('color', color.value)}
                  className={`relative w-full h-12 rounded-lg ${color.class} transition-all duration-200 hover:scale-105 ${
                    formData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-300' : ''
                  }`}
                >
                  {formData.color === color.value && (
                    <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Aperçu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Aperçu
            </label>
            <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className={`w-10 h-10 rounded-lg ${colors.find(c => c.value === formData.color)?.class} flex items-center justify-center`}>
                <span className="text-lg">{formData.icon}</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formData.name || 'Nom de la collection'}
                </div>
                {formData.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.description}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Erreur de soumission */}
          {errors.submit && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name.trim()}
              variant="primary"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Création...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Créer la collection</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionModal;