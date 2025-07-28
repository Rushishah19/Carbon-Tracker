import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { getCategoryColor, getCategoryIcon } from '../utils/calculations';
import * as Icons from 'lucide-react';

const AddEntry: React.FC = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    subcategory: '',
    amount: '',
    unit: '',
    description: ''
  });

  const categories = [
    { id: 'transportation', name: 'Transportation', icon: 'Car' },
    { id: 'energy', name: 'Energy', icon: 'Zap' },
    { id: 'food', name: 'Food', icon: 'Apple' },
    { id: 'waste', name: 'Waste', icon: 'Trash2' },
    { id: 'consumption', name: 'Consumption', icon: 'ShoppingBag' }
  ];

  const subcategoryOptions = {
    transportation: [
      { name: 'Car (Petrol)', unit: 'km' },
      { name: 'Car (Diesel)', unit: 'km' },
      { name: 'Car (Electric)', unit: 'km' },
      { name: 'Public Transport', unit: 'km' },
      { name: 'Flight (Domestic)', unit: 'km' },
      { name: 'Flight (International)', unit: 'km' },
      { name: 'Cycling', unit: 'km' },
      { name: 'Walking', unit: 'km' }
    ],
    energy: [
      { name: 'Electricity', unit: 'kWh' },
      { name: 'Natural Gas', unit: 'kWh' },
      { name: 'Heating Oil', unit: 'L' },
      { name: 'Solar Power', unit: 'kWh' }
    ],
    food: [
      { name: 'Beef', unit: 'kg' },
      { name: 'Chicken', unit: 'kg' },
      { name: 'Pork', unit: 'kg' },
      { name: 'Fish', unit: 'kg' },
      { name: 'Vegetables', unit: 'kg' },
      { name: 'Dairy', unit: 'kg' },
      { name: 'Grains', unit: 'kg' }
    ],
    waste: [
      { name: 'General Waste', unit: 'kg' },
      { name: 'Recycling', unit: 'kg' },
      { name: 'Organic Waste', unit: 'kg' },
      { name: 'E-waste', unit: 'kg' }
    ],
    consumption: [
      { name: 'Clothing', unit: 'items' },
      { name: 'Electronics', unit: 'items' },
      { name: 'Books/Media', unit: 'items' },
      { name: 'Furniture', unit: 'items' }
    ]
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData({
      ...formData,
      category: categoryId,
      subcategory: '',
      unit: ''
    });
  };

  const handleSubcategorySelect = (subcategory: string, unit: string) => {
    setFormData({
      ...formData,
      subcategory,
      unit
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically save the entry
    alert('Entry added successfully!');
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      subcategory: '',
      amount: '',
      unit: '',
      description: ''
    });
  };

  const getCurrentSubcategories = () => {
    return formData.category ? subcategoryOptions[formData.category as keyof typeof subcategoryOptions] || [] : [];
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Entry</h2>
          <p className="text-gray-600">Record your carbon footprint activities</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category) => {
                  const iconName = category.icon as keyof typeof Icons;
                  const Icon = Icons[iconName] as React.ComponentType<{className?: string}>;
                  const isSelected = formData.category === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategorySelect(category.id)}
                      className={`
                        p-4 border-2 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2
                        ${isSelected
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700'
                        }
                      `}
                    >
                      <Icon 
                        className="h-6 w-6"
                        style={{ color: isSelected ? '#22c55e' : getCategoryColor(category.id) }}
                      />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcategory */}
            {formData.category && (
              <div className="animate-slide-in">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => {
                    const selectedOption = getCurrentSubcategories().find(opt => opt.name === e.target.value);
                    if (selectedOption) {
                      handleSubcategorySelect(selectedOption.name, selectedOption.unit);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                >
                  <option value="">Select subcategory...</option>
                  {getCurrentSubcategories().map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Amount and Unit */}
            {formData.subcategory && (
              <div className="grid grid-cols-2 gap-4 animate-slide-in">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add any additional notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium transition-colors flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={!formData.category || !formData.subcategory || !formData.amount}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Add Entry</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEntry;