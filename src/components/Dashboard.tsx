import React from 'react';
import StatCard from './StatCard';
import CategoryChart from './CategoryChart';
import TrendChart from './TrendChart';
import RecentEntries from './RecentEntries';
import GoalProgress from './GoalProgress';
import { TrendingDown, TrendingUp, Target, Calendar } from 'lucide-react';
import { generateMockEntries, mockMonthlyData, mockGoals } from '../data/mockData';
import { calculateCategoryTotals, calculateDailyAverage, formatCarbonAmount } from '../utils/calculations';

const Dashboard: React.FC = () => {
  const entries = generateMockEntries();
  const currentMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
  });
  
  const categoryTotals = calculateCategoryTotals(currentMonthEntries);
  const monthlyTotal = currentMonthEntries.reduce((sum, entry) => sum + entry.carbonFootprint, 0);
  const dailyAverage = calculateDailyAverage(entries);
  const weeklyTotal = entries.slice(0, 7).reduce((sum, entry) => sum + entry.carbonFootprint, 0);

  const stats = [
    {
      title: 'Monthly Total',
      value: formatCarbonAmount(monthlyTotal),
      change: -3.2,
      trend: 'down' as const,
      icon: Calendar,
      color: 'primary'
    },
    {
      title: 'Daily Average',
      value: formatCarbonAmount(dailyAverage),
      change: 2.1,
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'warning'
    },
    {
      title: 'Weekly Total',
      value: formatCarbonAmount(weeklyTotal),
      change: -5.8,
      trend: 'down' as const,
      icon: TrendingDown,
      color: 'success'
    },
    {
      title: 'Goal Progress',
      value: `${Math.round((monthlyTotal / 500) * 100)}%`,
      change: 15,
      trend: 'up' as const,
      icon: Target,
      color: 'secondary'
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Track your carbon footprint and environmental impact</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
          <CategoryChart data={categoryTotals} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
          <TrendChart data={mockMonthlyData} />
        </div>
      </div>

      {/* Goals and Recent Entries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Progress</h3>
          <GoalProgress goals={mockGoals} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
          <RecentEntries entries={entries.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;