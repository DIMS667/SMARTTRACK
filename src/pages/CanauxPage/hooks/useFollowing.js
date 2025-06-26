// src/pages/CanauxPage/hooks/useFollowing.js
import { useState, useCallback } from 'react';
import { followedUsers, suggestedFollows, expertises } from '../data/mockData';

export const useFollowing = () => {
  const [users, setUsers] = useState(followedUsers);
  const [suggestions, setSuggestions] = useState(suggestedFollows);
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  const filteredUsers = users.filter(user => {
    if (selectedExpertise === 'all') return true;
    return user.expertise.includes(selectedExpertise);
  });

  const handleUnfollow = useCallback((userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  }, []);

  const handleFollowSuggestion = useCallback((userId) => {
    const userToFollow = suggestions.find(user => user.id === userId);
    if (userToFollow) {
      setUsers(prev => [...prev, { ...userToFollow, isFollowing: true }]);
      setSuggestions(prev => prev.filter(user => user.id !== userId));
    }
  }, [suggestions]);

  const handleNotifyToggle = useCallback((userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, notifications: !user.notifications }
        : user
    ));
  }, []);

  return {
    users: filteredUsers,
    suggestions,
    expertises,
    selectedExpertise,
    setSelectedExpertise,
    handleUnfollow,
    handleFollowSuggestion,
    handleNotifyToggle
  };
};