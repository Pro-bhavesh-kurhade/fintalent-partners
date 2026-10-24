import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  Briefcase,
  Building2,
  Clock,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AppRoute } from './Header';

interface HeroProps {
  openRolesCount: number;
  vettedTalentCount: number;
  onNavigate: (page: AppRoute) => void;
  onTrackerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  openRolesCount,
  vettedTalentCount,
  onNavigate,
  onTrackerClick,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="px-3 sm:px-6 pt-3 pb-6">
      <div
        className={`max-w-7xl mx-auto relative rounded-[2rem] overflow-hidden border transition-all ${
          isDark
            ? 'border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]'
            : 'border-[2px] border-[#0D1017] shadow-[8px_8px_0px_0px_#0D1017]'
        }`}
      >
        {/* Custom BKC Sunset Architectural Studio Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{
            backgroundImage: `url('/images/hero-finance-studio.jpg')`,
          }}
        />

        {/* Clean High-Contrast Editorial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090B10]/94 via-[#090B10]/82 to-[#090B10]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,255,50,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,107,74,0.16),transparent_45%)] pointer-events-none" />

        {/* Clean 2-Column Content */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-11 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-white">
          {/* Left 7 Columns: Simple, Punchy, Zero Clutter */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-[11px] uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-current" />
                FinTalent Studio · India
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/12 backdrop-blur-md border border-white/15 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#12B886] animate-ping" />
                ICAI Verified Search
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="space-y-4"
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tight">
                Finance Hiring, <br />
                <span className="text-[#C8FF32] underline decoration-[#FF6B4A] decoration-4 underline-offset-4">
                  Made Effortless.
                </span>
              </h1>
              <p className="text-sm sm:text-lg text-slate-200 max-w-xl leading-relaxed">
                Connecting Qualified CAs, Tax Specialists, FP&amp;A Analysts &amp; Articles with premier CA Firms, Corporates &amp; Startups - zero candidate fees, 48-hour shortlists.
              </p>
            </motion.div>

            {/* Two Crystal-Clear Primary Paths */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('jobs')}
                className="neo-btn-pop px-6 py-4 rounded-2xl bg-[#C8FF32] hover:bg-[#b8f21e] text-[#090B10] font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Find Jobs ({openRolesCount} Live)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('hire')}
                className="neo-btn-pop px-6 py-4 rounded-2xl bg-[#FF6B4A] hover:bg-[#f25937] text-white font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Hire Talent in 48h</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Clean Quick Sub-Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('apply')}
                className="font-semibold hover:text-[#C8FF32] underline underline-offset-4 cursor-pointer"
              >
                Direct 60s CV Upload →
              </button>
              <span className="opacity-30">·</span>
              <button
                type="button"
                onClick={() => onNavigate('talent')}
                className="font-semibold hover:text-[#FF856A] underline underline-offset-4 cursor-pointer"
              >
                Browse {vettedTalentCount} Pre-Vetted Profiles →
              </button>
              <span className="opacity-30">·</span>
              <button
                type="button"
                onClick={onTrackerClick}
                className="inline-flex items-center gap-1.5 font-semibold text-[#C8FF32] hover:underline underline-offset-4 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Track My Application</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Crisp At-a-Glance Snapshot Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0D101B]/90 backdrop-blur-xl"
            >
              <div
                className="h-36 bg-cover bg-center relative flex items-end p-5"
                style={{ backgroundImage: `url('/images/candidate-card-bg.jpg')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D101B] via-[#0D101B]/45 to-transparent" />
                <div className="relative z-10 w-full flex items-end justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C8FF32] block">
                      EXECUTIVE DESK SNAPSHOT
                    </span>
                    <h2 className="font-display font-extrabold text-xl text-white">
                      Fast, Human &amp; Transparent
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-[#C8FF32] text-[#090B10] font-mono font-extrabold text-xs">
                    ₹0 FEE
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                    <span className="font-display font-extrabold text-xl text-[#C8FF32] block">
                      48 Hrs
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Shortlist SLA
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                    <span className="font-display font-extrabold text-xl text-white block">
                      40+
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Partner Firms
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                    <span className="font-display font-extrabold text-xl text-[#12B886] block">
                      100%
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      ICAI Vetted
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onTrackerClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-white/8 hover:bg-white/14 border border-white/15 text-xs font-display font-bold flex items-center justify-between transition cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#C8FF32]" />
                    Already applied? Check Live Pipeline Status
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C8FF32]" />
                </button>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#12B886]" />
                    Led by Ami Bhanushali
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF32]" />
                    Mumbai · Delhi · BLR
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
