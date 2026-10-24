import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { DISPLAY_PHONE, buildWhatsAppUrl } from '../lib/supabase';

export const TrustSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const whatsappUrl = buildWhatsAppUrl(
    "Hi Ami Bhanushali, reaching out for direct finance recruitment consultation!"
  );

  const faqs = [
    {
      q: 'Do candidates pay anything at any stage?',
      a: 'Never - ₹0 forever. Placement assistance, interview prep, and profile matching across all 40+ partner CA firms & corporates are 100% free for candidates.',
    },
    {
      q: 'How fast is the turnaround for recruiters & firms?',
      a: '24 to 48 hours for Statutory Audit, Direct Tax, GST, Accounting & Articleship shortlists. Senior VP Finance / CFO mandates receive curated batches in 3–5 days.',
    },
    {
      q: 'How do I check my live application progress?',
      a: 'Just click "Track Status" at the top of any screen and enter your 10-digit Mobile Number + Date of Birth - no password or login hassle required.',
    },
    {
      q: 'Do you place CA Articles & Industrial Trainees too?',
      a: 'Yes! We actively place 1st-year CA Inter students, transfer cases, and industrial trainees into top CA firms and listed corporate finance desks.',
    },
  ];

  return (
    <section className="px-3 sm:px-6 pt-5 pb-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Principal Practice Card with Custom Twilight Architecture Image */}
        <div
          className={`rounded-[2rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 border ${
            isDark
              ? 'bg-[#111522] border-white/15 shadow-2xl'
              : 'bg-white border-[2px] border-[#0D1017] shadow-[7px_7px_0px_0px_#0D1017]'
          }`}
        >
          {/* Visual Column */}
          <div
            className="lg:col-span-5 min-h-[280px] sm:min-h-[340px] bg-cover bg-center relative flex flex-col justify-between p-6 sm:p-8 text-white"
            style={{
              backgroundImage: `url('/images/recruiter-card-bg.jpg')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#090B10]/95 via-[#090B10]/45 to-[#090B10]/30" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-black/60 text-[#C8FF32] border border-white/15 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                Practice Principal
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full">
                <MapPin className="w-3 h-3 text-[#FF6B4A]" />
                Mumbai · Pan-India
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-xl flex items-center justify-center shadow-lg">
                AM
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl pt-1">
                Ami Bhanushali
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-[#C8FF32]">
                Managing Search Lead · FinTalent Partners
              </p>
            </div>
          </div>

          {/* Copy + Direct Desk Actions Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
                Human precision over keyword spam.{' '}
                <span className="text-[#FF6B4A]">Every shortlist hand-picked.</span>
              </h2>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Led directly by <strong>Ami Bhanushali</strong>, FinTalent Partners works closely with managing partners at leading Chartered Accountancy practices, MNC controllers, and VC-backed startup founders. Every candidate’s ICAI credentials, technical depth, and role alignment are personally verified before a single interview is booked.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div
                  className={`p-3.5 rounded-2xl ${
                    isDark ? 'bg-black/40 border border-white/10' : 'bg-[#FAF7F0] border border-[#0D1017]/15'
                  }`}
                >
                  <span className="font-display font-extrabold text-2xl block text-[#12B886]">
                    12+ Yrs
                  </span>
                  <span className="text-[11px] opacity-75">Finance Search</span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl ${
                    isDark ? 'bg-black/40 border border-white/10' : 'bg-[#FAF7F0] border border-[#0D1017]/15'
                  }`}
                >
                  <span className="font-display font-extrabold text-2xl block text-[#3B5BFF]">
                    40+
                  </span>
                  <span className="text-[11px] opacity-75">Partner Firms</span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl ${
                    isDark ? 'bg-black/40 border border-white/10' : 'bg-[#FAF7F0] border border-[#0D1017]/15'
                  }`}
                >
                  <span className="font-display font-extrabold text-2xl block text-[#FF6B4A]">
                    98%
                  </span>
                  <span className="text-[11px] opacity-75">Offer Retention</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-pop flex-1 py-4 px-5 rounded-2xl bg-[#C8FF32] hover:bg-[#b8f21e] text-[#090B10] font-display font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Ami Bhanushali Directly</span>
              </a>

              <a
                href="tel:+919821262613"
                className={`py-4 px-5 rounded-2xl border font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                  isDark
                    ? 'bg-white/6 hover:bg-white/12 border-white/15 text-white'
                    : 'bg-[#FAF7F0] hover:bg-slate-200/70 border-[#0D1017] text-[#0D1017]'
                }`}
              >
                <Phone className="w-4 h-4 text-[#12B886]" />
                <span>{DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Snappy 2-Column FAQ Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl">
              Quick Answers - Zero Jargon
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono opacity-70">
              <CheckCircle2 className="w-4 h-4 text-[#12B886]" />
              Transparent Process
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition ${
                    isDark
                      ? 'bg-[#111522] border-white/12'
                      : 'bg-white border-[1.5px] border-[#0D1017] shadow-[3px_3px_0px_0px_#0D1017]'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#FF6B4A]' : 'opacity-60'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm opacity-80 leading-relaxed border-t border-current/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
