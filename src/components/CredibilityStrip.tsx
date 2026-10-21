import React from 'react';
import { Sparkles, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const CredibilityStrip: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    <div 
      className={`w-full overflow-hidden border-b py-4 select-none relative transition-colors duration-200 ${
        isDark 
          ? 'bg-[#0E1222] border-white/10' 
          : 'bg-white border-slate-200 shadow-2xs'
      }`}
    >
      {/* Decorative gradient masks at edges to prevent harsh cutoff */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r ${
          isDark 
            ? 'from-[#0E1222] to-transparent' 
            : 'from-white to-transparent'
        }`} 
      />
      <div 
        className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l ${
          isDark 
            ? 'from-[#0E1222] to-transparent' 
            : 'from-white to-transparent'
        }`} 
      />

      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* First track */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {items.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-4">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider ${
                  item.highlight
                    ? isDark 
                      ? 'bg-[#D4FF5A]/15 text-[#D4FF5A] border border-[#D4FF5A]/30'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs'
                    : isDark
                      ? 'bg-white/5 text-slate-300 border border-white/10'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {item.highlight ? (
                  <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4FF5A]' : 'text-emerald-600'}`} />
                ) : (
                  <Award className={`w-3.5 h-3.5 ${isDark ? 'text-[#4563FF]' : 'text-[#4563FF]'}`} />
                )}
                <span>{item.label}</span>
              </div>
              <span className={`font-bold ${isDark ? 'text-white/20' : 'text-slate-300'}`}>/</span>
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
                    ? isDark 
                      ? 'bg-[#D4FF5A]/15 text-[#D4FF5A] border border-[#D4FF5A]/30'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs'
                    : isDark
                      ? 'bg-white/5 text-slate-300 border border-white/10'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {item.highlight ? (
                  <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4FF5A]' : 'text-emerald-600'}`} />
                ) : (
                  <Award className={`w-3.5 h-3.5 ${isDark ? 'text-[#4563FF]' : 'text-[#4563FF]'}`} />
                )}
                <span>{item.label}</span>
              </div>
              <span className={`font-bold ${isDark ? 'text-white/20' : 'text-slate-300'}`}>/</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
