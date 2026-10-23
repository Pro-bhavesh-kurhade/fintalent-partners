import React from 'react';
import {
  ShieldCheck,
  Scale,
  Receipt,
  TrendingUp,
  Calculator,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SpecializationsProps {
  onSelectDomain: (domain: string) => void;
}

export const ROLES_DATA = [
  {
    domain: 'Statutory Audit & Assurance',
    badge: 'High Velocity',
    accentBg: 'bg-[#3B5BFF]',
    accentText: 'text-white',
    icon: ShieldCheck,
    averageCtc: '12 – 24 LPA',
    colSpan: 'lg:col-span-6',
    roles: ['Audit Senior / Manager', 'Ind AS Reviewer', 'IFC & CARO 2020'],
    description:
      'Listed & large-corporate statutory audits, Ind AS conversions, and partner-track assurance leadership.',
  },
  {
    domain: 'FP&A & Corporate Finance',
    badge: 'VC & Unicorns',
    accentBg: 'bg-[#C8FF32]',
    accentText: 'text-[#090B10]',
    icon: TrendingUp,
    averageCtc: '16 – 32 LPA',
    colSpan: 'lg:col-span-6',
    roles: ['FP&A Lead', 'Strategic Finance', 'M&A Valuation'],
    description:
      'Annual operating plans, SaaS unit economics, investor decks, runway modeling, and CFO-office mandates.',
  },
  {
    domain: 'Direct Taxation & Litigations',
    badge: 'Advisory',
    accentBg: 'bg-[#FF6B4A]',
    accentText: 'text-white',
    icon: Scale,
    averageCtc: '10 – 22 LPA',
    colSpan: 'lg:col-span-4',
    roles: ['Tax Counsel', 'Transfer Pricing', 'DTAA & Appeals'],
    description:
      'Corporate tax structuring, faceless assessments, ITAT pleadings, and international cross-border tax.',
  },
  {
    domain: 'Indirect Tax / GST',
    badge: 'Pan-India Surge',
    accentBg: 'bg-[#12B886]',
    accentText: 'text-white',
    icon: Receipt,
    averageCtc: '9 – 20 LPA',
    colSpan: 'lg:col-span-4',
    roles: ['GST Manager', 'SCN Drafting', '9/9C Audit Lead'],
    description:
      'Departmental audit representation, refund claims, show-cause replies, and multi-state GST compliance.',
  },
  {
    domain: 'CA Articleship & Trainee Roles',
    badge: 'ICAI Stipend+',
    accentBg: 'bg-[#7C5CFF]',
    accentText: 'text-white',
    icon: Users,
    averageCtc: '₹15K – ₹40K / mo',
    colSpan: 'lg:col-span-4',
    roles: ['1st Yr Article', 'Transfer Case', 'Industrial Trainee'],
    description:
      'Curated CA Inter articleship seats and corporate industrial training with guaranteed exam leave.',
  },
  {
    domain: 'Accounting, Finalization & ERP (Tally/SAP)',
    badge: 'Core Controllership',
    accentBg: 'bg-[#F59F00]',
    accentText: 'text-[#090B10]',
    icon: Calculator,
    averageCtc: '8 – 18 LPA',
    colSpan: 'lg:col-span-12',
    roles: ['Finance Controller', 'SAP S/4 HANA FICO', 'Schedule III Close', 'R2R Lead'],
    description:
      'End-to-end books closure, Schedule III financial statements, plant costing, and SAP / ERP transitions.',
  },
];

export const Specializations: React.FC<SpecializationsProps> = ({ onSelectDomain }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="specializations" className="px-3 sm:px-6 pt-5 pb-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B4A]">
              ✦ 6 Specialized Finance Verticals
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
              Pick Your Vertical.{' '}
              <span className={isDark ? 'text-[#C8FF32]' : 'text-[#3B5BFF]'}>
                1-Tap Fast Apply.
              </span>
            </h2>
          </div>
          <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Click any domain card below to pre-select that specialization in the 60-second application studio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {ROLES_DATA.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.domain}
                role="button"
                tabIndex={0}
                onClick={() => onSelectDomain(item.domain)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectDomain(item.domain);
                  }
                }}
                className={`${item.colSpan} group rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all outline-none ${
                  isDark
                    ? 'bg-[#111522] border border-white/12 hover:border-[#C8FF32]/65 shadow-xl'
                    : 'bg-white border-[1.5px] border-[#0D1017] shadow-[5px_5px_0px_0px_#0D1017] hover:-translate-y-1'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl ${item.accentBg} ${item.accentText} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full ${
                          isDark
                            ? 'bg-white/8 text-slate-200 border border-white/10'
                            : 'bg-[#FAF7F0] text-[#0D1017] border border-[#0D1017]/20'
                        }`}
                      >
                        {item.averageCtc}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                          isDark
                            ? 'bg-white/8 group-hover:bg-[#C8FF32] group-hover:text-[#090B10]'
                            : 'bg-[#FAF7F0] group-hover:bg-[#0D1017] group-hover:text-[#C8FF32]'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
                      {item.badge}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl mt-0.5">
                      {item.domain}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-current/10 flex flex-wrap gap-1.5">
                  {item.roles.map((r) => (
                    <span
                      key={r}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                        isDark
                          ? 'bg-white/6 text-slate-200'
                          : 'bg-[#FAF7F0] text-[#0D1017] border border-[#0D1017]/12'
                      }`}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
