// src/pages/CanauxPage/components/FluxSocial/FluxSocial.jsx
import React from 'react';
import SocialFilters from './SocialFilters';
import SocialFeedPost from './SocialFeedPost';

const FluxSocial = ({ 
  feed, 
  selectedFilter, 
  setSelectedFilter, 
  filters, 
  handleLike, 
  handleShare, 
  handleBookmark, 
  handleFollow 
}) => {
  return (
    <div className="space-y-6">
      <SocialFilters 
        filters={filters}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="space-y-6">
        {feed.map((post) => (
          <SocialFeedPost 
            key={post.id}
            post={post}
            onLike={handleLike}
            onShare={handleShare}
            onBookmark={handleBookmark}
            onFollow={handleFollow}
          />
        ))}
      </div>
    </div>
  );
};

export default FluxSocial;