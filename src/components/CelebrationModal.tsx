import React, { useEffect } from 'react';
import { CheckCircle2, Search, ArrowRight, ShieldCheck, X, Phone, Calendar } from 'lucide-react';
import { fireCelebrationConfetti } from '../lib/confetti';

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
  useEffect(() => {
    if (isOpen) {
      fireCelebrationConfetti();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#101426]/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/20 bg-[#101426] text-white relative overflow-hidden">
        {/* Top neon glow line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4563FF] via-[#D4FF5A] to-[#10B981]" />
        
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-5 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-[#D4FF5A]/20 text-[#D4FF5A] mx-auto flex items-center justify-center shadow-lg border border-[#D4FF5A]/30">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-xs font-display font-bold rounded-full mb-2 border border-[#10B981]/40 uppercase tracking-wider">
              Profile Registered Successfully!
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
              WELCOME ABOARD!
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Your resume is securely stored in the talent database and queued for screening with our 40+ partner CA firms and corporate clients.
            </p>
          </div>

          {/* Secure credentials box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-display font-bold text-[#D4FF5A] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#D4FF5A]" />
              <span>Your Application Tracking Passcode</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#101426] p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mobile Number</span>
                </div>
                <div className="font-mono font-bold text-white text-sm mt-1">
                  {phone}
                </div>
              </div>
              <div className="bg-[#101426] p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Date of Birth</span>
                </div>
                <div className="font-mono font-bold text-white text-sm mt-1">
                  {dob}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
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
              className="w-full flex items-center justify-center gap-2.5 bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-extrabold py-4 px-6 rounded-xl shadow-xl shadow-[#D4FF5A]/20 transition cursor-pointer text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Open Live Status Tracker Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-slate-400 hover:text-white text-xs font-semibold transition cursor-pointer"
            >
              Close and Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
