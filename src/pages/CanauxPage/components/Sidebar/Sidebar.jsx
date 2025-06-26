// src/pages/CanauxPage/components/Sidebar/Sidebar.jsx
import React from 'react';
import ActivityFeed from './ActivityFeed';
import SuggestedContent from './SuggestedContent';
import UserStats from './UserStats';
import { suggestedUsers, popularCollections, userStats, recentActivity } from '../../data/mockData';

const Sidebar = ({ activeTab }) => {
  const renderSidebarContent = () => {
    switch (activeTab) {
      case 'flux':
        return (
          <>
            <SuggestedContent 
              suggestedUsers={suggestedUsers}
              popularCollections={popularCollections}
            />
            <UserStats stats={userStats} />
          </>
        );
      case 'following':
        return (
          <>
            <ActivityFeed activities={recentActivity} />
            <UserStats stats={userStats} />
          </>
        );
      case 'collections':
        return (
          <>
            <UserStats stats={userStats} />
            <ActivityFeed activities={recentActivity} />
          </>
        );
      case 'trending':
        return (
          <>
            <SuggestedContent 
              suggestedUsers={suggestedUsers}
              popularCollections={popularCollections}
            />
            <ActivityFeed activities={recentActivity} />
          </>
        );
      default:
        return (
          <>
            <SuggestedContent 
              suggestedUsers={suggestedUsers}
              popularCollections={popularCollections}
            />
            <UserStats stats={userStats} />
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderSidebarContent()}
    </div>
  );
};

export default Sidebar;