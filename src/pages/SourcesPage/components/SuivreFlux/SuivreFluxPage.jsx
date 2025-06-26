// src/pages/SourcesPage/components/SuivreFlux/SuivreFluxPage.jsx
import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Upload, 
  Link as LinkIcon, 
  FileText,
  Check,
  X,
  AlertCircle,
  Globe,
  RefreshCw,
  Download,
  ExternalLink,
  Tag,
  Folder
} from 'lucide-react';

const SuivreMethod = ({ icon: Icon, title, description, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full p-6 border-2 border-dashed rounded-lg transition-all text-left ${
      disabled 
        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed'
        : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
        disabled 
          ? 'bg-gray-200 dark:bg-gray-700'
          : 'bg-orange-100 dark:bg-orange-900/30'
      }`}>
        <Icon className={`w-6 h-6 ${
          disabled 
            ? 'text-gray-400'
            : 'text-orange-600 dark:text-orange-400'
        }`} />
      </div>
      <div className="flex-1">
        <h3 className={`font-semibold mb-2 ${
          disabled 
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-gray-900 dark:text-white'
        }`}>
          {title}
          {disabled && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded">Bientôt</span>}
        </h3>
        <p className={`text-sm ${
          disabled 
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-gray-600 dark:text-gray-400'
        }`}>
          {description}
        </p>
      </div>
    </div>
  </button>
);

const URLSuivreForm = ({ onSubmit, onCancel }) => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const validateFeed = async (feedUrl) => {
    setIsValidating(true);
    setValidationResult(null);

    try {
      // Simulation d'une validation de flux RSS
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Résultat simulé
      const mockResult = {
        valid: true,
        title: "TechCrunch",
        description: "The latest technology news and information on startups",
        siteUrl: "https://techcrunch.com",
        articleCount: 25,
        lastUpdate: new Date(),
        favicon: "https://techcrunch.com/favicon.ico"
      };
      
      setValidationResult(mockResult);
    } catch (error) {
      setValidationResult({
        valid: false,
        error: "Impossible de valider ce flux RSS. Vérifiez l'URL."
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationResult?.valid) {
      onSubmit({
        url,
        category: category || 'Général',
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        ...validationResult
      });
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setValidationResult(null);
  };

  const handleValidate = () => {
    if (url.trim()) {
      validateFeed(url);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <LinkIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ajouter un flux RSS par URL
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entrez l'URL du flux RSS que vous souhaitez suivre
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL du flux */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL du flux RSS *
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://example.com/feed.xml"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="button"
                onClick={handleValidate}
                disabled={!url.trim() || isValidating}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isValidating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {isValidating ? 'Validation...' : 'Valider'}
              </button>
            </div>
          </div>

          {/* Résultat de validation */}
          {validationResult && (
            <div className={`p-4 rounded-lg border ${
              validationResult.valid 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
            }`}>
              {validationResult.valid ? (
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                      Flux RSS valide détecté
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        {validationResult.favicon && (
                          <img 
                            src={validationResult.favicon} 
                            alt=""
                            className="w-4 h-4"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        )}
                        <span className="font-medium text-green-800 dark:text-green-200">
                          {validationResult.title}
                        </span>
                      </div>
                      <p className="text-green-700 dark:text-green-300">
                        {validationResult.description}
                      </p>
                      <div className="flex items-center gap-4 text-green-600 dark:text-green-400">
                        <span>{validationResult.articleCount} articles disponibles</span>
                        <a 
                          href={validationResult.siteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Visiter le site
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
                      Erreur de validation
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {validationResult.error}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Options supplémentaires */}
          {validationResult?.valid && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Tech">Tech</option>
                  <option value="Science">Science</option>
                  <option value="News">News</option>
                  <option value="Business">Business</option>
                  <option value="Culture">Culture</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Étiquettes (séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="startup, innovation, tech"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!validationResult?.valid}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Ajouter le flux
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const OPMLSuivreForm = ({ onSubmit, onCancel }) => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [parseResult, setParseResult] = useState(null);
  const [selectedFeeds, setSelectedFeeds] = useState(new Set());
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    parseOPMLFile(selectedFile);
  };

  const parseOPMLFile = async (opmlFile) => {
    try {
      const text = await opmlFile.text();
      
      // Simulation du parsing OPML
      const mockFeeds = [
        {
          id: 'feed1',
          title: 'TechCrunch',
          url: 'https://techcrunch.com/feed/',
          category: 'Tech',
          description: 'Latest technology news'
        },
        {
          id: 'feed2',
          title: 'Hacker News',
          url: 'https://hnrss.org/frontpage',
          category: 'Tech',
          description: 'News for hackers'
        },
        {
          id: 'feed3',
          title: 'MIT Technology Review',
          url: 'https://www.technologyreview.com/feed/',
          category: 'Science',
          description: 'In-depth technology analysis'
        }
      ];

      setParseResult({
        success: true,
        feeds: mockFeeds,
        totalFeeds: mockFeeds.length
      });
      
      // Sélectionner tous les flux par défaut
      setSelectedFeeds(new Set(mockFeeds.map(feed => feed.id)));
      
    } catch (error) {
      setParseResult({
        success: false,
        error: 'Impossible de lire le fichier OPML. Vérifiez que le fichier est valide.'
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.opml') || droppedFile.name.endsWith('.xml'))) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const toggleFeedSelection = (feedId) => {
    const newSelection = new Set(selectedFeeds);
    if (newSelection.has(feedId)) {
      newSelection.delete(feedId);
    } else {
      newSelection.add(feedId);
    }
    setSelectedFeeds(newSelection);
  };

  const handleSubmit = () => {
    if (parseResult?.success && selectedFeeds.size > 0) {
      const feedsToSuivre = parseResult.feeds.filter(feed => selectedFeeds.has(feed.id));
      onSubmit(feedsToSuivre);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Suivre depuis un fichier OPML
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Suivez vos flux RSS depuis un fichier OPML exporté d'un autre lecteur
            </p>
          </div>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragOver 
                ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/10' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Déposer votre fichier OPML ici
            </h4>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Ou cliquez pour sélectionner un fichier (.opml, .xml)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Choisir un fichier
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".opml,.xml"
              onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Fichier sélectionné */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{file.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setParseResult(null);
                  setSelectedFeeds(new Set());
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Résultat du parsing */}
            {parseResult && (
              parseResult.success ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Flux détectés ({parseResult.totalFeeds})
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedFeeds(new Set(parseResult.feeds.map(f => f.id)))}
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        Tout sélectionner
                      </button>
                      <button
                        onClick={() => setSelectedFeeds(new Set())}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
                      >
                        Tout désélectionner
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {parseResult.feeds.map((feed) => (
                      <div
                        key={feed.id}
                        className={`flex items-center gap-3 p-4 border rounded-lg transition-all cursor-pointer ${
                          selectedFeeds.has(feed.id)
                            ? 'border-orange-200 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                        onClick={() => toggleFeedSelection(feed.id)}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedFeeds.has(feed.id)
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedFeeds.has(feed.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {feed.title}
                            </h5>
                            <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                              {feed.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {feed.description}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {feed.url}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedFeeds.size} flux sélectionné{selectedFeeds.size > 1 ? 's' : ''} sur {parseResult.totalFeeds}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={selectedFeeds.size === 0}
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        Suivre {selectedFeeds.size} flux
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
                        Erreur de lecture du fichier
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {parseResult.error}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function SuivreFluxPage({ onQuickAction }) {
  const [currentView, setCurrentView] = useState('methods'); // 'methods', 'url', 'opml', 'feedly'

  const handleMethodSelect = (method) => {
    setCurrentView(method);
  };

  const handleSuivreSuccess = (data) => {
    console.log('Suivi réussi:', data);
    // Ici vous pourriez ajouter le flux au contexte/state
    setCurrentView('methods');
    // Possiblement rediriger vers l'onglet "Flux suivis"
  };

  const handleCancel = () => {
    setCurrentView('methods');
  };

  if (currentView === 'url') {
    return (
      <div className="flex-1 overflow-auto p-6">
        <URLSuivreForm 
          onSubmit={handleSuivreSuccess}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  if (currentView === 'opml') {
    return (
      <div className="flex-1 overflow-auto p-6">
        <OPMLSuivreForm 
          onSubmit={handleSuivreSuccess}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // Vue par défaut - sélection de méthode
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Suivre des flux RSS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choisissez la méthode qui vous convient pour ajouter de nouveaux flux RSS à votre collection. 
            Vous pouvez suivre depuis différentes sources ou ajouter manuellement par URL.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SuivreMethod
            icon={LinkIcon}
            title="Ajouter par URL"
            description="Ajoutez un flux RSS en saisissant directement son URL. Idéal pour ajouter des flux individuels."
            onClick={() => handleMethodSelect('url')}
          />

          <SuivreMethod
            icon={FileText}
            title="Fichier OPML"
            description="Suivez vos flux depuis un fichier OPML exporté d'un autre lecteur RSS comme Feedly, Inoreader, etc."
            onClick={() => handleMethodSelect('opml')}
          />

          <SuivreMethod
            icon={Download}
            title="Depuis Feedly"
            description="Connectez-vous à votre compte Feedly pour suivre automatiquement tous vos flux existants."
            onClick={() => handleMethodSelect('feedly')}
            disabled={true}
          />
        </div>

        {/* Suggestions de flux populaires */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Flux populaires à découvrir
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "TechCrunch",
                description: "Latest technology news and startup information",
                url: "https://techcrunch.com/feed/",
                category: "Tech"
              },
              {
                title: "Hacker News",
                description: "News for hackers, makers and entrepreneurs",
                url: "https://hnrss.org/frontpage",
                category: "Tech"
              },
              {
                title: "MIT Technology Review",
                description: "In-depth analysis of emerging technologies",
                url: "https://www.technologyreview.com/feed/",
                category: "Science"
              },
              {
                title: "The Verge",
                description: "Technology, science, art, and culture",
                url: "https://www.theverge.com/rss/index.xml",
                category: "Tech"
              }
            ].map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{suggestion.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{suggestion.description}</p>
                  <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                    {suggestion.category}
                  </span>
                </div>
                <button
                  onClick={() => {
                    // Pré-remplir le formulaire URL avec cette suggestion
                    setCurrentView('url');
                  }}
                  className="ml-4 px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuivreFluxPage;