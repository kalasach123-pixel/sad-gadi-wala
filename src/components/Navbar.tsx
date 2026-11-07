import React from 'react';
import { Car, UserCheck, Moon, Sun, Globe, User, ShieldCheck } from 'lucide-react';
import { Customer, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  customer: Customer;
  onOpenCustomerProfile: () => void;
  onOpenDriverRegistration: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  customer,
  onOpenCustomerProfile,
  onOpenDriverRegistration,
  onScrollTo,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark brand */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); onScrollTo('top'); }}
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Car className="w-5 h-5" />
          </div>
          <span>{t.brandName}</span>
        </a>

        {/* Zone 2: 4 single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => onScrollTo('search-section')} 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {language === 'hi' ? 'गाड़ी खोजें' : language === 'hinglish' ? 'Gaadi Dhoondo' : 'Find Rides'}
          </button>
          <button 
            onClick={() => onScrollTo('route-section')} 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {language === 'hi' ? 'रूट व दूरी' : language === 'hinglish' ? 'Route & Doori' : 'Route & Distance'}
          </button>
          <button 
            onClick={() => onScrollTo('fare-matrix')} 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {language === 'hi' ? 'किराया चार्ट' : language === 'hinglish' ? 'Kiraya Chart' : 'Fare Rates'}
          </button>
          <button 
            onClick={() => onScrollTo('philosophy')} 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {language === 'hi' ? 'सीधा किराया' : language === 'hinglish' ? '0% Commission' : 'Direct Fare Policy'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + utility controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Customer ID Badge (Pehle Customer ID bane) */}
          <button
            onClick={onOpenCustomerProfile}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            title="View or edit Customer Profile"
          >
            <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{customer.id}</span>
            <span className="text-slate-400">·</span>
            <span className="truncate max-w-[80px]">{customer.name.split(' ')[0]}</span>
          </button>

          {/* Language selector */}
          <div className="relative inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-xs font-medium text-slate-700 dark:text-slate-300">
            <Globe className="w-3.5 h-3.5 ml-1 mr-1 text-slate-400 shrink-0" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent border-none py-1 pr-1 pl-0.5 focus:outline-none cursor-pointer text-xs font-semibold"
              aria-label="Select language"
            >
              <option value="hinglish" className="bg-white dark:bg-slate-800">Hinglish</option>
              <option value="hi" className="bg-white dark:bg-slate-800">हिंदी</option>
              <option value="en" className="bg-white dark:bg-slate-800">English</option>
            </select>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* USER REQUIREMENT: 'gadi add ki jaga pe driver rajitrtion ka botton karo' */}
          <button
            onClick={onOpenDriverRegistration}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t.driverRegistration}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
