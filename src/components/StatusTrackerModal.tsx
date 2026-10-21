import React, { useState, useEffect } from 'react';
import { 
  X, Search, 
  CheckCircle2, Clock, 
  AlertCircle, Loader2, FileText, ExternalLink, ShieldCheck, 
  MessageSquare, Calendar, ArrowRight 
} from 'lucide-react';
import { trackCandidateStatus, STAGES, Candidate } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

interface StatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhone?: string;
  initialDob?: string;
  onSwitchToApply?: () => void;
}

export const StatusTrackerModal: React.FC<StatusTrackerModalProps> = ({
  isOpen,
  onClose,
  initialPhone = '',
  initialDob = '',
  onSwitchToApply,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [phone, setPhone] = useState(initialPhone);
  const [dob, setDob] = useState(initialDob);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  // Synchronize initial search parameters
  useEffect(() => {
    if (initialPhone) setPhone(initialPhone);
    if (initialDob) setDob(initialDob);
    if (initialPhone && initialDob && isOpen) {
      handleSearch(initialPhone, initialDob);
    }
  }, [initialPhone, initialDob, isOpen]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSearch = async (targetPhone = phone, targetDob = dob) => {
    const cleanPhone = targetPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!targetDob) {
      setErrorMsg('Please select your Date of Birth.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg(null);
      const result = await trackCandidateStatus(cleanPhone, targetDob);
      if (!result) {
        setCandidate(null);
        setErrorMsg('No record found with this Mobile Number & DOB. Please recheck your credentials or submit your profile.');
      } else {
        setCandidate(result);
      }
    } catch (err: any) {
      console.error('Tracker error:', err);
      setErrorMsg('Failed to query status. Please verify your connection.');
      setCandidate(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStageIndex = (statusStr: string): number => {
    const trimmed = (statusStr || '').toLowerCase();
    if (trimmed.includes('placed') || trimmed.includes('offer')) return 5;
    if (trimmed.includes('interview')) return 4;
    if (trimmed.includes('shortlisted')) return 3;
    if (trimmed.includes('screen')) return 2;
    return 1; // Default: Application Received
  };

  if (!isOpen) return null;

  const currentStageIndex = candidate ? getStageIndex(candidate.status) : 1;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracker-modal-title"
    >
      <div 
        className={`rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border relative overflow-hidden max-h-[92vh] flex flex-col transition-colors ${
          isDark 
            ? 'bg-[#101426] text-white border-white/15' 
            : 'bg-white text-[#101426] border-slate-200'
        }`}
      >
        {/* Top vibrant gradient strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4563FF] via-[#D4FF5A] to-[#10B981]" />
        
        {/* Header with Close */}
        <div className={`flex items-center justify-between pb-5 border-b shrink-0 ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-bold ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
            }`}>
              <Search className={`w-5 h-5 ${isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'}`} />
            </div>
            <div>
              <h3 
                id="tracker-modal-title"
                className="font-display font-extrabold text-xl sm:text-2xl tracking-tight uppercase"
              >
                APPLICATION STATUS TRACKER
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Live recruitment pipeline tracker (Mobile + DOB Authentication)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 rounded-xl transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Close Status Tracker Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-5 space-y-6 flex-1 pr-1">
          
          {/* Search Inputs */}
          <div className={`p-5 rounded-2xl border space-y-4 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label 
                  htmlFor="tracker-phone"
                  className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Registered Mobile Number
                </label>
                <div className={`flex rounded-xl border overflow-hidden ${
                  isDark ? 'border-white/15 bg-white/5' : 'border-slate-300 bg-white'
                }`}>
                  <span className={`px-3.5 font-bold text-xs flex items-center border-r ${
                    isDark ? 'bg-white/10 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    +91
                  </span>
                  <input
                    id="tracker-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className={`w-full px-3.5 py-2.5 text-sm outline-none font-mono bg-transparent ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label 
                  htmlFor="tracker-dob"
                  className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Date of Birth (DOB)
                </label>
                <input
                  id="tracker-dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none font-mono cursor-pointer ${
                    isDark 
                      ? 'border-white/15 bg-white/5 text-white focus:border-[#D4FF5A]' 
                      : 'border-slate-300 bg-white text-slate-900 focus:border-[#4563FF]'
                  }`}
                />
              </div>
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-bold py-3.5 px-6 rounded-xl text-sm transition shadow-md cursor-pointer disabled:opacity-60 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Querying Live Supabase Records...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Check Current Pipeline Status</span>
                </>
              )}
            </button>
          </div>

          {/* Friendly Alert if Error / No Match */}
          {errorMsg && (
            <div 
              role="alert"
              className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 space-y-2 animate-in fade-in"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
              {onSwitchToApply && (
                <div className="pt-2 pl-7">
                  <button
                    onClick={() => {
                      onClose();
                      onSwitchToApply();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4563FF] hover:underline cursor-pointer"
                  >
                    <span>Click here to submit your profile now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Match Found: Candidate Details & Horizontal/Vertical Pipeline */}
          {candidate && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Profile Card Summary */}
              <div className={`p-6 rounded-3xl border space-y-4 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-display font-extrabold text-xl">
                        {candidate.full_name}
                      </h4>
                      <span className="text-xs bg-[#10B981]/20 text-[#10B981] px-3 py-1 rounded-full font-bold border border-[#10B981]/30">
                        {candidate.qualification}
                      </span>
                    </div>
                    <div className={`text-xs mt-1.5 flex flex-wrap gap-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      <span>{candidate.domain}</span>
                      <span>·</span>
                      <span>{candidate.experience_years} Years Experience</span>
                      <span>·</span>
                      <span>{candidate.current_location}</span>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className={`text-[10px] uppercase tracking-wider block font-bold ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Current Stage:
                    </span>
                    <span className="text-base font-display font-bold text-[#10B981]">
                      {candidate.status}
                    </span>
                  </div>
                </div>

                <div className={`flex flex-wrap items-center justify-between gap-4 text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Registered on {new Date(candidate.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>

                  {candidate.resume_url && (
                    <a
                      href={candidate.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#4563FF] hover:underline font-bold"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Uploaded Resume PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* 5-Stage Visual Progress Timeline: Horizontal on Desktop, Vertical on Mobile */}
              <div className={`border rounded-3xl p-6 sm:p-8 space-y-6 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <h4 className="font-display font-bold text-base tracking-tight flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#4563FF]" />
                    <span>5-Stage Recruitment Timeline</span>
                  </h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Real-time status updates from our executive screening and partner interview rounds.
                  </p>
                </div>

                {/* DESKTOP HORIZONTAL TIMELINE */}
                <div className="hidden lg:block pt-4 pb-2">
                  <div className="relative flex items-center justify-between">
                    {/* Connecting background line */}
                    <div className={`absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 -z-0 ${
                      isDark ? 'bg-white/10' : 'bg-slate-200'
                    }`} />
                    
                    {/* Active progress fill line */}
                    <div
                      className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#4563FF] via-[#D4FF5A] to-[#10B981] -z-0 transition-all duration-500"
                      style={{
                        width: `${Math.max(0, Math.min(100, ((currentStageIndex - 1) / 4) * 100))}%`,
                      }}
                    />

                    {STAGES.map((stage) => {
                      const isCompleted = currentStageIndex > stage.id;
                      const isCurrent = currentStageIndex === stage.id;

                      return (
                        <div key={stage.id} className="relative z-10 flex flex-col items-center text-center max-w-[140px]">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-sm transition-all ${
                              isCompleted
                                ? 'bg-[#10B981] text-white shadow-md'
                                : isCurrent
                                ? 'bg-[#D4FF5A] text-[#101426] ring-4 ring-[#D4FF5A]/30 scale-110 shadow-lg'
                                : isDark
                                ? 'bg-[#101426] border-2 border-white/20 text-slate-500'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : (
                              <span>0{stage.id}</span>
                            )}
                          </div>

                          <div className="mt-3">
                            <span
                              className={`text-xs font-display font-bold block ${
                                isCurrent
                                  ? isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'
                                  : isCompleted
                                  ? isDark ? 'text-white' : 'text-slate-900'
                                  : 'text-slate-400'
                              }`}
                            >
                              {stage.short}
                            </span>
                            <span className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">
                              {stage.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* MOBILE VERTICAL TIMELINE */}
                <div className={`lg:hidden relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 ${
                  isDark ? 'before:bg-white/10' : 'before:bg-slate-200'
                }`}>
                  {STAGES.map((stage) => {
                    const isCompleted = currentStageIndex > stage.id;
                    const isCurrent = currentStageIndex === stage.id;

                    return (
                      <div key={stage.id} className="relative">
                        <div
                          className={`absolute -left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-[#10B981] text-white'
                              : isCurrent
                              ? 'bg-[#D4FF5A] text-[#101426] ring-4 ring-[#D4FF5A]/30'
                              : isDark
                              ? 'bg-[#101426] border border-white/20 text-slate-500'
                              : 'bg-white border border-slate-300 text-slate-400'
                          }`}
                        >
                          {isCompleted ? '✓' : stage.id}
                        </div>

                        <div
                          className={`p-4 rounded-2xl border transition-all ${
                            isCurrent
                              ? isDark ? 'bg-white/10 border-[#D4FF5A]' : 'bg-white border-[#4563FF] shadow-xs'
                              : isCompleted
                              ? isDark ? 'bg-white/5 border-white/15' : 'bg-white border-slate-200'
                              : 'bg-transparent border-transparent opacity-50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-sm font-display font-bold ${
                              isCurrent 
                                ? isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]' 
                                : isDark ? 'text-white' : 'text-slate-800'
                            }`}>
                              {stage.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4FF5A] text-[#101426]">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* HR Notes / Remarks if left by Admin */}
                {candidate.admin_notes && (
                  <div className={`mt-6 p-5 rounded-2xl border space-y-1.5 animate-in fade-in ${
                    isDark 
                      ? 'bg-[#D4FF5A]/10 border-[#D4FF5A]/30 text-white' 
                      : 'bg-emerald-50 border-emerald-300 text-slate-900'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-display font-bold text-[#10B981] uppercase tracking-wider">
                      <MessageSquare className="w-4 h-4" />
                      <span>Note from FinTalent HR Team:</span>
                    </div>
                    <p className="text-sm font-medium">{candidate.admin_notes}</p>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className={`pt-4 border-t flex items-center justify-between text-xs shrink-0 ${
          isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Encrypted Supabase Database</span>
          </div>

          <button
            onClick={onClose}
            className={`font-semibold px-4 py-2 rounded-xl transition cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
              isDark ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
