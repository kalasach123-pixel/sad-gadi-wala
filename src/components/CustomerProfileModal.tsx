import React, { useState } from 'react';
import { X, User, Phone, MapPin, Shield, Check, Copy, AlertCircle, Save } from 'lucide-react';
import { Customer, Language } from '../types';

interface CustomerProfileModalProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCustomer: (updated: Customer) => void;
  language: Language;
}

export const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({
  customer,
  isOpen,
  onClose,
  onUpdateCustomer,
  language,
}) => {
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone);
  const [emergencyContact, setEmergencyContact] = useState(customer.emergencyContact || '');
  const [homeLocation, setHomeLocation] = useState(customer.homeLocation || '');
  const [workLocation, setWorkLocation] = useState(customer.workLocation || '');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(customer.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCustomer({
      ...customer,
      name: name.trim() || 'Valued Customer',
      phone: phone.trim() || '+91 98765 00000',
      emergencyContact: emergencyContact.trim(),
      homeLocation: homeLocation.trim(),
      workLocation: workLocation.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'hi' ? 'कस्टमर प्रोफ़ाइल व आईडी' : language === 'hinglish' ? 'Customer Profile & ID' : 'Customer Profile & ID'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Sab Gaadi Wala Verified Rider Account
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

        {/* Customer ID Card Banner */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block mb-0.5">
                Official Rider Identifier
              </span>
              <div className="font-mono text-2xl font-black tracking-wider flex items-center gap-2">
                <span>{customer.id}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="p-1 rounded bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  title="Copy Customer ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="text-xs text-emerald-100 mt-1">
                Name: {customer.name} · Joined {customer.joinedAt}
              </div>
            </div>

            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold">
              {customer.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Edit Details Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'आपका नाम' : language === 'hinglish' ? 'Aapka Naam' : 'Customer Full Name'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sajid Mohammad"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'मोबाइल नंबर' : language === 'hinglish' ? 'Mobile Number' : 'Phone Number'}
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'इमरजेंसी संपर्क (SOS)' : language === 'hinglish' ? 'Emergency Contact (SOS)' : 'Emergency Contact'}
            </label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="+91 98112 00000"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Saved Home
              </label>
              <input
                type="text"
                value={homeLocation}
                onChange={(e) => setHomeLocation(e.target.value)}
                placeholder="Connaught Place, Delhi"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Saved Work
              </label>
              <input
                type="text"
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
                placeholder="Cyber Hub, Gurugram"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 shrink-0" />
              <span>Customer details saved successfully!</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Customer Details</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
