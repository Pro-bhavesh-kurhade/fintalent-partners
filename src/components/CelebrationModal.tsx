import React, { useEffect } from 'react';
import { CheckCircle2, Search, ArrowRight, ShieldCheck, X, FileText, Phone, Calendar } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200/90 relative overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Top green celebratory aura */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />
        <div className="absolute top-3 right-3">
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full mb-2 border border-emerald-200">
              Profile Successfully Registered!
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 font-serif">
              Welcome aboard, {candidateName}!
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Your resume has been securely stored in our verified finance database and queued for screening with our 40+ partner CA firms and corporate clients.
            </p>
          </div>

          {/* Secure credentials box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Your Application Tracking Passcode</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mobile Number</span>
                </div>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                  {phone}
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Date of Birth</span>
                </div>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                  {dob}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              * Bookmark these details. You can check screening progress, shortlists, and partner interview calls at any time using our status tracker.
            </p>
          </div>

          {/* Direct CTA */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onClose();
                onTrackNow(phone, dob);
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/40 transition active:scale-[0.99]"
            >
              <Search className="w-4 h-4" />
              <span>Track Your Status Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-slate-500 hover:text-slate-700 text-sm font-semibold transition"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
