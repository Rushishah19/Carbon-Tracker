export interface CarbonEntry {
  id: string;
  date: string;
  category: 'transportation' | 'energy' | 'food' | 'waste' | 'consumption';
  subcategory: string;
  amount: number;
  unit: string;
  carbonFootprint: number; // in kg CO2
  description?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  monthlyGoal: number; // kg CO2
  yearlyGoal: number; // kg CO2
  preferences: {
    units: 'metric' | 'imperial';
    notifications: boolean;
    privacy: 'public' | 'private';
  };
}

export interface CategoryData {
  name: string;
  icon: string;
  color: string;
  total: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface MonthlyData {
  month: string;
  total: number;
  transportation: number;
  energy: number;
  food: number;
  waste: number;
  consumption: number;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: string;
  status: 'active' | 'completed' | 'overdue';
}