import React from 'react';
import { Phone, Star, ShieldCheck, Clock, Users, Wind, CheckCircle2, Navigation } from 'lucide-react';
import { Driver, Language } from '../types';
import { calculateFare } from '../utils/engine';
import { TRANSLATIONS } from '../translations';

interface DriverCardProps {
  driver: Driver;
  distanceKm: number;
  isSelected: boolean;
  onSelect: () => void;
  onBook: (driver: Driver) => void;
  onCall: (driver: Driver) => void;
  language: Language;
}

export const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  distanceKm,
  isSelected,
  onSelect,
  onBook,
  onCall,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const totalFare = calculateFare(distanceKm, driver.pricePerKm);

  // Vehicle fuel/type color accent
  const badgeStyle = 
    driver.vehicleType === 'CNG'
      ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
      : driver.vehicleType === 'Bike'
      ? 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
      : driver.vehicleType === 'Auto'
      ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800'
      : driver.vehicleType === 'EV'
      ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800'
      : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer group ${
        isSelected
          ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
      }`}
    >
      {/* Top Media / Header with Vehicle Preview */}
      <div className="relative h-36 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {driver.vehicleImageUrl ? (
          <img
            src={driver.vehicleImageUrl}
            alt={driver.carName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-400">
            <span className="text-3xl font-bold">{driver.vehicleType}</span>
          </div>
        )}

        {/* Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

        {/* Top Floating Rate & Category */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
          <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] border shadow-xs ${badgeStyle}`}>
            {driver.vehicleType} · {driver.fuelType}
          </span>

          <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[11px] bg-black/70 text-white backdrop-blur-xs border border-white/20">
            ₹{driver.pricePerKm}/km
          </span>
        </div>

        {/* Bottom image overlay details: Car Name & Plate */}
        <div className="absolute bottom-2 left-3 right-3 text-white">
          <h3 className="font-bold text-sm sm:text-base leading-tight drop-shadow-xs truncate">
            {driver.carName}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-slate-200 drop-shadow-xs">
            <span className="font-mono bg-white/20 px-1.5 py-0.2 rounded text-[10px] uppercase">
              {driver.plateNumber}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" /> {driver.etaMinutes} mins away
            </span>
          </div>
        </div>
      </div>

      {/* Driver info & attributes */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Driver Name & Rating */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <span>{driver.driverName}</span>
                <span title="Verified Driver" className="inline-flex">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                {driver.locationName}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{driver.rating}</span>
              <span className="text-slate-400 text-[10px] font-normal">({driver.totalRides})</span>
            </div>
          </div>

          {/* Quick vehicle specs */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 py-2 border-y border-slate-100 dark:border-slate-800 my-2">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{driver.seatingCapacity} {driver.seatingCapacity === 1 ? 'seat' : 'seats'}</span>
            </div>
            {driver.ac && (
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Wind className="w-3.5 h-3.5" />
                <span>AC Cab</span>
              </div>
            )}
            <div className="text-[11px] text-slate-400 truncate ml-auto">
              {driver.languages.join(', ')}
            </div>
          </div>

          {/* Bio snippet */}
          {driver.bio && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 italic mb-3">
              "{driver.bio}"
            </p>
          )}
        </div>

        {/* Calculated Fare Box & Action Buttons */}
        <div className="pt-2">
          
          {/* Fare display: calculateFare(distanceKm, driver.pricePerKm) */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3 mb-3 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {language === 'hi' ? 'कुल किराया (सीधा ड्राइवर को)' : language === 'hinglish' ? 'Kul Kiraya (Direct Driver)' : 'Calculated Fare'}
              </span>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                ₹{driver.pricePerKm}/km × {distanceKm} km
              </div>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold block">
                ✓ Driver-Decided 1 KM Rate
              </span>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                ₹{totalFare}
              </div>
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                0% Commission Cut
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCall(driver);
              }}
              className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'hi' ? 'कॉल करें' : language === 'hinglish' ? 'Call Driver' : 'Call'}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBook(driver);
              }}
              className="px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>{t.bookNow}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
