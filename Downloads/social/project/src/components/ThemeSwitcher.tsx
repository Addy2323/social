import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, ChevronDown } from 'lucide-react';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, currency, setCurrency } = useTheme();
  
  return (
    <div className="flex items-center space-x-4">
      {/* Currency Selector */}
      <div className="relative group">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as 'USD' | 'TZS')}
          className="appearance-none bg-slate-700 text-white pl-3 pr-8 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
        >
          <option value="USD">USD</option>
          <option value="TZS">TZS</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
      
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-slate-700 transition-colors"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600" />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
