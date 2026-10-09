import React, { useState, useRef } from 'react';
import { 
  FileText, Upload, CheckCircle2, AlertCircle, Loader2, 
  User, Mail, Phone, Calendar, Briefcase, Award, MapPin, 
  IndianRupee, ShieldCheck, Sparkles 
} from 'lucide-react';
import { uploadResumeToSupabase, submitCandidateProfile } from '../lib/supabase';
import { CelebrationModal } from './CelebrationModal';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validations
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!dob) {
      setErrorMessage('Please select your Date of Birth (used for confidential status tracking).');
      return;
    }
    if (!resumeFile) {
      setErrorMessage('Please upload your resume in PDF format (Max 2MB).');
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadStep('Uploading resume PDF to Supabase Storage...');

      // 1. Upload resume to Supabase Storage 'resumes' bucket
      const resumeUrl = await uploadResumeToSupabase(resumeFile, cleanPhone, fullName);

      // 2. Insert into Supabase table public.candidates
      setUploadStep('Registering your candidate profile in Supabase...');
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
    <section id="candidate-form" className="py-20 lg:py-28 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Candidate Placement Desk • 100% Free</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-headline tracking-tight">
            Submit Your Finance Profile & Resume
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Directly connect with senior partners and hiring directors at premier CA Firms, Big 4 Alumni networks, and Fortune 500 Corporates.
          </p>
        </div>

        {/* Clean Executive Card Form */}
        <div className="bg-slate-50/70 rounded-2xl overflow-hidden shadow-xs border border-slate-200/90">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Confidential Talent Registry • Secure Supabase Cloud Storage
              </span>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
              PDF Max 2.0 MB
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8 bg-white">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-sm font-medium">{errorMessage}</div>
              </div>
            )}

            {/* Grid 1: Personal & Contact */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                Step 1: Personal & Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CA Rohit Agrawal"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>

                {/* 2. Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rohit.ca@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>

                {/* 3. Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number (10 Digits) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex rounded-xl border border-slate-300 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 overflow-hidden bg-white">
                    <span className="inline-flex items-center px-3.5 bg-slate-100 text-slate-600 font-semibold text-xs border-r border-slate-300">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-2.5 text-slate-900 text-sm outline-none font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Used alongside DOB to check your application status.</p>
                </div>

                {/* 4. Date of Birth (DOB) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date of Birth (DOB) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    max="2010-01-01"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 text-sm transition outline-none font-mono bg-white cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Confidential tracking key for your progress timeline.</p>
                </div>
              </div>
            </div>

            {/* Grid 2: Professional Qualifications & Domain */}
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                Step 2: Qualifications & Core Domain
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 5. Qualification */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Qualification <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 text-sm transition outline-none bg-white cursor-pointer"
                  >
                    {QUALIFICATIONS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Core Domain Specialization */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Core Domain Specialization <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 text-sm transition outline-none bg-white cursor-pointer"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 7. Total Experience */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Total Experience (Years) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="35"
                    step="0.5"
                    required
                    placeholder="0 for freshers / articles"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 text-sm transition outline-none bg-white"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Enter 0 if seeking 1st year Articleship or Fresher role.</p>
                </div>

                {/* 8. Current Location / City */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Location / City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai (BKC / Andheri)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>

                {/* 9. Expected CTC / Stipend */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Expected CTC / Monthly Stipend <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12-14 LPA (or ₹15,000/mo for Article Assistant)"
                    value={expectedCtc}
                    onChange={(e) => setExpectedCtc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Grid 3: Resume Upload (Supabase Storage 'resumes' bucket) */}
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Step 3: Resume Upload (PDF Only • Max 2MB)
                </h3>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                  Supabase Verified Bucket
                </span>
              </div>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                    : resumeFile
                    ? 'border-emerald-400 bg-emerald-50/30'
                    : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {resumeFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{resumeFile.name}</div>
                    <div className="text-xs text-emerald-700 font-semibold">
                      {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Supabase Storage Upload
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setResumeFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold underline mt-1 cursor-pointer"
                    >
                      Change or replace file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      Click to browse or drag & drop your resume PDF
                    </div>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Strict 2.0 MB maximum file limit. Only authentic PDF files accepted.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submission CTA: High-contrast emerald button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-sm hover:shadow transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>{uploadStep || 'Processing Profile Submission...'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    <span>Submit Profile & Upload to Supabase</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Strict Candidate Confidentiality
                </span>
                <span>•</span>
                <span>Zero Placement Charges</span>
                <span>•</span>
                <span>Real-Time Status Tracking</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Celebratory Confirmation Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        candidateName={submittedPhone}
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
