import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const CredibilityStrip: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const items = [
    { label: 'QUALIFIED CAs · 1ST ATTEMPT', accent: true },
    { label: '48-HOUR RECRUITER SHORTLIST', accent: false },
    { label: 'SERIES A–D STARTUP FP&A', accent: true },
    { label: 'STATUTORY AUDIT & IND AS', accent: false },
    { label: 'DIRECT TAX & GST LITIGATION', accent: true },
    { label: 'CA ARTICLESHIP & INDUSTRIAL TRAINEES', accent: false },
    { label: 'SAP S/4 HANA & CONTROLLERSHIP', accent: true },
    { label: '₹0 PLACEMENT FEE FOR CANDIDATES', accent: false },
  ];

  return (
    <div className="px-3 sm:px-6 pb-8">
      <div
        className={`max-w-7xl mx-auto rounded-2xl py-3.5 overflow-hidden select-none relative ${
          isDark
            ? 'bg-[#C8FF32] text-[#090B10]'
            : 'bg-[#0D1017] text-[#C8FF32]'
        }`}
      >
        <div className="animate-ticker flex items-center">
          {[0, 1].map((loopIdx) => (
            <div
              key={loopIdx}
              className="flex items-center gap-6 shrink-0 pr-6"
              aria-hidden={loopIdx === 1}
            >
              {items.map((item, idx) => (
                <div key={`${loopIdx}-${idx}`} className="flex items-center gap-6">
                  <div className="inline-flex items-center gap-2 font-display font-extrabold text-xs sm:text-sm tracking-wide uppercase">
                    {item.accent ? (
                      <Zap className="w-4 h-4 fill-current text-[#FF6B4A]" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{item.label}</span>
                  </div>
                  <span className="opacity-35 font-mono">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
