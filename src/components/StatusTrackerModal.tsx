import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  FileText,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
  Calendar,
  ArrowRight,
  Zap,
} from 'lucide-react';
import {
  trackCandidateStatus,
  STAGES,
  Candidate,
  getLastTrackingCredentials,
} from '../lib/supabase';
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

  const savedCreds = isOpen ? getLastTrackingCredentials() : null;

  useEffect(() => {
    if (!isOpen) return;
    const p = initialPhone || savedCreds?.phone || '';
    const d = initialDob || savedCreds?.dob || '';
    if (p) setPhone(p);
    if (d) setDob(d);
    if (p && d) {
      handleSearch(p, d);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPhone, initialDob, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
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

  const handleSearch = async (targetPhone = phone, targetDob = dob) => {
    const cleanPhone = targetPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Enter your 10-digit registered mobile number.');
      return;
    }
    if (!targetDob) {
      setErrorMsg('Select your Date of Birth.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg(null);
      const res = await trackCandidateStatus(cleanPhone, targetDob);
      if (!res) {
        setCandidate(null);
        setErrorMsg(
          'No application found for this Mobile + DOB combination. Double-check details or submit your CV in 60 seconds!'
        );
      } else {
        setCandidate(res);
      }
    } catch {
      setErrorMsg('Unable to check status right now — please retry in a moment.');
      setCandidate(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStageIndex = (statusStr: string): number => {
    const s = (statusStr || '').toLowerCase();
    if (s.includes('placed') || s.includes('offer')) return 5;
    if (s.includes('interview')) return 4;
    if (s.includes('shortlisted')) return 3;
    if (s.includes('screen')) return 2;
    return 1;
  };

  if (!isOpen) return null;

  const currentStageIndex = candidate ? getStageIndex(candidate.status) : 1;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracker-modal-title"
    >
      <div
        className={`rounded-3xl max-w-3xl w-full p-5 sm:p-8 relative overflow-hidden max-h-[92vh] flex flex-col border ${
          isDark
            ? 'bg-[#0E121E] text-white border-white/15 shadow-2xl'
            : 'bg-white text-[#0D1017] border-[2px] border-[#0D1017] shadow-[8px_8px_0px_0px_#0D1017]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-current/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#C8FF32] text-[#090B10] flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="tracker-modal-title"
                className="font-display font-extrabold text-xl sm:text-2xl tracking-tight"
              >
                Live Application Tracker
              </h3>
              <p className="text-xs opacity-65 font-mono">
                Instant 5-Stage Pipeline Lookup · Mobile + DOB Passkey
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-current/10 flex items-center justify-center cursor-pointer"
            aria-label="Close Tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto py-5 space-y-5 flex-1 pr-1">
          {savedCreds && (savedCreds.phone !== phone || !candidate) && (
            <button
              type="button"
              onClick={() => {
                setPhone(savedCreds.phone);
                setDob(savedCreds.dob);
                handleSearch(savedCreds.phone, savedCreds.dob);
              }}
              className="w-full p-3 rounded-2xl bg-[#3B5BFF]/15 border border-[#3B5BFF]/35 text-xs font-bold flex items-center justify-between cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#C8FF32]" />
                1-Tap Load Saved Passkey ({savedCreds.name || `+91 ${savedCreds.phone}`})
              </span>
              <span className="underline">Check Now →</span>
            </button>
          )}

          {/* Lookup Form */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-black/40 border-white/10' : 'bg-[#FAF7F0] border-[#0D1017]/15'
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="track-phone" className="block text-xs font-bold mb-1.5">
                  Mobile Number
                </label>
                <div
                  className={`flex rounded-xl border overflow-hidden ${
                    isDark ? 'bg-[#0E121E] border-white/15' : 'bg-white border-[#0D1017]/25'
                  }`}
                >
                  <span className="px-3 text-xs font-mono font-bold flex items-center border-r border-current/15 opacity-70">
                    +91
                  </span>
                  <input
                    id="track-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9820012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full px-3 py-2.5 text-sm font-mono bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="track-dob" className="block text-xs font-bold mb-1.5">
                  Date of Birth
                </label>
                <input
                  id="track-dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono outline-none cursor-pointer ${
                    isDark ? 'bg-[#0E121E] border-white/15' : 'bg-white border-[#0D1017]/25'
                  }`}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="neo-btn-pop w-full py-3.5 px-5 rounded-xl bg-[#C8FF32] hover:bg-[#b8f21e] text-[#090B10] font-display font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking Live Pipeline...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Check Live Status</span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-[#FF6B4A]/15 border border-[#FF6B4A]/40 text-xs sm:text-sm space-y-2"
            >
              <div className="flex items-start gap-2.5 font-semibold">
                <AlertCircle className="w-5 h-5 text-[#FF6B4A] shrink-0" />
                <span>{errorMsg}</span>
              </div>
              {onSwitchToApply && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToApply();
                  }}
                  className="pl-7 inline-flex items-center gap-1.5 font-display font-bold text-xs text-[#C8FF32] underline cursor-pointer"
                >
                  <span>Drop your CV now in 60 seconds</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Candidate Pipeline Result */}
          {candidate && (
            <div className="space-y-5">
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-white/[0.04] border-white/12' : 'bg-[#FAF7F0] border-[#0D1017]/15'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display font-extrabold text-xl">
                        {candidate.full_name}
                      </h4>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#12B886]/20 text-[#12B886]">
                        {candidate.qualification}
                      </span>
                    </div>
                    <p className="text-xs opacity-75 mt-1">
                      {candidate.domain} · {candidate.experience_years} yrs · {candidate.current_location}
                    </p>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-xs self-start sm:self-auto">
                    {candidate.status}
                  </div>
                </div>

                <div className="pt-2 border-t border-current/10 flex flex-wrap items-center justify-between gap-3 text-xs opacity-80">
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    Registered{' '}
                    {new Date(candidate.created_at || Date.now()).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>

                  {candidate.resume_url && (
                    <a
                      href={candidate.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-[#3B5BFF] dark:text-[#C8FF32] hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Open Uploaded PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Clean 5-Stage Progress List */}
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-black/35 border-white/10' : 'bg-white border-[#0D1017]/15'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-75">
                  <Clock className="w-4 h-4 text-[#FF6B4A]" />
                  <span>Live 5-Stage Recruitment Progress</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
                  {STAGES.map((stage) => {
                    const completed = currentStageIndex > stage.id;
                    const active = currentStageIndex === stage.id;

                    return (
                      <div
                        key={stage.id}
                        className={`p-3 rounded-xl border transition ${
                          active
                            ? 'bg-[#C8FF32] text-[#090B10] border-[#C8FF32] shadow-md'
                            : completed
                            ? 'bg-[#12B886]/15 text-[#12B886] border-[#12B886]/35'
                            : 'opacity-45 border-current/15'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span>0{stage.id}</span>
                          {completed && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <p className="font-display font-extrabold text-xs mt-1.5">
                          {stage.short}
                        </p>
                        <p className="text-[10px] leading-snug mt-0.5 opacity-80">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {candidate.admin_notes && (
                  <div className="mt-3 p-4 rounded-xl bg-[#3B5BFF]/15 border border-[#3B5BFF]/35 space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-[#C8FF32]">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Recruiter Desk Note
                    </span>
                    <p className="text-xs sm:text-sm font-medium">{candidate.admin_notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-current/10 flex items-center justify-between text-xs opacity-70 shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#12B886]" />
            Synced with FinTalent Live Cloud
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold px-3 py-1.5 rounded-lg hover:bg-current/10 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
