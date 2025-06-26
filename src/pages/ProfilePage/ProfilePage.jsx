import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Camera,
  Save,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Globe,
  Palette,
  Key,
  Edit2,
  Check,
  X,
  Radio
} from 'lucide-react';
import Button from '@/components/common/Button';
import Avatar from '@/components/common/Avatar';
import { useCustomizer } from '@/context/CustomizerContext';

const ProfilePage = ({ onNavigate }) => {
  const { isDark, theme } = useCustomizer();
  const fileInputRef = useRef(null);

  // État des informations utilisateur
  const [userInfo, setUserInfo] = useState({
    firstName: 'Utilisateur',
    lastName: 'SMARTTRACK',
    email: 'admin@smarttrack.com',
    phone: '+237 6XX XXX XXX',
    location: 'Yaoundé, Cameroun',
    company: 'SMARTTRACK',
    position: 'Administrateur',
    joinDate: '2025-01-01',
    bio: 'Passionné par l\'innovation technologique et la veille stratégique.',
    avatar: null
  });

  // État pour l'édition
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  // État pour le changement de mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // État pour les préférences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    language: 'fr',
    timezone: 'Africa/Douala',
    theme: 'auto',
    socialFeatures: false
  });

  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState('profile');

  // État pour la modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'activate' ou 'deactivate'

  // Charger les préférences depuis localStorage au montage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('user-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (error) {
        console.error('Erreur lors du chargement des préférences:', error);
      }
    }
  }, []);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = (field) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: tempValue
    }));
    setEditingField(null);
    setTempValue('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    // Ici vous implémenterez la logique de changement de mot de passe
    alert('Mot de passe changé avec succès !');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handlePreferenceChange = (key, value) => {
    // Pour les fonctions sociales, afficher une modal de confirmation
    if (key === 'socialFeatures') {
      setModalType(value ? 'activate' : 'deactivate');
      setShowModal(true);
      return;
    }

    // Pour les autres préférences, appliquer directement
    const newPreferences = {
      ...preferences,
      [key]: value
    };
    
    setPreferences(newPreferences);
    
    // Sauvegarder immédiatement dans localStorage pour synchroniser avec la sidebar
    localStorage.setItem('user-preferences', JSON.stringify(newPreferences));
    
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new CustomEvent('preferencesChanged', { 
      detail: { preferences: newPreferences } 
    }));
  };

  const handleModalConfirm = () => {
    const value = modalType === 'activate';
    
    const newPreferences = {
      ...preferences,
      socialFeatures: value
    };
    
    setPreferences(newPreferences);
    
    // Sauvegarder immédiatement dans localStorage pour synchroniser avec la sidebar
    localStorage.setItem('user-preferences', JSON.stringify(newPreferences));
    
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new CustomEvent('preferencesChanged', { 
      detail: { preferences: newPreferences } 
    }));
    
    // Si activation, naviguer vers les canaux
    if (value) {
      setTimeout(() => {
        onNavigate && onNavigate('canaux');
      }, 500);
    }
    
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const ProfileField = ({ icon: Icon, label, field, value, type = 'text', multiline = false }) => {
    const isEditing = editingField === field;

    return (
      <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-1" />
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              {multiline ? (
                <textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              ) : (
                <input
                  type={type}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              )}
              <Button size="sm" onClick={() => handleSave(field)}>
                <Check className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white">{value}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(field, value)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'preferences', label: 'Préférences', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 overflow-hidden">
          {/* Banner avec gradient moderne */}
          <div className="relative h-40 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
            <div className="absolute inset-0 bg-black/10"></div>
            
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-20">
              {/* Avatar avec meilleur design */}
              <div className="relative group">
                <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full p-2 shadow-xl">
                  {userInfo.avatar ? (
                    <img
                      src={userInfo.avatar}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white dark:border-gray-600 group-hover:scale-110"
                  title="Changer la photo"
                >
                  <Camera className="h-5 w-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              
              {/* Informations utilisateur */}
              <div className="flex-1 text-center sm:text-left pt-4">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {userInfo.firstName} {userInfo.lastName}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {userInfo.position}
                        </span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {userInfo.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                      <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        Membre depuis {new Date(userInfo.joinDate).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Badge de statut */}
                  <div className="mt-4 sm:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      En ligne
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? `border-current ${theme.primaryText}`
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Onglet Profil */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <ProfileField
                      icon={User}
                      label="Prénom"
                      field="firstName"
                      value={userInfo.firstName}
                    />
                  </div>
                  <div className="group">
                    <ProfileField
                      icon={User}
                      label="Nom"
                      field="lastName"
                      value={userInfo.lastName}
                    />
                  </div>
                  <div className="group">
                    <ProfileField
                      icon={Mail}
                      label="Email"
                      field="email"
                      value={userInfo.email}
                      type="email"
                    />
                  </div>
                  <div className="group">
                    <ProfileField
                      icon={Phone}
                      label="Téléphone"
                      field="phone"
                      value={userInfo.phone}
                      type="tel"
                    />
                  </div>
                  <div className="group">
                    <ProfileField
                      icon={MapPin}
                      label="Localisation"
                      field="location"
                      value={userInfo.location}
                    />
                  </div>
                  <div className="group">
                    <ProfileField
                      icon={Briefcase}
                      label="Poste"
                      field="position"
                      value={userInfo.position}
                    />
                  </div>
                </div>
                <div className="group">
                  <ProfileField
                    icon={Edit2}
                    label="Biographie"
                    field="bio"
                    value={userInfo.bio}
                    multiline
                  />
                </div>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <Key className="h-5 w-5 mr-2" />
                    Changer le mot de passe
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirmer le nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Button onClick={handlePasswordChange}>
                      <Save className="h-4 w-4 mr-2" />
                      Changer le mot de passe
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Préférences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Notifications */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.emailNotifications}
                          onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Notifications par email
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.pushNotifications}
                          onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Notifications push
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.weeklyReport}
                          onChange={(e) => handlePreferenceChange('weeklyReport', e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Rapport hebdomadaire
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Fonctions sociales */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Fonctions sociales
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Activer les fonctions sociales
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Active les canaux de discussion et les fonctionnalités collaboratives
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.socialFeatures}
                            onChange={(e) => handlePreferenceChange('socialFeatures', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </label>
                      
                      {preferences.socialFeatures && (
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm font-medium">Fonctions sociales activées</span>
                          </div>
                          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                            Redirection automatique vers les canaux...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Langue et région */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Langue et région
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Langue
                        </label>
                        <select
                          value={preferences.language}
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="es">Español</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Fuseau horaire
                        </label>
                        <select
                          value={preferences.timezone}
                          onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="Africa/Douala">Afrique/Douala</option>
                          <option value="Europe/Paris">Europe/Paris</option>
                          <option value="America/New_York">Amérique/New_York</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Apparence */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Apparence
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Thème
                        </label>
                        <select
                          value={preferences.theme}
                          onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="auto">Automatique</option>
                          <option value="light">Clair</option>
                          <option value="dark">Sombre</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  modalType === 'activate' 
                    ? 'bg-green-100 dark:bg-green-900/20' 
                    : 'bg-red-100 dark:bg-red-900/20'
                }`}>
                  {modalType === 'activate' ? (
                    <Radio className="h-6 w-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <Radio className="h-6 w-6 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {modalType === 'activate' 
                      ? 'Activer les fonctions sociales' 
                      : 'Désactiver les fonctions sociales'
                    }
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {modalType === 'activate' 
                      ? 'Cette action va activer les canaux de discussion'
                      : 'Cette action va masquer les canaux de discussion'
                    }
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  {modalType === 'activate' 
                    ? 'L\'onglet "Canaux" apparaîtra dans la sidebar et vous serez redirigé vers l\'interface de chat. Voulez-vous continuer ?'
                    : 'L\'onglet "Canaux" sera masqué de la sidebar. Toutes les conversations seront préservées. Voulez-vous continuer ?'
                  }
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleModalCancel}
                  variant="secondary" 
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleModalConfirm}
                  className={`flex-1 ${
                    modalType === 'activate' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  } text-white`}
                >
                  {modalType === 'activate' ? 'Activer' : 'Désactiver'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;