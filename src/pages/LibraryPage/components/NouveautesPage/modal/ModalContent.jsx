//ModalContent.jsx mis à jour avec les étiquettes

import React from 'react';
import Avatar from '@/components/common/Avatar';
import { useTheme } from '@/context/ThemeContext';
import { EtiquetteBadge } from '@/pages/LibraryPage/components/Etiquettes';
import { useSharedEtiquettes } from '@/pages/LibraryPage/components/Etiquettes/hooks/useSharedEtiquettes';

const ModalContent = ({ article, formatDate, articleNote, etiquettesArticle, onEtiquetteClick }) => {
  const themeContext = useTheme();
  const { theme } = themeContext || { 
    theme: { 
      primaryText: 'text-purple-600', 
      primaryLight: 'bg-purple-50' 
    }
  };

  // Utiliser les étiquettes passées en props au lieu du hook

  const handleEtiquetteClick = (etiquette) => {
    console.log('🏷️ Clic sur étiquette dans ModalContent:', etiquette.nom);
    if (onEtiquetteClick) {
      onEtiquetteClick(etiquette);
    }
  };

  return (
    <div className="p-8">
      {/* Header de l'article */}
      <div className="mb-6">
        {/* Badge du flux */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="px-3 py-1 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: article.feedColor }}
          >
            {article.feedName}
          </div>
          <span className={`px-2 py-1 rounded-md text-xs ${theme.primaryLight} ${theme.primaryText} dark:bg-opacity-20`}>
            {article.category}
          </span>
        </div>
        
        {/* Titre de l'article */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {article.title}
        </h1>
        
        {/* Métadonnées */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Avatar 
              src={`https://ui-avatars.com/api/?name=${article.author}&background=random`}
              alt={article.author}
              size="sm"
            />
            <span className="font-medium">{article.author}</span>
          </div>
          <span>•</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        {/* Étiquettes de l'article */}
        {etiquettesArticle.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5l5.5 5.5a1 1 0 010 1.414L12.414 15a1 1 0 01-1.414 0L5.5 9.5A1 1 0 015 8.5V3a1 1 0 011-1z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Étiquettes :
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {etiquettesArticle.map(etiquette => (
                  <EtiquetteBadge
                    key={etiquette.id}
                    etiquette={etiquette}
                    taille="normal"
                    onEtiquetteClick={handleEtiquetteClick}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Note personnelle (si elle existe) */}
      {articleNote && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0V3a1 1 0 011-1h8a1 1 0 011 1v1M9 7h6m-7 4h8m-8 4h8m-8 4h5" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                Ma note personnelle
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 whitespace-pre-wrap">
                {articleNote}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Contenu de l'article */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Bouton Résumer avec IA */}
        <div className="mb-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-sm font-medium">Résumer avec l'IA</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </button>
        </div>

        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {article.excerpt}
        </p>
        
        <div className="text-gray-900 dark:text-gray-100 leading-relaxed space-y-6">
          <p>
            Figure inéluctable en architecture comme en histoire de l'art, l'œuvre de Le Corbusier 
            fait l'objet de nombreuses recherches menées depuis le XXe siècle. Ce volume propose 
            de relire la production architecturale de Charles-Édouard Jeanneret à travers le 
            prisme de deux notions importantes : la figure et le patrimoine.
          </p>
          
          <p>
            Désormais considéré comme un modèle dans le cadre de l'enseignement dispensé dans les universités et 
            les écoles nationales supérieures d'architecture en France, il semblait d'actualité de 
            renouveler notre regard sur cet œuvre pour évaluer de nouveau l'architecture, puis 
            l'architecte.
          </p>
          
          <p>
            L'ouvrage réunit les actes d'une journée d'étude menée conjointement, et 
            pour la première fois, par des chercheurs du Centre d'Histoire « Espaces et Cultures » 
            de l'Université Clermont-Auvergne ainsi que de l'École nationale supérieure 
            d'architecture de Clermont-Ferrand.
          </p>
        </div>
        
        {/* Tags originaux de l'article */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="w-full mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags :</span>
          </div>
          {article.tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalContent;