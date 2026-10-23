import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import {
  uploadResumeToSupabase,
  submitCandidateProfile,
  PRACTICE_DOMAINS,
  QUALIFICATIONS,
  FirmRequest,
  Candidate,
} from '../lib/supabase';
import { CelebrationModal } from './CelebrationModal';
import { useTheme } from '../context/ThemeContext';

interface CandidateFormProps {
  onTrackNow: (phone: string, dob: string) => void;
  initialDomain?: string | null;
  selectedRole?: FirmRequest | null;
  onClearSelectedRole?: () => void;
  onCandidateSubmitted?: (cand: Candidate) => void;
}

const CITY_QUICK_PICKS = ['Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad'];
const CTC_QUICK_PICKS = [
  '₹20K - ₹35K / mo',
  '8 - 12 LPA',
  '12 - 18 LPA',
  '18 - 26 LPA',
  '28+ LPA',
];
const EXP_QUICK_PICKS = ['0', '1', '2', '3', '5', '8'];

export const CandidateForm: React.FC<CandidateFormProps> = ({
  onTrackNow,
  initialDomain,
  selectedRole,
  onClearSelectedRole,
  onCandidateSubmitted,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState<string>(QUALIFICATIONS[0]);
  const [domain, setDomain] = useState<string>(PRACTICE_DOMAINS[0]);
  const [experience, setExperience] = useState<string>('2');
  const [location, setLocation] = useState('Mumbai');
  const [expectedCtc, setExpectedCtc] = useState('14 - 18 LPA');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStep, setUploadStep] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [showCelebration, setShowCelebration] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [submittedDob, setSubmittedDob] = useState('');

  useEffect(() => {
    if (initialDomain && PRACTICE_DOMAINS.includes(initialDomain as any)) {
      setDomain(initialDomain);
    }
  }, [initialDomain]);

  useEffect(() => {
    if (selectedRole) {
      if (PRACTICE_DOMAINS.includes(selectedRole.domain as any)) {
        setDomain(selectedRole.domain);
      }
      if (selectedRole.city) setLocation(selectedRole.city);
      if (selectedRole.budget_range) setExpectedCtc(selectedRole.budget_range);
      if (selectedRole.domain === 'CA Articleship & Trainee Roles') {
        setQualification('CA Article Assistant / Trainee');
        setExperience('0');
      }
    }
  }, [selectedRole]);

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return 'Only PDF documents (.pdf) are accepted. Please select a PDF resume.';
    }
    if (file.size > 2 * 1024 * 1024) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      return `Resume size is ${sizeMb} MB (Max allowed is 2.0 MB). Please upload a compressed PDF.`;
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const err = validateFile(file);
      if (err) {
        setErrorMessage(err);
        setResumeFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setResumeFile(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const err = validateFile(file);
      if (err) {
        setErrorMessage(err);
        setResumeFile(null);
      } else {
        setErrorMessage(null);
        setResumeFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!dob) {
      setErrorMessage('Please select your Date of Birth (used as your live status key).');
      return;
    }
    if (!resumeFile) {
      setErrorMessage('Please attach your PDF resume (up to 2.0 MB) before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadStep('Uploading PDF resume...');
      const resumeUrl = await uploadResumeToSupabase(resumeFile, cleanPhone, fullName);

      setUploadStep('Syncing profile to live talent desk...');
      const created = await submitCandidateProfile({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: cleanPhone,
        dob: dob.trim(),
        qualification,
        domain,
        experience_years: parseFloat(experience) || 0,
        current_location: location.trim() || 'Mumbai',
        expected_ctc: expectedCtc.trim() || 'As per industry norms',
        resume_url: resumeUrl,
        status: 'Application Received',
        admin_notes: selectedRole
          ? `Direct fast-apply for: ${selectedRole.role_needed} at ${selectedRole.organization_name}`
          : null,
      });

      setSubmittedName(fullName.trim());
      setSubmittedPhone(cleanPhone);
      setSubmittedDob(dob.trim());
      setShowCelebration(true);
      onCandidateSubmitted?.(created);

      setFullName('');
      setEmail('');
      setPhone('');
      setDob('');
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
      setUploadStep('');
    }
  };

  const inputBaseClass = isDark
    ? 'bg-black/45 border-white/15 focus:border-[#C8FF32] text-white placeholder:text-slate-500'
    : 'bg-[#FAF7F0] border-[#0D1017]/25 focus:border-[#3B5BFF] text-[#0D1017] placeholder:text-slate-400';

  return (
    <div id="candidate-form" className="scroll-mt-24">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Selected Role Context Pill (if user clicked Apply on a live job) */}
        {selectedRole && (
          <div className="p-4 rounded-2xl bg-[#C8FF32]/15 border border-[#C8FF32]/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C8FF32] text-[#090B10] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-mono uppercase text-[10px] font-bold tracking-wider block opacity-80">
                  Fast-Track Role Pre-Selected
                </span>
                <strong className="font-display font-extrabold">
                  {selectedRole.role_needed} · {selectedRole.organization_name} ({selectedRole.budget_range})
                </strong>
              </div>
            </div>
            {onClearSelectedRole && (
              <button
                type="button"
                onClick={onClearSelectedRole}
                className="p-1.5 rounded-lg hover:bg-black/20 cursor-pointer"
                aria-label="Clear selected role"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-500 flex items-start gap-2.5 text-xs sm:text-sm font-semibold"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Row 1: 1-Tap Qualification Chips */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider opacity-80">
            01 · Tap Your Qualification
          </label>
          <div className="flex flex-wrap gap-2">
            {QUALIFICATIONS.map((q) => {
              const active = qualification === q;
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQualification(q)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    active
                      ? 'bg-[#C8FF32] text-[#090B10] border-[#C8FF32] shadow-sm'
                      : isDark
                      ? 'bg-white/[0.04] text-slate-300 border-white/12 hover:border-white/30'
                      : 'bg-white text-slate-700 border-[#0D1017]/20 hover:border-[#0D1017]'
                  }`}
                >
                  {q}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: 1-Tap Practice Domain Chips */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider opacity-80">
            02 · Preferred Domain
          </label>
          <div className="flex flex-wrap gap-2">
            {PRACTICE_DOMAINS.map((d) => {
              const active = domain === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDomain(d)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    active
                      ? 'bg-[#3B5BFF] text-white border-[#3B5BFF] shadow-sm'
                      : isDark
                      ? 'bg-white/[0.04] text-slate-300 border-white/12 hover:border-white/30'
                      : 'bg-white text-slate-700 border-[#0D1017]/20 hover:border-[#0D1017]'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Compact 4-Field Personal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="cand-name"
              className="block text-xs font-bold mb-1.5"
            >
              Full Name <span className="text-[#FF6B4A]">*</span>
            </label>
            <input
              id="cand-name"
              type="text"
              required
              placeholder="CA Rohit Agrawal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${inputBaseClass}`}
            />
          </div>

          <div>
            <label
              htmlFor="cand-phone"
              className="block text-xs font-bold mb-1.5"
            >
              WhatsApp / Mobile <span className="text-[#FF6B4A]">*</span>
            </label>
            <div className={`flex rounded-xl border overflow-hidden ${inputBaseClass}`}>
              <span className="px-3 text-xs font-mono font-bold flex items-center border-r border-current/15 opacity-75">
                +91
              </span>
              <input
                id="cand-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                required
                placeholder="9820012345"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2.5 text-sm font-mono bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cand-email"
              className="block text-xs font-bold mb-1.5"
            >
              Email ID <span className="text-[#FF6B4A]">*</span>
            </label>
            <input
              id="cand-email"
              type="email"
              required
              placeholder="rohit.ca@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${inputBaseClass}`}
            />
          </div>

          <div>
            <label
              htmlFor="cand-dob"
              className="block text-xs font-bold mb-1.5"
            >
              Date of Birth (Status Key) <span className="text-[#FF6B4A]">*</span>
            </label>
            <input
              id="cand-dob"
              type="date"
              required
              max="2010-01-01"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono outline-none cursor-pointer transition ${inputBaseClass}`}
            />
          </div>
        </div>

        {/* Row 4: Experience + City + Expected CTC (with 1-Tap Speed Chips!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Experience */}
          <div>
            <label htmlFor="cand-exp" className="block text-xs font-bold mb-1.5">
              Experience (Years)
            </label>
            <input
              id="cand-exp"
              type="number"
              min="0"
              max="35"
              step="0.5"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono outline-none transition ${inputBaseClass}`}
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {EXP_QUICK_PICKS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setExperience(yr)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold cursor-pointer ${
                    experience === yr
                      ? 'bg-[#C8FF32] text-[#090B10]'
                      : isDark
                      ? 'bg-white/6 text-slate-400 hover:text-white'
                      : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {yr === '0' ? 'Fresher' : `${yr}y`}
                </button>
              ))}
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="cand-city" className="block text-xs font-bold mb-1.5">
              Preferred / Current City
            </label>
            <input
              id="cand-city"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Mumbai / Bengaluru"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${inputBaseClass}`}
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {CITY_QUICK_PICKS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setLocation(c)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer ${
                    location === c
                      ? 'bg-[#C8FF32] text-[#090B10]'
                      : isDark
                      ? 'bg-white/6 text-slate-400 hover:text-white'
                      : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Expected CTC */}
          <div>
            <label htmlFor="cand-ctc" className="block text-xs font-bold mb-1.5">
              Expected CTC / Stipend
            </label>
            <input
              id="cand-ctc"
              type="text"
              value={expectedCtc}
              onChange={(e) => setExpectedCtc(e.target.value)}
              placeholder="14 - 18 LPA"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${inputBaseClass}`}
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {CTC_QUICK_PICKS.map((comp) => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => setExpectedCtc(comp)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold cursor-pointer ${
                    expectedCtc === comp
                      ? 'bg-[#C8FF32] text-[#090B10]'
                      : isDark
                      ? 'bg-white/6 text-slate-400 hover:text-white'
                      : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 5: Sleek Inline Resume PDF Drop + Instant Submit CTA Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch pt-2">
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            className={`lg:col-span-7 border-2 border-dashed rounded-2xl px-5 py-4 flex items-center justify-between gap-4 cursor-pointer transition ${
              dragActive
                ? 'border-[#C8FF32] bg-[#C8FF32]/10'
                : resumeFile
                ? 'border-[#12B886] bg-[#12B886]/10'
                : isDark
                ? 'border-white/20 hover:border-[#C8FF32]/60 bg-black/30'
                : 'border-[#0D1017]/25 hover:border-[#3B5BFF] bg-[#FAF7F0]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  resumeFile
                    ? 'bg-[#12B886] text-white'
                    : 'bg-[#3B5BFF]/15 text-[#3B5BFF]'
                }`}
              >
                {resumeFile ? (
                  <FileText className="w-5 h-5" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-sm truncate">
                  {resumeFile
                    ? resumeFile.name
                    : 'Drop Resume PDF here or tap to browse'}
                </p>
                <p className="text-xs opacity-70 font-mono">
                  {resumeFile
                    ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB · Ready to upload`
                    : 'PDF only · Max 2.0 MB · Shared only with vetted partners'}
                </p>
              </div>
            </div>

            {resumeFile && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setResumeFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-xs font-bold text-rose-500 hover:underline shrink-0 cursor-pointer"
              >
                Replace
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="lg:col-span-5 neo-btn-pop rounded-2xl bg-[#C8FF32] hover:bg-[#b8f21e] text-[#090B10] font-display font-extrabold text-base px-6 py-4 flex flex-col items-center justify-center gap-0.5 shadow-xl cursor-pointer disabled:opacity-60 min-h-[72px]"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2 text-sm">
                <Loader2 className="w-5 h-5 animate-spin" />
                {uploadStep || 'Submitting...'}
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4 fill-current" />
                  Submit Profile in 1 Click
                </span>
                <span className="text-[11px] font-mono font-semibold opacity-75">
                  100% Free · Instant Live Tracking ID
                </span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] opacity-70 pt-1">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#12B886]" />
            Confidential ICAI-compliant screening · Zero spam calls
          </span>
          <span className="font-mono">Mobile + DOB = Your Private Live Status Passkey</span>
        </div>
      </form>

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        candidateName={submittedName || submittedPhone}
        phone={submittedPhone}
        dob={submittedDob}
        onTrackNow={(ph, db) => {
          setShowCelebration(false);
          onTrackNow(ph, db);
        }}
      />
    </div>
  );
};
