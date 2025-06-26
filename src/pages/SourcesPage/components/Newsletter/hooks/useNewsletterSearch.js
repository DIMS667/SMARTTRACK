import { useState, useMemo } from 'react';

export const useNewsletterSearch = (newsletters, activeTab) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    frequency: '',
    status: '',
    sortBy: '',
    language: ''
  });

  const filteredNewsletters = useMemo(() => {
    let filtered = [...newsletters];

    // Search by name, publisher, or description
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(newsletter => 
        newsletter.name.toLowerCase().includes(query) ||
        newsletter.publisher.toLowerCase().includes(query) ||
        newsletter.description.toLowerCase().includes(query) ||
        newsletter.categories?.some(cat => cat.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(newsletter => 
        newsletter.categories?.includes(filters.category)
      );
    }

    // Filter by frequency
    if (filters.frequency) {
      filtered = filtered.filter(newsletter => 
        newsletter.frequency === filters.frequency
      );
    }

    // Filter by language
    if (filters.language) {
      filtered = filtered.filter(newsletter => 
        newsletter.language === filters.language
      );
    }

    // Filter by status (for subscribed view)
    if (filters.status && activeTab === 'subscribed') {
      switch (filters.status) {
        case 'active':
          filtered = filtered.filter(newsletter => 
            newsletter.status === 'active'
          );
          break;
        case 'paused':
          filtered = filtered.filter(newsletter => 
            newsletter.status === 'paused'
          );
          break;
        case 'unread':
          filtered = filtered.filter(newsletter => 
            newsletter.unreadCount > 0
          );
          break;
      }
    }

    // Sort (for discover view)
    if (filters.sortBy && activeTab === 'discover') {
      switch (filters.sortBy) {
        case 'subscribers':
          filtered = filtered.sort((a, b) => 
            b.subscriberCount - a.subscriberCount
          );
          break;
        case 'rating':
          filtered = filtered.sort((a, b) => 
            (b.rating || 0) - (a.rating || 0)
          );
          break;
        case 'recent':
          filtered = filtered.sort((a, b) => 
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          );
          break;
        case 'trending':
          filtered = filtered.sort((a, b) => 
            (b.weeklyGrowth || 0) - (a.weeklyGrowth || 0)
          );
          break;
        default:
          // Keep original order for relevance
          break;
      }
    }

    // Default sorting for subscribed newsletters
    if (activeTab === 'subscribed' && !filters.sortBy) {
      filtered = filtered.sort((a, b) => {
        // Trier par ordre de création (plus récent en premier)
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
    }

    return filtered;
  }, [newsletters, searchQuery, filters, activeTab]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      frequency: '',
      status: '',
      sortBy: '',
      language: ''
    });
  };

  const clearAll = () => {
    clearSearch();
    clearFilters();
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredNewsletters,
    clearSearch,
    clearFilters,
    clearAll,
    hasActiveFilters: Object.values(filters).some(value => value !== '') || searchQuery.trim() !== ''
  };
};