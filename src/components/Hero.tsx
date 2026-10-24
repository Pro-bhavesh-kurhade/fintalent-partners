import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  Briefcase,
  Users,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PRACTICE_DOMAINS } from '../lib/supabase';

interface HeroProps {
  persona: 'candidate' | 'recruiter';
  onPersonaChange: (mode: 'candidate' | 'recruiter') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDomainFilter: string;
  onQuickDomainSelect: (domain: string) => void;
  onJumpToExchange: () => void;
  onCandidateApplyClick: () => void;
  onEmployerPostClick: () => void;
  onTrackerClick: () => void;
  openRolesCount: number;
  vettedTalentCount: number;
}

const SHORT_DOMAIN_PILLS = [
  { label: 'All Roles', full: 'All' },
  { label: 'Statutory Audit', full: 'Statutory Audit & Assurance' },
  { label: 'FP&A & Startup', full: 'FP&A & Corporate Finance' },
  { label: 'Direct Tax', full: 'Direct Taxation & Litigations' },
  { label: 'GST & Indirect', full: 'Indirect Tax / GST' },
  { label: 'CA Articleship', full: 'CA Articleship & Trainee Roles' },
  { label: 'SAP & Finalization', full: 'Accounting, Finalization & ERP (Tally/SAP)' },
];

export const Hero: React.FC<HeroProps> = ({
  persona,
  onPersonaChange,
  searchQuery,
  onSearchChange,
  selectedDomainFilter,
  onQuickDomainSelect,
  onJumpToExchange,
  onCandidateApplyClick,
  onEmployerPostClick,
  onTrackerClick,
  openRolesCount,
  vettedTalentCount,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isCandidate = persona === 'candidate';

  return (
    <section className="px-3 sm:px-6 pt-3 pb-8">
      <div
        className={`max-w-7xl mx-auto relative rounded-[2rem] overflow-hidden border transition-all ${
          isDark
            ? 'border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]'
            : 'border-[2px] border-[#0D1017] shadow-[8px_8px_0px_0px_#0D1017]'
        }`}
      >
        {/* Full-Bleed Custom Art-Directed Background Photograph */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02] transition-transform duration-700"
          style={{
            backgroundImage: `url('/images/hero-finance-studio.jpg')`,
          }}
        />

        {/* Directional Contrast Veil so photography shines on right & copy pops with AAA contrast */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-r from-[#090B10]/95 via-[#090B10]/85 to-[#090B10]/55'
              : 'bg-gradient-to-r from-[#0B0E17]/92 via-[#0B0E17]/80 to-[#0B0E17]/48'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,255,50,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,107,74,0.18),transparent_45%)] pointer-events-none" />

        {/* Content Grid */}
        <div className="relative z-10 px-5 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-white">
          {/* Left 7 Columns: Instant Persona Switch + Bold Headline + Zero-Turnaround Search */}
          <div className="lg:col-span-7 space-y-6">
            {/* Funky Floating Status Stickers */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-current" />
                Zero-Friction Finance Hiring
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/12 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-[#12B886] animate-ping" />
                48h Shortlist Turnaround
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B4A]/25 backdrop-blur-md border border-[#FF6B4A]/40 text-xs font-bold text-[#FFD2C7]">
                ICAI Verified Desk
              </span>
            </motion.div>

            {/* Persona Mode Switcher Right Above Headline */}
            <div
              className="inline-flex p-1.5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/15 gap-1"
              role="tablist"
              aria-label="Choose Candidate or Recruiter View"
            >
              <button
                type="button"
                role="tab"
                aria-selected={isCandidate}
                onClick={() => onPersonaChange('candidate')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold flex items-center gap-2 transition cursor-pointer ${
                  isCandidate
                    ? 'bg-[#C8FF32] text-[#090B10] shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>I&apos;m Looking for a Job</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={!isCandidate}
                onClick={() => onPersonaChange('recruiter')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold flex items-center gap-2 transition cursor-pointer ${
                  !isCandidate
                    ? 'bg-[#FF6B4A] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>I&apos;m Hiring Talent</span>
              </button>
            </div>

            {/* Expressive Headline */}
            <motion.div
              key={persona}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="space-y-3"
            >
              {isCandidate ? (
                <>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.55rem] leading-[1.03] tracking-tight">
                    Find top CA, Tax &amp; <br className="hidden sm:block" />
                    Finance roles.{' '}
                    <span className="text-[#C8FF32] underline decoration-[#FF6B4A] decoration-4 underline-offset-4">
                      Apply in 60s.
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
                    Skip 10-step portals. Browse live mandates across Top CA Firms, MNCs &amp; Series A–D Startups, drop your PDF once, and track your interview stage live with zero fees.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.55rem] leading-[1.03] tracking-tight">
                    Pre-vetted CAs &amp; <br className="hidden sm:block" />
                    Finance leads in{' '}
                    <span className="text-[#FF856A] underline decoration-[#C8FF32] decoration-4 underline-offset-4">
                      48 hours flat.
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
                    Stop sifting through 200 mismatched resumes. Inspect ICAI-screened Audit Managers, Tax Counsel, FP&amp;A Leads &amp; Articles — request CVs in one click.
                  </p>
                </>
              )}
            </motion.div>

            {/* Instant Zero-Turnaround Search Bar */}
            <div className="p-2 rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative flex items-center">
                  <Search className="w-4 h-4 text-[#C8FF32] absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') onJumpToExchange();
                    }}
                    placeholder={
                      isCandidate
                        ? 'Search role, city or skill — e.g. Audit, FP&A, Mumbai, 20 LPA...'
                        : 'Search talent by CA, CMA, GST, SAP, Mumbai, Immediate...'
                    }
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/45 text-white placeholder:text-slate-300/80 text-sm outline-none border border-white/10 focus:border-[#C8FF32]"
                  />
                </div>
                <button
                  type="button"
                  onClick={onJumpToExchange}
                  className={`neo-btn-pop px-6 py-3.5 rounded-xl font-display font-extrabold text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
                    isCandidate
                      ? 'bg-[#C8FF32] text-[#090B10]'
                      : 'bg-[#FF6B4A] text-white'
                  }`}
                >
                  <span>
                    {isCandidate
                      ? `Explore ${openRolesCount} Jobs`
                      : `View ${vettedTalentCount} Profiles`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 1-Tap Domain Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 px-1 pb-0.5">
                {SHORT_DOMAIN_PILLS.map((pill) => {
                  const active = selectedDomainFilter === pill.full;
                  return (
                    <button
                      key={pill.full}
                      type="button"
                      onClick={() => onQuickDomainSelect(pill.full)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                        active
                          ? 'bg-white text-[#090B10]'
                          : 'bg-black/35 text-slate-200 hover:bg-black/60 border border-white/10'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Fast Action Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm">
              <button
                type="button"
                onClick={isCandidate ? onCandidateApplyClick : onEmployerPostClick}
                className="inline-flex items-center gap-2 font-display font-bold text-[#C8FF32] hover:underline underline-offset-4 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isCandidate
                    ? 'Or skip browsing & drop your Resume PDF directly (60s) →'
                    : 'Or post a custom Hiring Mandate directly to Ami Bhanushali (45s) →'}
                </span>
              </button>

              <span className="text-white/30 hidden sm:inline">|</span>

              <button
                type="button"
                onClick={onTrackerClick}
                className="inline-flex items-center gap-1.5 font-semibold text-white/90 hover:text-[#C8FF32] transition cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-[#12B886]" />
                <span>Already applied? Live Status Check</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Funky Visual Card with Custom Artwork Backdrop */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0D101B]/90 backdrop-blur-xl"
            >
              {/* Dynamic Funky Header Visual using our Generated Artwork */}
              <div
                className="h-40 sm:h-44 bg-cover bg-center relative flex items-end p-5"
                style={{
                  backgroundImage: isCandidate
                    ? `url('/images/candidate-card-bg.jpg')`
                    : `url('/images/recruiter-card-bg.jpg')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D101B] via-[#0D101B]/45 to-transparent" />
                <div className="relative z-10 w-full flex items-end justify-between gap-3">
                  <div>
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/65 text-[#C8FF32] border border-white/15 backdrop-blur-md">
                      {isCandidate ? 'CANDIDATE EXPRESS DESK' : 'EXECUTIVE HIRING DESK'}
                    </span>
                    <h2 className="font-display font-extrabold text-xl text-white mt-1.5 leading-tight">
                      {isCandidate
                        ? '1 Profile → 40+ Top Firms'
                        : '3-Step Vetted Shortlist'}
                    </h2>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-[#C8FF32] text-[#090B10] font-mono font-extrabold text-xs shrink-0 shadow-lg">
                    {isCandidate ? '100% FREE' : '48H SLA'}
                  </div>
                </div>
              </div>

              {/* Card Body: Zero-Turnaround Steps + Instant CTA */}
              <div className="p-5 sm:p-6 space-y-5">
                <div className="space-y-3">
                  {isCandidate ? (
                    <>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                        <span className="w-7 h-7 rounded-lg bg-[#C8FF32]/20 text-[#C8FF32] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          01
                        </span>
                        <div className="text-xs">
                          <strong className="text-white block">Pick a Role or Drop Your CV</strong>
                          <span className="text-slate-400">Single-screen form — takes under 60 seconds</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                        <span className="w-7 h-7 rounded-lg bg-[#3B5BFF]/25 text-[#93A6FF] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          02
                        </span>
                        <div className="text-xs">
                          <strong className="text-white block">Direct Partner Shortlisting</strong>
                          <span className="text-slate-400">Matched to CA Partners &amp; Corporate CFOs</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                        <span className="w-7 h-7 rounded-lg bg-[#12B886]/25 text-[#38D9A9] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          03
                        </span>
                        <div className="text-xs">
                          <strong className="text-white block">Track 5-Stage Progress Live</strong>
                          <span className="text-slate-400">Use Mobile + DOB anytime for instant updates</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                        <span className="w-7 h-7 rounded-lg bg-[#FF6B4A]/25 text-[#FF9B85] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          01
                        </span>
                        <div className="text-xs">
                          <strong className="text-white block">Share Role in 45 Seconds</strong>
                          <span className="text-slate-400">Tap a preset role or message Ami Bhanushali directly</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                        <span className="w-7 h-7 rounded-lg bg-[#C8FF32]/20 text-[#C8FF32] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          02
                        </span>
                        <div className="text-xs">
                          <strong className="text-white block">Receive 3–5 Screened CVs in 48h</strong>
                          <span className="text-slate-400">ICAI attempt count, articleship &amp; CTC pre-checked</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                        <span className="w-7 h-7 rounded-lg bg-[#12B886]/25 text-[#38D9A9] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          03
                        </span>
                        <div className="text-xs">
                          <strong className="text-white block">Zero Upfront Retainer</strong>
                          <span className="text-slate-400">Pay only on successful joining + replacement cover</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Dual Action Buttons Inside Spotlight Card */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={onCandidateApplyClick}
                    className="neo-btn-pop py-3 px-4 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Drop CV (60s)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={onEmployerPostClick}
                    className="neo-btn-pop py-3 px-4 rounded-xl bg-[#3B5BFF] hover:bg-[#2F4DF0] text-white font-display font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Post Mandate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Trust Metrics */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#12B886]" />
                    {PRACTICE_DOMAINS.length} Core Domains
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF32]" />
                    BKC · CP · Indiranagar
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
