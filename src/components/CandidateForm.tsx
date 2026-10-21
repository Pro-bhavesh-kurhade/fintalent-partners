import React, { useState, useRef } from 'react';
import { 
  FileText, Upload, CheckCircle2, AlertCircle, Loader2, 
  User, Mail, Calendar, Award, 
  ShieldCheck, Sparkles, ArrowRight 
} from 'lucide-react';
import { uploadResumeToSupabase, submitCandidateProfile } from '../lib/supabase';
import { CelebrationModal } from './CelebrationModal';
import { useTheme } from '../context/ThemeContext';

interface CandidateFormProps {
  onTrackNow: (phone: string, dob: string) => void;
  initialDomain?: string | null;
}

export const QUALIFICATIONS = [
  'Qualified CA',
  'CA Inter / Semi-Qualified',
  'CA Article Assistant / Trainee',
  'CMA (Cost Accountant)',
  'ACCA / CS / CFA',
  'MBA (Finance)',
  'B.Com / M.Com / Senior Accountant',
] as const;

export const DOMAINS = [
  'Statutory Audit & Assurance',
  'Direct Taxation & Litigations',
  'Indirect Tax / GST',
  'FP&A & Corporate Finance',
  'Accounting, Finalization & ERP (Tally/SAP)',
] as const;

export const CandidateForm: React.FC<CandidateFormProps> = ({ onTrackNow, initialDomain }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState<string>(QUALIFICATIONS[0]);
  const [domain, setDomain] = useState<string>(DOMAINS[0]);

  React.useEffect(() => {
    if (initialDomain && DOMAINS.includes(initialDomain as any)) {
      setDomain(initialDomain);
    }
  }, [initialDomain]);

  const [experience, setExperience] = useState<string>('1');
  const [location, setLocation] = useState('');
  const [expectedCtc, setExpectedCtc] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Step active tab in the form
  const [activeStep, setActiveStep] = useState<number>(1);

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStep, setUploadStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Success modal state
  const [showCelebration, setShowCelebration] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [submittedDob, setSubmittedDob] = useState('');

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return 'Only PDF documents (.pdf) are allowed. Please convert your resume to PDF.';
    }
    const maxSizeBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeBytes) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      return `File size is ${sizeMb} MB. The maximum allowed resume size is 2.0 MB. Please compress or optimize your PDF.`;
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        setResumeFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setResumeFile(file);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        setResumeFile(null);
      } else {
        setResumeFile(file);
      }
    }
  };

  const validateStep1 = (): boolean => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return false;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!dob) {
      setErrorMessage('Please select your Date of Birth.');
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!location.trim()) {
      setErrorMessage('Please enter your current location.');
      return false;
    }
    if (!expectedCtc.trim()) {
      setErrorMessage('Please enter your expected CTC or stipend.');
      return false;
    }
    return true;
  };

  const handleStepClick = (stepTarget: number) => {
    if (stepTarget === 1) {
      setErrorMessage(null);
      setActiveStep(1);
      return;
    }
    if (stepTarget === 2) {
      if (!validateStep1()) {
        setActiveStep(1);
        return;
      }
      setErrorMessage(null);
      setActiveStep(2);
      return;
    }
    if (stepTarget === 3) {
      if (!validateStep1()) {
        setActiveStep(1);
        return;
      }
      if (!validateStep2()) {
        setActiveStep(2);
        return;
      }
      setErrorMessage(null);
      setActiveStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validations
    if (!validateStep1()) {
      setActiveStep(1);
      return;
    }
    if (!validateStep2()) {
      setActiveStep(2);
      return;
    }
    if (!resumeFile) {
      setErrorMessage('Please upload your resume in PDF format (Max 2MB).');
      setActiveStep(3);
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');

    try {
      setIsSubmitting(true);
      setUploadStep('Uploading resume PDF to Supabase Storage...');

      // 1. Upload resume to Supabase Storage 'resumes' bucket
      const resumeUrl = await uploadResumeToSupabase(resumeFile, cleanPhone, fullName);

      // 2. Insert into Supabase table public.candidates
      setUploadStep('Registering candidate profile in Supabase...');
      await submitCandidateProfile({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: cleanPhone,
        dob: dob.trim(),
        qualification,
        domain,
        experience_years: parseFloat(experience) || 0,
        current_location: location.trim() || 'Not Specified',
        expected_ctc: expectedCtc.trim() || 'As per industry norms',
        resume_url: resumeUrl,
        status: 'Application Received',
        admin_notes: null,
      });

      // Stash for tracking confirmation
      setSubmittedPhone(cleanPhone);
      setSubmittedDob(dob.trim());
      setShowCelebration(true);

      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setDob('');
      setExperience('1');
      setLocation('');
      setExpectedCtc('');
      setResumeFile(null);
      setActiveStep(1);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      console.error('Candidate submission error:', err);
      setErrorMessage(err.message || 'Failed to submit candidate profile. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
      setUploadStep('');
    }
  };

  return (
    <section 
      id="candidate-form" 
      className={`py-20 lg:py-28 border-b scroll-mt-20 transition-colors duration-200 ${
        isDark 
          ? 'bg-[#0E1222] border-white/10 text-white' 
          : 'bg-[#F7F6F2] border-slate-200 text-[#101426]'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div 
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
              isDark 
                ? 'bg-white/5 border-white/10 text-[#D4FF5A]' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-2xs'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="font-display font-bold uppercase tracking-wider text-[11px]">
              CANDIDATE DESK · 100% FREE
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase">
            SUBMIT YOUR PROFILE & RESUME
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Fast-track your application to leading CA Firms, multinational corporations, and high-growth startups across India.
          </p>
        </div>

        {/* Digital Product Form Container */}
        <div 
          className={`rounded-3xl overflow-hidden shadow-2xl border transition-colors ${
            isDark 
              ? 'bg-[#101426] border-white/15' 
              : 'bg-white border-slate-200/90'
          }`}
        >
          
          {/* Top Step Bar */}
          <div className={`p-4 sm:p-6 border-b ${
            isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-900 text-white border-slate-800'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#D4FF5A] shrink-0" />
                <span className="font-display font-bold text-sm sm:text-base text-white">
                  Confidential Talent Registry
                </span>
              </div>
              <span className="text-xs text-[#D4FF5A] font-mono bg-white/10 px-3 py-1 rounded-full border border-white/10">
                PDF Max 2.0 MB · Supabase Secured
              </span>
            </div>

            {/* 3 Steps indicator */}
            <div className="grid grid-cols-3 gap-2 mt-5" role="tablist" aria-label="Application Steps">
              <button
                type="button"
                role="tab"
                aria-selected={activeStep === 1}
                aria-controls="step-panel-1"
                id="step-tab-1"
                onClick={() => handleStepClick(1)}
                className={`py-2 px-3 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-2 transition cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
                  activeStep === 1
                    ? 'bg-[#D4FF5A] text-[#101426]'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                <span>01</span>
                <span className="hidden sm:inline">Personal Details</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeStep === 2}
                aria-controls="step-panel-2"
                id="step-tab-2"
                onClick={() => handleStepClick(2)}
                className={`py-2 px-3 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-2 transition cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
                  activeStep === 2
                    ? 'bg-[#D4FF5A] text-[#101426]'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                <span>02</span>
                <span className="hidden sm:inline">Specialization</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeStep === 3}
                aria-controls="step-panel-3"
                id="step-tab-3"
                onClick={() => handleStepClick(3)}
                className={`py-2 px-3 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-2 transition cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
                  activeStep === 3
                    ? 'bg-[#D4FF5A] text-[#101426]'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                <span>03</span>
                <span className="hidden sm:inline">Resume PDF</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8" noValidate>
            {errorMessage && (
              <div 
                role="alert"
                className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-start gap-3 animate-in fade-in"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-sm font-semibold">{errorMessage}</div>
              </div>
            )}

            {/* STEP 1: Personal & Contact */}
            {activeStep === 1 && (
              <div 
                id="step-panel-1"
                role="tabpanel"
                aria-labelledby="step-tab-1"
                className="space-y-6 animate-in fade-in"
              >
                <div className={`flex items-center justify-between pb-3 border-b ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}>
                  <h3 className={`font-display font-bold text-lg flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-[#101426]'
                  }`}>
                    <User className="w-5 h-5 text-[#4563FF]" />
                    <span>Step 1: Personal & Contact Information</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">1 of 3</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* 1. Full Name */}
                  <div>
                    <label 
                      htmlFor="candidate-fullname"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="candidate-fullname"
                      type="text"
                      required
                      placeholder="e.g. CA Rohit Agrawal"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                        isDark 
                          ? 'bg-white/5 border-white/15 focus:border-[#D4FF5A] text-white focus:bg-white/10' 
                          : 'bg-slate-50/50 border-slate-300 focus:border-[#4563FF] text-slate-900 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* 2. Email */}
                  <div>
                    <label 
                      htmlFor="candidate-email"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="candidate-email"
                      type="email"
                      required
                      placeholder="e.g. rohit.ca@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                        isDark 
                          ? 'bg-white/5 border-white/15 focus:border-[#D4FF5A] text-white focus:bg-white/10' 
                          : 'bg-slate-50/50 border-slate-300 focus:border-[#4563FF] text-slate-900 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* 3. Mobile Number */}
                  <div>
                    <label 
                      htmlFor="candidate-phone"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Mobile Number (10 Digits) <span className="text-rose-500">*</span>
                    </label>
                    <div className={`flex rounded-xl border overflow-hidden ${
                      isDark ? 'border-white/15 bg-white/5' : 'border-slate-300 bg-white'
                    }`}>
                      <span className={`inline-flex items-center px-4 font-bold text-xs border-r ${
                        isDark ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}>
                        +91
                      </span>
                      <input
                        id="candidate-phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className={`w-full px-4 py-3 text-sm outline-none font-mono bg-transparent ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      />
                    </div>
                    <p className={`text-[11px] mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Your confidential key used alongside DOB to track application status.
                    </p>
                  </div>

                  {/* 4. Date of Birth */}
                  <div>
                    <label 
                      htmlFor="candidate-dob"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Date of Birth (DOB) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="candidate-dob"
                      type="date"
                      required
                      max="2010-01-01"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none font-mono cursor-pointer ${
                        isDark 
                          ? 'bg-white/5 border-white/15 focus:border-[#D4FF5A] text-white focus:bg-white/10' 
                          : 'bg-slate-50/50 border-slate-300 focus:border-[#4563FF] text-slate-900 focus:bg-white'
                      }`}
                    />
                    <p className={`text-[11px] mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Confidential tracking verification password.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!validateStep1()) return;
                      setErrorMessage(null);
                      setActiveStep(2);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#4563FF] hover:bg-[#324fec] text-white font-display font-bold text-sm shadow-md transition cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#D4FF5A] outline-none"
                  >
                    <span>Continue to Specialization</span>
                    <ArrowRight className="w-4 h-4 text-[#D4FF5A]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Qualifications & Domain */}
            {activeStep === 2 && (
              <div 
                id="step-panel-2"
                role="tabpanel"
                aria-labelledby="step-tab-2"
                className="space-y-6 animate-in fade-in"
              >
                <div className={`flex items-center justify-between pb-3 border-b ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}>
                  <h3 className={`font-display font-bold text-lg flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-[#101426]'
                  }`}>
                    <Award className="w-5 h-5 text-[#4563FF]" />
                    <span>Step 2: Qualifications & Core Domain</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">2 of 3</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* 5. Qualification */}
                  <div>
                    <label 
                      htmlFor="candidate-qualification"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Primary Qualification <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="candidate-qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none cursor-pointer ${
                        isDark 
                          ? 'bg-[#151B30] border-white/15 focus:border-[#D4FF5A] text-white' 
                          : 'bg-white border-slate-300 focus:border-[#4563FF] text-slate-900'
                      }`}
                    >
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q} className={isDark ? 'bg-[#151B30] text-white' : 'bg-white text-slate-900'}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 6. Core Domain */}
                  <div>
                    <label 
                      htmlFor="candidate-domain"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Core Domain Specialization <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="candidate-domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none cursor-pointer ${
                        isDark 
                          ? 'bg-[#151B30] border-white/15 focus:border-[#D4FF5A] text-white' 
                          : 'bg-white border-slate-300 focus:border-[#4563FF] text-slate-900'
                      }`}
                    >
                      {DOMAINS.map((d) => (
                        <option key={d} value={d} className={isDark ? 'bg-[#151B30] text-white' : 'bg-white text-slate-900'}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 7. Experience */}
                  <div>
                    <label 
                      htmlFor="candidate-experience"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Total Experience (Years) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="candidate-experience"
                      type="number"
                      min="0"
                      max="35"
                      step="0.5"
                      required
                      placeholder="0 for freshers / articles"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                        isDark 
                          ? 'bg-white/5 border-white/15 focus:border-[#D4FF5A] text-white' 
                          : 'bg-slate-50/50 border-slate-300 focus:border-[#4563FF] text-slate-900'
                      }`}
                    />
                    <p className={`text-[11px] mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Enter 0 for Articleship / Fresher candidates.
                    </p>
                  </div>

                  {/* 8. Location */}
                  <div>
                    <label 
                      htmlFor="candidate-location"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Current Location / City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="candidate-location"
                      type="text"
                      required
                      placeholder="e.g. Mumbai (BKC / Andheri)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                        isDark 
                          ? 'bg-white/5 border-white/15 focus:border-[#D4FF5A] text-white' 
                          : 'bg-slate-50/50 border-slate-300 focus:border-[#4563FF] text-slate-900'
                      }`}
                    />
                  </div>

                  {/* 9. Expected CTC */}
                  <div className="md:col-span-2">
                    <label 
                      htmlFor="candidate-expected-ctc"
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Expected CTC / Monthly Stipend <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="candidate-expected-ctc"
                      type="text"
                      required
                      placeholder="e.g. 12-14 LPA (or ₹15,000/mo for Article Assistant)"
                      value={expectedCtc}
                      onChange={(e) => setExpectedCtc(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                        isDark 
                          ? 'bg-white/5 border-white/15 focus:border-[#D4FF5A] text-white' 
                          : 'bg-slate-50/50 border-slate-300 focus:border-[#4563FF] text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className={`text-xs font-bold py-2 cursor-pointer transition min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] rounded-md outline-none ${
                      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    ← Back to Step 1
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!validateStep2()) return;
                      setErrorMessage(null);
                      setActiveStep(3);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#4563FF] hover:bg-[#324fec] text-white font-display font-bold text-sm shadow-md transition cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#D4FF5A] outline-none"
                  >
                    <span>Continue to Resume Upload</span>
                    <ArrowRight className="w-4 h-4 text-[#D4FF5A]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Resume Upload */}
            {activeStep === 3 && (
              <div 
                id="step-panel-3"
                role="tabpanel"
                aria-labelledby="step-tab-3"
                className="space-y-6 animate-in fade-in"
              >
                <div className={`flex items-center justify-between pb-3 border-b ${
                  isDark ? 'border-white/10' : 'border-slate-100'
                }`}>
                  <h3 className={`font-display font-bold text-lg flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-[#101426]'
                  }`}>
                    <FileText className="w-5 h-5 text-[#4563FF]" />
                    <span>Step 3: Resume Upload (PDF Only · Max 2MB)</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">3 of 3</span>
                </div>

                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload resume PDF file"
                  className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
                    dragActive
                      ? 'border-[#4563FF] bg-[#4563FF]/10 scale-[1.01]'
                      : resumeFile
                      ? 'border-[#10B981] bg-[#10B981]/10'
                      : isDark
                      ? 'border-white/20 hover:border-[#D4FF5A] hover:bg-white/[0.02]'
                      : 'border-slate-300 hover:border-[#4563FF] hover:bg-slate-50/50'
                  }`}
                >
                  <input
                    id="candidate-resume"
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="flex flex-col items-center gap-2.5">
                      <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shadow-xs">
                        <FileText className="w-7 h-7" />
                      </div>
                      <div className={`font-display font-bold text-base ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {resumeFile.name}
                      </div>
                      <div className="text-xs text-[#10B981] font-semibold font-mono">
                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB · Verified PDF Document
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setResumeFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="text-xs text-rose-500 hover:text-rose-600 font-bold underline mt-1 cursor-pointer"
                      >
                        Change or replace file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Upload className="w-7 h-7 text-[#4563FF]" />
                      </div>
                      <div className={`font-display font-bold text-base ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        Click to select or drag & drop your resume PDF
                      </div>
                      <p className={`text-xs max-w-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Strict 2.0 MB maximum file limit. Only authentic PDF files accepted.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className={`text-xs font-bold py-2 cursor-pointer transition min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] rounded-md outline-none ${
                      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    ← Back to Step 2
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-extrabold text-base shadow-xl shadow-[#D4FF5A]/25 transition cursor-pointer active:scale-95 disabled:opacity-60 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{uploadStep || 'Submitting Profile...'}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Submit Profile & Upload to Supabase</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

      </div>

      {/* Celebratory Confirmation Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        candidateName={fullName || submittedPhone}
        phone={submittedPhone}
        dob={submittedDob}
        onTrackNow={(ph, db) => {
          setShowCelebration(false);
          onTrackNow(ph, db);
        }}
      />
    </section>
  );
};
