import React, { useState, useEffect } from 'react';
import { 
  X, Search, Phone, Calendar, CheckCircle2, Clock, 
  AlertCircle, Loader2, FileText, ExternalLink, ShieldCheck, 
  MessageSquare, User, MapPin, Briefcase, Award, ArrowRight, Sparkles
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top brand header strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600" />
        
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Search className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-950 font-headline tracking-tight">
                Track Application Status
              </h3>
              <p className="text-xs text-slate-500">
                Live recruitment pipeline tracker (Mobile + DOB Authentication)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto py-5 space-y-6 flex-1 pr-1">
          {/* Search Inputs */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Mobile Number
                </label>
                <div className="flex rounded-xl border border-slate-300 bg-white focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 overflow-hidden">
                  <span className="px-3 bg-slate-100 text-slate-500 font-semibold text-xs flex items-center border-r border-slate-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full px-3 py-2 text-sm outline-none font-mono text-slate-900"
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Date of Birth (DOB)
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm outline-none font-mono text-slate-900 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-sm transition shadow-2xs disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Querying Live Supabase Records...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Check Current Status</span>
                </>
              )}
            </button>
          </div>

          {/* Friendly Alert if Error / No Match */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
              {onSwitchToApply && (
                <div className="pt-1 pl-7">
                  <button
                    onClick={() => {
                      onClose();
                      onSwitchToApply();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                  >
                    <span>Click here to submit your profile now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Match Found: Candidate Details & 5-Stage Swiggy/Amazon Progress Tracker */}
          {candidate && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Profile Card Summary */}
              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="text-lg font-bold text-white font-headline flex items-center gap-2">
                      <span>{candidate.full_name}</span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/40 font-semibold font-sans">
                        {candidate.qualification}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      {candidate.domain} • {candidate.experience_years} Yrs Exp • {candidate.current_location}
                    </div>
                  </div>

                  <div className="text-right sm:self-center">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Current Status</span>
                    <span className="text-sm font-bold text-emerald-400 font-headline">
                      {candidate.status}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Registered on {new Date(candidate.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>

                  {candidate.resume_url && (
                    <a
                      href={candidate.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white font-semibold underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Uploaded Resume PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* 5-Stage Visual Progress Timeline */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-headline tracking-tight flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Hiring Progress Timeline
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time updates as your profile progresses across screening & interviews.
                  </p>
                </div>

                {/* Vertical Timeline */}
                <div className="relative pl-6 sm:pl-8 space-y-5 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {STAGES.map((stage) => {
                    const isCompleted = currentStageIndex > stage.id;
                    const isCurrent = currentStageIndex === stage.id;

                    return (
                      <div key={stage.id} className="relative group">
                        {/* Dot indicator on vertical line */}
                        <div
                          className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-slate-900 text-emerald-400 ring-4 ring-emerald-100'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="text-[11px] font-bold">{stage.id}</span>
                          )}
                        </div>

                        {/* Stage details */}
                        <div
                          className={`p-3.5 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-white border-slate-900 shadow-xs'
                              : isCompleted
                              ? 'bg-white border-slate-200'
                              : 'bg-slate-100/60 border-slate-200/60 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-sm font-bold font-headline ${
                                isCurrent
                                  ? 'text-slate-950'
                                  : isCompleted
                                  ? 'text-slate-800'
                                  : 'text-slate-500'
                              }`}
                            >
                              {stage.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-slate-900 text-emerald-400 font-sans">
                                Active Stage
                              </span>
                            )}
                            {isCompleted && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase tracking-wider font-sans">
                                Completed ✓
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
                  <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      <MessageSquare className="w-3.5 h-3.5" />
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
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Verification</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-semibold px-4 py-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
