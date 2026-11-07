import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Phone, Navigation, Clock, CreditCard, Star, Download, Printer } from 'lucide-react';
import { ActiveBooking, Language } from '../types';
import { calculateFare } from '../utils/engine';
import { TRANSLATIONS } from '../translations';

interface BookingActiveModalProps {
  booking: ActiveBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteBooking: () => void;
  onCallDriver: () => void;
  language: Language;
}

export const BookingActiveModal: React.FC<BookingActiveModalProps> = ({
  booking,
  isOpen,
  onClose,
  onCompleteBooking,
  onCallDriver,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [currentStep, setCurrentStep] = useState<'arriving' | 'in_trip' | 'completed'>('arriving');
  const [etaTimer, setEtaTimer] = useState(3);
  const [userRating, setUserRating] = useState(5);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep('arriving');
      setEtaTimer(3);
      setFeedbackGiven(false);
    }
  }, [isOpen]);

  // Simulate arrival countdown
  useEffect(() => {
    let interval: any;
    if (isOpen && currentStep === 'arriving') {
      interval = setInterval(() => {
        setEtaTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev - 1;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isOpen, currentStep]);

  if (!isOpen || !booking) return null;

  const { driver, distanceKm, fare, pickup, destination, otp } = booking;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {currentStep === 'completed'
                ? t.tripCompleted
                : currentStep === 'in_trip'
                ? t.tripInProgress
                : t.bookingConfirmed}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* STEP 1: Arriving State with prominent OTP */}
          {currentStep === 'arriving' && (
            <div className="space-y-4">
              
              {/* Big 4-Digit OTP Display */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 text-center">
                <span className="text-xs uppercase font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  {t.shareOtp}
                </span>
                <div className="font-mono text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-widest my-1">
                  {otp}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Driver will verify this 4-digit code before starting your ride
                </span>
              </div>

              {/* Status Banner */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {t.arrivingIn}: ~{etaTimer} min
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Driver is heading toward your pickup location
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep('in_trip')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 rounded-lg cursor-pointer whitespace-nowrap"
                >
                  Start Ride Simulator
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: In Trip State */}
          {currentStep === 'in_trip' && (
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                <Navigation className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Trip is in progress...
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cruising towards destination. Direct fare rate locked at ₹{driver.pricePerKm}/km.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep('completed')}
                  className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
                >
                  {t.finishRide}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Completed Receipt */}
          {currentStep === 'completed' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                  You Have Arrived!
                </h4>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono my-2">
                  Total Fare: ₹{fare}
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Please pay ₹{fare} directly to {driver.driverName} via Cash or UPI QR.
                </p>
              </div>

              {/* Rating review */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Rate your trip with {driver.driverName}
                </span>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setUserRating(star);
                        setFeedbackGiven(true);
                      }}
                      className="p-1 cursor-pointer hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= userRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {feedbackGiven && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Thank you! Review recorded for driver profile.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Driver & Vehicle Card Lockup */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center text-xl font-bold">
                {driver.vehicleImageUrl ? (
                  <img src={driver.vehicleImageUrl} alt={driver.carName} className="w-full h-full object-cover" />
                ) : (
                  driver.vehicleType.charAt(0)
                )}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{driver.driverName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {driver.carName} · <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">{driver.plateNumber}</span>
                </div>
                <div className="text-[11px] text-amber-500 font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {driver.rating} ({driver.totalRides} trips)
                </div>
              </div>
            </div>

            <button
              onClick={onCallDriver}
              className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
              title="Call Driver"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          {/* Route & Transparent Fare Summary */}
          <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3 text-xs">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">PICKUP</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{pickup}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">DESTINATION</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{destination}</span>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl mt-3 flex items-center justify-between">
              <div>
                <span className="text-slate-500 block">Calculation</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {distanceKm} km × ₹{driver.pricePerKm}/km
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Total Due</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  ₹{fare}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
