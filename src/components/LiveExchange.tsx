import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Users,
  Search,
  MapPin,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Flame,
  Building2,
  Clock,
  Award,
  X,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  FirmRequest,
  VettedTalentProfile,
  buildWhatsAppUrl,
} from '../lib/supabase';

interface LiveExchangeProps {
  activeBoardTab: 'jobs' | 'talent';
  onTabChange: (tab: 'jobs' | 'talent') => void;
  openRoles: FirmRequest[];
  vettedTalent: VettedTalentProfile[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
  onQuickApplyRole: (role: FirmRequest) => void;
  onShortlistTalent: (profile: VettedTalentProfile) => void;
}

const DOMAIN_CHIPS = [
  { short: 'All Domains', value: 'All' },
  { short: 'Statutory Audit', value: 'Statutory Audit & Assurance' },
  { short: 'FP&A & Finance', value: 'FP&A & Corporate Finance' },
  { short: 'Direct Tax', value: 'Direct Taxation & Litigations' },
  { short: 'GST / Indirect', value: 'Indirect Tax / GST' },
  { short: 'CA Articleship', value: 'CA Articleship & Trainee Roles' },
  { short: 'SAP & Accounting', value: 'Accounting, Finalization & ERP (Tally/SAP)' },
];

const CITY_CHIPS = ['All Cities', 'Mumbai', 'Bengaluru', 'Delhi', 'Pune'];
const QUAL_CHIPS = [
  'All Qualifications',
  'Qualified CA',
  'CA Inter / Semi-Qualified',
  'CA Article Assistant / Trainee',
  'CMA (Cost Accountant)',
];

export const LiveExchange: React.FC<LiveExchangeProps> = ({
  activeBoardTab,
  onTabChange,
  openRoles,
  vettedTalent,
  searchQuery,
  onSearchChange,
  selectedDomain,
  onDomainChange,
  onQuickApplyRole,
  onShortlistTalent,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [cityFilter, setCityFilter] = useState('All Cities');
  const [qualFilter, setQualFilter] = useState('All Qualifications');

  // Filter Open Roles (exclude Closed mandates)
  const visibleRoles = openRoles
    .filter((r) => r.status !== 'Closed')
    .filter((r) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.role_needed.toLowerCase().includes(q) ||
        r.organization_name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.domain.toLowerCase().includes(q) ||
        r.budget_range.toLowerCase().includes(q);

      const matchesDomain = selectedDomain === 'All' || r.domain === selectedDomain;
      const matchesCity =
        cityFilter === 'All Cities' ||
        r.city.toLowerCase().includes(cityFilter.toLowerCase());

      return matchesQuery && matchesDomain && matchesCity;
    });

  // Filter Pre-Vetted Talent Pool
  const visibleTalent = vettedTalent.filter((t) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      t.display_name.toLowerCase().includes(q) ||
      t.qualification.toLowerCase().includes(q) ||
      t.domain.toLowerCase().includes(q) ||
      t.city.toLowerCase().includes(q) ||
      t.badge.toLowerCase().includes(q) ||
      t.skills.some((s) => s.toLowerCase().includes(q));

    const matchesDomain = selectedDomain === 'All' || t.domain === selectedDomain;
    const matchesQual =
      qualFilter === 'All Qualifications' || t.qualification === qualFilter;

    return matchesQuery && matchesDomain && matchesQual;
  });

  const clearAllFilters = () => {
    onSearchChange('');
    onDomainChange('All');
    setCityFilter('All Cities');
    setQualFilter('All Qualifications');
  };

  return (
    <section id="live-exchange" className="px-3 sm:px-6 pt-5 pb-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Row: Title + Dual Marketplace Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FF6B4A]/15 text-[#FF6B4A] border border-[#FF6B4A]/30">
              <span className="w-2 h-2 rounded-full bg-[#FF6B4A] animate-ping" />
              Live Instant Match Board
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.06]">
              {activeBoardTab === 'jobs' ? (
                <>
                  Open Finance Mandates{' '}
                  <span className={isDark ? 'text-[#C8FF32]' : 'text-[#3B5BFF]'}>
                    Hiring Right Now.
                  </span>
                </>
              ) : (
                <>
                  Screened Finance Pros{' '}
                  <span className="text-[#FF6B4A]">Ready to Interview.</span>
                </>
              )}
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {activeBoardTab === 'jobs'
                ? 'Spot a role that fits? Hit "Apply in 60s" to pre-fill your application directly — zero account signup needed.'
                : 'Need someone urgently? Hit "Shortlist Profile" to request their full verified CV & schedule an interview within 24–48h.'}
            </p>
          </div>

          {/* Big Funky Switcher Pills */}
          <div
            className={`inline-flex p-1.5 rounded-2xl border self-start lg:self-auto ${
              isDark
                ? 'bg-[#121624] border-white/12'
                : 'bg-white border-[1.5px] border-[#0D1017] shadow-[4px_4px_0px_0px_#0D1017]'
            }`}
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeBoardTab === 'jobs'}
              onClick={() => onTabChange('jobs')}
              className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-display font-extrabold flex items-center gap-2 transition cursor-pointer ${
                activeBoardTab === 'jobs'
                  ? 'bg-[#C8FF32] text-[#090B10] shadow-sm'
                  : isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-[#0D1017]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Open Roles ({openRoles.filter((r) => r.status !== 'Closed').length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeBoardTab === 'talent'}
              onClick={() => onTabChange('talent')}
              className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-display font-extrabold flex items-center gap-2 transition cursor-pointer ${
                activeBoardTab === 'talent'
                  ? 'bg-[#FF6B4A] text-white shadow-sm'
                  : isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-[#0D1017]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Talent Pool ({vettedTalent.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Instant Search + Domain Chips + Secondary Chips */}
        <div
          className={`p-4 sm:p-5 rounded-2xl space-y-3.5 ${
            isDark
              ? 'bg-[#111522] border border-white/10'
              : 'bg-white border-[1.5px] border-[#0D1017] shadow-[4px_4px_0px_0px_#0D1017]'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={
                  activeBoardTab === 'jobs'
                    ? 'Instant filter by role title, firm, city or LPA...'
                    : 'Instant filter by CA / CMA, skill (Ind AS, GST, SAP), or city...'
                }
                className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-sm border outline-none transition ${
                  isDark
                    ? 'bg-black/40 border-white/12 text-white focus:border-[#C8FF32]'
                    : 'bg-[#FAF7F0] border-[#0D1017]/20 text-[#0D1017] focus:border-[#3B5BFF]'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-rose-500 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sub-filter pills (City for Jobs, Qualification for Talent) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {activeBoardTab === 'jobs'
                ? CITY_CHIPS.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setCityFilter(city)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        cityFilter === city
                          ? 'bg-[#3B5BFF] text-white'
                          : isDark
                          ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                          : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-200/70'
                      }`}
                    >
                      {city}
                    </button>
                  ))
                : QUAL_CHIPS.map((qual) => (
                    <button
                      key={qual}
                      type="button"
                      onClick={() => setQualFilter(qual)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        qualFilter === qual
                          ? 'bg-[#FF6B4A] text-white'
                          : isDark
                          ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                          : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-200/70'
                      }`}
                    >
                      {qual === 'All Qualifications' ? 'All Degrees' : qual.split('/')[0].trim()}
                    </button>
                  ))}
            </div>
          </div>

          {/* Practice Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {DOMAIN_CHIPS.map((d) => {
              const isSelected = selectedDomain === d.value;
              return (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => onDomainChange(d.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-[#C8FF32] text-[#090B10] border-[#C8FF32]'
                        : 'bg-[#0D1017] text-[#C8FF32] border-[#0D1017]'
                      : isDark
                      ? 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/25'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#0D1017]'
                  }`}
                >
                  {d.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* BOARD CONTENT */}
        {activeBoardTab === 'jobs' ? (
          visibleRoles.length === 0 ? (
            <div
              className={`rounded-3xl p-12 text-center space-y-4 border ${
                isDark ? 'bg-[#111522] border-white/10' : 'bg-white border-[#0D1017]/15'
              }`}
            >
              <p className="font-display font-bold text-xl">
                No exact mandate matched that filter — new roles arrive daily!
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-xs cursor-pointer"
              >
                Reset Filters &amp; Show All Open Roles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleRoles.map((role, idx) => {
                const whatsappJobUrl = buildWhatsAppUrl(
                  `Hi Amii Ma'am, I saw the open mandate for "${role.role_needed}" at ${role.organization_name} (${role.city} · ${role.budget_range}) on FinTalent Partners and would like to apply!`
                );

                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.2) }}
                    className={`rounded-3xl p-6 flex flex-col justify-between transition-all group ${
                      isDark
                        ? 'bg-[#111522] border border-white/12 hover:border-[#C8FF32]/60 shadow-xl'
                        : 'bg-white border-[1.5px] border-[#0D1017] shadow-[5px_5px_0px_0px_#0D1017] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            isDark
                              ? 'bg-white/8 text-slate-200 border border-white/10'
                              : 'bg-[#FAF7F0] text-[#0D1017] border border-[#0D1017]/20'
                          }`}
                        >
                          <Building2 className="w-3 h-3 text-[#3B5BFF]" />
                          {role.org_type}
                        </span>

                        {role.urgent ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#FF6B4A]/20 text-[#FF6B4A] border border-[#FF6B4A]/35">
                            <Flame className="w-3 h-3 fill-current" />
                            Urgent 48h
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#12B886]/15 text-[#12B886] border border-[#12B886]/30">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Title & Firm */}
                      <div>
                        <h3 className="font-display font-extrabold text-xl leading-snug group-hover:text-[#3B5BFF] dark:group-hover:text-[#C8FF32] transition-colors">
                          {role.role_needed}
                        </h3>
                        <p className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {role.organization_name}
                        </p>
                      </div>

                      {/* Salary & City Pill Strip */}
                      <div
                        className={`p-3 rounded-2xl flex items-center justify-between gap-2 ${
                          isDark ? 'bg-black/40 border border-white/8' : 'bg-[#FAF7F0] border border-[#0D1017]/10'
                        }`}
                      >
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                            Compensation
                          </span>
                          <span
                            className={`font-mono font-bold text-sm ${
                              isDark ? 'text-[#C8FF32]' : 'text-[#0D1017]'
                            }`}
                          >
                            {role.budget_range}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                            Location
                          </span>
                          <span className="text-xs font-bold inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#FF6B4A]" />
                            {role.city}
                          </span>
                        </div>
                      </div>

                      {/* Skill / Domain tags */}
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg ${
                            isDark
                              ? 'bg-[#3B5BFF]/20 text-[#9FB0FF]'
                              : 'bg-[#3B5BFF]/10 text-[#3B5BFF]'
                          }`}
                        >
                          {role.domain}
                        </span>
                        {(role.highlights || []).slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className={`text-[11px] px-2.5 py-0.5 rounded-lg ${
                              isDark
                                ? 'bg-white/6 text-slate-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Instant 1-Click Actions */}
                    <div className="pt-5 mt-5 border-t border-current/10 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onQuickApplyRole(role)}
                        className="neo-btn-pop flex-1 py-3 px-4 rounded-xl bg-[#C8FF32] hover:bg-[#b8f21e] text-[#090B10] font-display font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply in 60s</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={whatsappJobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`py-3 px-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          isDark
                            ? 'bg-white/6 hover:bg-white/12 text-white border-white/15'
                            : 'bg-[#FAF7F0] hover:bg-slate-100 text-[#0D1017] border-[#0D1017]/25'
                        }`}
                        title="Ask HR on WhatsApp about this role"
                      >
                        <MessageCircle className="w-4 h-4 text-[#12B886] fill-current" />
                        <span>Ask HR</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )
        ) : visibleTalent.length === 0 ? (
          <div
            className={`rounded-3xl p-12 text-center space-y-4 border ${
              isDark ? 'bg-[#111522] border-white/10' : 'bg-white border-[#0D1017]/15'
            }`}
          >
            <p className="font-display font-bold text-xl">
              No screened profile matched that exact filter — ask Amii Ma&apos;am for custom bench profiles!
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-xl bg-[#FF6B4A] text-white font-display font-extrabold text-xs cursor-pointer"
            >
              Show All Pre-Vetted Talent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleTalent.map((profile, idx) => {
              const whatsappTalentUrl = buildWhatsAppUrl(
                `Hi Amii Ma'am, we'd like to review the full CV & schedule an interview for candidate ${profile.code} (${profile.display_name} · ${profile.qualification} · ${profile.domain}).`
              );

              return (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.2) }}
                  className={`rounded-3xl p-6 flex flex-col justify-between transition-all group ${
                    isDark
                      ? 'bg-[#111522] border border-white/12 hover:border-[#FF6B4A]/60 shadow-xl'
                      : 'bg-white border-[1.5px] border-[#0D1017] shadow-[5px_5px_0px_0px_#0D1017] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header: Code + Verified */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#3B5BFF]/15 text-[#758EFF] border border-[#3B5BFF]/30">
                        {profile.code}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#12B886]/15 text-[#12B886] border border-[#12B886]/30">
                        <CheckCircle2 className="w-3 h-3" />
                        ICAI Vetted
                      </span>
                    </div>

                    {/* Candidate Identity */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B4A] via-[#3B5BFF] to-[#C8FF32] p-0.5 shrink-0">
                        <div className="w-full h-full rounded-[14px] bg-[#0D1017] text-white font-display font-extrabold text-sm flex items-center justify-center">
                          {profile.display_name
                            .replace(/^CA\s+/i, '')
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-lg leading-tight">
                          {profile.display_name}
                        </h3>
                        <p className="text-xs font-semibold text-[#FF6B4A] flex items-center gap-1 mt-0.5">
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          {profile.qualification}
                        </p>
                      </div>
                    </div>

                    {/* Pedigree Highlight */}
                    <p
                      className={`text-xs font-semibold px-3 py-2 rounded-xl ${
                        isDark
                          ? 'bg-white/[0.04] text-slate-200 border border-white/8'
                          : 'bg-[#FAF7F0] text-[#0D1017] border border-[#0D1017]/10'
                      }`}
                    >
                      ✦ {profile.badge}
                    </p>

                    {/* Experience / Notice / Expected Comp */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className={`p-2 rounded-xl ${isDark ? 'bg-black/35' : 'bg-slate-50'}`}>
                        <span className="text-[10px] text-slate-400 block uppercase">Exp</span>
                        <span className="font-mono font-bold text-xs">
                          {profile.experience_years} Yrs
                        </span>
                      </div>
                      <div className={`p-2 rounded-xl ${isDark ? 'bg-black/35' : 'bg-slate-50'}`}>
                        <span className="text-[10px] text-slate-400 block uppercase">Notice</span>
                        <span className="font-mono font-bold text-xs text-[#12B886]">
                          {profile.notice_period}
                        </span>
                      </div>
                      <div className={`p-2 rounded-xl ${isDark ? 'bg-black/35' : 'bg-slate-50'}`}>
                        <span className="text-[10px] text-slate-400 block uppercase">Expected</span>
                        <span className="font-mono font-bold text-xs">
                          {profile.expected_ctc.replace(' Stipend', '')}
                        </span>
                      </div>
                    </div>

                    {/* Skills + City */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#C8FF32]/20 text-[#0D1017] dark:text-[#C8FF32]">
                        <MapPin className="w-3 h-3" />
                        {profile.city}
                      </span>
                      {profile.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`text-[11px] px-2.5 py-0.5 rounded-lg ${
                            isDark ? 'bg-white/6 text-slate-300' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recruiter 1-Click Shortlist Actions */}
                  <div className="pt-5 mt-5 border-t border-current/10 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onShortlistTalent(profile)}
                      className="neo-btn-pop flex-1 py-3 px-4 rounded-xl bg-[#FF6B4A] hover:bg-[#f25937] text-white font-display font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Shortlist Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={whatsappTalentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`py-3 px-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        isDark
                          ? 'bg-white/6 hover:bg-white/12 text-white border-white/15'
                          : 'bg-[#FAF7F0] hover:bg-slate-100 text-[#0D1017] border-[#0D1017]/25'
                      }`}
                      title="Request full CV on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-[#12B886] fill-current" />
                      <span>CV</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
