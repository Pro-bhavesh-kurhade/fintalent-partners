import React, { useState } from 'react';
import { 
  Building2, MessageCircle, Send, CheckCircle2, AlertCircle, 
  Loader2, Phone, User, Briefcase, IndianRupee, MapPin, Sparkles, Clock, ShieldCheck
} from 'lucide-react';
import { submitFirmRequirement } from '../lib/supabase';

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
    <section id="employer-form" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs font-semibold border border-slate-200 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fast 1-Minute Mandate Submission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-headline tracking-tight">
            Hire Premier Finance & CA Talent
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Share your hiring requirements with our dedicated executive search desk led by Amii Ma'am. Receive pre-screened profiles within 48 hours.
          </p>
        </div>

        {/* Executive Container Box */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/90">
          {/* Top highlight bar */}
          <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
                Executive Service Guarantee
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white font-headline">
                Pre-Vetted Profiles • 48-Hour Turnaround • Dedicated Account Lead
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {/* WhatsApp instant connect button for Amii Ma'am */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-xs transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: +91 9821262613</span>
              </a>
            </div>
          </div>

          {isSuccess ? (
            /* Success confirmation card */
            <div className="p-8 sm:p-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-black text-slate-950 font-headline">
                  Hiring Mandate Received!
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Thank you for submitting your requirement for <strong className="text-slate-900">{roleNeeded}</strong> at <strong className="text-slate-900">{orgName}</strong>. Amii Ma'am and our senior CA recruitment desk are curating matching candidate profiles.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 max-w-lg mx-auto text-left space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-headline">
                  <Clock className="w-4 h-4 text-emerald-600" />
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-xs transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Connect With Amii Ma'am on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer"
                >
                  Submit Another Role
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-sm font-medium">{errorMsg}</div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Organization Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Organization / Firm Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S.K. Kapoor & Co. / Nexus FinTech"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>

                {/* 2. Organization Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Organization Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 text-sm transition outline-none bg-white cursor-pointer"
                  >
                    {ORG_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Contact Person */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Person Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CA Saurabh Jain (Partner)"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>

                {/* 4. Contact Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex rounded-xl border border-slate-300 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 overflow-hidden bg-white">
                    <span className="px-3.5 bg-slate-100 text-slate-600 font-semibold text-xs flex items-center border-r border-slate-300">
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
                </div>

                {/* 5. Role Needed */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Role / Position Needed <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Statutory Audit Senior / Tax Manager"
                    value={roleNeeded}
                    onChange={(e) => setRoleNeeded(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>

                {/* 6. Domain */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Domain / Practice Area <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 text-sm transition outline-none bg-white cursor-pointer"
                  >
                    {EMPLOYER_DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 7. Target Budget / Salary Range */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Budget / Salary / Stipend Range <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 - 14 LPA (or ₹15,000/mo stipend)"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>

                {/* 8. City / Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City / Job Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai (Nariman Point) / Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 text-sm transition outline-none bg-white"
                  />
                </div>
              </div>

              {/* DUAL ACTION BUTTONS */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                {/* Action 1: Submit Requirement */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Recording Mandate in Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-300" />
                      <span>Submit Requirement</span>
                    </>
                  )}
                </button>

                {/* Action 2: Instant Connect on WhatsApp */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Desk (+91 9821262613)</span>
                </a>
              </div>

              <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero upfront retainer • Success-linked fee models available • NDA Protected</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
