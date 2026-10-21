import React from 'react';
import { ShieldCheck, Sparkles, Building2, Award } from 'lucide-react';

export const CredibilityStrip: React.FC = () => {
  const items = [
    { label: "QUALIFIED CHARTERED ACCOUNTANTS", highlight: true },
    { label: "CA INTER / SEMI-QUALIFIED", highlight: false },
    { label: "CMAs (COST & MANAGEMENT ACCOUNTANTS)", highlight: true },
    { label: "ACCA / CS / CFA", highlight: false },
    { label: "MBA FINANCE & VALUATION", highlight: true },
    { label: "COMMERCE GRADUATES & CONTROLLERS", highlight: false },
    { label: "40+ PREMIER PARTNER FIRMS", highlight: true },
    { label: "CA ARTICLESHIP & INDUSTRIAL TRAINEES", highlight: false },
  ];

  return (
    <div className="w-full overflow-hidden bg-[#101426] border-b border-white/10 py-5 select-none relative">
      {/* Decorative gradient masks at edges to prevent harsh cutoff */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#101426] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#101426] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* First track */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {items.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-4">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider ${
                  item.highlight
                    ? 'bg-[#D4FF5A]/15 text-[#D4FF5A] border border-[#D4FF5A]/30'
                    : 'bg-white/5 text-slate-300 border border-white/10'
                }`}
              >
                {item.highlight ? (
                  <Sparkles className="w-3.5 h-3.5 text-[#D4FF5A]" />
                ) : (
                  <Award className="w-3.5 h-3.5 text-[#4563FF]" />
                )}
                <span>{item.label}</span>
              </div>
              <span className="text-white/20 font-bold">/</span>
            </div>
          ))}
        </div>

        {/* Second duplicated track for seamless loop */}
        <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-4">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider ${
                  item.highlight
                    ? 'bg-[#D4FF5A]/15 text-[#D4FF5A] border border-[#D4FF5A]/30'
                    : 'bg-white/5 text-slate-300 border border-white/10'
                }`}
              >
                {item.highlight ? (
                  <Sparkles className="w-3.5 h-3.5 text-[#D4FF5A]" />
                ) : (
                  <Award className="w-3.5 h-3.5 text-[#4563FF]" />
                )}
                <span>{item.label}</span>
              </div>
              <span className="text-white/20 font-bold">/</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
