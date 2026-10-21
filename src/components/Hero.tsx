import React from 'react';
import { 
  ArrowRight, Search, CheckCircle2, ShieldCheck, 
  TrendingUp, Award, UserCheck, Briefcase 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onCandidateClick: () => void;
  onEmployerClick: () => void;
  onTrackerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onCandidateClick, 
  onEmployerClick,
  onTrackerClick 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      className={`relative overflow-hidden pt-14 pb-20 lg:pt-20 lg:pb-28 border-b transition-colors duration-200 ${
        isDark 
          ? 'bg-mesh-dark text-white border-white/10' 
          : 'bg-mesh-light text-[#101426] border-slate-200'
      }`}
    >
      {/* Subtle grid pattern overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none opacity-40 ${
          isDark ? 'grid-pattern-dark' : 'grid-pattern-light'
        }`} 
      />

      {/* Decorative ambient glowing orbs */}
      <div 
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#4563FF]/25' : 'bg-[#4563FF]/15'
        }`} 
      />
      <div 
        className={`absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#D4FF5A]/15' : 'bg-[#10B981]/10'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetric Typography & Action Block (col-span-7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            {/* Small animated announcement label */}
            <div 
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-xs text-xs font-semibold tracking-wide ${
                isDark 
                  ? 'bg-white/5 border-white/15 text-slate-300' 
                  : 'bg-white/90 border-slate-300 text-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className={`font-display font-bold uppercase tracking-wider text-[11px] ${
                isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'
              }`}>
                THE FINANCE TALENT NETWORK
              </span>
              <span className="opacity-30">/</span>
              <span className="font-medium text-[11px]">
                ICAI Compliant
              </span>
            </div>

            {/* Massive Funky Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight uppercase">
              <span className={isDark ? 'text-white' : 'text-[#101426]'}>
                GOOD PEOPLE.
              </span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4563FF] via-[#7B91FF] to-[#B9A7FF]">
                GREAT FINANCE.
              </span><br />
              <span className={
                isDark 
                  ? 'text-[#D4FF5A] drop-shadow-[0_0_25px_rgba(212,255,90,0.35)]' 
                  : 'text-[#059669]'
              }>
                PERFECT FIT.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              FinTalent Partners connects premier CA firms, corporate conglomerates, and venture-backed startups with carefully screened Chartered Accountants, Tax Advisors, Audit Leads, and Corporate Finance specialists across India.
            </p>

            {/* Two Prominent CTAs + Secondary Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary CTA 1: Candidates */}
              <button
                onClick={onCandidateClick}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-extrabold text-base shadow-md shadow-[#D4FF5A]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
              >
                <span>I'm Looking for Opportunities</span>
                <ArrowRight className="w-4 h-4 text-[#101426] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Primary CTA 2: Employers */}
              <button
                onClick={onEmployerClick}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#4563FF] hover:bg-[#324fec] text-white font-display font-bold text-base shadow-md shadow-[#4563FF]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#6b84ff]/30 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#D4FF5A] outline-none"
              >
                <span>I'm Hiring Finance Talent</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Secondary Action: Track My Application */}
            <div className={`pt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <span>Already registered?</span>
              <button
                onClick={onTrackerClick}
                className={`inline-flex items-center gap-1.5 font-bold transition-colors underline underline-offset-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4563FF] rounded-sm outline-none ${
                  isDark 
                    ? 'text-[#D4FF5A] hover:text-white decoration-[#D4FF5A]/50' 
                    : 'text-[#4563FF] hover:text-[#101426] decoration-[#4563FF]/50'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track Application Live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Original Funky Floating Talent Composition (col-span-5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card */}
              <div 
                className={`relative p-6 sm:p-8 rounded-3xl border backdrop-blur-xl shadow-2xl overflow-hidden transition-colors ${
                  isDark 
                    ? 'bg-white/[0.03] border-white/10' 
                    : 'bg-white/95 border-slate-200/90'
                }`}
              >
                {/* Header of talent card */}
                <div className={`flex items-center justify-between pb-5 border-b ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                    <span className={`font-display font-bold text-xs uppercase tracking-wider ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Live Talent Marketplace
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                    isDark 
                      ? 'bg-[#4563FF]/20 text-[#B9A7FF] border-[#4563FF]/30' 
                      : 'bg-[#4563FF]/10 text-[#4563FF] border-[#4563FF]/20 font-bold'
                  }`}>
                    48h Shortlist
                  </span>
                </div>

                {/* Candidate Spotlight Profile */}
                <div 
                  className={`mt-5 p-4 rounded-2xl border space-y-3 relative group transition-colors ${
                    isDark 
                      ? 'bg-[#101426]/90 border-white/15 hover:border-[#D4FF5A]/50' 
                      : 'bg-slate-50 border-slate-200 hover:border-[#4563FF]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#4563FF] to-[#D4FF5A] flex items-center justify-center font-display font-bold text-lg text-[#101426] shadow-md">
                        CA
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-display font-bold text-base ${
                            isDark ? 'text-white' : 'text-[#101426]'
                          }`}>
                            Rohit A.
                          </h3>
                          <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] font-bold px-2 py-0.5 rounded-full border border-[#10B981]/30">
                            Verified ✓
                          </span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Statutory Audit Senior · Mumbai
                        </p>
                      </div>
                    </div>
                    <span className={`font-mono text-xs font-bold ${
                      isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'
                    }`}>
                      14-16 LPA
                    </span>
                  </div>

                  <div className={`pt-1 text-xs space-y-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#D4FF5A]' : 'text-[#10B981]'}`} />
                      <span>ICAI Qualified (1st Attempt) · Big 4 Articleship</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#D4FF5A]' : 'text-[#10B981]'}`} />
                      <span>Ind AS 115/116 & CARO 2020 Finalization</span>
                    </div>
                  </div>
                </div>

                {/* Floating Interactive Skill/Role Tags */}
                <div className="mt-5 space-y-2.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Specialized Domains in Active Search:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                      isDark 
                        ? 'bg-[#4563FF]/20 text-[#B9A7FF] border-[#4563FF]/40' 
                        : 'bg-[#4563FF]/10 text-[#4563FF] border-[#4563FF]/25'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Statutory Audit
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                      isDark 
                        ? 'bg-[#D4FF5A]/15 text-[#D4FF5A] border-[#D4FF5A]/30' 
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      <TrendingUp className="w-3.5 h-3.5" />
                      FP&A Analyst
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                      isDark 
                        ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40' 
                        : 'bg-teal-50 text-teal-800 border-teal-200'
                    }`}>
                      <Award className="w-3.5 h-3.5" />
                      GST Specialist
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                      isDark 
                        ? 'bg-white/10 text-slate-200 border-white/20' 
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      <Briefcase className="w-3.5 h-3.5" />
                      Corporate Finance
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                      isDark 
                        ? 'bg-[#B9A7FF]/20 text-[#B9A7FF] border-[#B9A7FF]/40' 
                        : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    }`}>
                      <UserCheck className="w-3.5 h-3.5" />
                      CA Finalist
                    </span>
                  </div>
                </div>

                {/* 3 Micro-Metrics at the bottom of the card */}
                <div className={`mt-6 pt-4 border-t grid grid-cols-3 gap-2 text-center ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <div className={`p-2 rounded-xl ${isDark ? 'bg-white/[0.04]' : 'bg-slate-50'}`}>
                    <div className={`font-display font-bold text-lg ${isDark ? 'text-white' : 'text-[#101426]'}`}>40+</div>
                    <div className={`text-[10px] uppercase tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Partner Firms</div>
                  </div>
                  <div className={`p-2 rounded-xl ${isDark ? 'bg-white/[0.04]' : 'bg-slate-50'}`}>
                    <div className={`font-display font-bold text-lg ${isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'}`}>48 Hrs</div>
                    <div className={`text-[10px] uppercase tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Shortlist Time</div>
                  </div>
                  <div className={`p-2 rounded-xl ${isDark ? 'bg-white/[0.04]' : 'bg-slate-50'}`}>
                    <div className={`font-display font-bold text-lg ${isDark ? 'text-[#B9A7FF]' : 'text-[#10B981]'}`}>100%</div>
                    <div className={`text-[10px] uppercase tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pre-Vetted</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
