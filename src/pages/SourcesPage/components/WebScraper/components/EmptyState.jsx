// src/pages/SourcesPage/components/WebScraper/components/EmptyState.jsx
import React from 'react';
import { 
  Globe, 
  RefreshCw, 
  AlertCircle, 
  Search, 
  Zap, 
  ExternalLink,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';

const EmptyState = ({ 
  type = 'no-results', 
  url = '', 
  selectedWebsiteTypes = [], 
  onClearScraping,
  onRetry 
}) => {
  const states = {
    loading: {
      icon: RefreshCw,
      iconClass: 'w-16 h-16 text-green-500 animate-spin',
      title: 'Scrapping en cours...',
      description: url ? `Extraction du contenu de ${new URL(url).hostname}` : 'Analyse du site web en cours',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Temps estimé : 30-60 secondes</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
          <div className="text-center space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Connexion au site établie</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 text-green-500 animate-spin" />
              <span>Extraction du contenu...</span>
            </div>
            <div className="flex items-center justify-center gap-2 opacity-50">
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
              <span>Analyse et structuration</span>
            </div>
          </div>
        </div>
      ),
      actions: null
    },

    error: {
      icon: AlertCircle,
      iconClass: 'w-16 h-16 text-red-500',
      title: 'Erreur de scrapping',
      description: 'Impossible d\'extraire le contenu du site web',
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-red-800 dark:text-red-200 font-medium mb-1">
                  Causes possibles :
                </p>
                <ul className="text-red-700 dark:text-red-300 space-y-1 text-xs">
                  <li>• Site web inaccessible ou hors ligne</li>
                  <li>• Protection anti-bot activée</li>
                  <li>• Contenu dynamique (JavaScript requis)</li>
                  <li>• Limite de taux atteinte</li>
                </ul>
              </div>
            </div>
          </div>
          
          {url && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 justify-center">
              <ExternalLink className="w-4 h-4" />
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Ouvrir le site manuellement
              </a>
            </div>
          )}
        </div>
      ),
      actions: (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
          <button
            onClick={onClearScraping}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Nouveau site
          </button>
        </div>
      )
    },

    'no-results': {
      icon: Search,
      iconClass: 'w-16 h-16 text-gray-400',
      title: 'Aucun contenu trouvé',
      description: 'Le scrapping n\'a trouvé aucun article sur ce site',
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-1">
                  Suggestions :
                </p>
                <ul className="text-yellow-700 dark:text-yellow-300 space-y-1 text-xs">
                  <li>• Vérifiez que le site contient des articles</li>
                  <li>• Essayez une URL plus spécifique (ex: /blog, /news)</li>
                  <li>• Certains sites nécessitent une configuration spéciale</li>
                  <li>• Modifiez les filtres de type de contenu</li>
                </ul>
              </div>
            </div>
          </div>

          {url && (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Site analysé : <span className="font-medium">{new URL(url).hostname}</span>
              </p>
              <div className="flex items-center gap-2 justify-center text-sm text-gray-500 dark:text-gray-400">
                <Zap className="w-4 h-4" />
                <span>Extraction automatique terminée</span>
              </div>
            </div>
          )}
        </div>
      ),
      actions: (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onClearScraping}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            Essayer un autre site
          </button>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 justify-center"
            >
              <ExternalLink className="w-4 h-4" />
              Visiter le site
            </a>
          )}
        </div>
      )
    },

    'blocked': {
      icon: Shield,
      iconClass: 'w-16 h-16 text-orange-500',
      title: 'Accès bloqué',
      description: 'Le site web bloque les tentatives d\'extraction automatique',
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-orange-800 dark:text-orange-200 font-medium mb-1">
                  Ce site utilise des protections :
                </p>
                <ul className="text-orange-700 dark:text-orange-300 space-y-1 text-xs">
                  <li>• Cloudflare ou protection DDoS</li>
                  <li>• Détection de bots avancée</li>
                  <li>• Authentification requise</li>
                  <li>• Contenu payant ou premium</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Certains sites de haute valeur protègent leur contenu.</p>
            <p>Essayez un autre site ou consultez directement la source.</p>
          </div>
        </div>
      ),
      actions: (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onClearScraping}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            Choisir un autre site
          </button>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 justify-center"
            >
              <ExternalLink className="w-4 h-4" />
              Accéder au site
            </a>
          )}
        </div>
      )
    }
  };

  const currentState = states[type] || states['no-results'];
  const Icon = currentState.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center p-8">
      <div className="mb-6">
        <Icon className={currentState.iconClass} />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {currentState.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {currentState.description}
      </p>

      {currentState.content && (
        <div className="mb-8 max-w-lg w-full">
          {currentState.content}
        </div>
      )}

      {currentState.actions && currentState.actions}

      {/* Aide contextuelle */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg max-w-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">
          💡 Conseil pro
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {type === 'loading' && "Le scrapping peut prendre plus de temps pour les sites complexes"}
          {type === 'error' && "Essayez d'attendre quelques minutes avant de relancer"}
          {type === 'no-results' && "Les pages d'accueil contiennent souvent moins d'articles que les sections spécialisées"}
          {type === 'blocked' && "Les sites d'actualités premium ont souvent des flux RSS publics"}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;