import { CarbonEntry } from '../types';

export const calculateCategoryTotals = (entries: CarbonEntry[]) => {
  const totals = {
    transportation: 0,
    energy: 0,
    food: 0,
    waste: 0,
    consumption: 0
  };

  entries.forEach(entry => {
    totals[entry.category] += entry.carbonFootprint;
  });

  return totals;
};

export const calculateMonthlyTotal = (entries: CarbonEntry[], month: string, year: number) => {
  return entries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === parseInt(month) - 1 && entryDate.getFullYear() === year;
    })
    .reduce((total, entry) => total + entry.carbonFootprint, 0);
};

export const calculateDailyAverage = (entries: CarbonEntry[], days: number = 30) => {
  const recentEntries = entries.slice(0, days);
  const total = recentEntries.reduce((sum, entry) => sum + entry.carbonFootprint, 0);
  return total / days;
};

export const calculateTrend = (current: number, previous: number): 'up' | 'down' | 'stable' => {
  const change = ((current - previous) / previous) * 100;
  if (Math.abs(change) < 5) return 'stable';
  return change > 0 ? 'up' : 'down';
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatCarbonAmount = (amount: number, showUnit: boolean = true): string => {
  const formatted = amount < 1 
    ? (amount * 1000).toFixed(0) + (showUnit ? 'g' : '')
    : amount.toFixed(1) + (showUnit ? 'kg' : '');
  
  return showUnit ? `${formatted} CO₂` : formatted;
};

export const getCategoryColor = (category: string): string => {
  const colors = {
    transportation: '#3b82f6',
    energy: '#f59e0b',
    food: '#10b981',
    waste: '#8b5cf6',
    consumption: '#ef4444'
  };
  return colors[category as keyof typeof colors] || '#6b7280';
};

export const getCategoryIcon = (category: string): string => {
  const icons = {
    transportation: 'Car',
    energy: 'Zap',
    food: 'Apple',
    waste: 'Trash2',
    consumption: 'ShoppingBag'
  };
  return icons[category as keyof typeof icons] || 'Circle';
};