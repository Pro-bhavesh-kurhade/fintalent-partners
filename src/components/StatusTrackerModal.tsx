import React, { useState, useEffect } from 'react';
import { 
  X, Search, Phone, Calendar, CheckCircle2, Clock, 
  AlertCircle, Loader2, FileText, ExternalLink, ShieldCheck, 
  MessageSquare, User, ArrowRight, Sparkles, Award 
} from 'lucide-react';
import { trackCandidateStatus, STAGES, Candidate } from '../lib/supabase';

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
  const [phone, setPhone] = useState(initialPhone);
  const [dob, setDob] = useState(initialDob);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialPhone) setPhone(initialPhone);
    if (initialDob) setDob(initialDob);
    if (initialPhone && initialDob && isOpen) {
      handleSearch(initialPhone, initialDob);
    }
  }, [initialPhone, initialDob, isOpen]);

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
      setHasSearched(true);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#101426]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#101426] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative overflow-hidden max-h-[92vh] flex flex-col text-white">
        
        {/* Top vibrant gradient strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4563FF] via-[#D4FF5A] to-[#10B981]" />
        
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center font-bold">
              <Search className="w-5 h-5 text-[#D4FF5A]" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight uppercase">
                APPLICATION STATUS TRACKER
              </h3>
              <p className="text-xs text-slate-400">
                Live recruitment pipeline tracker (Mobile + DOB Authentication)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-5 space-y-6 flex-1 pr-1">
          
          {/* Search Inputs */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Registered Mobile Number
                </label>
                <div className="flex rounded-xl border border-white/15 bg-white/5 focus-within:border-[#4563FF] focus-within:ring-2 focus-within:ring-[#4563FF]/30 overflow-hidden">
                  <span className="px-3.5 bg-white/10 text-slate-300 font-bold text-xs flex items-center border-r border-white/10">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full px-3.5 py-2.5 text-sm outline-none font-mono text-white bg-transparent"
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Date of Birth (DOB)
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 focus:border-[#4563FF] focus:ring-2 focus:ring-[#4563FF]/30 text-sm outline-none font-mono text-white cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-bold py-3 px-6 rounded-xl text-sm transition shadow-lg shadow-[#D4FF5A]/20 cursor-pointer disabled:opacity-60"
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
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-2 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
              {onSwitchToApply && (
                <div className="pt-2 pl-7">
                  <button
                    onClick={() => {
                      onClose();
                      onSwitchToApply();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4FF5A] hover:underline cursor-pointer"
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
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-display font-extrabold text-xl text-white">
                        {candidate.full_name}
                      </h4>
                      <span className="text-xs bg-[#D4FF5A]/20 text-[#D4FF5A] px-3 py-1 rounded-full font-bold border border-[#D4FF5A]/30">
                        {candidate.qualification}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1.5 flex flex-wrap gap-2">
                      <span>{candidate.domain}</span>
                      <span>·</span>
                      <span>{candidate.experience_years} Years Experience</span>
                      <span>·</span>
                      <span>{candidate.current_location}</span>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                      Current Stage:
                    </span>
                    <span className="text-base font-display font-bold text-[#D4FF5A]">
                      {candidate.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Registered on {new Date(candidate.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>

                  {candidate.resume_url && (
                    <a
                      href={candidate.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#D4FF5A] hover:underline font-bold"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Uploaded Resume PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* 5-Stage Visual Progress Timeline: Horizontal on Desktop, Vertical on Mobile */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-base text-white tracking-tight flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4FF5A]" />
                    <span>5-Stage Recruitment Timeline</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Real-time status updates from our executive screening and partner interview rounds.
                  </p>
                </div>

                {/* DESKTOP HORIZONTAL TIMELINE */}
                <div className="hidden lg:block pt-4 pb-2">
                  <div className="relative flex items-center justify-between">
                    {/* Connecting background line */}
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-white/10 -z-0" />
                    
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
                                ? 'bg-[#10B981] text-[#101426] shadow-lg shadow-[#10B981]/30'
                                : isCurrent
                                ? 'bg-[#D4FF5A] text-[#101426] ring-4 ring-[#D4FF5A]/30 scale-110 shadow-xl shadow-[#D4FF5A]/40'
                                : 'bg-[#101426] border-2 border-white/20 text-slate-500'
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
                                  ? 'text-[#D4FF5A]'
                                  : isCompleted
                                  ? 'text-white'
                                  : 'text-slate-500'
                              }`}
                            >
                              {stage.short}
                            </span>
                            <span className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                              {stage.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* MOBILE VERTICAL TIMELINE */}
                <div className="lg:hidden relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {STAGES.map((stage) => {
                    const isCompleted = currentStageIndex > stage.id;
                    const isCurrent = currentStageIndex === stage.id;

                    return (
                      <div key={stage.id} className="relative">
                        <div
                          className={`absolute -left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-[#10B981] text-[#101426]'
                              : isCurrent
                              ? 'bg-[#D4FF5A] text-[#101426] ring-4 ring-[#D4FF5A]/30'
                              : 'bg-[#101426] border border-white/20 text-slate-500'
                          }`}
                        >
                          {isCompleted ? '✓' : stage.id}
                        </div>

                        <div
                          className={`p-4 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-white/10 border-[#D4FF5A]'
                              : isCompleted
                              ? 'bg-white/5 border-white/15'
                              : 'bg-transparent border-white/5 opacity-50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-sm font-display font-bold ${isCurrent ? 'text-[#D4FF5A]' : 'text-white'}`}>
                              {stage.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4FF5A] text-[#101426]">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* HR Notes / Remarks if left by Admin */}
                {candidate.admin_notes && (
                  <div className="mt-6 p-5 rounded-2xl bg-[#D4FF5A]/10 border border-[#D4FF5A]/30 text-white space-y-1.5 animate-in fade-in">
                    <div className="flex items-center gap-2 text-xs font-display font-bold text-[#D4FF5A] uppercase tracking-wider">
                      <MessageSquare className="w-4 h-4" />
                      <span>Note from FinTalent HR Team:</span>
                    </div>
                    <p className="text-sm text-slate-200">{candidate.admin_notes}</p>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4FF5A]" />
            <span>Encrypted Supabase Database</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white font-semibold px-4 py-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
