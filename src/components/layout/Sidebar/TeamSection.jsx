import React from 'react';
import { Plus } from 'lucide-react';
import Avatar from '@/components/common/Avatar';

const teamMembers = [
  { id: 1, name: 'Alice Martin', avatar: null, online: true },
  { id: 2, name: 'Bob Durand', avatar: null, online: false },
  { id: 3, name: 'Claire Rousseau', avatar: null, online: true },
  { id: 4, name: 'David Moreau', avatar: null, online: false },
  { id: 5, name: 'Emma Laurent', avatar: null, online: true },
];

function TeamSection() {
  return (
    <div className="px-4 py-4 border-t border-white border-opacity-20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-white text-opacity-90 uppercase tracking-wide">
          Équipe SMARTTRACK
        </h3>
        <button className="p-1 text-white text-opacity-60 hover:text-white hover:bg-white hover:bg-opacity-10 rounded transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2">
        {teamMembers.slice(0, 4).map((member) => (
          <div key={member.id} className="flex items-center space-x-3 p-2 text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-md cursor-pointer transition-colors">
            <div className="relative">
              <Avatar size="sm" alt={member.name} />
              <div className={`absolute -bottom-0 -right-0 w-3 h-3 border-2 border-white rounded-full ${
                member.online ? 'bg-green-400' : 'bg-gray-400'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {member.name.split(' ')[0]}
              </p>
            </div>
          </div>
        ))}
        
        {teamMembers.length > 4 && (
          <button className="w-full flex items-center justify-center py-2 text-xs text-white text-opacity-60 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
            +{teamMembers.length - 4} autres membres
          </button>
        )}
      </div>
    </div>
  );
}

export default TeamSection;