import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Upload, Camera, FileText, Car, Check, AlertCircle, DollarSign } from 'lucide-react';
import { Driver, FuelType, Language, VehicleType } from '../types';
import { getStandardRatePerKm } from '../utils/engine';
import { TRANSLATIONS } from '../translations';

interface DriverRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterDriver: (driver: Driver) => void;
  language: Language;
}

export const DriverRegistrationModal: React.FC<DriverRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterDriver,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // Driver details
  const [driverName, setDriverName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [upiId, setUpiId] = useState('');
  const [cityLocation, setCityLocation] = useState('Delhi NCR');

  // Vehicle details
  const [vehicleType, setVehicleType] = useState<VehicleType>('CNG');
  const [carName, setCarName] = useState('');
  const [fuelType, setFuelType] = useState<FuelType>('CNG');
  const [plateNumber, setPlateNumber] = useState('');
  const [ac, setAc] = useState(true);
  const [seatingCapacity, setSeatingCapacity] = useState(4);

  // USER RULE: Driver hi tay kare 1 km pe kitna lena hai!
  const [customPricePerKm, setCustomPricePerKm] = useState<number>(14);

  // Ola/Uber KYC Documents & Photos
  const [drivingLicenceNumber, setDrivingLicenceNumber] = useState('');
  const [licencePhotoUrl, setLicencePhotoUrl] = useState<string>('/src/assets/images/cng_taxi_cab_1794047434199.jpg');
  const [vehiclePhotoUrl, setVehiclePhotoUrl] = useState<string>('/src/assets/images/cng_taxi_cab_1794047434199.jpg');
  const [rcNumber, setRcNumber] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [commercialPermitNumber, setCommercialPermitNumber] = useState('');

  // UI state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleVehicleTypeSelect = (type: VehicleType) => {
    setVehicleType(type);
    const standard = getStandardRatePerKm(type);
    setCustomPricePerKm(standard); // default recommendation, but driver can adjust freely!

    if (type === 'CNG') {
      setFuelType('CNG');
      setCarName('Maruti WagonR CNG');
      setVehiclePhotoUrl('/src/assets/images/cng_taxi_cab_1794047434199.jpg');
      setAc(true);
      setSeatingCapacity(4);
    } else if (type === 'Auto') {
      setFuelType('CNG');
      setCarName('Bajaj Compact 4S CNG Auto');
      setVehiclePhotoUrl('/src/assets/images/auto_rickshaw_cng_1794047433803.jpg');
      setAc(false);
      setSeatingCapacity(3);
    } else if (type === 'Bike') {
      setFuelType('Petrol');
      setCarName('Hero Splendor Plus 125');
      setVehiclePhotoUrl('/src/assets/images/city_bike_commute_1794047434396.jpg');
      setAc(false);
      setSeatingCapacity(1);
    } else if (type === 'EV') {
      setFuelType('Electric');
      setCarName('Tata Tigor EV');
      setVehiclePhotoUrl('/src/assets/images/cng_taxi_cab_1794047434199.jpg');
      setAc(true);
      setSeatingCapacity(4);
    } else if (type === 'SUV') {
      setFuelType('CNG');
      setCarName('Maruti Ertiga Hybrid');
      setVehiclePhotoUrl('/src/assets/images/cng_taxi_cab_1794047434199.jpg');
      setAc(true);
      setSeatingCapacity(6);
    } else {
      setFuelType('Petrol');
      setCarName('Maruti Swift VXi');
      setVehiclePhotoUrl('/src/assets/images/cng_taxi_cab_1794047434199.jpg');
      setAc(true);
      setSeatingCapacity(4);
    }
  };

  const handlePhotoUploadSim = (type: 'licence' | 'vehicle' | 'rc') => {
    // Allows user to simulate upload or toggle clean high-res assets
    if (type === 'vehicle') {
      if (vehicleType === 'Auto') {
        setVehiclePhotoUrl('/src/assets/images/auto_rickshaw_cng_1794047433803.jpg');
      } else if (vehicleType === 'Bike') {
        setVehiclePhotoUrl('/src/assets/images/city_bike_commute_1794047434396.jpg');
      } else {
        setVehiclePhotoUrl('/src/assets/images/cng_taxi_cab_1794047434199.jpg');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!driverName.trim() || !plateNumber.trim()) {
      return;
    }

    const newDriver: Driver = {
      id: `drv-registered-${Date.now()}`,
      driverName: driverName.trim(),
      carName: carName.trim() || `${vehicleType} Cab`,
      vehicleType,
      fuelType,
      pricePerKm: Number(customPricePerKm) || getStandardRatePerKm(vehicleType), // Driver decides own rate
      rating: 5.0,
      totalRides: 0,
      phone: phone.trim() || '+91 98110 00000',
      plateNumber: plateNumber.toUpperCase().trim(),
      ac,
      seatingCapacity,
      etaMinutes: 2,
      locationName: cityLocation,
      mapCoords: {
        x: Math.floor(Math.random() * 55) + 25,
        y: Math.floor(Math.random() * 55) + 25,
      },
      vehicleImageUrl: vehiclePhotoUrl,
      drivingLicenceNumber: drivingLicenceNumber.trim() || 'DL-1420230098124',
      licencePhotoUrl,
      rcNumber: rcNumber.trim() || plateNumber.toUpperCase().trim(),
      insuranceNumber: insuranceNumber.trim() || 'POL-88392109',
      commercialPermitNumber: commercialPermitNumber.trim() || 'PERMIT-DL-2026',
      upiId: upiId.trim() || `${phone.replace(/[^0-9]/g, '')}@paytm`,
      isKycVerified: true,
      isAvailable: true,
      languages: ['Hindi', 'English'],
      badges: ['Ola/Uber KYC Verified', 'Driver Set Rate', 'Zero Commission'],
      bio: `Professional registered driver. Rate: ₹${customPricePerKm}/km direct to driver.`,
    };

    onRegisterDriver(newDriver);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {t.driverRegistration}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  KYC Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ola / Uber Standard Registration · 0% Commission · 100% Direct Fare
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/40 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
              step === 1
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1. Driver & Rate (ड्राइवर रेट)
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
              step === 2
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2. Auto / Car Details & Photos
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
              step === 3
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3. Licence & Documents KYC
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {t.driverRegisteredSuccess}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-4">
              Aapka rate ₹{customPricePerKm}/km set ho gaya hai. Aapki gaadi map par live dikhegi aur customers turant book kar sakte hain.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm flex-1">
            
            {/* STEP 1: Driver Info & Setting Own 1 KM Rate */}
            {step === 1 && (
              <div className="space-y-4">
                
                {/* Highlight: Driver Hi Tay Kare 1 KM Rate */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold mb-1">
                    <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t.driverDecidesRate}</span>
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    Ola / Uber ki tarah koi company rate decide nahi karegi. Aap khud set karein ki 1 KM ka kitna lena hai.
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Aapka Rate (₹/KM):
                    </span>
                    <div className="relative w-32">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="5"
                        max="120"
                        required
                        value={customPricePerKm}
                        onChange={(e) => setCustomPricePerKm(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 text-base font-black bg-white dark:bg-slate-800 border-2 border-emerald-500 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      ₹{customPricePerKm} / KM seedha aapko
                    </span>
                  </div>
                </div>

                {/* Driver Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.driverNameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      placeholder="e.g. Mohd. Farhan Khan"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98112 34567"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* UPI ID for direct payment from customer & Operating City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Direct UPI ID (Customer seedha pay karega)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. 9811234567@paytm / okaxis"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Operating City / Base Stand
                    </label>
                    <select
                      value={cityLocation}
                      onChange={(e) => setCityLocation(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Delhi NCR">Delhi NCR (Connaught Place / Gurgaon / Noida)</option>
                      <option value="Mumbai">Mumbai (Andheri / BKC / Churchgate)</option>
                      <option value="Bengaluru">Bengaluru (Koramangala / Indiranagar / Electronic City)</option>
                      <option value="Hyderabad">Hyderabad (Hitech City / Banjara Hills)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!driverName.trim()) {
                        alert('Kripya apna naam bharein');
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Agla: Gaadi / Auto Details (Step 2) →
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: Vehicle Type, Model, Auto/Car Number Plate & Vehicle Photo */}
            {step === 2 && (
              <div className="space-y-4">
                
                {/* Vehicle Category Selector */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.vehicleTypeLabel} *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['CNG', 'Auto', 'Car', 'Bike', 'EV', 'Sedan', 'SUV'] as VehicleType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleVehicleTypeSelect(type)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                          vehicleType === type
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold">{type}</div>
                        <div className="text-[10px] opacity-80">
                          {type === 'Auto' ? 'Riksha' : type === 'Bike' ? 'Two-Wheeler' : 'Cab'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model & Auto / Car Number Plate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.carNameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={carName}
                      onChange={(e) => setCarName(e.target.value)}
                      placeholder="e.g. Bajaj RE Auto / Maruti WagonR"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.plateLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      placeholder="e.g. DL 01 RA 4821 / MH 02 AT 1234"
                      className="w-full px-3 py-2.5 uppercase font-mono font-bold text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Vehicle Photo Upload (Ola Requirement) */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50">
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span>{t.vehiclePhotoLabel} (Car / Rickshaw / Bike Photo) *</span>
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                    Ola standard: Upload clear photo of vehicle showing license plate number.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-28 h-20 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden relative border border-slate-300 dark:border-slate-600 shrink-0">
                      <img
                        src={vehiclePhotoUrl}
                        alt="Vehicle Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> High-Resolution Photo Ready
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {vehicleType === 'Auto' ? 'CNG Auto Rickshaw verified' : `${vehicleType} Cab photo captured`}
                      </p>
                      <button
                        type="button"
                        onClick={() => handlePhotoUploadSim('vehicle')}
                        className="text-[11px] text-slate-700 dark:text-slate-300 hover:text-emerald-600 underline cursor-pointer"
                      >
                        Retake / Switch Photo
                      </button>
                    </div>
                  </div>
                </div>

                {/* AC & Seating Capacity */}
                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ac}
                      onChange={(e) => setAc(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Air Conditioning (AC Gaadi)
                    </span>
                  </label>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Seats:</span>
                    <select
                      value={seatingCapacity}
                      onChange={(e) => setSeatingCapacity(Number(e.target.value))}
                      className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs"
                    >
                      <option value={1}>1 (Bike)</option>
                      <option value={3}>3 (Auto Rickshaw)</option>
                      <option value={4}>4 (Cab / Car)</option>
                      <option value={6}>6 (SUV)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    ← Pichla Step
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!plateNumber.trim()) {
                        alert('Kripya number plate bharein');
                        return;
                      }
                      setStep(3);
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Agla: Driving Licence & RC (Step 3) →
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: Driving Licence & KYC Documents (Ola/Uber Requirement) */}
            {step === 3 && (
              <div className="space-y-4">
                
                {/* Driving Licence Number & Photo */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>{t.licencePhotoLabel} *</span>
                    </label>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200">
                      Required by RTO
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Driving Licence (DL) Number:</span>
                      <input
                        type="text"
                        value={drivingLicenceNumber}
                        onChange={(e) => setDrivingLicenceNumber(e.target.value)}
                        placeholder="e.g. DL-1420110098234"
                        className="w-full px-3 py-2 uppercase font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="w-12 h-10 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-mono text-[10px] font-bold shrink-0">
                        DL CARD
                      </div>
                      <div className="text-[11px]">
                        <span className="text-emerald-600 font-bold block">Front & Back Attached</span>
                        <span className="text-slate-400">Valid till 2032</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RC Book Photo (Registration Certificate) */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>{t.rcPhotoLabel}</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Vehicle RC Certificate</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Vehicle RC Number:</span>
                      <input
                        type="text"
                        value={rcNumber}
                        onChange={(e) => setRcNumber(e.target.value)}
                        placeholder="e.g. RC-982148190"
                        className="w-full px-3 py-2 uppercase font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Commercial Permit / Fitness:</span>
                      <input
                        type="text"
                        value={commercialPermitNumber}
                        onChange={(e) => setCommercialPermitNumber(e.target.value)}
                        placeholder="e.g. ALL INDIA / STATE PERMIT"
                        className="w-full px-3 py-2 uppercase font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Final Confirmation Banner */}
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs flex items-start gap-2 text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">100% Direct Driver Platform</span>
                    <span>Aapka rate ₹{customPricePerKm}/km customers ko calculate hokar dikhega. 0% Commission kata jayega.</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    ← Pichla Step
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.driverRegistrationSubmit}</span>
                  </button>
                </div>

              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
};
