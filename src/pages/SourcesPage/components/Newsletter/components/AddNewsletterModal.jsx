import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import { X, Mail, Copy, AlertCircle, Check, RefreshCw } from 'lucide-react';

const AddNewsletterModal = ({ onClose, onAdd, existingNewsletters = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    removeDuplicates: true
  });
  const [suggestedEmail, setSuggestedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [emailModified, setEmailModified] = useState(false);

  // Fonction pour générer un nom d'email unique
  const generateUniqueEmail = (name) => {
    if (!name.trim()) return '';
    
    // Nettoyer le nom : enlever espaces, caractères spéciaux, accents
    const cleanName = name
      .toLowerCase()
      .trim()
      .replace(/[àáâäã]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôöõ]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9]/g, ''); // Enlever tout sauf lettres et chiffres
    
    if (!cleanName) return '';
    
    // Récupérer toutes les adresses email existantes
    const existingEmails = existingNewsletters.map(newsletter => {
      if (newsletter.email && newsletter.email.includes('@smarttrack.cm')) {
        return newsletter.email.split('@')[0]; // Récupérer la partie avant @
      }
      return null;
    }).filter(Boolean);
    
    let baseName = cleanName;
    let counter = 0;
    let finalName = baseName;
    
    // Vérifier l'unicité et incrémenter si nécessaire
    while (existingEmails.includes(finalName)) {
      counter++;
      finalName = `${baseName}${counter}`;
    }
    
    return `${finalName}@smarttrack.cm`;
  };

  // Vérifier si un email est unique
  const isEmailUnique = (email) => {
    if (!email.includes('@smarttrack.cm')) return false;
    
    const existingEmails = existingNewsletters.map(newsletter => newsletter.email).filter(Boolean);
    return !existingEmails.includes(email);
  };

  // Mettre à jour l'email suggéré quand le nom change
  useEffect(() => {
    const suggested = generateUniqueEmail(formData.name);
    setSuggestedEmail(suggested);
    
    // Si l'email n'a pas été modifié manuellement, utiliser la suggestion
    if (!emailModified) {
      setFormData(prev => ({ ...prev, email: suggested }));
    }
  }, [formData.name, existingNewsletters, emailModified]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la newsletter est requis';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!formData.email.includes('@smarttrack.cm')) {
      newErrors.email = 'L\'adresse doit se terminer par @smarttrack.cm';
    } else if (!isEmailUnique(formData.email)) {
      newErrors.email = 'Cette adresse email existe déjà';
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
      // Simuler l'ajout de newsletter
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newsletterData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        removeDuplicates: formData.removeDuplicates,
        // Données générées automatiquement
        publisher: 'Newsletter personnalisée',
        description: `Newsletter ${formData.name} - Réception sur ${formData.email}`,
        categories: ['news'],
        frequency: 'weekly',
        language: 'fr',
        subscriberCount: 1,
        rating: null,
        isSubscribed: true,
        status: 'active',
        unreadCount: 0,
        createdAt: new Date().toISOString(),
        lastIssueDate: null,
        articles: [] // Articles reçus via cette newsletter
      };
      
      await onAdd(newsletterData);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      setErrors({ submit: 'Erreur lors de l\'ajout de la newsletter' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (value) => {
    setFormData(prev => ({ ...prev, name: value }));
    
    // Effacer l'erreur du nom
    if (errors.name) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
  };

  const handleEmailChange = (value) => {
    setFormData(prev => ({ ...prev, email: value }));
    setEmailModified(true);
    
    // Effacer l'erreur de l'email
    if (errors.email) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const resetToSuggested = () => {
    setFormData(prev => ({ ...prev, email: suggestedEmail }));
    setEmailModified(false);
    
    // Effacer l'erreur de l'email
    if (errors.email) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const copyEmail = async () => {
    if (formData.email) {
      try {
        await navigator.clipboard.writeText(formData.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erreur lors de la copie:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Suivre les newsletters
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nom de la newsletter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom de la newsletter :
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: TechCrunch, Morning Brew, Le Figaro..."
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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

          {/* Adresse courriel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Adresse courriel
              </label>
              {emailModified && suggestedEmail && suggestedEmail !== formData.email && (
                <button
                  type="button"
                  onClick={resetToSuggested}
                  className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Utiliser la suggestion
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Modifiez l'adresse si nécessaire. Elle doit se terminer par @smarttrack.cm
            </p>
            <div className="relative">
              <input
                type="text"
                value={formData.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="newsletter@smarttrack.cm"
                className={`block w-full pr-12 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {formData.email && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className={`p-2 rounded-md transition-colors ${
                      copied 
                        ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    title={copied ? 'Copié !' : 'Copier l\'adresse'}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
            
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
            
            {formData.email && !errors.email && (
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Instructions :</strong> Utilisez cette adresse email lors de l'inscription aux newsletters. 
                  Les emails reçus apparaîtront automatiquement dans votre feed SMARTTRACK.
                </p>
              </div>
            )}
          </div>

          {/* Option supprimer les doublons */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white text-sm">
                Supprimer les articles en double
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Éviter les articles identiques de différentes sources
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.removeDuplicates}
                onChange={(e) => setFormData(prev => ({ ...prev, removeDuplicates: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
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
              className="flex-1"
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.email}
              variant="primary"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Création...
                </div>
              ) : (
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Créer la newsletter
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewsletterModal;