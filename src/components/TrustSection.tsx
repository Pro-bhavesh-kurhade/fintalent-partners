import React, { useState } from 'react';
import { 
  ShieldCheck, Award, FileCheck, HelpCircle, 
  Phone, MessageCircle, Star, Sparkles, ChevronDown 
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const WHATSAPP_URL =
    "https://wa.me/919821262613?text=Hi%20Amii%20Ma%27am%2C%20reaching%20out%20via%20FinTalent%20Partners";

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
    <div className="bg-[#101426] text-white border-b border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4563FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. EDITORIAL ABOUT AMII MA'AM LEADERSHIP SECTION */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF5A]" />
              <span className="text-[#D4FF5A] font-display font-bold uppercase tracking-wider text-[11px]">
                EXECUTIVE PRACTICE LEADERSHIP
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.1]">
              MEET THE PRINCIPAL: <br />
              <span className="text-[#D4FF5A]">AMII MA'AM</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Directing executive talent acquisition for India's foremost Chartered Accountancy firms, corporate conglomerates, and venture-backed tech startups, <strong>Amii Ma'am</strong> leads FinTalent Partners with unmatched domain depth.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              With deep specialization in statutory audit, direct/indirect taxation, and corporate controllership, our practice moves beyond keyword matching. Every candidate is evaluated with technical precision, cultural suitability, and ethical integrity, ensuring our partner firms hire long-term institutional pillars.
            </p>

            {/* Three Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="font-display font-extrabold text-2xl text-white">12+ Yrs</div>
                <div className="text-xs text-slate-400 mt-1">Executive Search</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="font-display font-extrabold text-2xl text-[#D4FF5A]">40+</div>
                <div className="text-xs text-slate-400 mt-1">Partner CA Firms</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 col-span-2 sm:col-span-1">
                <div className="font-display font-extrabold text-2xl text-[#10B981]">98%</div>
                <div className="text-xs text-slate-400 mt-1">Retention Rate</div>
              </div>
            </div>
          </div>

          {/* Right: Bespoke Editorial Consultation Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-8 sm:p-10 bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-4">
                {/* Monogram Badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4563FF] via-[#101426] to-[#D4FF5A] p-0.5 shadow-lg">
                  <div className="w-full h-full bg-[#101426] rounded-[14px] flex items-center justify-center font-display font-black text-2xl text-white">
                    AM
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Amii Ma'am
                  </h3>
                  <p className="text-xs font-semibold text-[#D4FF5A] tracking-wide mt-0.5">
                    Principal Executive Search Partner
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    FinTalent Partners LLP · Mumbai Desk
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#101426] border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-display font-bold text-white text-xs">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>DIRECT CONSULTATION DESK</span>
                </div>
                <p className="leading-relaxed text-slate-300">
                  "Whether you need an urgent Statutory Audit Senior to handle listed client year-end filings, or a strategic VP Finance, reach out directly to my desk for priority matching."
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-extrabold text-sm shadow-lg shadow-[#D4FF5A]/20 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Desk: +91 9821262613</span>
                </a>

                <a
                  href="tel:+919821262613"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-300" />
                  <span>Call Direct Line: +91 9821262613</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 lg:py-24 border-t border-white/10 bg-[#0B0E1B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-[#D4FF5A]">
              CLARITY & TRANSPARENCY
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to know about candidate submission, status tracking, and firm mandates.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 text-white hover:text-[#D4FF5A] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#4563FF] shrink-0" />
                      <span className="font-display font-bold text-base sm:text-lg">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#D4FF5A]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/5 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
