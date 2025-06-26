import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import { 
  ArrowLeft, 
  Trash2, 
  Reply, 
  Forward, 
  ExternalLink,
  Eye,
  Calendar,
  Mail,
  Download,
  Printer,
  Flag
} from 'lucide-react';

const NewsletterReader = ({ newsletter, selectedEmail, onBack, onMarkAsRead, onDelete }) => {
  const [isRead, setIsRead] = useState(selectedEmail?.readAt !== null);

  useEffect(() => {
    // Marquer automatiquement comme lu quand on ouvre l'email
    if (!isRead) {
      setIsRead(true);
      setTimeout(() => {
        onMarkAsRead(selectedEmail.id);
      }, 1000); // Délai de 1 seconde comme Gmail
    }
  }, [selectedEmail.id]);

  const handleStar = () => {
    setIsStarred(!isStarred);
    // Ici vous pourriez appeler une fonction pour sauvegarder l'état
  };

  const handleArchive = () => {
    onArchive(selectedEmail.id);
    onBack();
  };

  const handleDelete = () => {
    if (window.confirm('Supprimer cet email ?')) {
      onDelete(selectedEmail.id);
      onBack();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenInNewTab = () => {
    // Créer une nouvelle fenêtre avec le contenu de la newsletter
    const newWindow = window.open('', '_blank');
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${selectedEmail.title} - ${newsletter.name}</title>
          <meta charset="utf-8">
          <style>
            body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          ${getNewsletterContent()}
        </body>
      </html>
    `;
    newWindow.document.write(content);
    newWindow.document.close();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Contenu HTML simulé pour la newsletter
  const getNewsletterContent = () => {
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
        <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">${newsletter.name}</h1>
          <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Édition du ${formatDate(selectedEmail.publishedAt)}</p>
        </header>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #2d3748; margin-top: 0; font-size: 24px;">${selectedEmail.title}</h2>
          
          <div style="background: #f7fafc; border-left: 4px solid #4299e1; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-style: italic; color: #4a5568;">
              ${selectedEmail.summary}
            </p>
          </div>
          
          <div style="margin: 30px 0;">
            <h3 style="color: #2d3748; font-size: 20px; margin-bottom: 15px;">🚀 Points clés de cette édition</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="background: #edf2f7; margin: 10px 0; padding: 15px; border-radius: 6px; border-left: 3px solid #48bb78;">
                ✅ <strong>Nouvelle fonctionnalité :</strong> Découverte d'une innovation majeure dans le domaine
              </li>
              <li style="background: #edf2f7; margin: 10px 0; padding: 15px; border-radius: 6px; border-left: 3px solid #ed8936;">
                📊 <strong>Statistiques :</strong> Les derniers chiffres qui marquent le secteur
              </li>
              <li style="background: #edf2f7; margin: 10px 0; padding: 15px; border-radius: 6px; border-left: 3px solid #9f7aea;">
                💡 <strong>Conseil expert :</strong> Recommandations de notre équipe éditoriale
              </li>
            </ul>
          </div>
          
          <div style="margin: 30px 0;">
            <h3 style="color: #2d3748; font-size: 20px; margin-bottom: 15px;">📖 Article principal</h3>
            <p style="text-align: justify; color: #4a5568; line-height: 1.8;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            
            <p style="text-align: justify; color: #4a5568; line-height: 1.8; margin-top: 20px;">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block; transition: transform 0.2s;">
                Lire l'article complet →
              </a>
            </div>
          </div>
          
          <div style="margin: 30px 0;">
            <h3 style="color: #2d3748; font-size: 20px; margin-bottom: 15px;">🔗 Liens utiles</h3>
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
              <ul style="margin: 0; padding-left: 20px; color: #4a5568;">
                <li style="margin-bottom: 8px;"><a href="#" style="color: #4299e1; text-decoration: none;">📚 Documentation officielle</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: #4299e1; text-decoration: none;">🎥 Tutoriel vidéo</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: #4299e1; text-decoration: none;">💬 Rejoindre la communauté</a></li>
              </ul>
            </div>
          </div>
          
          <hr style="border: none; height: 1px; background: #e2e8f0; margin: 40px 0;">
          
          <div style="text-align: center; color: #718096; font-size: 14px;">
            <p>Vous recevez cet email car vous êtes abonné à ${newsletter.name}</p>
            <p style="margin-top: 10px;">
              <a href="#" style="color: #4299e1; text-decoration: none; margin: 0 10px;">Se désabonner</a> |
              <a href="#" style="color: #4299e1; text-decoration: none; margin: 0 10px;">Préférences</a> |
              <a href="#" style="color: #4299e1; text-decoration: none; margin: 0 10px;">Voir en ligne</a>
            </p>
            <p style="margin-top: 15px; font-size: 12px;">
              © 2025 ${newsletter.publisher}. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    `;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Toolbar comme Gmail */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              className="p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Supprimer"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Imprimer"
          >
            <Printer className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleOpenInNewTab}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Ouvrir dans un nouvel onglet"
          >
            <ExternalLink className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* En-tête de l'email */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white pr-4">
            {selectedEmail.title}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(selectedEmail.publishedAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {newsletter.logo ? (
              <img
                src={newsletter.logo}
                alt={newsletter.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {newsletter.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                via {newsletter.email}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{isRead ? 'Lu' : 'Non lu'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu de la newsletter */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-6">
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            dangerouslySetInnerHTML={{ 
              __html: getNewsletterContent() 
            }}
          />
        </div>
      </div>

      {/* Barre d'actions en bas */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Reply className="h-4 w-4 mr-2" />
              Répondre
            </Button>
            <Button variant="outline" size="sm">
              <Forward className="h-4 w-4 mr-2" />
              Transférer
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-2" />
              Signaler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterReader;