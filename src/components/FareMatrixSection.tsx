import React, { useState } from 'react';
import { DollarSign, CheckCircle2, TrendingDown, HelpCircle, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { calculateFare } from '../utils/engine';
import { TRANSLATIONS } from '../translations';

interface FareMatrixSectionProps {
  language: Language;
  onSetDistance: (km: number) => void;
  onSearchVehicle: (type: string) => void;
}

export const FareMatrixSection: React.FC<FareMatrixSectionProps> = ({
  language,
  onSetDistance,
  onSearchVehicle,
}) => {
  const t = TRANSLATIONS[language];
  const [testKm, setTestKm] = useState(15);

  const vehicleRates = [
    { type: 'Bike', name: 'Bike / Scooter', rate: 8, fuel: 'Petrol', bestFor: 'Solo rush hours & traffic' },
    { type: 'Auto', name: 'CNG Auto Rickshaw', rate: 12, fuel: 'CNG', bestFor: 'Budget quick city hops (1-3 people)' },
    { type: 'CNG', name: 'CNG Hatchback (WagonR)', rate: 14, fuel: 'CNG', bestFor: 'Super economic AC cab travel' },
    { type: 'EV', name: 'EV Green Cab', rate: 15, fuel: 'Electric', bestFor: 'Zero emissions, silent modern ride' },
    { type: 'Car', name: 'Petrol Car (Swift / Tiago)', rate: 18, fuel: 'Petrol', bestFor: 'Comfortable family & office commutes' },
    { type: 'Sedan', name: 'Comfort Sedan (Dzire / City)', rate: 22, fuel: 'CNG/Petrol', bestFor: 'Airport trips with large luggage' },
    { type: 'SUV', name: 'Spacious SUV (Ertiga / Innova)', rate: 28, fuel: 'Hybrid/CNG', bestFor: '6-7 people group trips & outstation' },
  ];

  const standardDistances = [5, 10, 20, 35, 50];

  return (
    <section id="fare-matrix" className="bg-white dark:bg-slate-900 py-12 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5" />
            <span>TRANSPARENT TARIFF STANDARD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'hi'
              ? 'किराया अब भी ड्राइवर का ही है'
              : language === 'hinglish'
              ? 'Kiraya Ab Bhi Driver Ka Hi Hai'
              : 'Direct Driver Rates — No Hidden Commissions'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {language === 'hi'
              ? 'सीएनजी वाला ₹14, कार वाला ₹18, बाइक वाला ₹8। कोई 30% कमीशन कटौती नहीं, कोई छुपा हुआ सर्ज नहीं।'
              : language === 'hinglish'
              ? 'CNG wala 14 Rs, Car wala 18 Rs, Bike wala 8 Rs. Direct driver rate × distance (KM). Pure paise driver ke.'
              : 'Standard direct per-km tariffs agreed between passenger and driver. 100% of the calculated fare stays with the driver.'}
          </p>
        </div>

        {/* Fare comparison matrix table */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs mb-8">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <th className="py-3 px-4 font-bold">Vehicle Type</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Driver Rate (₹/km)</th>
                  {standardDistances.map((km) => (
                    <th key={km} className="py-3 px-3 font-bold text-center whitespace-nowrap">
                      <button
                        onClick={() => onSetDistance(km)}
                        className="hover:text-emerald-600 dark:hover:text-emerald-400 underline decoration-dotted underline-offset-4 cursor-pointer"
                        title="Click to calculate for this distance"
                      >
                        {km} KM
                      </button>
                    </th>
                  ))}
                  <th className="py-3 px-4 font-bold text-right">Quick Filter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-700/80 text-slate-800 dark:text-slate-200">
                {vehicleRates.map((v) => (
                  <tr key={v.type} className="hover:bg-white dark:hover:bg-slate-700/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{v.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({v.fuel})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                        {v.bestFor}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      ₹{v.rate} / km
                    </td>

                    {standardDistances.map((km) => {
                      const fare = calculateFare(km, v.rate);
                      return (
                        <td key={km} className="py-3.5 px-3 text-center font-mono tabular-nums whitespace-nowrap">
                          <span className="font-bold">₹{fare}</span>
                        </td>
                      );
                    })}

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSearchVehicle(v.type)}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {v.type} Dhoondo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Calculator Quick Slider below the table */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                Live Test Distance:
              </span>
              <input
                type="range"
                min="1"
                max="60"
                value={testKm}
                onChange={(e) => setTestKm(Number(e.target.value))}
                className="w-36 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="font-mono font-bold text-emerald-600 text-sm whitespace-nowrap">
                {testKm} KM
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-slate-500">Live Breakdown for {testKm} km:</span>
              <span className="font-mono font-semibold">Bike: ₹{calculateFare(testKm, 8)}</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="font-mono font-semibold text-emerald-600">CNG: ₹{calculateFare(testKm, 14)}</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="font-mono font-semibold">Car: ₹{calculateFare(testKm, 18)}</span>
            </div>
          </div>

        </div>

        {/* 3 Pillar Explainer Cards: Why Direct Fare Wins */}
        <div id="philosophy" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              0% Platform Commission
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Mainstream aggregators deduct 25% to 35% commission plus GST from every driver. On Sab Gaadi Wala, the entire amount paid by the customer reaches the driver directly.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              No Artificial Rain or Surge Pricing
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No algorithm doubling fares during rush hours. The driver's rate (₹14/km for CNG, ₹18/km for Car, ₹8/km for Bike) remains honest and predictable 24/7.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              Direct Driver UPI / Cash Settlement
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No locked wallets or delayed payouts. Scan the driver's own PhonePe, Google Pay, or Paytm QR code directly, or pay cash upon reaching your destination.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
