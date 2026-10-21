import React from 'react';
import { 
  ShieldCheck, Scale, Receipt, TrendingUp, 
  Calculator, Users, ArrowUpRight, Sparkles 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SpecializationsProps {
  onSelectDomain: (domain: string) => void;
}

export const ROLES_DATA = [
  {
    domain: 'Statutory Audit & Assurance',
    accentColorDark: 'from-[#101426] to-[#1E293B]',
    accentColorLight: 'from-white to-blue-50/40',
    borderColorDark: 'border-[#4563FF]/40',
    borderColorLight: 'border-[#4563FF]/30',
    tagColorDark: 'bg-[#4563FF]/20 text-[#B9A7FF] border-[#4563FF]/30',
    tagColorLight: 'bg-[#4563FF]/10 text-[#4563FF] border-[#4563FF]/25',
    icon: ShieldCheck,
    iconColor: 'text-[#4563FF]',
    tag: 'High Demand',
    averageCtc: '10 - 22 LPA',
    colSpan: 'lg:col-span-8',
    roles: ['Audit Senior / Manager', 'Ind AS Specialist', 'CARO 2020 Reviewer'],
    description: 'Statutory audits for listed entities, large corporates, CARO 2020 compliance, IFRS/Ind AS conversions, and internal financial controls (IFC).',
    hirers: 'Top 20 CA Firms & MNC Shared Services',
  },
  {
    domain: 'FP&A & Corporate Finance',
    accentColorDark: 'from-[#101426] via-[#101426] to-[#1A2544]',
    accentColorLight: 'from-white to-emerald-50/40',
    borderColorDark: 'border-[#D4FF5A]/40',
    borderColorLight: 'border-emerald-300',
    tagColorDark: 'bg-[#D4FF5A]/20 text-[#D4FF5A] border-[#D4FF5A]/40',
    tagColorLight: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    icon: TrendingUp,
    iconColor: 'text-[#10B981]',
    tag: 'VC & High-Growth',
    averageCtc: '14 - 30 LPA',
    colSpan: 'lg:col-span-4',
    roles: ['FP&A Manager', 'Valuation Modeler', 'M&A Due Diligence'],
    description: 'Annual operating plans (AOP), rolling forecasts, unit economics, fundraising pitch decks, cash runway optimization, and DCF valuations.',
    hirers: 'Series A-D Startups & Global MNCs',
  },
  {
    domain: 'Direct Taxation & Litigations',
    accentColorDark: 'from-[#101426] to-[#1F2338]',
    accentColorLight: 'from-white to-purple-50/40',
    borderColorDark: 'border-[#B9A7FF]/40',
    borderColorLight: 'border-purple-200',
    tagColorDark: 'bg-[#B9A7FF]/20 text-[#B9A7FF] border-[#B9A7FF]/40',
    tagColorLight: 'bg-purple-50 text-purple-800 border-purple-200',
    icon: Scale,
    iconColor: 'text-[#B9A7FF]',
    tag: 'Active Hiring',
    averageCtc: '9 - 24 LPA',
    colSpan: 'lg:col-span-4',
    roles: ['Tax Litigation Counsel', 'Transfer Pricing', 'Faceless Appeals'],
    description: 'Corporate income tax advisory, scrutiny assessments (Sec 143/147), search & seizure, and international tax treaties (DTAA).',
    hirers: 'Boutique Tax Firms & Conglomerates',
  },
  {
    domain: 'Indirect Tax / GST',
    accentColorDark: 'from-[#101426] to-[#0D2422]',
    accentColorLight: 'from-white to-teal-50/40',
    borderColorDark: 'border-[#10B981]/40',
    borderColorLight: 'border-teal-200',
    tagColorDark: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40',
    tagColorLight: 'bg-teal-50 text-teal-800 border-teal-200',
    icon: Receipt,
    iconColor: 'text-[#10B981]',
    tag: 'Continuous Surge',
    averageCtc: '8 - 20 LPA',
    colSpan: 'lg:col-span-4',
    roles: ['GST Lead', 'ITC Reconciliation', 'Show Cause Advisor'],
    description: 'GST compliance audits, GST 9/9C finalization, department audit handling, and High Court / Appellate filings.',
    hirers: 'Pan-India CA Firms & Corporates',
  },
  {
    domain: 'CA Articleship & Trainee Roles',
    accentColorDark: 'from-[#101426] to-[#251D3A]',
    accentColorLight: 'from-white to-amber-50/40',
    borderColorDark: 'border-[#B9A7FF]/30',
    borderColorLight: 'border-amber-200',
    tagColorDark: 'bg-[#B9A7FF]/15 text-slate-200 border-[#B9A7FF]/30',
    tagColorLight: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: Users,
    iconColor: 'text-[#B9A7FF]',
    tag: 'ICAI Compliant',
    averageCtc: '₹12K - ₹45K/mo Stipend',
    colSpan: 'lg:col-span-4',
    roles: ['1st Year Article', 'Transfer Case Article', 'Industrial Trainee'],
    description: 'Pre-screened CA Inter students with completed ITT & Orientation. Multi-disciplinary audit and taxation exposure.',
    hirers: 'Sole Proprietors to Category 1 CA Firms',
  },
  {
    domain: 'Accounting, Finalization & ERP (Tally/SAP)',
    accentColorDark: 'from-[#101426] to-[#162238]',
    accentColorLight: 'from-white to-sky-50/40',
    borderColorDark: 'border-[#4563FF]/30',
    borderColorLight: 'border-sky-200',
    tagColorDark: 'bg-white/10 text-white border-white/20',
    tagColorLight: 'bg-sky-50 text-sky-800 border-sky-200',
    icon: Calculator,
    iconColor: 'text-[#4563FF]',
    tag: 'Core Essential',
    averageCtc: '6 - 16 LPA',
    colSpan: 'lg:col-span-12',
    roles: ['Finance Controller', 'Senior Accountant', 'SAP FICO Lead', 'Tally Finalization'],
    description: 'Balance sheet finalization, Schedule III preparation, audit coordination, payroll TDS, bank reconciliation, and ERP migration (SAP S/4 HANA & Zoho Books).',
    hirers: 'SMEs, CA Back-Offices & Corporates',
  },
];

export const Specializations: React.FC<SpecializationsProps> = ({ onSelectDomain }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      id="specializations" 
      className={`py-20 lg:py-28 border-b scroll-mt-20 relative overflow-hidden transition-colors duration-200 ${
        isDark 
          ? 'bg-[#101426] text-white border-white/10' 
          : 'bg-[#F7F6F2] text-[#101426] border-slate-200'
      }`}
    >
      {/* Background ambient accents */}
      <div 
        className={`absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#4563FF]/10' : 'bg-[#4563FF]/5'
        }`} 
      />
      <div 
        className={`absolute bottom-10 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#D4FF5A]/10' : 'bg-[#10B981]/5'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div 
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-[#D4FF5A]' 
                  : 'bg-white border-slate-300 text-[#4563FF] shadow-2xs'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-display font-bold uppercase tracking-wider text-[11px]">
                CURATED PRACTICE AREAS
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase leading-[1.1]">
              <span className={isDark ? 'text-white' : 'text-[#101426]'}>
                EXPLORE FINANCE
              </span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4563FF] via-[#7B91FF] to-[#10B981]">
                CAREER DOMAINS
              </span>
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Every practice is overseen by specialized recruiters who understand ICAI regulations, technical standards, and institutional talent benchmarks.
            </p>
          </div>

          <div className={`text-xs font-mono hidden md:block ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span>[ SELECT A DOMAIN TO PREFILL CANDIDATE FORM ]</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {ROLES_DATA.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.domain}
                role="button"
                tabIndex={0}
                aria-label={`Select domain ${item.domain} and apply`}
                onClick={() => onSelectDomain(item.domain)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectDomain(item.domain);
                  }
                }}
                className={`${item.colSpan} group cursor-pointer relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b ${
                  isDark ? item.accentColorDark : item.accentColorLight
                } border ${
                  isDark ? item.borderColorDark : item.borderColorLight
                } shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none`}
              >
                <div>
                  {/* Top bar inside card */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-all ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-2xs'
                    }`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-display font-bold px-3 py-1 rounded-full border ${
                        isDark ? item.tagColorDark : item.tagColorLight
                      }`}>
                        {item.tag}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isDark 
                          ? 'bg-white/5 group-hover:bg-[#D4FF5A]' 
                          : 'bg-slate-100 group-hover:bg-[#4563FF]'
                      }`}>
                        <ArrowUpRight className={`w-4 h-4 transition-colors ${
                          isDark 
                            ? 'text-slate-300 group-hover:text-[#101426]' 
                            : 'text-slate-600 group-hover:text-white'
                        }`} />
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`font-display font-extrabold text-xl sm:text-2xl transition-colors ${
                    isDark 
                      ? 'text-white group-hover:text-[#D4FF5A]' 
                      : 'text-[#101426] group-hover:text-[#4563FF]'
                  }`}>
                    {item.domain}
                  </h3>

                  <p className={`text-xs sm:text-sm mt-2.5 leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {item.description}
                  </p>
                </div>

                {/* Bottom specs */}
                <div className={`mt-8 pt-6 border-t space-y-4 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className={`block text-[10px] uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Average Comp:
                      </span>
                      <span className={`font-display font-bold text-sm ${
                        isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'
                      }`}>
                        {item.averageCtc}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`block text-[10px] uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Hiring Clients:
                      </span>
                      <span className={`font-medium ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}>
                        {item.hirers}
                      </span>
                    </div>
                  </div>

                  {/* Common openings tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.roles.map((role) => (
                      <span
                        key={role}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                          isDark 
                            ? 'bg-white/5 text-slate-300 border-white/10 group-hover:border-white/20' 
                            : 'bg-white text-slate-700 border-slate-200 group-hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
