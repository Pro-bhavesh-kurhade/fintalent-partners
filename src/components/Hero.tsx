import React from 'react';
import { 
  ArrowRight, Search, Sparkles, CheckCircle2, ShieldCheck, 
  TrendingUp, Award, Building2, UserCheck, Briefcase 
} from 'lucide-react';

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
  return (
    <section className="relative overflow-hidden bg-mesh-dark text-white pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-white/10">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern-dark pointer-events-none opacity-40" />

      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#4563FF]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#D4FF5A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetric Typography & Action Block (col-span-7) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Small animated announcement label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md shadow-inner text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#D4FF5A] animate-ping" />
              <span className="text-[#D4FF5A] font-display font-bold uppercase tracking-wider text-[11px]">
                THE FINANCE TALENT NETWORK
              </span>
              <span className="text-white/30">/</span>
              <span className="text-slate-300 font-medium text-[11px]">
                ICAI Compliant
              </span>
            </div>

            {/* Massive Funky Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white uppercase">
              GOOD PEOPLE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4563FF] via-[#7B91FF] to-[#B9A7FF]">
                GREAT FINANCE.
              </span><br />
              <span className="text-[#D4FF5A] drop-shadow-[0_0_25px_rgba(212,255,90,0.35)]">
                PERFECT FIT.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              FinTalent Partners connects premier CA firms, corporate conglomerates, and venture-backed startups with carefully screened Chartered Accountants, Tax Advisors, Audit Leads, and Corporate Finance specialists across India.
            </p>

            {/* Two Prominent CTAs + Secondary Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary CTA 1: Candidates */}
              <button
                onClick={onCandidateClick}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-extrabold text-base shadow-xl shadow-[#D4FF5A]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>I'm Looking for Opportunities</span>
                <ArrowRight className="w-4 h-4 text-[#101426] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Primary CTA 2: Employers */}
              <button
                onClick={onEmployerClick}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#4563FF] hover:bg-[#324fec] text-white font-display font-bold text-base shadow-xl shadow-[#4563FF]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#6b84ff]/30"
              >
                <span>I'm Hiring Finance Talent</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Secondary Action: Track My Application */}
            <div className="pt-1 flex items-center gap-3 text-sm text-slate-400">
              <span>Already applied?</span>
              <button
                onClick={onTrackerClick}
                className="inline-flex items-center gap-1.5 font-semibold text-[#D4FF5A] hover:text-white transition-colors underline underline-offset-4 decoration-[#D4FF5A]/50 hover:decoration-white cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track My Application Live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Original Funky Floating Talent Composition (col-span-5) */}
          <div className="lg:col-span-5 relative">
            {/* Ambient backdrop glow */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative dashed circuit frame */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
                
                {/* Header of talent card */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-300">
                      Live Talent Marketplace
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#4563FF]/20 text-[#B9A7FF] border border-[#4563FF]/30">
                    48h Shortlist
                  </span>
                </div>

                {/* Candidate Spotlight Profile */}
                <div className="mt-5 p-4 rounded-2xl bg-[#101426]/90 border border-white/15 space-y-3 relative group hover:border-[#D4FF5A]/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#4563FF] to-[#D4FF5A] flex items-center justify-center font-display font-bold text-lg text-[#101426] shadow-md">
                        CA
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-base text-white">Rohit A.</h3>
                          <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] font-bold px-2 py-0.5 rounded-full border border-[#10B981]/30">
                            Verified ✓
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Statutory Audit Senior · Mumbai</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#D4FF5A]">
                      14-16 LPA
                    </span>
                  </div>

                  <div className="pt-1 text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF5A]" />
                      <span>ICAI Qualified (1st Attempt) · Big 4 Articleship</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF5A]" />
                      <span>Ind AS 115/116 & CARO 2020 Finalization</span>
                    </div>
                  </div>
                </div>

                {/* Floating Interactive Skill/Role Tags */}
                <div className="mt-5 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Specialized Domains in Active Search:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4563FF]/20 text-[#B9A7FF] border border-[#4563FF]/40 text-xs font-semibold hover:scale-105 transition-transform cursor-default">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B9A7FF]" />
                      Statutory Audit
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4FF5A]/15 text-[#D4FF5A] border border-[#D4FF5A]/30 text-xs font-semibold hover:scale-105 transition-transform cursor-default">
                      <TrendingUp className="w-3.5 h-3.5 text-[#D4FF5A]" />
                      FP&A Analyst
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 text-xs font-semibold hover:scale-105 transition-transform cursor-default">
                      <Award className="w-3.5 h-3.5 text-[#10B981]" />
                      GST Specialist
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-slate-200 border border-white/20 text-xs font-semibold hover:scale-105 transition-transform cursor-default">
                      <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                      Corporate Finance
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B9A7FF]/20 text-[#B9A7FF] border border-[#B9A7FF]/40 text-xs font-semibold hover:scale-105 transition-transform cursor-default">
                      <UserCheck className="w-3.5 h-3.5 text-[#B9A7FF]" />
                      CA Finalist
                    </span>
                  </div>
                </div>

                {/* 3 Micro-Metrics at the bottom of the card */}
                <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white/[0.04]">
                    <div className="font-display font-bold text-lg text-white">40+</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tight">Partner Firms</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.04]">
                    <div className="font-display font-bold text-lg text-[#D4FF5A]">48 Hrs</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tight">Shortlist Time</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.04]">
                    <div className="font-display font-bold text-lg text-[#B9A7FF]">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tight">Pre-Vetted</div>
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
