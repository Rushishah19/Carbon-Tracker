import React, { useState } from 'react';
import { Target, Plus, Edit2, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { mockGoals } from '../data/mockData';
import { Goal } from '../types';

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
    <div className="p-6 animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Goals</h2>
          <p className="text-gray-600">Set and track your carbon reduction goals</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const percentage = getProgressPercentage(goal.current, goal.target);
          
          return (
            <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 animate-scale-in">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                    {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(goal.status)}
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{goal.current} / {goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(goal.status, percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{percentage.toFixed(0)}% complete</span>
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600 capitalize">
                <span className="font-medium">Category:</span> {goal.category}
              </div>
            </div>
          );
        })}

        {/* Add Goal Card */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 flex items-center justify-center hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 cursor-pointer min-h-[200px]">
          <div className="text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Add New Goal</h3>
            <p className="text-sm text-gray-500">Set a new carbon reduction target</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{goals.filter(g => g.status === 'completed').length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{goals.filter(g => g.status === 'active').length}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{goals.filter(g => g.status === 'overdue').length}</p>
            <p className="text-sm text-gray-600">Overdue</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">
              {Math.round(goals.reduce((acc, goal) => acc + getProgressPercentage(goal.current, goal.target), 0) / goals.length)}%
            </p>
            <p className="text-sm text-gray-600">Avg. Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;