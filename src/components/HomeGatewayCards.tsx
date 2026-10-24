import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  FileUp,
  Users,
  Layers,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type GatewayTarget = 'jobs' | 'apply' | 'talent' | 'hire' | 'domains' | 'about';

interface HomeGatewayCardsProps {
  openRolesCount: number;
  vettedTalentCount: number;
  onNavigate: (page: GatewayTarget) => void;
}

export const HomeGatewayCards: React.FC<HomeGatewayCardsProps> = ({
  openRolesCount,
  vettedTalentCount,
  onNavigate,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cards = [
    {
      id: 'jobs' as GatewayTarget,
      step: '01 · FOR CANDIDATES',
      title: 'Browse Live Open Roles',
      subtitle: `${openRolesCount} active CA, Tax, Audit, FP&A & Articleship roles with upfront LPA bands.`,
      cta: 'Open Job Board',
      badge: `${openRolesCount} Live`,
      icon: Briefcase,
      accentPill: 'bg-[#C8FF32] text-[#090B10]',
      image: '/images/candidate-card-bg.jpg',
    },
    {
      id: 'apply' as GatewayTarget,
      step: '02 · FAST APPLY',
      title: 'Drop Your CV in 60s',
      subtitle: 'Single-screen profile drop. Reach 40+ partner firms for ₹0 fee & track status live.',
      cta: 'Submit Resume',
      badge: '100% Free',
      icon: FileUp,
      accentPill: 'bg-[#12B886] text-white',
      image: '/images/workspace-abstract-bg.jpg',
    },
    {
      id: 'talent' as GatewayTarget,
      step: '03 · FOR RECRUITERS',
      title: 'Talent Pool & 48h Hiring',
      subtitle: `Inspect ${vettedTalentCount} ICAI-vetted profiles ready now or submit a hiring mandate in 45s.`,
      cta: 'Explore Talent',
      badge: '48h SLA',
      icon: Users,
      accentPill: 'bg-[#FF6B4A] text-white',
      image: '/images/recruiter-card-bg.jpg',
      altCta: { label: 'Post Mandate', target: 'hire' as GatewayTarget },
    },
    {
      id: 'domains' as GatewayTarget,
      step: '04 · PRACTICE & DESK',
      title: '6 Domains & Leadership',
      subtitle: 'View compensation ranges across all 6 finance verticals & connect with Ami Bhanushali.',
      cta: 'View Verticals',
      badge: 'ICAI Desk',
      icon: Layers,
      accentPill: 'bg-[#3B5BFF] text-white',
      image: '/images/hero-finance-studio.jpg',
      altCta: { label: 'About & FAQ', target: 'about' as GatewayTarget },
    },
  ];

  return (
    <section className="px-3 sm:px-6 pt-2 pb-10">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF6B4A]">
              <Sparkles className="w-3.5 h-3.5" />
              Choose Where You Want to Go
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mt-0.5">
              Everything neatly organized - one click away.
            </h2>
          </div>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            No endless scrolling. Open only what matters to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                onClick={() => onNavigate(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(card.id);
                  }
                }}
                className={`group rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all outline-none ${
                  isDark
                    ? 'bg-[#111522] border border-white/12 hover:border-[#C8FF32]/65 shadow-xl hover:-translate-y-1'
                    : 'bg-white border-[1.5px] border-[#0D1017] shadow-[5px_5px_0px_0px_#0D1017] hover:-translate-y-1'
                }`}
              >
                {/* Crisp Visual Strip */}
                <div
                  className="h-28 bg-cover bg-center relative p-4 flex items-start justify-between"
                  style={{ backgroundImage: `url('${card.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090B10]/90 via-[#090B10]/35 to-black/25" />
                  <div
                    className={`relative z-10 w-10 h-10 rounded-xl ${card.accentPill} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="relative z-10 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-black/70 text-white border border-white/15 backdrop-blur-md">
                    {card.badge}
                  </span>
                </div>

                {/* Card Copy + Clean Action Row */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-60 block">
                      {card.step}
                    </span>
                    <h3 className="font-display font-extrabold text-lg leading-snug group-hover:text-[#3B5BFF] dark:group-hover:text-[#C8FF32] transition-colors">
                      {card.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-current/10 flex items-center justify-between gap-2">
                    <span className="text-xs font-display font-extrabold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>{card.cta}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#FF6B4A]" />
                    </span>

                    {card.altCta && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(card.altCta!.target);
                        }}
                        className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          isDark
                            ? 'bg-white/8 hover:bg-[#C8FF32] hover:text-[#090B10] text-slate-200'
                            : 'bg-[#FAF7F0] hover:bg-[#0D1017] hover:text-[#C8FF32] text-[#0D1017]'
                        }`}
                      >
                        {card.altCta.label}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
