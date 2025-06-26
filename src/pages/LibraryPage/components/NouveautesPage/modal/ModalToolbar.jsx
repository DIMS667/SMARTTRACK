// ModalToolbar.jsx - Version mise à jour avec les étiquettes
import React, { useState } from 'react';
import ShareButtons from './ShareButtons';
// Import corrigé pour CommentModal - ajustez selon votre structure
import CommentModal from '@/pages/LibraryPage/components/Commentaire/CommentModal';
// OU si c'est un export par défaut depuis l'index:
// import { CommentModal } from '@/pages/LibraryPage/components/Commentaire';
// OU si c'est le composant principal:
// import CommentModal from '@/pages/LibraryPage/components/Commentaire';

import { EtiquetteModal, EtiquetteSelector, EtiquetteBadge } from '@/pages/LibraryPage/components/Etiquettes';
import { useSharedEtiquettes } from '@/pages/LibraryPage/components/Etiquettes/hooks/useSharedEtiquettes';

const NoteModal = ({ isOpen, onClose, onSave, existingNote = '' }) => {
  const [note, setNote] = useState(existingNote);

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {existingNote ? 'Modifier la note' : 'Créer une note'}
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

          {/* Contenu */}
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Votre note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Écrivez votre note ici..."
                className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none"
                autoFocus
              />
            </div>
            
            {/* Compteur de caractères */}
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>{note.length} caractères</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Les notes sont sauvegardées localement
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {existingNote ? 'Mettre à jour' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalToolbar = ({ article, articleNote, onNoteChange, etiquettesHook, etiquettesArticle }) => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showEtiquetteModal, setShowEtiquetteModal] = useState(false);
  const [showEtiquetteSelector, setShowEtiquetteSelector] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Utiliser le hook passé en props au lieu de créer une nouvelle instance

  const handleSaveNote = (note) => {
    onNoteChange(note);
  };

  const handleCommentClick = () => {
    console.log('🖱️ CLIC COMMENTAIRES !');
    console.log('📊 État avant:', { showCommentModal });
    setShowCommentModal(true);
    console.log('📊 setShowCommentModal(true) appelé');
    
    // Vérification après un petit délai
    setTimeout(() => {
      console.log('📊 État après délai:', showCommentModal);
    }, 100);
  };

  const handleEtiquetteClick = () => {
    console.log('🏷️ CLIC ÉTIQUETTES !');
    setShowEtiquetteSelector(!showEtiquetteSelector);
  };

  const handleEtiquetteModalClick = () => {
    console.log('🏷️ CLIC MODAL ÉTIQUETTES !');
    setShowEtiquetteModal(true);
    setShowEtiquetteSelector(false);
  };

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Démarrer la lecture audio
      console.log('🔊 Démarrage lecture audio de l\'article:', article.title);
      // TODO: Implémenter la synthèse vocale
      speakArticle(article);
    } else {
      // Arrêter la lecture audio
      console.log('⏸️ Arrêt lecture audio');
      // TODO: Arrêter la synthèse vocale
      stopSpeaking();
    }
  };

  const detectLanguage = (text) => {
    // Mots indicateurs pour détection de langue
    const frenchIndicators = ['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'est', 'dans', 'pour', 'avec', 'sur', 'par', 'ce', 'cette', 'ces', 'que', 'qui', 'à', 'où'];
    const englishIndicators = ['the', 'and', 'of', 'to', 'a', 'in', 'for', 'is', 'on', 'that', 'by', 'this', 'with', 'i', 'you', 'it', 'not', 'or', 'be', 'are', 'from', 'at', 'as', 'your', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'have', 'an', 'they', 'which', 'she', 'do', 'how', 'if', 'will', 'up', 'other', 'about', 'out', 'many', 'time', 'very', 'when', 'much', 'new', 'would', 'there', 'each', 'so', 'these'];
    
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    let frenchScore = 0;
    let englishScore = 0;
    
    words.forEach(word => {
      if (frenchIndicators.includes(word)) frenchScore++;
      if (englishIndicators.includes(word)) englishScore++;
    });
    
    // Si on détecte plus de mots anglais, c'est probablement de l'anglais
    if (englishScore > frenchScore) {
      return 'en-US';
    }
    
    // Par défaut, français
    return 'fr-FR';
  };

  const speakArticle = (article) => {
    // Fonction améliorée pour la synthèse vocale avec détection de langue
    if ('speechSynthesis' in window) {
      // Texte complet à lire
      const fullText = `${article.title}. ${article.excerpt}`;
      
      // Détecter la langue du texte
      const detectedLang = detectLanguage(fullText);
      console.log('🌍 Langue détectée:', detectedLang);
      
      // Séparer le texte par phrases pour gérer les langues mixtes
      const sentences = fullText.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      let currentIndex = 0;
      
      const speakNextSentence = () => {
        if (currentIndex >= sentences.length) {
          setIsPlaying(false);
          return;
        }
        
        const sentence = sentences[currentIndex].trim();
        if (!sentence) {
          currentIndex++;
          speakNextSentence();
          return;
        }
        
        // Détecter la langue de chaque phrase
        const sentenceLang = detectLanguage(sentence);
        
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        utterance.lang = sentenceLang;
        
        // Choisir une voix appropriée selon la langue
        const voices = speechSynthesis.getVoices();
        let selectedVoice = null;
        
        if (sentenceLang === 'en-US') {
          selectedVoice = voices.find(voice => 
            voice.lang.startsWith('en') && 
            (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.default)
          );
        } else {
          selectedVoice = voices.find(voice => 
            voice.lang.startsWith('fr') && 
            (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.default)
          );
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        utterance.onend = () => {
          currentIndex++;
          // Petite pause entre les phrases
          setTimeout(speakNextSentence, 200);
        };
        
        utterance.onerror = (event) => {
          console.error('❌ Erreur synthèse vocale:', event);
          currentIndex++;
          speakNextSentence();
        };
        
        console.log(`🗣️ Lecture phrase ${currentIndex + 1}/${sentences.length} (${sentenceLang}):`, sentence.substring(0, 50) + '...');
        speechSynthesis.speak(utterance);
      };
      
      // Attendre que les voix soient chargées
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = () => {
          speakNextSentence();
        };
      } else {
        speakNextSentence();
      }
    } else {
      console.error('❌ Synthèse vocale non supportée');
      alert('La synthèse vocale n\'est pas supportée par votre navigateur.');
      setIsPlaying(false);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            {/* Bouton Notes */}
            <button 
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2" />
              </svg>
              <span className="text-sm">
                {articleNote ? 'Modifier la note' : 'Créer une note'}
              </span>
              {articleNote && (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </button>

            {/* Affichage des étiquettes actuelles - SUPPRIMÉ car déjà dans ModalContent */}
            {/* <div className="flex items-center gap-2 max-w-md overflow-x-auto">
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Étiquettes ({etiquettesArticle.length}):
              </span>
              <div className="flex gap-1">
                {etiquettesArticle.length > 0 ? (
                  <>
                    {etiquettesArticle.slice(0, 3).map(etiquette => (
                      <EtiquetteBadge
                        key={etiquette.id}
                        etiquette={etiquette}
                        taille="petit"
                        onClick={handleEtiquetteClick}
                      />
                    ))}
                    {etiquettesArticle.length > 3 && (
                      <button
                        onClick={handleEtiquetteClick}
                        className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        +{etiquettesArticle.length - 3}
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-gray-400 italic">Aucune étiquette</span>
                )}
              </div>
            </div> */}

            {/* Section de test - pour vérifier que le composant fonctionne */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Debug: {etiquettesArticle.length} étiquettes</span>
              {article && <span>ID: {article.id}</span>}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Bouton Commentaires */}
              <button 
                onClick={handleCommentClick}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                title="Commentaires"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              {/* Bouton Lecture Audio */}
              <button 
                onClick={handleAudioToggle}
                className={`p-2 rounded-lg transition-colors group ${
                  isPlaying 
                    ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400'
                }`}
                title={isPlaying ? "Arrêter la lecture" : "Écouter l'article"}
              >
                {isPlaying ? (
                  // Icône pause
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  // Icône play/volume
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
                {/* Indicateur de lecture en cours */}
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  </span>
                )}
              </button>

              {/* Bouton Étiquettes */}
              <div className="relative">
                <button 
                  onClick={handleEtiquetteClick}
                  className={`p-2 rounded-lg transition-colors group ${
                    etiquettesArticle.length > 0 
                      ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-yellow-600 dark:hover:text-yellow-400'
                  }`}
                  title={`Étiquettes${etiquettesArticle.length > 0 ? ` (${etiquettesArticle.length})` : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5l5.5 5.5a1 1 0 010 1.414L12.414 15a1 1 0 01-1.414 0L5.5 9.5A1 1 0 015 8.5V3a1 1 0 011-1z" />
                  </svg>
                  {/* Indicateur si étiquettes présentes */}
                  {etiquettesArticle.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
                      {etiquettesArticle.length > 9 ? '9+' : etiquettesArticle.length}
                    </span>
                  )}
                </button>

                {/* Dropdown de sélection d'étiquettes */}
                {showEtiquetteSelector && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                    <EtiquetteSelector
                      article={article}
                      isOpen={showEtiquetteSelector}
                      onClose={() => setShowEtiquetteSelector(false)}
                      onToggle={() => setShowEtiquetteSelector(!showEtiquetteSelector)}
                      etiquettesHook={etiquettesHook}
                    />
                  </div>
                )}
              </div>
              
              {/* Bouton Info */}
              <button 
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Informations"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ShareButtons />
            
            {/* Bouton pour ouvrir la modal complète des étiquettes */}
            <button
              onClick={handleEtiquetteModalClick}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              title="Gérer toutes les étiquettes"
            >
              Gérer
            </button>
          </div>
        </div>
      </div>

      {/* Debug supprimé */}
      {/* {console.log('🔍 Render final - showCommentModal:', showCommentModal)} */}
      
      {/* Modal de création de note */}
      <NoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onSave={handleSaveNote}
        existingNote={articleNote}
      />

      {/* Modal de commentaires avec le composant modulaire */}
      <CommentModal
        isOpen={showCommentModal}
        onClose={() => {
          console.log('🚪 Fermeture modal commentaires');
          setShowCommentModal(false);
        }}
        article={article}
      />

      {/* Modal complète de gestion des étiquettes */}
      <EtiquetteModal
        isOpen={showEtiquetteModal}
        onClose={() => {
          console.log('🚪 Fermeture modal étiquettes');
          setShowEtiquetteModal(false);
        }}
        article={article}
        etiquettesHook={etiquettesHook}
      />
    </>
  );
};

export default ModalToolbar;