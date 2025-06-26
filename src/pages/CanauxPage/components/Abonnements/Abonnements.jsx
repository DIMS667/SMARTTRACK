// src/pages/CanauxPage/components/Abonnements/Abonnements.jsx
import React from 'react';
import { Users } from 'lucide-react';
import Button from '@/components/common/Button';
import ExpertiseFilters from './ExpertiseFilters';
import FollowedUserCard from './FollowedUserCard';

const Abonnements = ({ 
  users, 
  expertises, 
  selectedExpertise, 
  setSelectedExpertise, 
  handleUnfollow, 
  handleNotifyToggle 
}) => {
  return (
    <div className="space-y-6">
      <ExpertiseFilters 
        expertises={expertises}
        selectedExpertise={selectedExpertise}
        setSelectedExpertise={setSelectedExpertise}
        filteredCount={users.length}
      />

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Activité de vos abonnements
        </h3>
        {users.length > 0 ? (
          users.map((user) => (
            <FollowedUserCard 
              key={user.id}
              user={user}
              expertises={expertises}
              onUnfollow={handleUnfollow}
              onNotifyToggle={handleNotifyToggle}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucun expert dans cette catégorie
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Explorez d'autres expertises ou découvrez de nouveaux experts à suivre.
            </p>
            <Button onClick={() => setSelectedExpertise('all')}>
              Voir tous les experts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Abonnements;