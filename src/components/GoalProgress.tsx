import React from 'react';
import { Goal } from '../types';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface GoalProgressProps {
  goals: Goal[];
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goals }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (status: string, percentage: number) => {
    if (status === 'completed') return 'bg-green-500';
    if (status === 'overdue') return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-primary-500';
  };

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const percentage = getProgressPercentage(goal.current, goal.target);
        
        return (
          <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                <p className="text-xs text-gray-500 capitalize">{goal.category}</p>
              </div>
              {getStatusIcon(goal.status)}
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>{goal.current} {goal.unit}</span>
                <span>{goal.target} {goal.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.status, percentage)}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">{percentage.toFixed(0)}% complete</span>
              <span className="text-gray-500">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
      
      <button className="w-full text-center py-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors border border-primary-200 rounded-lg hover:bg-primary-50">
        + Add New Goal
      </button>
    </div>
  );
};

export default GoalProgress;