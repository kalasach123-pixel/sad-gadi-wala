import React from 'react';
import { Car, ShieldCheck, Heart, Fuel } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface FooterProps {
  language: Language;
  onScrollTo: (id: string) => void;
  onOpenDriverRegistration: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onScrollTo,
  onOpenDriverRegistration,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <div className="w-7 h-7 rounded bg-emerald-600 text-white flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <span>{t.brandName}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              {language === 'hi'
                ? 'सीधा चालक नेटवर्क। बिना किसी कमीशन या छुपे हुए सर्ज के ईमानदार किराया।'
                : language === 'hinglish'
                ? 'Direct Indian Driver Discovery. 0% Middleman Cut. Kiraya Ab Bhi Driver Ka Hi Hai.'
                : 'Direct Indian mobility network connecting riders with verified drivers at honest per-km rates.'}
            </p>
            <div className="text-emerald-400 font-semibold text-xs">
              CNG: ₹14/km · Car: ₹18/km · Bike: ₹8/km
            </div>
          </div>

          {/* Quick Vehicle Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Vehicle Categories</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollTo('search-section')} className="hover:text-white transition-colors cursor-pointer">
                  CNG Cabs (₹14/km)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('search-section')} className="hover:text-white transition-colors cursor-pointer">
                  Cars & Hatchbacks (₹18/km)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('search-section')} className="hover:text-white transition-colors cursor-pointer">
                  Bikes & Two-Wheelers (₹8/km)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('search-section')} className="hover:text-white transition-colors cursor-pointer">
                  Auto Rickshaws (₹12/km)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('search-section')} className="hover:text-white transition-colors cursor-pointer">
                  Electric Vehicles (EV)
                </button>
              </li>
            </ul>
          </div>

          {/* Fare Transparency */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Fare Transparency</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollTo('fare-matrix')} className="hover:text-white transition-colors cursor-pointer">
                  Rate Calculation Formula
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('philosophy')} className="hover:text-white transition-colors cursor-pointer">
                  0% Commission Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('route-section')} className="hover:text-white transition-colors cursor-pointer">
                  Live Distance Map
                </button>
              </li>
              <li>
                <button onClick={onOpenDriverRegistration} className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold cursor-pointer">
                  + {t.driverRegistration} (Driver Onboarding)
                </button>
              </li>
            </ul>
          </div>

          {/* Service Cities */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Operating Cities</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Delhi NCR, Mumbai Metropolitan, Bengaluru Urban, Hyderabad, Pune, Ahmedabad, Lucknow & Jaipur.
            </p>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct Peer-to-Peer Driver Network</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Sab Gaadi Wala. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built for Indian Urban Mobility with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>Honest Fare Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
