// src/pages/SourcesPage/components/WebScraper/hooks/useScrapingActions.js
import { useCallback } from 'react';

const useScrapingActions = (articles, setArticles) => {
  // Basculer le statut favori d'un article
  const handleToggleFavorite = useCallback((articleId) => {
    console.log('❤️ Toggle favorite pour article:', articleId);
    
    setArticles(prevArticles => 
      prevArticles.map(article =>
        article.id === articleId
          ? { 
              ...article, 
              isFavorite: !article.isFavorite,
              // Mettre à jour les métadonnées de scrapping
              scrapingMetadata: {
                ...article.scrapingMetadata,
                lastModified: new Date().toISOString(),
                userActions: [
                  ...(article.scrapingMetadata?.userActions || []),
                  {
                    type: article.isFavorite ? 'unfavorite' : 'favorite',
                    timestamp: new Date().toISOString()
                  }
                ]
              }
            }
          : article
      )
    );
  }, [setArticles]);

  // Marquer un article comme lu/non lu
  const handleMarkAsRead = useCallback((articleId) => {
    console.log('👁️ Toggle read status pour article:', articleId);
    
    setArticles(prevArticles => 
      prevArticles.map(article =>
        article.id === articleId
          ? { 
              ...article, 
              isRead: !article.isRead,
              readAt: !article.isRead ? new Date().toISOString() : null,
              // Mettre à jour les métadonnées de scrapping
              scrapingMetadata: {
                ...article.scrapingMetadata,
                lastModified: new Date().toISOString(),
                userActions: [
                  ...(article.scrapingMetadata?.userActions || []),
                  {
                    type: article.isRead ? 'mark_unread' : 'mark_read',
                    timestamp: new Date().toISOString()
                  }
                ]
              }
            }
          : article
      )
    );
  }, [setArticles]);

  // Basculer le statut signet d'un article
  const handleToggleBookmark = useCallback((articleId) => {
    console.log('🔖 Toggle bookmark pour article:', articleId);
    
    setArticles(prevArticles => 
      prevArticles.map(article =>
        article.id === articleId
          ? { 
              ...article, 
              isBookmarked: !article.isBookmarked,
              bookmarkedAt: !article.isBookmarked ? new Date().toISOString() : null,
              // Mettre à jour les métadonnées de scrapping
              scrapingMetadata: {
                ...article.scrapingMetadata,
                lastModified: new Date().toISOString(),
                userActions: [
                  ...(article.scrapingMetadata?.userActions || []),
                  {
                    type: article.isBookmarked ? 'unbookmark' : 'bookmark',
                    timestamp: new Date().toISOString()
                  }
                ]
              }
            }
          : article
      )
    );
  }, [setArticles]);

  // Suivre/Ne plus suivre la source d'un article
  const handleToggleFollow = useCallback((articleId) => {
    console.log('👥 Toggle follow source pour article:', articleId);
    
    setArticles(prevArticles => 
      prevArticles.map(article =>
        article.id === articleId
          ? { 
              ...article, 
              isSourceFollowed: !article.isSourceFollowed,
              sourceFollowedAt: !article.isSourceFollowed ? new Date().toISOString() : null,
              // Mettre à jour les métadonnées de scrapping
              scrapingMetadata: {
                ...article.scrapingMetadata,
                lastModified: new Date().toISOString(),
                userActions: [
                  ...(article.scrapingMetadata?.userActions || []),
                  {
                    type: article.isSourceFollowed ? 'unfollow_source' : 'follow_source',
                    timestamp: new Date().toISOString(),
                    sourceUrl: article.sourceUrl
                  }
                ]
              }
            }
          : article
      )
    );
  }, [setArticles]);

  // Archiver un article
  const handleArchiveArticle = useCallback((articleId) => {
    console.log('📦 Archive article:', articleId);
    
    setArticles(prevArticles => 
      prevArticles.map(article =>
        article.id === articleId
          ? { 
              ...article, 
              isArchived: !article.isArchived,
              archivedAt: !article.isArchived ? new Date().toISOString() : null,
              // Mettre à jour les métadonnées de scrapping
              scrapingMetadata: {
                ...article.scrapingMetadata,
                lastModified: new Date().toISOString(),
                userActions: [
                  ...(article.scrapingMetadata?.userActions || []),
                  {
                    type: article.isArchived ? 'unarchive' : 'archive',
                    timestamp: new Date().toISOString()
                  }
                ]
              }
            }
          : article
      )
    );
  }, [setArticles]);

  // Ajouter une note à un article
  const handleAddNote = useCallback((articleId, note) => {
    console.log('📝 Add note pour article:', articleId, note);
    
    setArticles(prevArticles => 
      prevArticles.map(article =>
        article.id === articleId
          ? { 
              ...article, 
              notes: [
                ...(article.notes || []),
                {
                  id: Date.now(),
                  content: note,
                  createdAt: new Date().toISOString()
                }
              ],
              // Mettre à jour les métadonnées de scrapping
              scrapingMetadata: {
                ...article.scrapingMetadata,
                lastModified: new Date().toISOString(),
                userActions: [
                  ...(article.scrapingMetadata?.userActions || []),
                  {
                    type: 'add_note',
                    timestamp: new Date().toISOString(),
                    notePreview: note.slice(0, 50)
                  }
                ]
              }
            }
          : article
      )
    );
  }, [setArticles]);

  // Mettre à jour le score de confiance manuellement
  const handleUpdateConfidence = useCallback((articleId, newConfidence, reason) => {
    console.log('🎯 Update confidence pour article:', articleId, newConfidence);
    
    setArticles(prevArticles => 
      prevArticles.map(article =>
        article.id === articleId
          ? { 
              ...article,
              // Mettre à jour les métadonnées de scrapping
              scrapingMetadata: {
                ...article.scrapingMetadata,
                confidence: newConfidence,
                confidenceReason: reason,
                lastModified: new Date().toISOString(),
                userActions: [
                  ...(article.scrapingMetadata?.userActions || []),
                  {
                    type: 'update_confidence',
                    timestamp: new Date().toISOString(),
                    oldConfidence: article.scrapingMetadata?.confidence,
                    newConfidence,
                    reason
                  }
                ]
              }
            }
          : article
      )
    );
  }, [setArticles]);

  // Signaler un problème de scrapping
  const handleReportIssue = useCallback((articleId, issueType, description) => {
    console.log('🚨 Report issue pour article:', articleId, issueType);
    
    setArticles(prevArticles => 
      prevArticles.map(article =>
        article.id === articleId
          ? { 
              ...article,
              // Mettre à jour les métadonnées de scrapping
              scrapingMetadata: {
                ...article.scrapingMetadata,
                issues: [
                  ...(article.scrapingMetadata?.issues || []),
                  {
                    type: issueType,
                    description,
                    reportedAt: new Date().toISOString(),
                    status: 'open'
                  }
                ],
                lastModified: new Date().toISOString(),
                userActions: [
                  ...(article.scrapingMetadata?.userActions || []),
                  {
                    type: 'report_issue',
                    timestamp: new Date().toISOString(),
                    issueType,
                    description: description.slice(0, 100)
                  }
                ]
              }
            }
          : article
      )
    );
  }, [setArticles]);

  // Actions en lot
  const handleBulkActions = useCallback((articleIds, action) => {
    console.log('🔄 Bulk action:', action, 'pour', articleIds.length, 'articles');
    
    setArticles(prevArticles => 
      prevArticles.map(article => {
        if (!articleIds.includes(article.id)) return article;
        
        const timestamp = new Date().toISOString();
        let updates = {};
        
        switch (action) {
          case 'mark_read':
            updates = { isRead: true, readAt: timestamp };
            break;
          case 'mark_unread':
            updates = { isRead: false, readAt: null };
            break;
          case 'add_favorite':
            updates = { isFavorite: true };
            break;
          case 'remove_favorite':
            updates = { isFavorite: false };
            break;
          case 'archive':
            updates = { isArchived: true, archivedAt: timestamp };
            break;
          case 'unarchive':
            updates = { isArchived: false, archivedAt: null };
            break;
          default:
            return article;
        }
        
        return {
          ...article,
          ...updates,
          scrapingMetadata: {
            ...article.scrapingMetadata,
            lastModified: timestamp,
            userActions: [
              ...(article.scrapingMetadata?.userActions || []),
              {
                type: `bulk_${action}`,
                timestamp,
                batchSize: articleIds.length
              }
            ]
          }
        };
      })
    );
  }, [setArticles]);

  return {
    handleToggleFavorite,
    handleMarkAsRead,
    handleToggleBookmark,
    handleToggleFollow,
    handleArchiveArticle,
    handleAddNote,
    handleUpdateConfidence,
    handleReportIssue,
    handleBulkActions
  };
};

export default useScrapingActions;