import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Zap,
  X,
  Users,
} from 'lucide-react';
import {
  submitFirmRequirement,
  ORG_TYPES,
  PRACTICE_DOMAINS,
  VettedTalentProfile,
  FirmRequest,
  buildWhatsAppUrl,
} from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

interface EmployerFormProps {
  shortlistingTalent?: VettedTalentProfile | null;
  onClearShortlistTalent?: () => void;
  onMandateCreated?: (mandate: FirmRequest) => void;
}

const ROLE_PRESETS = [
  {
    label: 'Statutory Audit Senior',
    role: 'Senior Statutory Audit Manager',
    domain: 'Statutory Audit & Assurance',
    budget: '15 - 22 LPA',
  },
  {
    label: 'Startup FP&A Lead',
    role: 'FP&A & Strategic Finance Lead',
    domain: 'FP&A & Corporate Finance',
    budget: '22 - 30 LPA',
  },
  {
    label: 'GST Litigation Lead',
    role: 'GST Advisory & Litigation Manager',
    domain: 'Indirect Tax / GST',
    budget: '12 - 18 LPA',
  },
  {
    label: 'Direct Tax Manager',
    role: 'Direct Tax & Transfer Pricing Lead',
    domain: 'Direct Taxation & Litigations',
    budget: '14 - 20 LPA',
  },
  {
    label: 'CA Article Trainee',
    role: 'CA Article Assistant / Industrial Trainee',
    domain: 'CA Articleship & Trainee Roles',
    budget: '₹20,000 - ₹35,000 / mo',
  },
  {
    label: 'SAP / Controller',
    role: 'Finance Controller (SAP FICO / R2R)',
    domain: 'Accounting, Finalization & ERP (Tally/SAP)',
    budget: '14 - 20 LPA',
  },
];

const CITY_PRESETS = ['Mumbai (BKC)', 'Bengaluru', 'Delhi NCR', 'Pune', 'Remote / Hybrid'];

export const EmployerForm: React.FC<EmployerFormProps> = ({
  shortlistingTalent,
  onClearShortlistTalent,
  onMandateCreated,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState<string>(ORG_TYPES[0]);
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [roleNeeded, setRoleNeeded] = useState('Senior Statutory Audit Manager');
  const [domain, setDomain] = useState<string>(PRACTICE_DOMAINS[0]);
  const [budgetRange, setBudgetRange] = useState('15 - 22 LPA');
  const [city, setCity] = useState('Mumbai (BKC)');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (shortlistingTalent) {
      setRoleNeeded(`${shortlistingTalent.qualification} - ${shortlistingTalent.domain.split('&')[0].trim()}`);
      if (PRACTICE_DOMAINS.includes(shortlistingTalent.domain as any)) {
        setDomain(shortlistingTalent.domain);
      }
      setBudgetRange(shortlistingTalent.expected_ctc);
      setCity(shortlistingTalent.city);
      setIsSuccess(false);
    }
  }, [shortlistingTalent]);

  const whatsappDirectUrl = buildWhatsAppUrl(
    shortlistingTalent
      ? `Hi Ami Bhanushali, we want to shortlist candidate ${shortlistingTalent.code} (${shortlistingTalent.display_name} · ${shortlistingTalent.qualification}) for ${orgName.trim() || 'our team'}. Please share the full CV!`
      : `Hi Ami Bhanushali, urgent hiring mandate from ${orgName.trim() || 'our organization'}: ${roleNeeded.trim() || 'Finance Specialist'} (${city} · Budget: ${budgetRange}). Please share vetted CVs.`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!orgName.trim()) {
      setErrorMsg('Please enter your CA Firm or Company name.');
      return;
    }
    if (!contactPerson.trim()) {
      setErrorMsg('Please enter your Name / Designation.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit contact mobile number.');
      return;
    }
    if (!roleNeeded.trim()) {
      setErrorMsg('Please enter or select the role needed.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitFirmRequirement({
        organization_name: orgName.trim(),
        org_type: orgType,
        contact_person: contactPerson.trim(),
        contact_phone: cleanPhone,
        role_needed: roleNeeded.trim(),
        domain,
        budget_range: budgetRange.trim() || 'Open to discussion',
        city: city.trim() || 'Mumbai',
        notes: shortlistingTalent
          ? `Requested candidate ${shortlistingTalent.code} (${shortlistingTalent.display_name})`
          : undefined,
      });

      if (res.data) {
        onMandateCreated?.(res.data);
      }
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not save mandate - please tap WhatsApp Desk instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = isDark
    ? 'bg-black/45 border-white/15 focus:border-[#FF6B4A] text-white placeholder:text-slate-500'
    : 'bg-[#FAF7F0] border-[#0D1017]/25 focus:border-[#FF6B4A] text-[#0D1017] placeholder:text-slate-400';

  if (isSuccess) {
    return (
      <div id="employer-form" className="py-8 text-center space-y-6 scroll-mt-24">
        <div className="w-16 h-16 rounded-2xl bg-[#12B886]/20 text-[#12B886] border border-[#12B886]/35 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="max-w-lg mx-auto space-y-2">
          <span className="inline-block text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-[#12B886]/15 text-[#12B886]">
            Live on FinTalent Mandate Desk
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl">
            Mandate Live! 48h Shortlist Initiated.
          </h3>
          <p className="text-sm opacity-80 leading-relaxed">
            Your mandate for <strong>{roleNeeded}</strong> at <strong>{orgName}</strong> is now live on the Open Roles board and queued on Ami Bhanushali&apos;s executive desk for callback on <strong>+91 {phone}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn-pop inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Ping Ami Bhanushali on WhatsApp Now</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setOrgName('');
              setContactPerson('');
              setPhone('');
            }}
            className="px-5 py-3.5 rounded-xl border border-current/20 text-xs font-bold cursor-pointer"
          >
            Post Another Role
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="employer-form" className="scroll-mt-24">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Candidate Shortlist Banner if triggered from Talent Pool */}
        {shortlistingTalent && (
          <div className="p-4 rounded-2xl bg-[#FF6B4A]/15 border border-[#FF6B4A]/45 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B4A] text-white flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-mono uppercase text-[10px] font-bold tracking-wider block text-[#FF6B4A]">
                  Instant Candidate Shortlist Request · {shortlistingTalent.code}
                </span>
                <strong className="font-display font-extrabold">
                  {shortlistingTalent.display_name} ({shortlistingTalent.qualification} · {shortlistingTalent.expected_ctc})
                </strong>
              </div>
            </div>
            {onClearShortlistTalent && (
              <button
                type="button"
                onClick={onClearShortlistTalent}
                className="p-1.5 rounded-lg hover:bg-black/20 cursor-pointer"
                aria-label="Clear candidate selection"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {errorMsg && (
          <div
            role="alert"
            className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-500 flex items-start gap-2.5 text-xs sm:text-sm font-semibold"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1-Tap Role Presets (Zero Typing Turnaround!) */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider opacity-80">
            01 · 1-Tap Role Quick-Fill (Auto-Sets Role, Practice Area &amp; Typical CTC)
          </label>
          <div className="flex flex-wrap gap-2">
            {ROLE_PRESETS.map((preset) => {
              const active = roleNeeded === preset.role;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setRoleNeeded(preset.role);
                    setDomain(preset.domain);
                    setBudgetRange(preset.budget);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border inline-flex items-center gap-1.5 transition cursor-pointer ${
                    active
                      ? 'bg-[#FF6B4A] text-white border-[#FF6B4A] shadow-sm'
                      : isDark
                      ? 'bg-white/[0.04] text-slate-300 border-white/12 hover:border-white/30'
                      : 'bg-white text-slate-700 border-[#0D1017]/20 hover:border-[#0D1017]'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Organization Type Pills */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider opacity-80">
            02 · Organization Type
          </label>
          <div className="grid grid-cols-3 gap-2.5 max-w-xl">
            {ORG_TYPES.map((type) => {
              const active = orgType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrgType(type)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-display font-bold border transition cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-[#C8FF32] text-[#090B10] border-[#C8FF32]'
                        : 'bg-[#0D1017] text-[#C8FF32] border-[#0D1017]'
                      : isDark
                      ? 'bg-white/[0.04] text-slate-300 border-white/12'
                      : 'bg-white text-slate-700 border-[#0D1017]/20'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 2x3 Grid of Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="emp-org" className="block text-xs font-bold mb-1.5">
              CA Firm / Company Name <span className="text-[#FF6B4A]">*</span>
            </label>
            <input
              id="emp-org"
              type="text"
              required
              placeholder="S.K. Kapoor & Co. / FinStack AI"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${inputBaseClass}`}
            />
          </div>

          <div>
            <label htmlFor="emp-person" className="block text-xs font-bold mb-1.5">
              Your Name &amp; Role <span className="text-[#FF6B4A]">*</span>
            </label>
            <input
              id="emp-person"
              type="text"
              required
              placeholder="CA Saurabh Jain (Partner)"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${inputBaseClass}`}
            />
          </div>

          <div>
            <label htmlFor="emp-phone" className="block text-xs font-bold mb-1.5">
              Direct Mobile / WhatsApp <span className="text-[#FF6B4A]">*</span>
            </label>
            <div className={`flex rounded-xl border overflow-hidden ${inputBaseClass}`}>
              <span className="px-3 text-xs font-mono font-bold flex items-center border-r border-current/15 opacity-75">
                +91
              </span>
              <input
                id="emp-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                required
                placeholder="9820099887"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2.5 text-sm font-mono bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="emp-role" className="block text-xs font-bold mb-1.5">
              Position Title Needed <span className="text-[#FF6B4A]">*</span>
            </label>
            <input
              id="emp-role"
              type="text"
              required
              value={roleNeeded}
              onChange={(e) => setRoleNeeded(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${inputBaseClass}`}
            />
          </div>

          <div>
            <label htmlFor="emp-budget" className="block text-xs font-bold mb-1.5">
              CTC / Stipend Budget
            </label>
            <input
              id="emp-budget"
              type="text"
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              placeholder="15 - 22 LPA"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono outline-none transition ${inputBaseClass}`}
            />
          </div>

          <div>
            <label htmlFor="emp-city" className="block text-xs font-bold mb-1.5">
              Work Location
            </label>
            <input
              id="emp-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mumbai (BKC)"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${inputBaseClass}`}
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {CITY_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer ${
                    city === c
                      ? 'bg-[#FF6B4A] text-white'
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
        </div>

        {/* Submit & Instant WhatsApp Desk Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="neo-btn-pop flex-1 py-4 px-6 rounded-2xl bg-[#FF6B4A] hover:bg-[#f25937] text-white font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Publishing Mandate...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>
                  {shortlistingTalent
                    ? `Request ${shortlistingTalent.code} Full CV & Callback`
                    : 'Publish Mandate & Get 48h Shortlist'}
                </span>
              </>
            )}
          </button>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn-pop py-4 px-6 rounded-2xl bg-[#C8FF32] hover:bg-[#b8f21e] text-[#090B10] font-display font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Instant WhatsApp Desk</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] opacity-70 pt-1">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#12B886]" />
            Zero upfront retainer · 90-day replacement cover · NDA protected
          </span>
          <span className="font-mono">Published mandates go live on Open Roles Board</span>
        </div>
      </form>
    </div>
  );
};
