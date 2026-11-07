import React from 'react';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';
import { Driver, Language } from '../types';
import { DriverCard } from './DriverCard';
import { TRANSLATIONS } from '../translations';

interface DriverListProps {
  drivers: Driver[];
  distanceKm: number;
  selectedDriverId: string | null;
  onSelectDriver: (id: string) => void;
  onBookDriver: (driver: Driver) => void;
  onCallDriver: (driver: Driver) => void;
  onResetSearch: () => void;
  language: Language;
}

export const DriverList: React.FC<DriverListProps> = ({
  drivers,
  distanceKm,
  selectedDriverId,
  onSelectDriver,
  onBookDriver,
  onCallDriver,
  onResetSearch,
  language,
}) => {
  const t = TRANSLATIONS[language];

  if (drivers.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {language === 'hi'
              ? 'कोई गाड़ी नहीं मिली'
              : language === 'hinglish'
              ? 'Is Search Se Koi Gaadi Nahi Mili'
              : 'No Drivers Found'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {language === 'hi'
              ? 'कृपया "CNG", "Car", "Bike" या "Auto" लिखकर खोजें या सभी गाड़ियां देखने के लिए फ़िल्टर हटाएं।'
              : language === 'hinglish'
              ? 'Customer ne jo likha: "CNG", "Car", ya "Bike" search karein. Ya Reset karein sab dekhne ke liye.'
              : 'Try searching for CNG, Car, Bike, Auto, or reset your search query to see the entire fleet.'}
          </p>
          <button
            onClick={onResetSearch}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.clearSearch}</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* List Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.availableDrivers}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'hi'
              ? `दूरी: ${distanceKm} किमी · किराया सीधे चालक को देय`
              : language === 'hinglish'
              ? `Trip Distance: ${distanceKm} km · Transparent direct per-km driver rates`
              : `Calculating for ${distanceKm} km · 0% Commission Cut`}
          </p>
        </div>
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
          {drivers.length} {drivers.length === 1 ? 'vehicle' : 'vehicles'} ready
        </div>
      </div>

      {/* Grid of Drivers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <DriverCard
            key={driver.id}
            driver={driver}
            distanceKm={distanceKm}
            isSelected={selectedDriverId === driver.id}
            onSelect={() => onSelectDriver(driver.id)}
            onBook={onBookDriver}
            onCall={onCallDriver}
            language={language}
          />
        ))}
      </div>

    </section>
  );
};
