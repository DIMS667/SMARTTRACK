// src/pages/CanauxPage/hooks/useChannels.js
import { useState, useRef, useEffect, useCallback } from 'react';

export const useChannels = () => {
  const [channels] = useState([
    { id: 'general', name: 'général', description: 'Canal pour les discussions générales', members: 42, unread: 0 },
    { id: 'veille', name: 'veille', description: 'Partagez vos découvertes de veille', members: 28, unread: 3 },
    { id: 'annonces', name: 'annonces', description: 'Annonces importantes', members: 42, unread: 0 },
    { id: 'ia', name: 'ia', description: 'Tout sur l\'intelligence artificielle', members: 15, unread: 7 },
    { id: 'blockchain', name: 'blockchain', description: 'Actualités blockchain et crypto', members: 12, unread: 0 },
    { id: 'cybersecurite', name: 'cybersecurite', description: 'Sécurité informatique et cyberdéfense', members: 18, unread: 2 }
  ]);

  const [selectedChannel, setSelectedChannel] = useState('general');
  const [messages, setMessages] = useState({
    general: [
      {
        id: 1,
        user: 'Sophie Martin',
        avatar: null,
        message: 'Bonjour à tous ! Bienvenue sur SMARTTRACK.',
        timestamp: '10:30',
        reactions: [],
        isOwn: false
      },
      {
        id: 2,
        user: 'Jean Dupont',
        avatar: null,
        message: 'Quelqu\'un a des retours sur la nouvelle version ?',
        timestamp: '10:45',
        reactions: [
          { emoji: '👍', count: 3, users: ['Alice', 'Marc', 'Sophie'] }
        ],
        isOwn: false
      }
    ],
    veille: [
      {
        id: 1,
        user: 'Alice Chen',
        avatar: null,
        message: 'Nouvel article intéressant sur les LLMs : https://example.com',
        timestamp: '09:15',
        reactions: [
          { emoji: '❤️', count: 5, users: ['Sophie', 'Marc', 'Jean', 'Thomas', 'Lisa'] },
          { emoji: '💬', count: 2, users: ['Sophie', 'Jean'] }
        ],
        isOwn: false
      }
    ]
  });

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const currentChannel = channels.find(c => c.id === selectedChannel);
  const currentMessages = messages[selectedChannel] || [];

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      const newMessage = {
        id: currentMessages.length + 1,
        user: 'Utilisateur SMARTTRACK',
        avatar: null,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        reactions: [],
        isOwn: true
      };

      setMessages(prev => ({
        ...prev,
        [selectedChannel]: [...(prev[selectedChannel] || []), newMessage]
      }));

      setMessage('');
      setIsTyping(false);
    }
  }, [message, selectedChannel, currentMessages.length]);

  const addReaction = useCallback((messageId, emoji) => {
    setMessages(prev => ({
      ...prev,
      [selectedChannel]: prev[selectedChannel].map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count + 1, users: [...r.users, 'Vous'] }
                  : r
              )
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, count: 1, users: ['Vous'] }]
            };
          }
        }
        return msg;
      })
    }));
  }, [selectedChannel]);

  return {
    channels,
    selectedChannel,
    setSelectedChannel,
    messages: currentMessages,
    currentChannel,
    message,
    setMessage,
    isTyping,
    setIsTyping,
    messagesEndRef,
    handleSendMessage,
    addReaction
  };
};