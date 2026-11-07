import React from 'react';
import { ArrowDown, ShieldCheck, Zap, DollarSign } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeroSectionProps {
  language: Language;
  onExploreClick: () => void;
  onCalculateClick: () => void;
  onOpenDriverRegistration: () => void;
  totalDriversCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreClick,
  onCalculateClick,
  onOpenDriverRegistration,
  totalDriversCount,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="top" className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Clean unboxed editorial kicker - Zero pill discipline */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 tracking-wide">
              <span>DRIVER DECIDES 1 KM RATE</span>
              <span aria-hidden="true">·</span>
              <span>OLA/UBER KYC REGISTRATION</span>
              <span aria-hidden="true">·</span>
              <span>0% MIDDLEMAN CUT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance mb-4">
              {language === 'hi' ? (
                <>
                  ड्राइवर ही तय करे <span className="text-emerald-600 dark:text-emerald-400">1 KM का कितना लेना है</span>
                </>
              ) : language === 'hinglish' ? (
                <>
                  Driver Hi Tay Kare <span className="text-emerald-600 dark:text-emerald-400">1 KM Pe Kitna Lena Hai</span>
                </>
              ) : (
                <>
                  Drivers Set Their Own Rate <span className="text-emerald-600 dark:text-emerald-400">Per 1 KM</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6">
              {language === 'hi'
                ? 'कस्टमर अपनी आईडी से तुरंत गाड़ी सर्च करे। ड्राइवर अपनी गाड़ी, ऑटो या बाइक का 1 किमी किराया खुद तय करें और पूरे लाइसेंस, आरसी व वाहन फ़ोटो के साथ रजिस्टर करें।'
                : language === 'hinglish'
                ? 'App open karte hi Customer ID ban jati hai. Drivers can click "Driver Registration" to set their own rate per 1 km with Licence, RC & Auto/Car photo verification!'
                : 'Instant Customer ID creation for riders. Complete driver registration with Driving Licence, Vehicle Photo, RC verification, and driver-set custom rates.'}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                onClick={onExploreClick}
                className="px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <span>{t.searchPlaceholder.slice(0, 24)}...</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={onCalculateClick}
                className="px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {language === 'hi' ? 'किराया कैलकुलेटर' : language === 'hinglish' ? 'Kiraya Calculate Karo' : 'Calculate Fare'}
              </button>
              <button
                onClick={onOpenDriverRegistration}
                className="px-4 py-3 text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.driverRegistration} (Register as Driver)
              </button>
            </div>

            {/* Quiet 3-point trust strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">KYC & Plate Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">0% Platform Fee</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{totalDriversCount}+ Live Vehicles</span>
              </div>
            </div>

          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-[16/10]">
              <img
                src="/src/assets/images/hero_cabs_fleet_1794047433155.jpg"
                alt="City Cabs and Mobility Fleet"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-medium text-emerald-300 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Transparent Rate Standard</span>
                </div>
                <div className="text-sm font-semibold tracking-wide">
                  CNG ₹14/km · Car ₹18/km · Bike ₹8/km
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Pay directly to the driver with zero commission deduction.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
