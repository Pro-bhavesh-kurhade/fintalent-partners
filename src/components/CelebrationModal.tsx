import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Search,
  ArrowRight,
  ShieldCheck,
  X,
  Phone,
  Calendar,
} from 'lucide-react';
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
  candidateName,
  phone,
  dob,
  onTrackNow,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isOpen) return;
    fireCelebrationConfetti();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-modal-title"
    >
      <div
        className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 relative border ${
          isDark
            ? 'bg-[#0E121E] text-white border-white/20 shadow-2xl'
            : 'bg-white text-[#0D1017] border-[2px] border-[#0D1017] shadow-[8px_8px_0px_0px_#0D1017]'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl hover:bg-current/10 flex items-center justify-center cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-5 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-[#C8FF32] text-[#090B10] mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <span className="inline-block text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-[#12B886]/20 text-[#12B886]">
              Profile Live in Talent Desk
            </span>
            <h3
              id="celebration-modal-title"
              className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight"
            >
              You&apos;re In, {candidateName.split(' ')[0]}!
            </h3>
            <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
              Your CV is queued with Ami Bhanushali&apos;s executive search desk. We’ve also saved your passkey in this browser for instant 1-tap tracking anytime.
            </p>
          </div>

          <div
            className={`rounded-2xl p-4 border text-left space-y-3 ${
              isDark ? 'bg-black/40 border-white/10' : 'bg-[#FAF7F0] border-[#0D1017]/15'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#FF6B4A]">
              <ShieldCheck className="w-4 h-4" />
              <span>Your Private Status Passkey</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-black/20 border border-current/10">
                <span className="text-[11px] opacity-65 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Mobile
                </span>
                <strong className="font-mono text-sm block mt-0.5">{phone}</strong>
              </div>
              <div className="p-3 rounded-xl bg-black/20 border border-current/10">
                <span className="text-[11px] opacity-65 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> DOB
                </span>
                <strong className="font-mono text-sm block mt-0.5">{dob}</strong>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onTrackNow(phone, dob);
              }}
              className="neo-btn-pop w-full py-4 px-6 rounded-xl bg-[#C8FF32] hover:bg-[#b8f21e] text-[#090B10] font-display font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Open My Live Pipeline Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs font-bold opacity-65 hover:opacity-100 cursor-pointer"
            >
              Back to Live Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
