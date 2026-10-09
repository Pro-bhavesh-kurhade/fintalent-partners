import React from 'react';
import { 
  ShieldCheck, Scale, Receipt, 
  TrendingUp, Calculator, ArrowRight, Users, Sparkles 
} from 'lucide-react';

interface SpecializationsProps {
  onSelectDomain: (domain: string) => void;
}

export const ROLES_DATA = [
  {
    domain: 'Statutory Audit & Assurance',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    icon: ShieldCheck,
    tag: 'High Demand',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    typicalRoles: ['Audit Senior / Manager', 'Article Assistant', 'Ind AS Specialist', 'Quality Reviewer'],
    averageCtc: '10 - 22 LPA',
    description: 'Statutory audits for listed entities, private corporates, CARO 2020 compliance, IFRS/Ind AS conversions, and internal financial controls (IFC).',
    firms: 'Top 20 CA Firms & MNC Shared Services',
  },
  {
    domain: 'Direct Taxation & Litigations',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
    icon: Scale,
    tag: 'Active Hiring',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    typicalRoles: ['Tax Executive / Manager', 'Transfer Pricing Analyst', 'CIT(A) Litigation Counsel', 'Tax Audit Senior'],
    averageCtc: '9 - 24 LPA',
    description: 'Corporate income tax advisory, scrutiny assessments (Section 143/147), search & seizure litigation, Faceless Appeals, and international tax treaties (DTAA).',
    firms: 'Boutique Tax Firms & Conglomerates',
  },
  {
    domain: 'Indirect Tax / GST',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    icon: Receipt,
    tag: 'Continuous Surge',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    typicalRoles: ['GST Lead', 'Indirect Tax Senior', 'ITC Reconciliation Specialist', 'Show Cause Notice Advisor'],
    averageCtc: '8 - 20 LPA',
    description: 'GST compliance audits, GST 9/9C finalization, department audit handling, anti-profiteering inquiries, and High Court / Appellate Tribunal filings.',
    firms: 'Pan-India CA Firms & Industrial Corporates',
  },
  {
    domain: 'FP&A & Corporate Finance',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    icon: TrendingUp,
    tag: 'Corporate & VC',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    typicalRoles: ['Financial Analyst', 'FP&A Manager', 'M&A Due Diligence Specialist', 'Valuation Modeler'],
    averageCtc: '14 - 30 LPA',
    description: 'Annual operating plans (AOP), rolling forecasts, unit economics, fundraising pitch decks, cash flow runway optimization, and DCF/comparable valuations.',
    firms: 'Series A-D Startups & Global MNCs',
  },
  {
    domain: 'Accounting, Finalization & ERP (Tally/SAP)',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    icon: Calculator,
    tag: 'Core Essential',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    typicalRoles: ['Senior Accountant', 'Finance Controller', 'SAP FICO Consultant', 'Tally Finalization Lead'],
    averageCtc: '6 - 16 LPA',
    description: 'Balance sheet finalization, schedule III preparation, audit coordinate, payroll TDS, bank reconciliation, and ERP migration (SAP S/4 HANA & Zoho).',
    firms: 'SMEs, CA Back-Offices & Corporates',
  },
  {
    domain: 'CA Article Assistant / Trainee',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    icon: Users,
    tag: 'ICAI Compliant',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    typicalRoles: ['1st Year Article', 'Transfer Case Article', 'Industrial Trainee (Final Yr)', 'Semi-Qualified Paid Assistant'],
    averageCtc: '₹12K - ₹45K/mo Stipend',
    description: 'Pre-screened CA Inter students with completed ITT & Orientation. Exposure across multi-disciplinary audits, client visits, and GST compliance.',
    firms: 'Sole Proprietors to Category 1 CA Firms',
  },
];

export const Specializations: React.FC<SpecializationsProps> = ({ onSelectDomain }) => {
  return (
    <section id="specializations" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs font-semibold border border-slate-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dedicated Practice Areas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-headline tracking-tight">
            Practice Domains & Executive Roles
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our talent search desk is led by seasoned finance recruiters who understand ICAI regulations, technical nuances, and specialized domain requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROLES_DATA.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.domain}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Clean Photography Thumbnail Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.domain}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    <div className="absolute top-3.5 right-3.5">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs border bg-white ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute -bottom-3.5 left-5">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-md border-2 border-white">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-7 space-y-3">
                    <h3 className="text-lg font-bold text-slate-950 font-headline group-hover:text-emerald-700 transition">
                      {item.domain}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 py-3 border-y border-slate-100 text-xs">
                      <div className="flex items-center justify-between text-slate-500">
                        <span>Comp / CTC:</span>
                        <span className="font-bold text-slate-900">{item.averageCtc}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500">
                        <span>Hiring Clients:</span>
                        <span className="font-semibold text-slate-700">{item.firms}</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Common Openings:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.typicalRoles.map((role) => (
                          <span
                            key={role}
                            className="text-[11px] bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-200/60"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectDomain(item.domain)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-800 text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    <span>Submit Profile for {item.domain.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
