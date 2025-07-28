import { CarbonEntry, UserProfile, MonthlyData, Goal } from '../types';
import { subDays, format } from 'date-fns';

export const mockUser: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  location: 'Sydney, Australia',
  monthlyGoal: 500,
  yearlyGoal: 6000,
  preferences: {
    units: 'metric',
    notifications: true,
    privacy: 'private'
  }
};

export const generateMockEntries = (): CarbonEntry[] => {
  const entries: CarbonEntry[] = [];
  const categories = ['transportation', 'energy', 'food', 'waste', 'consumption'] as const;
  
  for (let i = 0; i < 90; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    let subcategory = '';
    let amount = 0;
    let unit = '';
    let carbonFootprint = 0;
    
    switch (category) {
      case 'transportation':
        const transportTypes = [
          { sub: 'Car (Petrol)', amount: () => Math.random() * 50 + 10, unit: 'km', factor: 0.17 },
          { sub: 'Public Transport', amount: () => Math.random() * 30 + 5, unit: 'km', factor: 0.05 },
          { sub: 'Flight (Domestic)', amount: () => Math.random() * 500 + 100, unit: 'km', factor: 0.25 },
          { sub: 'Cycling', amount: () => Math.random() * 20 + 5, unit: 'km', factor: 0 }
        ];
        const transport = transportTypes[Math.floor(Math.random() * transportTypes.length)];
        subcategory = transport.sub;
        amount = Math.round(transport.amount() * 10) / 10;
        unit = transport.unit;
        carbonFootprint = Math.round(amount * transport.factor * 100) / 100;
        break;
        
      case 'energy':
        const energyTypes = [
          { sub: 'Electricity', amount: () => Math.random() * 20 + 5, unit: 'kWh', factor: 0.5 },
          { sub: 'Natural Gas', amount: () => Math.random() * 15 + 3, unit: 'kWh', factor: 0.2 },
          { sub: 'Heating Oil', amount: () => Math.random() * 10 + 2, unit: 'L', factor: 2.5 }
        ];
        const energy = energyTypes[Math.floor(Math.random() * energyTypes.length)];
        subcategory = energy.sub;
        amount = Math.round(energy.amount() * 10) / 10;
        unit = energy.unit;
        carbonFootprint = Math.round(amount * energy.factor * 100) / 100;
        break;
        
      case 'food':
        const foodTypes = [
          { sub: 'Beef', amount: () => Math.random() * 0.5 + 0.1, unit: 'kg', factor: 27 },
          { sub: 'Chicken', amount: () => Math.random() * 0.3 + 0.1, unit: 'kg', factor: 6.9 },
          { sub: 'Vegetables', amount: () => Math.random() * 1 + 0.5, unit: 'kg', factor: 2 },
          { sub: 'Dairy', amount: () => Math.random() * 0.5 + 0.2, unit: 'kg', factor: 3.2 }
        ];
        const food = foodTypes[Math.floor(Math.random() * foodTypes.length)];
        subcategory = food.sub;
        amount = Math.round(food.amount() * 100) / 100;
        unit = food.unit;
        carbonFootprint = Math.round(amount * food.factor * 100) / 100;
        break;
        
      case 'waste':
        const wasteTypes = [
          { sub: 'General Waste', amount: () => Math.random() * 5 + 1, unit: 'kg', factor: 0.5 },
          { sub: 'Recycling', amount: () => Math.random() * 3 + 0.5, unit: 'kg', factor: 0.1 },
          { sub: 'Organic Waste', amount: () => Math.random() * 2 + 0.5, unit: 'kg', factor: 0.3 }
        ];
        const waste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
        subcategory = waste.sub;
        amount = Math.round(waste.amount() * 100) / 100;
        unit = waste.unit;
        carbonFootprint = Math.round(amount * waste.factor * 100) / 100;
        break;
        
      case 'consumption':
        const consumptionTypes = [
          { sub: 'Clothing', amount: () => Math.random() * 2 + 0.5, unit: 'items', factor: 10 },
          { sub: 'Electronics', amount: () => Math.random() * 0.5 + 0.1, unit: 'items', factor: 50 },
          { sub: 'Books/Media', amount: () => Math.random() * 1 + 0.2, unit: 'items', factor: 2 }
        ];
        const consumption = consumptionTypes[Math.floor(Math.random() * consumptionTypes.length)];
        subcategory = consumption.sub;
        amount = Math.round(consumption.amount() * 100) / 100;
        unit = consumption.unit;
        carbonFootprint = Math.round(amount * consumption.factor * 100) / 100;
        break;
    }
    
    entries.push({
      id: `entry-${i}`,
      date,
      category,
      subcategory,
      amount,
      unit,
      carbonFootprint,
      description: Math.random() > 0.7 ? 'Daily commute to work' : undefined
    });
  }
  
  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Jan', total: 520, transportation: 180, energy: 120, food: 150, waste: 30, consumption: 40 },
  { month: 'Feb', total: 480, transportation: 160, energy: 110, food: 140, waste: 35, consumption: 35 },
  { month: 'Mar', total: 545, transportation: 190, energy: 125, food: 160, waste: 32, consumption: 38 },
  { month: 'Apr', total: 510, transportation: 175, energy: 115, food: 145, waste: 40, consumption: 35 },
  { month: 'May', total: 495, transportation: 170, energy: 105, food: 155, waste: 30, consumption: 35 },
  { month: 'Jun', total: 525, transportation: 185, energy: 120, food: 150, waste: 35, consumption: 35 },
  { month: 'Jul', total: 540, transportation: 195, energy: 115, food: 160, waste: 35, consumption: 35 },
  { month: 'Aug', total: 515, transportation: 180, energy: 110, food: 155, waste: 35, consumption: 35 },
  { month: 'Sep', total: 500, transportation: 175, energy: 105, food: 150, waste: 35, consumption: 35 },
  { month: 'Oct', total: 485, transportation: 165, energy: 100, food: 145, waste: 40, consumption: 35 },
  { month: 'Nov', total: 470, transportation: 155, energy: 95, food: 140, waste: 45, consumption: 35 },
  { month: 'Dec', total: 455, transportation: 150, energy: 90, food: 135, waste: 45, consumption: 35 }
];

export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Reduce Monthly Emissions',
    target: 450,
    current: 485,
    unit: 'kg CO2',
    deadline: '2024-12-31',
    category: 'overall',
    status: 'active'
  },
  {
    id: 'goal-2',
    title: 'Use Public Transport 3x/week',
    target: 12,
    current: 8,
    unit: 'trips',
    deadline: '2024-12-31',
    category: 'transportation',
    status: 'active'
  },
  {
    id: 'goal-3',
    title: 'Reduce Food Waste',
    target: 25,
    current: 35,
    unit: 'kg CO2',
    deadline: '2024-12-31',
    category: 'food',
    status: 'active'
  },
  {
    id: 'goal-4',
    title: 'Energy Efficiency',
    target: 100,
    current: 95,
    unit: 'kg CO2',
    deadline: '2024-12-31',
    category: 'energy',
    status: 'completed'
  }
];