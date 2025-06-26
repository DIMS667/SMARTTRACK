// src/pages/SourcesPage/components/HashtagFlux/utils/contentTypeUtils.js
import { FileText } from 'lucide-react';
import { contentTypes } from '../constants';

export const getContentTypeIcon = (contentType) => {
  const type = contentTypes.find(t => t.id === contentType);
  return type ? type.icon : FileText;
};

export const getContentTypeColor = (contentType) => {
  const type = contentTypes.find(t => t.id === contentType);
  return type ? type.color : 'from-gray-500 to-gray-600';
};

export const getContentTypeName = (contentType) => {
  const type = contentTypes.find(t => t.id === contentType);
  return type ? type.name : 'Article';
};

export const getContentInfo = (article) => {
  switch (article.contentType) {
    case 'video':
      return { label: 'Durée', value: article.duration };
    case 'audio':
      return { label: 'Durée', value: article.duration };
    case 'document':
      return { label: 'Taille', value: article.fileSize };
    case 'post':
      return { label: 'Plateforme', value: article.platform };
    case 'image':
      return { label: 'Résolution', value: article.resolution };
    case 'link':
      return { label: 'Domaine', value: article.domain };
    case 'article':
    default:
      return { label: 'Lecture', value: article.readTime };
  }
};