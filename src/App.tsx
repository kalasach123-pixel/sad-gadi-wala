/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Driver, Language, ActiveBooking, Customer } from './types';
import { INITIAL_DRIVERS } from './data/mockDrivers';
import { searchGadi, calculateFare } from './utils/engine';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { RouteAndDistancePicker } from './components/RouteAndDistancePicker';
import { DriverList } from './components/DriverList';
import { FareMatrixSection } from './components/FareMatrixSection';
import { DriverRegistrationModal } from './components/DriverRegistrationModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { CallDriverModal } from './components/CallDriverModal';
import { BookingActiveModal } from './components/BookingActiveModal';
import { Footer } from './components/Footer';
import { UserCheck, Sparkles, Check } from 'lucide-react';

export default function App() {
  // Theme & Language
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [language, setLanguage] = useState<Language>('hinglish');

  // Sync dark class on root document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // USER RULE: 'pehle app koi download kare to costomer id bane'
  const [customer, setCustomer] = useState<Customer>(() => {
    try {
      const saved = localStorage.getItem('sab_gaadi_customer');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) return parsed;
      }
    } catch (e) {
      // fallback
    }
    const randId = Math.floor(10000 + Math.random() * 90000);
    return {
      id: `CUST-${randId}`,
      name: 'Sajid Mohammad',
      phone: '+91 98112 40918',
      joinedAt: 'Nov 2026',
      emergencyContact: '+91 98100 11223',
      homeLocation: 'Connaught Place, Delhi',
      workLocation: 'Cyber Hub, Gurugram',
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('sab_gaadi_customer', JSON.stringify(customer));
    } catch (e) {
      // ignore
    }
  }, [customer]);

  // Drivers Fleet State with LocalStorage persistence
  const [drivers, setDrivers] = useState<Driver[]>(() => {
    try {
      const saved = localStorage.getItem('sab_gaadi_drivers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_DRIVERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('sab_gaadi_drivers', JSON.stringify(drivers));
    } catch (e) {
      // ignore
    }
  }, [drivers]);

  // Search, Category Filter, and Sorting
  const [searchText, setSearchText] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price' | 'eta' | 'rating'>('price');

  // Route & Trip Distance State
  const [distanceKm, setDistanceKm] = useState<number>(14);
  const [pickupLocation, setPickupLocation] = useState<string>('Connaught Place Inner Circle, Delhi');
  const [dropLocation, setDropLocation] = useState<string>('Indira Gandhi Intl Airport T3, Delhi');
  const [selectedCity, setSelectedCity] = useState<string>('Delhi NCR');
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  // Modals & Booking Flow State
  // USER RULE: 'gadi add ki jaga pe driver rajitrtion ka botton karo'
  const [isDriverRegistrationOpen, setIsDriverRegistrationOpen] = useState<boolean>(false);
  const [isCustomerProfileOpen, setIsCustomerProfileOpen] = useState<boolean>(false);
  const [callingDriver, setCallingDriver] = useState<Driver | null>(null);
  const [activeBooking, setActiveBooking] = useState<ActiveBooking | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [welcomeBannerDismissed, setWelcomeBannerDismissed] = useState<boolean>(false);

  // Handle City Change updates default pickup/drop
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city === 'Delhi NCR') {
      setPickupLocation('Connaught Place Inner Circle, Delhi');
      setDropLocation('Indira Gandhi Intl Airport T3, Delhi');
      setDistanceKm(18);
    } else if (city === 'Mumbai') {
      setPickupLocation('Lokhandwala Complex, Andheri West');
      setDropLocation('Bandra Kurla Complex (BKC), Mumbai');
      setDistanceKm(14);
    } else if (city === 'Bengaluru') {
      setPickupLocation('Sony World Junction, Koramangala');
      setDropLocation('Infosys Gate 1, Electronic City');
      setDistanceKm(16);
    }
  };

  // CORE LOGIC EXECUTION: searchGadi(searchText, allDrivers)
  const filteredDrivers = useMemo(() => {
    const query = searchText ? searchText : activeCategory;
    const matched = searchGadi(query, drivers);

    const copy = [...matched];
    if (sortBy === 'price') {
      copy.sort((a, b) => a.pricePerKm - b.pricePerKm);
    } else if (sortBy === 'eta') {
      copy.sort((a, b) => a.etaMinutes - b.etaMinutes);
    } else if (sortBy === 'rating') {
      copy.sort((a, b) => b.rating - a.rating);
    }
    return copy;
  }, [searchText, activeCategory, drivers, sortBy]);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category select handler
  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    if (cat) {
      setSearchText(cat);
    } else {
      setSearchText('');
    }
  };

  // Search change handler
  const handleSearchChange = (text: string) => {
    setSearchText(text);
    if (!text) {
      setActiveCategory('');
    }
  };

  // USER RULE: Driver Registration with own 1 KM rate & Ola KYC docs
  const handleRegisterDriver = (newDriver: Driver) => {
    setDrivers((prev) => [newDriver, ...prev]);
    setSelectedDriverId(newDriver.id);
    setSearchText(newDriver.carName);
    handleScrollTo('search-section');
  };

  // Start Booking Flow
  const handleBookDriver = (driver: Driver) => {
    const fare = calculateFare(distanceKm, driver.pricePerKm);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const booking: ActiveBooking = {
      id: `bk-${Date.now()}`,
      driver,
      distanceKm,
      fare,
      pickup: pickupLocation,
      destination: dropLocation,
      otp,
      status: 'arriving',
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMode: 'cash_to_driver',
    };

    setActiveBooking(booking);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Customer Onboarding Banner (Pehle App download karte hi Customer ID ban gayi) */}
      {!welcomeBannerDismissed && (
        <div className="bg-emerald-600 text-white text-xs py-2 px-4 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
              <span>
                {language === 'hi'
                  ? `स्वागत है! आपकी कस्टमर आईडी बन गई है: ${customer.id} (${customer.name})`
                  : language === 'hinglish'
                  ? `Welcome! Aapka Customer ID ban gaya: ${customer.id} (${customer.name})`
                  : `Welcome! Your Customer ID is created: ${customer.id} (${customer.name})`}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsCustomerProfileOpen(true)}
                className="underline hover:text-emerald-100 text-[11px] font-semibold cursor-pointer"
              >
                View Profile
              </button>
              <button
                onClick={() => setWelcomeBannerDismissed(true)}
                className="text-white/80 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Top Bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        customer={customer}
        onOpenCustomerProfile={() => setIsCustomerProfileOpen(true)}
        onOpenDriverRegistration={() => setIsDriverRegistrationOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section with Fleet Image & Transparent Fare Philosophy */}
        <HeroSection
          language={language}
          onExploreClick={() => handleScrollTo('search-section')}
          onCalculateClick={() => handleScrollTo('route-section')}
          onOpenDriverRegistration={() => setIsDriverRegistrationOpen(true)}
          totalDriversCount={drivers.length}
        />

        {/* Route Planner & Live Distance Simulator */}
        <RouteAndDistancePicker
          distanceKm={distanceKm}
          onDistanceChange={setDistanceKm}
          pickupLocation={pickupLocation}
          onPickupChange={setPickupLocation}
          dropLocation={dropLocation}
          onDropChange={setDropLocation}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          drivers={filteredDrivers}
          selectedDriverId={selectedDriverId}
          onSelectDriver={(id) => {
            setSelectedDriverId(id);
            const card = document.getElementById('search-section');
            if (card) card.scrollIntoView({ behavior: 'smooth' });
          }}
          language={language}
        />

        {/* Search Engine & Filter Bar (Sab Gaadi Wala Main Dimag) */}
        <SearchAndFilterBar
          searchText={searchText}
          onSearchChange={handleSearchChange}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredDrivers.length}
          language={language}
        />

        {/* Driver List & Instant Fare Calculation */}
        <DriverList
          drivers={filteredDrivers}
          distanceKm={distanceKm}
          selectedDriverId={selectedDriverId}
          onSelectDriver={setSelectedDriverId}
          onBookDriver={handleBookDriver}
          onCallDriver={(driver) => setCallingDriver(driver)}
          onResetSearch={() => {
            setSearchText('');
            setActiveCategory('');
          }}
          language={language}
        />

        {/* Fare Matrix & Philosophy Section */}
        <FareMatrixSection
          language={language}
          onSetDistance={(km) => {
            setDistanceKm(km);
            handleScrollTo('search-section');
          }}
          onSearchVehicle={(type) => {
            setSearchText(type);
            setActiveCategory(type);
            handleScrollTo('search-section');
          }}
        />

      </main>

      {/* Driver Registration Modal (Ola/Uber Standard KYC + Driver sets own rate) */}
      <DriverRegistrationModal
        isOpen={isDriverRegistrationOpen}
        onClose={() => setIsDriverRegistrationOpen(false)}
        onRegisterDriver={handleRegisterDriver}
        language={language}
      />

      {/* Customer Profile Modal */}
      <CustomerProfileModal
        customer={customer}
        isOpen={isCustomerProfileOpen}
        onClose={() => setIsCustomerProfileOpen(false)}
        onUpdateCustomer={setCustomer}
        language={language}
      />

      {/* Call Simulator Modal */}
      <CallDriverModal
        driver={callingDriver}
        isOpen={!!callingDriver}
        onClose={() => setCallingDriver(null)}
        language={language}
      />

      {/* Active Trip & Receipt Modal */}
      <BookingActiveModal
        booking={activeBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onCompleteBooking={() => {}}
        onCallDriver={() => {
          if (activeBooking) {
            setCallingDriver(activeBooking.driver);
          }
        }}
        language={language}
      />

      {/* Footer */}
      <Footer
        language={language}
        onScrollTo={handleScrollTo}
        onOpenDriverRegistration={() => setIsDriverRegistrationOpen(true)}
      />

    </div>
  );
}
