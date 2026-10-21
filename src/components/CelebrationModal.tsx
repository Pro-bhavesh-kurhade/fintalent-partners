import React, { useEffect } from 'react';
import { CheckCircle2, Search, ArrowRight, ShieldCheck, X, Phone, Calendar } from 'lucide-react';
import { fireCelebrationConfetti } from '../lib/confetti';
import { useTheme } from '../context/ThemeContext';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  phone: string;
  dob: string;
  onTrackNow: (phone: string, dob: string) => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  phone,
  dob,
  onTrackNow,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isOpen) {
      fireCelebrationConfetti();
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-modal-title"
    >
      <div 
        className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border relative overflow-hidden transition-colors ${
          isDark 
            ? 'bg-[#101426] text-white border-white/20' 
            : 'bg-white text-[#101426] border-slate-200'
        }`}
      >
        {/* Top neon glow line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4563FF] via-[#D4FF5A] to-[#10B981]" />
        
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className={`p-2.5 rounded-xl transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Close Confirmation Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-5 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-[#10B981]/20 text-[#10B981] mx-auto flex items-center justify-center shadow-md border border-[#10B981]/30">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-[#10B981]/15 text-[#10B981] text-xs font-display font-bold rounded-full mb-2 border border-[#10B981]/30 uppercase tracking-wider">
              Profile Registered Successfully!
            </span>
            <h3 
              id="celebration-modal-title"
              className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight"
            >
              WELCOME ABOARD!
            </h3>
            <p className={`text-sm mt-2 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Your resume is securely stored in the talent database and queued for screening with our 40+ partner CA firms and corporate clients.
            </p>
          </div>

          {/* Secure credentials box */}
          <div className={`border rounded-2xl p-4 text-left space-y-3 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider ${
              isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'
            }`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Your Application Tracking Passcode</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#101426] border-white/10' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className={`flex items-center gap-1.5 text-xs font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Phone className="w-3.5 h-3.5" />
                  <span>Mobile Number</span>
                </div>
                <div className={`font-mono font-bold text-sm mt-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {phone}
                </div>
              </div>
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#101426] border-white/10' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className={`flex items-center gap-1.5 text-xs font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Date of Birth</span>
                </div>
                <div className={`font-mono font-bold text-sm mt-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {dob}
                </div>
              </div>
            </div>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              * Bookmark these details. Check screening progress and partner interview status at any time in the live tracker.
            </p>
          </div>

          {/* Direct CTA */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => {
                onClose();
                onTrackNow(phone, dob);
              }}
              className="w-full flex items-center justify-center gap-2.5 bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-extrabold py-4 px-6 rounded-xl shadow-md transition cursor-pointer text-sm min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
            >
              <Search className="w-4 h-4" />
              <span>Open Live Status Tracker Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className={`w-full py-3 text-xs font-semibold transition cursor-pointer min-h-[44px] ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Close and Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
