import React from 'react';
import { 
  BarChart3, 
  Plus, 
  Target, 
  History, 
  Settings, 
  BookOpen,
  TrendingDown,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onViewChange, 
  isMobileMenuOpen, 
  onMenuToggle 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'add-entry', label: 'Add Entry', icon: Plus },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'history', label: 'History', icon: History },
    { id: 'insights', label: 'Insights', icon: TrendingDown },
    { id: 'education', label: 'Learn', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (itemId: string) => {
    onViewChange(itemId);
    if (isMobileMenuOpen) {
      onMenuToggle();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onMenuToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex justify-end p-4 md:hidden">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-4 text-white">
              <p className="text-sm font-medium">Monthly Goal</p>
              <p className="text-2xl font-bold">485/500</p>
              <p className="text-xs opacity-90">kg CO₂</p>
              <div className="mt-2 bg-white bg-opacity-20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 w-[97%]"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;