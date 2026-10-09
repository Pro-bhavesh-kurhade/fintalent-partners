import React from 'react';
import { ArrowDown, CheckCircle2, Building2, UserCheck, Clock, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

interface HeroProps {
  onCandidateClick: () => void;
  onEmployerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCandidateClick, onEmployerClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-200/80">
      {/* Subtle modern grid overlay for executive architectural feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Executive trust pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Curated Executive Search for CA Firms, Corporates & Startups</span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-700 font-bold">40+ Partner Firms</span>
          </div>

          {/* RAZOR-SHARP CORPORATE HEADLINE (NO TEXT-SHADOW / NO EMBOSS) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 font-headline leading-[1.15] tracking-tight">
            Bridging Premier{' '}
            <span className="text-emerald-600">
              Finance, Tax & Accounting
            </span>{' '}
            Talent with Leading Firms & Corporates
          </h1>

          {/* Subheading: Clear, subtle slate tone with proper line-height and generous breathing room */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            A bespoke executive recruitment desk connecting verified Chartered Accountants, CA Inters, CMAs, and Corporate Finance specialists with top CA firms, MNCs, and high-growth ventures across India.
          </p>

          {/* TWO PRIMARY HERO ACTION BUTTONS: Clean, High-Contrast, Pill/Sleek Architecture */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 max-w-2xl mx-auto">
            {/* Button 1: Candidate submission */}
            <button
              onClick={onCandidateClick}
              className="w-full sm:w-auto flex-1 group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-100" />
              <span>Submit Profile (For Candidates)</span>
              <ArrowDown className="w-4 h-4 text-emerald-200 group-hover:translate-y-0.5 transition" />
            </button>

            {/* Button 2: Employer hiring */}
            <button
              onClick={onEmployerClick}
              className="w-full sm:w-auto flex-1 group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-slate-800"
            >
              <Building2 className="w-4 h-4 text-slate-300" />
              <span>Hire Finance Talent (For Employers)</span>
              <ArrowDown className="w-4 h-4 text-slate-300 group-hover:translate-y-0.5 transition" />
            </button>
          </div>

          {/* Highlights Banner: Crisp Light Architecture with Elegant Outline */}
          <div className="pt-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs text-left">
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 font-headline">
                      Qualified CAs, CA Inters, CMAs, MBA Finance, and Commerce Graduates
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Rigorous technical screening & ICAI credentials verification on every profile
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-700 font-semibold">
                  <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Statutory & Internal Audit
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Direct & International Tax
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    GST Advisory
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    FP&A & Controllership
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Four Key Metrics in Clean White Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-left">
            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Turnaround</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-950 font-headline">48 Hours</div>
              <div className="text-xs text-slate-500 mt-0.5">Vetted shortlist delivery</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Screening</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-950 font-headline">100% Vetted</div>
              <div className="text-xs text-slate-500 mt-0.5">ICAI registration & exp checks</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Network</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-950 font-headline">40+ Firms</div>
              <div className="text-xs text-slate-500 mt-0.5">CA firms, MNCs & growth startups</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Track Record</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-950 font-headline">2,400+</div>
              <div className="text-xs text-slate-500 mt-0.5">Finance placements executed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
