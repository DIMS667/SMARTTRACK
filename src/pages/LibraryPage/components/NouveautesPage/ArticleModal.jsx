// //ArticleModal.jsx
// import React from 'react';
// import ModalHeader from './modal/ModalHeader';
// import ModalToolbar from './modal/ModalToolbar';
// import ModalContent from './modal/ModalContent';

// const ArticleModal = ({ 
//   article, 
//   isOpen, 
//   onClose, 
//   onToggleFavorite, 
//   formatDate,
//   articleNote,
//   onNoteChange
// }) => {
//   if (!isOpen || !article) return null;

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       {/* Overlay */}
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
//         onClick={handleOverlayClick}
//       />
      
//       {/* Modal */}
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all">
//           {/* Header du modal */}
//           <div className="relative">
//             <ModalHeader 
//               article={article}
//               onToggleFavorite={onToggleFavorite}
//               onClose={onClose}
//             />
            
//             {/* Barre d'actions du modal */}
//             <ModalToolbar 
//               articleNote={articleNote}
//               onNoteChange={onNoteChange}
//             />
//           </div>
          
//           {/* Contenu de l'article */}
//           <ModalContent 
//             article={article}
//             formatDate={formatDate}
//             articleNote={articleNote}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticleModal;

//ArticleModal.jsx
import React from 'react';
import ModalHeader from './modal/ModalHeader';
import ModalToolbar from './modal/ModalToolbar';
import ModalContent from './modal/ModalContent';

const ArticleModal = ({ 
  article, 
  isOpen, 
  onClose, 
  onToggleFavorite, 
  formatDate,
  articleNote,
  onNoteChange
}) => {
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
            />
          </div>
          
          {/* Contenu de l'article */}
          <ModalContent 
            article={article}
            formatDate={formatDate}
            articleNote={articleNote}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;