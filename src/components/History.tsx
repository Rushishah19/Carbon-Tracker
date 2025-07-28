import React, { useState } from 'react';
import { Calendar, Filter, Download, Search } from 'lucide-react';
import { generateMockEntries } from '../data/mockData';
import { getCategoryIcon, getCategoryColor, formatCarbonAmount } from '../utils/calculations';
import { format } from 'date-fns';
import * as Icons from 'lucide-react';

const History: React.FC = () => {
  const [entries] = useState(generateMockEntries());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'transportation', name: 'Transportation' },
    { id: 'energy', name: 'Energy' },
    { id: 'food', name: 'Food' },
    { id: 'waste', name: 'Waste' },
    { id: 'consumption', name: 'Consumption' }
  ];

  const periods = [
    { id: 'all', name: 'All Time' },
    { id: 'week', name: 'Last Week' },
    { id: 'month', name: 'Last Month' },
    { id: 'quarter', name: 'Last Quarter' },
    { id: 'year', name: 'Last Year' }
  ];

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    
    // Simple period filtering (you would implement proper date logic here)
    const matchesPeriod = selectedPeriod === 'all' || true;
    
    return matchesSearch && matchesCategory && matchesPeriod;
  });

  const totalEmissions = filteredEntries.reduce((sum, entry) => sum + entry.carbonFootprint, 0);

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">History</h2>
        <p className="text-gray-600">Review your carbon footprint entries</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Period Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none"
            >
              {periods.map(period => (
                <option key={period.id} value={period.id}>{period.name}</option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{filteredEntries.length}</p>
            <p className="text-sm text-gray-600">Total Entries</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{formatCarbonAmount(totalEmissions)}</p>
            <p className="text-sm text-gray-600">Total Emissions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary-600">{formatCarbonAmount(totalEmissions / filteredEntries.length || 0)}</p>
            <p className="text-sm text-gray-600">Average per Entry</p>
          </div>
        </div>
      </div>

      {/* Entries List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Entries ({filteredEntries.length})</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredEntries.map((entry) => {
            const iconName = getCategoryIcon(entry.category) as keyof typeof Icons;
            const Icon = Icons[iconName] as React.ComponentType<{className?: string}>;
            
            return (
              <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${getCategoryColor(entry.category)}20` }}
                  >
                    <Icon 
                      className="h-6 w-6" 
                      style={{ color: getCategoryColor(entry.category) }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{entry.subcategory}</h4>
                        <p className="text-sm text-gray-500 capitalize">{entry.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCarbonAmount(entry.carbonFootprint)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {entry.amount} {entry.unit}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {format(new Date(entry.date), 'MMMM dd, yyyy')}
                      </p>
                      {entry.description && (
                        <p className="text-sm text-gray-500 italic max-w-xs truncate">
                          {entry.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredEntries.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No entries found</h3>
            <p className="text-gray-500">Try adjusting your filters or add some entries to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;