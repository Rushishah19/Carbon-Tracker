import React from 'react';
import { CarbonEntry } from '../types';
import { getCategoryIcon, getCategoryColor, formatCarbonAmount } from '../utils/calculations';
import { format } from 'date-fns';
import * as Icons from 'lucide-react';

interface RecentEntriesProps {
  entries: CarbonEntry[];
}

const RecentEntries: React.FC<RecentEntriesProps> = ({ entries }) => {
  return (
    <div className="space-y-4">
      {entries.map((entry) => {
        const iconName = getCategoryIcon(entry.category) as keyof typeof Icons;
        const Icon = Icons[iconName] as React.ComponentType<{className?: string}>;
        
        return (
          <div key={entry.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${getCategoryColor(entry.category)}20` }}
            >
              <Icon 
                className="h-5 w-5" 
                style={{ color: getCategoryColor(entry.category) }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {entry.subcategory}
              </p>
              <p className="text-xs text-gray-500">
                {format(new Date(entry.date), 'MMM dd')} • {entry.amount} {entry.unit}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {formatCarbonAmount(entry.carbonFootprint)}
              </p>
            </div>
          </div>
        );
      })}
      
      <button className="w-full text-center py-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
        View All Entries
      </button>
    </div>
  );
};

export default RecentEntries;