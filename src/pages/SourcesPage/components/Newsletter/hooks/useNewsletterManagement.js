import { useState, useEffect } from 'react';
import { mockNewsletters } from '../mockData';

// Variable globale pour simuler une base de données
let globalNewsletters = [...mockNewsletters];

export const useNewsletterManagement = (activeTab) => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribedCount, setSubscribedCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNewsletters = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredNewsletters = [...globalNewsletters];
      
      // Filter based on active tab
      if (activeTab === 'subscribed') {
        filteredNewsletters = filteredNewsletters.filter(n => n.isSubscribed);
      } else if (activeTab === 'discover') {
        filteredNewsletters = filteredNewsletters.filter(n => !n.isSubscribed);
      }
      
      setNewsletters(filteredNewsletters);
      
      // Calculate stats
      const subscribed = globalNewsletters.filter(n => n.isSubscribed);
      const unread = subscribed.reduce((total, n) => total + (n.unreadCount || 0), 0);
      
      setSubscribedCount(subscribed.length);
      setUnreadCount(unread);
      
    } catch (error) {
      console.error('Error loading newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNewsletters();
  }, [activeTab]);

  const subscribeToNewsletter = async (newsletterId, settings = {}) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update global newsletters
      globalNewsletters = globalNewsletters.map(newsletter => {
        if (newsletter.id === newsletterId) {
          return {
            ...newsletter,
            isSubscribed: true,
            status: 'active',
            subscriptionDate: new Date().toISOString(),
            unreadCount: 1, // Nouvelle newsletter = 1 article non lu
            settings: {
              frequency: settings.frequency || newsletter.frequency,
              format: settings.format || 'html',
              notifications: settings.notifications !== undefined ? settings.notifications : true
            }
          };
        }
        return newsletter;
      });
      
      // Reload newsletters for current tab (important pour mettre à jour les vues)
      await loadNewsletters();
      
      console.log('✅ Newsletter ajoutée avec succès ! Elle apparaît maintenant dans "Mes newsletters"');
      
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  };

  const unsubscribeFromNewsletter = async (newsletterId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Update global newsletters
      globalNewsletters = globalNewsletters.map(newsletter => {
        if (newsletter.id === newsletterId) {
          return {
            ...newsletter,
            isSubscribed: false,
            status: 'cancelled',
            unsubscribeDate: new Date().toISOString()
          };
        }
        return newsletter;
      });
      
      // Reload newsletters for current tab
      await loadNewsletters();
      
      console.log('Successfully unsubscribed from newsletter');
      
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw error;
    }
  };

  const updateNewsletterSettings = async (newsletterId, settings) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Update global newsletters
      globalNewsletters = globalNewsletters.map(newsletter => 
        newsletter.id === newsletterId 
          ? { ...newsletter, ...settings }
          : newsletter
      );
      
      // Update local state
      setNewsletters(prev => 
        prev.map(newsletter => 
          newsletter.id === newsletterId 
            ? { ...newsletter, ...settings }
            : newsletter
        )
      );
      
      console.log('Newsletter settings updated');
    } catch (error) {
      console.error('Error updating newsletter settings:', error);
      throw error;
    }
  };

  const markAsRead = async (newsletterId) => {
    try {
      // Update global newsletters
      globalNewsletters = globalNewsletters.map(newsletter => 
        newsletter.id === newsletterId 
          ? { ...newsletter, unreadCount: 0 }
          : newsletter
      );
      
      // Update local state
      setNewsletters(prev => 
        prev.map(newsletter => 
          newsletter.id === newsletterId 
            ? { ...newsletter, unreadCount: 0 }
            : newsletter
        )
      );
      
      // Update unread count
      const newsletter = newsletters.find(n => n.id === newsletterId);
      if (newsletter && newsletter.unreadCount > 0) {
        setUnreadCount(prev => Math.max(0, prev - newsletter.unreadCount));
      }
      
      console.log('Newsletter marked as read');
    } catch (error) {
      console.error('Error marking newsletter as read:', error);
    }
  };

  const addToFavorites = async (newsletterId) => {
    try {
      // Update global newsletters
      globalNewsletters = globalNewsletters.map(newsletter => 
        newsletter.id === newsletterId 
          ? { ...newsletter, isFavorite: !newsletter.isFavorite }
          : newsletter
      );
      
      // Update local state
      setNewsletters(prev => 
        prev.map(newsletter => 
          newsletter.id === newsletterId 
            ? { ...newsletter, isFavorite: !newsletter.isFavorite }
            : newsletter
        )
      );
      
      console.log('Newsletter favorite status updated');
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const addNewsletter = async (newsletterData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Générer des articles mock pour la nouvelle newsletter
      const mockArticles = [
        {
          id: `${Date.now()}-1`,
          title: `Bienvenue dans ${newsletterData.name}`,
          summary: `Première newsletter de ${newsletterData.name}. Configurez vos préférences et commencez à recevoir du contenu.`,
          content: 'Contenu de bienvenue...',
          publishedAt: new Date().toISOString(),
          readAt: null,
          isFavorite: false,
          url: null
        },
        {
          id: `${Date.now()}-2`,
          title: `Guide de démarrage - ${newsletterData.name}`,
          summary: 'Comment tirer le meilleur parti de votre nouvelle newsletter.',
          content: 'Guide de démarrage...',
          publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 jour avant
          readAt: null,
          isFavorite: false,
          url: null
        }
      ];
      
      const newNewsletter = {
        id: Date.now().toString(),
        ...newsletterData,
        logo: null, // Pas de logo pour les newsletters ajoutées manuellement
        websiteUrl: null,
        sampleUrl: null,
        weeklyGrowth: 0,
        isFavorite: false,
        unreadCount: 2, // 2 articles non lus par défaut
        articles: mockArticles // Ajouter les articles mock
      };
      
      // Ajouter à la liste globale
      globalNewsletters.push(newNewsletter);
      
      // Reload newsletters if we're in the right tab
      if (activeTab === 'subscribed') {
        await loadNewsletters();
      }
      
      console.log('Newsletter added successfully:', newNewsletter);
      return newNewsletter;
    } catch (error) {
      console.error('Error adding newsletter:', error);
      throw error;
    }
  };

  return {
    newsletters,
    loading,
    subscribedCount,
    unreadCount,
    totalCount: globalNewsletters.length,
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    updateNewsletterSettings,
    markAsRead,
    addToFavorites,
    addNewsletter,
    refreshNewsletters: loadNewsletters
  };
};