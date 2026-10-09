import React from 'react';
import { 
  ShieldCheck, Award, FileCheck, HelpCircle, 
  Phone, MessageCircle, Star, Sparkles 
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const faqs = [
    {
      q: 'Is there any fee or charge for Candidates / Job Seekers?',
      a: 'Zero. FinTalent Partners provides 100% free placement assistance to all candidates, whether you are a Qualified CA, CA Inter, CMA, MBA Finance, or seeking Articleship.',
    },
    {
      q: 'How does candidate status tracking work?',
      a: 'After submitting your profile, your Registered Mobile Number and Date of Birth (DOB) serve as your private access keys. At any time, enter them in the "Track Status" portal to see your real-time 5-stage progress.',
    },
    {
      q: 'How quickly do CA Firms & Corporates receive shortlisted resumes?',
      a: 'Our typical turnaround is 24 to 48 hours for standard roles (Statutory Audit Seniors, Direct Tax Executives, Article Assistants, Accounting Leads). Specialized leadership roles take 3 to 5 business days.',
    },
    {
      q: 'Do you facilitate CA Articleship and Industrial Training?',
      a: 'Yes. We work actively with ICAI registered firms offering stipend-compliant Articleships and industrial training opportunities with listed corporate entities.',
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200/80">
      {/* 1. ABOUT AMII MA'AM & FINTALENT LEADERSHIP SECTION */}
      <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: About Text & Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs font-semibold border border-slate-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Executive Practice Leadership</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-headline tracking-tight text-slate-950 leading-tight">
                About FinTalent & <br />
                <span className="text-emerald-700">Amii Ma'am</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                Led by <strong>Amii Ma'am</strong>, FinTalent Partners bridges India's most prestigious Chartered Accountancy firms, corporate conglomerates, and venture-backed tech startups with premier finance leadership.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                With deep specialization in statutory audit, direct/indirect taxation, and corporate controllership, we move beyond basic keyword matching. Every candidate is evaluated with technical precision, cultural suitability, and ethical integrity, ensuring our partners hire long-term institutional pillars.
              </p>

              {/* Three Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-2xl font-black text-slate-950 font-headline">12+ Yrs</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Executive Search</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-2xl font-black text-slate-950 font-headline">40+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Partner CA Firms</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-emerald-700 font-headline">98%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Placement Retention</div>
                </div>
              </div>
            </div>

            {/* Right: Clean Executive Consultation Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-slate-200 text-slate-900 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-headline text-xl font-bold shadow-xs">
                    AM
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-950 font-headline">
                      Amii Ma'am
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700">
                      Principal Executive Search Partner
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      FinTalent Partners LLP • Mumbai Desk
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Direct Consultation</span>
                  </div>
                  <p className="leading-relaxed">
                    "Whether you need an urgent Statutory Audit Senior to handle listed client year-end filings, or a strategic VP Finance, reach out directly to my desk for priority matching."
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <a
                    href="https://wa.me/919821262613?text=Hi%20Amii%20Ma%27am%2C%20reaching%20out%20via%20FinTalent%20Partners"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Chat on WhatsApp: +91 9821262613</span>
                  </a>

                  <a
                    href="tel:+919821262613"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>Call Direct Line: +91 9821262613</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE ADVANTAGE PILLARS & FAQs */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              The FinTalent Advantage
            </h3>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-headline tracking-tight">
              Why 40+ CA Firms & MNCs Trust Our Search
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-950 font-headline">Technical Pre-Screening</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every candidate is technically screened by senior Chartered Accountants to evaluate practical exposure in CARO, Ind AS, Tax Audits, and GST litigation before resume submission.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-950 font-headline">ICAI Credential Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We verify Articleship completion status, GMCS/ITT clearance, and membership status to ensure total compliance with institute regulations and zero hiring risk.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-950 font-headline">Replacement Guarantee</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                For our corporate and firm partners, we offer flexible 90-day free candidate replacement guarantees, ensuring long-term cultural and technical alignment.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Common Questions
            </h3>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-headline tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <h4 className="text-sm font-bold text-slate-950 font-headline">{faq.q}</h4>
                </div>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
