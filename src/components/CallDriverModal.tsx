import React, { useState, useEffect } from 'react';
import { X, Phone, PhoneOff, MessageSquare, Volume2, VolumeX, Copy, Check, ShieldCheck } from 'lucide-react';
import { Driver, Language } from '../types';

interface CallDriverModalProps {
  driver: Driver | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CallDriverModal: React.FC<CallDriverModalProps> = ({
  driver,
  isOpen,
  onClose,
  language,
}) => {
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isOpen) {
      setCallStatus('idle');
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    let timer: any;
    if (callStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  if (!isOpen || !driver) return null;

  const handleStartCall = () => {
    setCallStatus('calling');
    // Simulate pickup after 2 seconds
    setTimeout(() => {
      setCallStatus('connected');
    }, 2200);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(driver.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickMessages = [
    'Bhaiya main pickup location par khada hoon.',
    'Aapko aane mein kitna time lagega?',
    'Main white shirt mein metro gate par hoon.',
    'Gaadi ka AC on rakhna please.',
  ];

  const formatSecs = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl max-w-sm w-full border border-slate-800 shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/80 text-slate-400 hover:text-white cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Call screen content */}
        <div className="p-6 text-center pt-10 flex flex-col items-center">
          
          {/* Driver Avatar / Vehicle icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 mb-4 shadow-xl relative">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold overflow-hidden">
              {driver.driverName.charAt(0)}
            </div>
            {callStatus === 'connected' && (
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            )}
          </div>

          <h3 className="text-xl font-bold tracking-tight mb-1 flex items-center gap-1.5">
            <span>{driver.driverName}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </h3>

          <div className="text-xs text-slate-400 mb-1">
            {driver.carName} · <span className="font-mono text-slate-300">{driver.plateNumber}</span>
          </div>

          <div className="font-mono text-emerald-400 text-sm font-semibold mb-6 flex items-center gap-1">
            <span>{driver.phone}</span>
            <button
              onClick={copyPhoneNumber}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
              title="Copy number"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Call Status Indication */}
          <div className="py-2 px-4 rounded-full bg-slate-800/80 text-xs font-medium mb-6">
            {callStatus === 'idle' && 'Ready to connect directly with driver'}
            {callStatus === 'calling' && (
              <span className="text-amber-400 animate-pulse">Ringing driver's phone...</span>
            )}
            {callStatus === 'connected' && (
              <span className="text-emerald-400 font-mono">Connected · {formatSecs(callDuration)}</span>
            )}
            {callStatus === 'ended' && <span className="text-rose-400">Call Ended</span>}
          </div>

          {/* Call action buttons */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {callStatus === 'idle' ? (
              <button
                onClick={handleStartCall}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Start Direct Call"
              >
                <Phone className="w-7 h-7" />
              </button>
            ) : callStatus === 'calling' || callStatus === 'connected' ? (
              <>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer transition-colors ${
                    isMuted ? 'bg-amber-600' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <button
                  onClick={handleEndCall}
                  className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="End Call"
                >
                  <PhoneOff className="w-7 h-7" />
                </button>
              </>
            ) : null}
          </div>

          {/* WhatsApp / Quick SMS message shortcuts */}
          <div className="w-full text-left pt-4 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quick WhatsApp / SMS Messages</span>
            </span>

            <div className="space-y-1.5">
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const encoded = encodeURIComponent(msg);
                    window.open(`https://api.whatsapp.com/send?phone=${driver.phone.replace(/[^0-9]/g, '')}&text=${encoded}`, '_blank');
                  }}
                  className="w-full text-left p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate pr-2">"{msg}"</span>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase">Send</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
