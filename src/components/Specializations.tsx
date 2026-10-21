import React from 'react';
import { 
  ShieldCheck, Scale, Receipt, TrendingUp, 
  Calculator, Users, ArrowUpRight, Sparkles, CheckCircle2 
} from 'lucide-react';

interface SpecializationsProps {
  onSelectDomain: (domain: string) => void;
}

export const ROLES_DATA = [
  {
    domain: 'Statutory Audit & Assurance',
    accentColor: 'from-[#101426] to-[#1E293B]',
    borderColor: 'border-[#4563FF]/40',
    tagColor: 'bg-[#4563FF]/20 text-[#B9A7FF] border-[#4563FF]/30',
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
    accentColor: 'from-[#101426] via-[#101426] to-[#1A2544]',
    borderColor: 'border-[#D4FF5A]/40',
    tagColor: 'bg-[#D4FF5A]/20 text-[#D4FF5A] border-[#D4FF5A]/40',
    icon: TrendingUp,
    iconColor: 'text-[#D4FF5A]',
    tag: 'VC & High-Growth',
    averageCtc: '14 - 30 LPA',
    colSpan: 'lg:col-span-4',
    roles: ['FP&A Manager', 'Valuation Modeler', 'M&A Due Diligence'],
    description: 'Annual operating plans (AOP), rolling forecasts, unit economics, fundraising pitch decks, cash runway optimization, and DCF valuations.',
    hirers: 'Series A-D Startups & Global MNCs',
  },
  {
    domain: 'Direct Taxation & Litigations',
    accentColor: 'from-[#101426] to-[#1F2338]',
    borderColor: 'border-[#B9A7FF]/40',
    tagColor: 'bg-[#B9A7FF]/20 text-[#B9A7FF] border-[#B9A7FF]/40',
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
    accentColor: 'from-[#101426] to-[#0D2422]',
    borderColor: 'border-[#10B981]/40',
    tagColor: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40',
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
    accentColor: 'from-[#101426] to-[#251D3A]',
    borderColor: 'border-[#B9A7FF]/30',
    tagColor: 'bg-[#B9A7FF]/15 text-slate-200 border-[#B9A7FF]/30',
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
    accentColor: 'from-[#101426] to-[#162238]',
    borderColor: 'border-[#4563FF]/30',
    tagColor: 'bg-white/10 text-white border-white/20',
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
  return (
    <section id="specializations" className="py-20 lg:py-28 bg-[#101426] text-white border-b border-white/10 scroll-mt-20 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#4563FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#D4FF5A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF5A]" />
              <span className="text-[#D4FF5A] font-display font-bold uppercase tracking-wider text-[11px]">
                CURATED PRACTICE AREAS
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.1]">
              EXPLORE FINANCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF5A] via-[#10B981] to-[#4563FF]">
                CAREER DOMAINS
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every practice is overseen by specialized recruiters who understand ICAI regulations, technical standards, and institutional talent benchmarks.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden md:block">
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
                onClick={() => onSelectDomain(item.domain)}
                className={`${item.colSpan} group cursor-pointer relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b ${item.accentColor} border ${item.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1`}
              >
                {/* Subtle hover glow layer */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Top bar inside card */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all">
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-display font-bold px-3 py-1 rounded-full border ${item.tagColor}`}>
                        {item.tag}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#D4FF5A] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#101426] transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-[#D4FF5A] transition-colors">
                    {item.domain}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom specs */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Average Comp:</span>
                      <span className="font-display font-bold text-sm text-[#D4FF5A]">{item.averageCtc}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Hiring Clients:</span>
                      <span className="font-medium text-slate-200">{item.hirers}</span>
                    </div>
                  </div>

                  {/* Common openings tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.roles.map((role) => (
                      <span
                        key={role}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10 group-hover:border-white/20 transition-colors"
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
