//ArticleModal.jsx - Mis à jour avec gestion centralisée des étiquettes
import React from 'react';
import ModalHeader from './modal/ModalHeader';
import ModalToolbar from './modal/ModalToolbar';
import ModalContent from './modal/ModalContent';
import { useSharedEtiquettes } from '@/pages/LibraryPage/components/Etiquettes/hooks/useSharedEtiquettes';

const ArticleModal = ({ 
  article, 
  isOpen, 
  onClose, 
  onToggleFavorite, 
  formatDate,
  articleNote,
  onNoteChange,
  onEtiquetteClick // Nouveau: callback pour navigation vers page étiquette
}) => {
  // Gestion centralisée des étiquettes au niveau du modal parent
  const etiquettesHook = useSharedEtiquettes();
  const etiquettesArticle = article ? etiquettesHook.obtenirEtiquettesArticle(article.id) : [];

  const handleEtiquetteClick = (etiquette) => {
    console.log('🏷️ Navigation vers étiquette depuis ArticleModal:', etiquette.nom);
    if (onEtiquetteClick) {
      // Fermer la modal avant la navigation
      onClose();
      onEtiquetteClick(etiquette);
    }
  };

  if (!isOpen || !article) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all">
          {/* Header du modal */}
          <div className="relative">
            <ModalHeader 
              article={article}
              onToggleFavorite={onToggleFavorite}
              onClose={onClose}
            />
            
            {/* Barre d'actions du modal */}
            <ModalToolbar 
              article={article}
              articleNote={articleNote}
              onNoteChange={onNoteChange}
              // Props pour les étiquettes
              etiquettesHook={etiquettesHook}
              etiquettesArticle={etiquettesArticle}
            />
          </div>
          
          {/* Contenu de l'article */}
          <ModalContent 
            article={article}
            formatDate={formatDate}
            articleNote={articleNote}
            // Props pour les étiquettes
            etiquettesArticle={etiquettesArticle}
            onEtiquetteClick={handleEtiquetteClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;