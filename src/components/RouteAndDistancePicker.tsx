import React from 'react';
import { MapPin, Navigation, Compass, Clock, RotateCcw, ChevronRight } from 'lucide-react';
import { Driver, Language, RoutePreset } from '../types';
import { ROUTE_PRESETS } from '../data/mockDrivers';
import { TRANSLATIONS } from '../translations';

interface RouteAndDistancePickerProps {
  distanceKm: number;
  onDistanceChange: (km: number) => void;
  pickupLocation: string;
  onPickupChange: (loc: string) => void;
  dropLocation: string;
  onDropChange: (loc: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  drivers: Driver[];
  selectedDriverId: string | null;
  onSelectDriver: (driverId: string) => void;
  language: Language;
}

export const RouteAndDistancePicker: React.FC<RouteAndDistancePickerProps> = ({
  distanceKm,
  onDistanceChange,
  pickupLocation,
  onPickupChange,
  dropLocation,
  onDropChange,
  selectedCity,
  onCityChange,
  drivers,
  selectedDriverId,
  onSelectDriver,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const filteredPresets = ROUTE_PRESETS.filter(
    (p) => p.city.toLowerCase() === selectedCity.toLowerCase()
  );

  const applyPreset = (preset: RoutePreset) => {
    onPickupChange(preset.pickup);
    onDropChange(preset.destination);
    onDistanceChange(preset.distanceKm);
  };

  // Estimated drive duration based on standard Indian urban transit speeds
  const estimatedMins = Math.max(5, Math.round(distanceKm * 2.2));

  return (
    <section id="route-section" className="bg-slate-50 dark:bg-slate-950 py-8 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Compass className="w-3.5 h-3.5" />
              <span>LIVE DISTANCE & ROUTE SIMULATOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {language === 'hi' ? 'सफ़र की दूरी और रूट तय करें' : language === 'hinglish' ? 'Apna Route & Doori (KM) Chunhein' : 'Plan Trip Route & Distance'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {language === 'hi' 
                ? 'दूरी बदलते ही सभी चालकों का किराया खुद ब खुद अपडेट हो जाएगा।' 
                : language === 'hinglish'
                ? 'Distance badalte hi sabhi drivers ka kiraya live calculate ho jayega (Distance × Rate).'
                : 'Slide or pick a route to recalculate exact fares instantly across all active drivers.'}
            </p>
          </div>

          {/* City switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">City:</span>
            <div className="inline-flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
              {['Delhi NCR', 'Mumbai', 'Bengaluru'].map((city) => (
                <button
                  key={city}
                  onClick={() => onCityChange(city)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCity === city
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left inputs & quick presets, Right Visual Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
            
            <div className="space-y-4">
              {/* Pickup location */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>{language === 'hi' ? 'पिकअप लोकेशन' : language === 'hinglish' ? 'Kahan Se Baithna Hai (Pickup)' : 'Pickup Location'}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => onPickupChange(e.target.value)}
                    placeholder="Enter pickup point..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Destination location */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>{language === 'hi' ? 'ड्रॉप लोकेशन' : language === 'hinglish' ? 'Kahan Jana Hai (Drop)' : 'Drop Location'}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={dropLocation}
                    onChange={(e) => onDropChange(e.target.value)}
                    placeholder="Enter destination..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Distance Slider with prominent display */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700 dark:text-slate-300">
                    {language === 'hi' ? 'सफ़र दूरी (Distance):' : language === 'hinglish' ? 'Kul Doori (Distance):' : 'Trip Distance:'}
                  </span>
                  <div className="flex items-baseline gap-1 text-emerald-600 dark:text-emerald-400">
                    <span className="text-2xl font-black tabular-nums">{distanceKm}</span>
                    <span className="text-xs uppercase font-bold">KM</span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs ml-2 font-normal flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~{estimatedMins} min
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="80"
                  step="1"
                  value={distanceKm}
                  onChange={(e) => onDistanceChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />

                {/* Quick distance buttons */}
                <div className="flex items-center justify-between gap-1 mt-2">
                  {[3, 8, 15, 25, 40, 60].map((km) => (
                    <button
                      key={km}
                      onClick={() => onDistanceChange(km)}
                      className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                        distanceKm === km
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {km} km
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular City Presets */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                {language === 'hi' ? 'अक्सर चुने जाने वाले मार्ग' : language === 'hinglish' ? 'Aksar Chale Jane Wale Routes' : 'Preset Routes'} ({selectedCity})
              </span>
              <div className="space-y-1.5">
                {filteredPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                        {preset.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {preset.pickup.split(',')[0]} → {preset.destination.split(',')[0]}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0 text-xs">
                      {preset.distanceKm} km
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Map Visualizer */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs relative flex flex-col">
            
            {/* Map Top Bar */}
            <div className="px-4 py-3 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedCity} Live Mobility Grid
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {drivers.length} drivers plotted
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" /> CNG/Cab
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500" /> Bike
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" /> Auto
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative flex-1 min-h-[320px] bg-[#f2f4f7] dark:bg-[#111827] overflow-hidden select-none">
              
              {/* City Grid Roads SVG */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="roadGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <rect width="60" height="60" fill="none" />
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-800 opacity-60" />
                  </pattern>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Background grid */}
                <rect width="100%" height="100%" fill="url(#roadGrid)" />

                {/* Major Highways */}
                <path d="M -10 120 C 150 140, 280 80, 500 130 C 650 160, 800 100, 950 120" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-200 dark:text-slate-800" />
                <path d="M 180 -10 C 200 150, 160 280, 240 450" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-800" />
                <path d="M 450 -10 C 420 180, 500 290, 480 450" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-800" />
                <path d="M 0 280 C 250 240, 500 310, 950 260" fill="none" stroke="currentColor" strokeWidth="7" className="text-slate-200 dark:text-slate-800" />

                {/* Dynamic Calculated Route between Pickup & Drop */}
                <path
                  d="M 120 220 Q 240 100 480 180 T 720 120"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                />
              </svg>

              {/* Pickup Pin Marker */}
              <div className="absolute top-[210px] left-[110px] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none z-10">
                <div className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap mb-1">
                  Pickup: {pickupLocation.split(',')[0]}
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-600/20">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Drop Pin Marker */}
              <div className="absolute top-[110px] left-[710px] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none z-10">
                <div className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap mb-1">
                  Drop: {dropLocation.split(',')[0]}
                </div>
                <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-600/20">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Render Drivers on the Map */}
              {drivers.map((driver) => {
                const isSelected = selectedDriverId === driver.id;
                const dotColor =
                  driver.vehicleType === 'Bike'
                    ? 'bg-amber-500'
                    : driver.vehicleType === 'Auto'
                    ? 'bg-blue-500'
                    : 'bg-emerald-600';

                return (
                  <button
                    key={driver.id}
                    onClick={() => onSelectDriver(driver.id)}
                    style={{
                      top: `${driver.mapCoords.y}%`,
                      left: `${driver.mapCoords.x}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform z-20 cursor-pointer ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                    }`}
                    title={`${driver.driverName} (${driver.carName}) - ₹${driver.pricePerKm}/km`}
                  >
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`w-7 h-7 rounded-full ${dotColor} text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900 transition-all ${
                          isSelected ? 'ring-4 ring-emerald-500/50 scale-110' : ''
                        }`}
                      >
                        <span className="text-[10px] font-extrabold">
                          {driver.vehicleType === 'Bike'
                            ? '🏍️'
                            : driver.vehicleType === 'Auto'
                            ? '🛺'
                            : '🚗'}
                        </span>
                      </div>
                      
                      {/* Driver Tooltip Hover Card */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none whitespace-nowrap z-40">
                        <div className="bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-xl border border-slate-700">
                          <div className="font-bold">{driver.driverName}</div>
                          <div className="text-[10px] text-slate-300">
                            {driver.carName} · <span className="text-emerald-400 font-semibold">₹{driver.pricePerKm}/km</span>
                          </div>
                          <div className="text-[9px] text-slate-400">
                            ETA: {driver.etaMinutes} mins away
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Map Footer Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">ROUTE DISTANCE</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {distanceKm} km
                    </span>
                  </div>
                  <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">EST. TRAVEL TIME</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {estimatedMins} mins
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">DIRECT PER-KM BILLING</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Distance × Driver Rate
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
