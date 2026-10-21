import React, { useState } from 'react';
import { 
  Building2, MessageCircle, Send, CheckCircle2, AlertCircle, 
  Loader2, Clock, ShieldCheck 
} from 'lucide-react';
import { submitFirmRequirement } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

export const ORG_TYPES = [
  'CA / Audit Firm',
  'Corporate / MNC',
  'Startup / MSME',
] as const;

export const EMPLOYER_DOMAINS = [
  'Statutory Audit & Assurance',
  'Direct Taxation & Litigations',
  'Indirect Tax / GST',
  'FP&A & Corporate Finance',
  'Accounting, Finalization & ERP (Tally/SAP)',
] as const;

export const EmployerForm: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState<string>(ORG_TYPES[0]);
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [roleNeeded, setRoleNeeded] = useState('');
  const [domain, setDomain] = useState<string>(EMPLOYER_DOMAINS[0]);
  const [budgetRange, setBudgetRange] = useState('');
  const [city, setCity] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Pre-calculated WhatsApp message for Amii Ma'am (+91 9821262613)
  const generateWhatsAppUrl = () => {
    const role = roleNeeded.trim() || 'Finance Professional';
    const firm = orgName.trim() || 'our Organization';
    const message = `Hi Amii Ma'am (FinTalent Partners), we have an urgent hiring requirement for ${role} at ${firm}. Please connect with us for shortlisting matching candidates.`;
    return `https://wa.me/919821262613?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!orgName.trim()) {
      setErrorMsg('Please enter your Organization / Firm name.');
      return;
    }
    if (!contactPerson.trim()) {
      setErrorMsg('Please provide the Contact Person name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!roleNeeded.trim()) {
      setErrorMsg('Please specify the role needed.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitFirmRequirement({
        organization_name: orgName.trim(),
        org_type: orgType,
        contact_person: contactPerson.trim(),
        contact_phone: cleanPhone,
        role_needed: roleNeeded.trim(),
        domain,
        budget_range: budgetRange.trim() || 'Open to discussion',
        city: city.trim() || 'Mumbai / Pan-India',
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Employer submission error:', err);
      setErrorMsg(err.message || 'Failed to submit requirement. Please try via WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setOrgName('');
    setContactPerson('');
    setPhone('');
    setRoleNeeded('');
    setBudgetRange('');
    setCity('');
    setIsSuccess(false);
    setErrorMsg(null);
  };

  return (
    <section 
      id="employer-form" 
      className={`py-20 lg:py-28 border-b scroll-mt-20 relative overflow-hidden transition-colors duration-200 ${
        isDark 
          ? 'bg-[#101426] text-white border-white/10' 
          : 'bg-white text-[#101426] border-slate-200'
      }`}
    >
      {/* Decorative ambient gradients */}
      <div 
        className={`absolute top-1/2 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#4563FF]/15' : 'bg-[#4563FF]/5'
        }`} 
      />
      <div 
        className={`absolute bottom-0 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#D4FF5A]/10' : 'bg-[#10B981]/5'
        }`} 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div 
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
              isDark 
                ? 'bg-white/5 border-white/10 text-[#4563FF]' 
                : 'bg-[#4563FF]/10 border-[#4563FF]/20 text-[#4563FF] shadow-2xs'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="font-display font-bold uppercase tracking-wider text-[11px]">
              FAST 60-SECOND MANDATE SUBMISSION
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase">
            HIRE PREMIER FINANCE & CA TALENT
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Submit your hiring requirements directly to our executive search desk led by Amii Ma'am. Receive pre-screened profiles within 48 hours.
          </p>
        </div>

        {/* Executive Container Box */}
        <div 
          className={`rounded-3xl overflow-hidden shadow-2xl border transition-colors ${
            isDark 
              ? 'bg-[#12162A] border-white/15' 
              : 'bg-[#F7F6F2] border-slate-200/90'
          }`}
        >
          
          {/* Top highlight bar */}
          <div className={`p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b ${
            isDark 
              ? 'bg-white/[0.02] border-white/10' 
              : 'bg-white border-slate-200'
          }`}>
            <div>
              <span className={`text-[11px] uppercase tracking-wider font-bold block mb-1 ${
                isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'
              }`}>
                EXECUTIVE SERVICE GUARANTEE
              </span>
              <h3 className={`font-display font-bold text-sm sm:text-base ${
                isDark ? 'text-white' : 'text-[#101426]'
              }`}>
                Pre-Vetted Profiles · 48-Hour Turnaround · Dedicated Account Lead
              </h3>
            </div>
            
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>WhatsApp Amii Ma'am</span>
            </a>
          </div>

          {isSuccess ? (
            /* Success confirmation card */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#10B981]/20 text-[#10B981] mx-auto flex items-center justify-center border border-[#10B981]/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className={`font-display font-black text-2xl sm:text-3xl uppercase tracking-tight ${
                  isDark ? 'text-white' : 'text-[#101426]'
                }`}>
                  HIRING MANDATE RECEIVED!
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Thank you for submitting your mandate for <strong>{roleNeeded}</strong> at <strong>{orgName}</strong>. Amii Ma'am and our senior CA recruitment desk are curating matching candidate profiles.
                </p>
              </div>

              <div className={`p-5 rounded-2xl border max-w-lg mx-auto text-left space-y-2.5 text-xs ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <div className={`flex items-center gap-2 font-display font-bold text-sm ${
                  isDark ? 'text-white' : 'text-[#101426]'
                }`}>
                  <Clock className="w-4 h-4 text-[#4563FF]" />
                  <span>Next Steps:</span>
                </div>
                <p>1. Our account manager will verify candidate availability for {city || 'your location'}.</p>
                <p>2. You will receive an initial batch of 3 to 5 pre-screened resumes within 24 to 48 hours.</p>
                <p>3. Direct phone reachout scheduled to {phone}.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-bold py-3.5 px-6 rounded-xl text-sm shadow-md transition cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Connect With Amii Ma'am on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border font-semibold text-sm transition cursor-pointer min-h-[44px] ${
                    isDark ? 'border-white/20 hover:bg-white/10 text-white' : 'border-slate-300 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Submit Another Mandate
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6" noValidate>
              {errorMsg && (
                <div 
                  role="alert"
                  className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-sm font-semibold">{errorMsg}</div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Organization Name */}
                <div>
                  <label 
                    htmlFor="employer-org-name"
                    className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Organization / Firm Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="employer-org-name"
                    type="text"
                    required
                    placeholder="e.g. S.K. Kapoor & Co. / Nexus FinTech"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                      isDark 
                        ? 'border-white/15 bg-white/5 focus:bg-white/10 focus:border-[#4563FF] text-white' 
                        : 'border-slate-300 bg-white focus:border-[#4563FF] text-slate-900'
                    }`}
                  />
                </div>

                {/* 2. Organization Type */}
                <div>
                  <label 
                    htmlFor="employer-org-type"
                    className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Organization Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="employer-org-type"
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none cursor-pointer ${
                      isDark 
                        ? 'border-white/15 bg-[#12162A] focus:border-[#4563FF] text-white' 
                        : 'border-slate-300 bg-white focus:border-[#4563FF] text-slate-900'
                    }`}
                  >
                    {ORG_TYPES.map((type) => (
                      <option key={type} value={type} className={isDark ? 'bg-[#12162A] text-white' : 'bg-white text-slate-900'}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Contact Person */}
                <div>
                  <label 
                    htmlFor="employer-contact-name"
                    className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Contact Person Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="employer-contact-name"
                    type="text"
                    required
                    placeholder="e.g. CA Saurabh Jain (Partner)"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                      isDark 
                        ? 'border-white/15 bg-white/5 focus:bg-white/10 focus:border-[#4563FF] text-white' 
                        : 'border-slate-300 bg-white focus:border-[#4563FF] text-slate-900'
                    }`}
                  />
                </div>

                {/* 4. Contact Phone */}
                <div>
                  <label 
                    htmlFor="employer-contact-phone"
                    className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className={`flex rounded-xl border overflow-hidden ${
                    isDark ? 'border-white/15 bg-white/5' : 'border-slate-300 bg-white'
                  }`}>
                    <span className={`px-4 font-bold text-xs flex items-center border-r ${
                      isDark ? 'bg-white/10 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}>
                      +91
                    </span>
                    <input
                      id="employer-contact-phone"
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
                </div>

                {/* 5. Role Needed */}
                <div>
                  <label 
                    htmlFor="employer-role-needed"
                    className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Role / Position Needed <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="employer-role-needed"
                    type="text"
                    required
                    placeholder="e.g. Statutory Audit Senior / Tax Manager"
                    value={roleNeeded}
                    onChange={(e) => setRoleNeeded(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                      isDark 
                        ? 'border-white/15 bg-white/5 focus:bg-white/10 focus:border-[#4563FF] text-white' 
                        : 'border-slate-300 bg-white focus:border-[#4563FF] text-slate-900'
                    }`}
                  />
                </div>

                {/* 6. Domain */}
                <div>
                  <label 
                    htmlFor="employer-domain"
                    className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Domain / Practice Area <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="employer-domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none cursor-pointer ${
                      isDark 
                        ? 'border-white/15 bg-[#12162A] focus:border-[#4563FF] text-white' 
                        : 'border-slate-300 bg-white focus:border-[#4563FF] text-slate-900'
                    }`}
                  >
                    {EMPLOYER_DOMAINS.map((d) => (
                      <option key={d} value={d} className={isDark ? 'bg-[#12162A] text-white' : 'bg-white text-slate-900'}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 7. Target Budget */}
                <div>
                  <label 
                    htmlFor="employer-budget"
                    className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Target Budget / Salary / Stipend Range <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="employer-budget"
                    type="text"
                    required
                    placeholder="e.g. 10 - 14 LPA (or ₹15,000/mo stipend)"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                      isDark 
                        ? 'border-white/15 bg-white/5 focus:bg-white/10 focus:border-[#4563FF] text-white' 
                        : 'border-slate-300 bg-white focus:border-[#4563FF] text-slate-900'
                    }`}
                  />
                </div>

                {/* 8. City */}
                <div>
                  <label 
                    htmlFor="employer-city"
                    className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    City / Job Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="employer-city"
                    type="text"
                    required
                    placeholder="e.g. Mumbai (BKC / Nariman Point) / Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                      isDark 
                        ? 'border-white/15 bg-white/5 focus:bg-white/10 focus:border-[#4563FF] text-white' 
                        : 'border-slate-300 bg-white focus:border-[#4563FF] text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* DUAL ACTION BUTTONS */}
              <div className={`pt-4 border-t flex flex-col sm:flex-row items-center gap-4 ${
                isDark ? 'border-white/10' : 'border-slate-200'
              }`}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#4563FF] hover:bg-[#324fec] text-white font-display font-bold text-sm shadow-md transition active:scale-[0.99] disabled:opacity-60 cursor-pointer min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#D4FF5A] outline-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Recording Mandate in Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Submit Requirement</span>
                    </>
                  )}
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-extrabold text-sm shadow-md transition active:scale-[0.99] cursor-pointer min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Desk (+91 9821262613)</span>
                </a>
              </div>

              <div className={`text-center text-xs flex items-center justify-center gap-2 pt-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Zero upfront retainer · Success-linked fee models · NDA Protected</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
