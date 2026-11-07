import React from 'react';
import { Search, X, SlidersHorizontal, Fuel, Zap, Sparkles } from 'lucide-react';
import { Language, VehicleType } from '../types';
import { TRANSLATIONS } from '../translations';

interface SearchAndFilterBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  activeCategory: string;
  onCategorySelect: (cat: string) => void;
  sortBy: 'price' | 'eta' | 'rating';
  onSortChange: (sort: 'price' | 'eta' | 'rating') => void;
  totalResults: number;
  language: Language;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchText,
  onSearchChange,
  activeCategory,
  onCategorySelect,
  sortBy,
  onSortChange,
  totalResults,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const categories = [
    { id: '', label: t.allVehicles, sub: 'All' },
    { id: 'CNG', label: 'CNG', sub: '₹14/km' },
    { id: 'Car', label: 'Car', sub: '₹18/km' },
    { id: 'Bike', label: 'Bike', sub: '₹8/km' },
    { id: 'Auto', label: 'Auto', sub: '₹12/km' },
    { id: 'EV', label: 'EV Green', sub: '₹15/km' },
    { id: 'Sedan', label: 'Sedan', sub: '₹22/km' },
    { id: 'SUV', label: 'SUV', sub: '₹28/km' },
  ];

  const quickPicks = [
    'CNG',
    'Car',
    'Bike',
    'Auto',
    'WagonR',
    'Swift',
    'Splendor',
    'Ertiga',
  ];

  return (
    <div id="search-section" className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header line with logic note */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{language === 'hi' ? 'सब गाड़ी वाला सर्च इंजन' : language === 'hinglish' ? 'Sab Gaadi Wala Search' : 'Smart Ride Search'}</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                ({totalResults} {language === 'hi' ? 'गाड़ियां उपलब्ध' : language === 'hinglish' ? 'Gaadiyan Available' : 'drivers ready'})
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.searchHint}
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {language === 'hi' ? 'क्रम:' : language === 'hinglish' ? 'Sort By:' : 'Sort:'}
            </span>
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => onSortChange('price')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  sortBy === 'price'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {language === 'hi' ? 'कम किराया (₹)' : language === 'hinglish' ? 'Kam Kiraya' : 'Lowest Fare'}
              </button>
              <button
                onClick={() => onSortChange('eta')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  sortBy === 'eta'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {language === 'hi' ? 'जल्दी पहुंचे (ETA)' : language === 'hinglish' ? 'Jaldi Pickup' : 'Fastest ETA'}
              </button>
              <button
                onClick={() => onSortChange('rating')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  sortBy === 'rating'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {language === 'hi' ? 'टॉप रेटिंग ★' : language === 'hinglish' ? 'Top Rated ★' : 'Top Rated ★'}
              </button>
            </div>
          </div>
        </div>

        {/* Big Search Input with Instant Affordance */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-24 py-3.5 text-sm sm:text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xs"
          />
          {searchText && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-10 pr-2 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded">
              Search
            </kbd>
          </div>
        </div>

        {/* Quick Click Filter Pills / Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id || 'all'}
                onClick={() => onCategorySelect(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {cat.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick prompt keywords */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto">
          <span className="shrink-0 font-medium">{language === 'hi' ? 'जल्दी खोजें:' : language === 'hinglish' ? 'Quick Search:' : 'Quick Filter:'}</span>
          {quickPicks.map((pick) => (
            <button
              key={pick}
              onClick={() => onSearchChange(pick)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 underline decoration-slate-300 dark:decoration-slate-700 underline-offset-2 shrink-0 cursor-pointer"
            >
              {pick}
            </button>
          ))}
          {searchText && (
            <button
              onClick={() => { onSearchChange(''); onCategorySelect(''); }}
              className="text-amber-600 dark:text-amber-400 hover:underline shrink-0 ml-auto font-medium cursor-pointer"
            >
              {t.clearSearch}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
