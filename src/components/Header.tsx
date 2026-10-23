import React, { useState } from 'react';
import {
  MessageCircle,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Briefcase,
  Users,
  Zap,
  Sparkles,
  Home,
  Layers,
  Info,
  ArrowUpRight,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { buildWhatsAppUrl } from '../lib/supabase';

export type AppRoute =
  | 'home'
  | 'jobs'
  | 'talent'
  | 'apply'
  | 'hire'
  | 'domains'
  | 'about';

interface HeaderProps {
  currentPage: AppRoute;
  openRolesCount: number;
  onNavigate: (page: AppRoute) => void;
  onOpenTracker: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  openRolesCount,
  onNavigate,
  onOpenTracker,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const whatsappHref = buildWhatsAppUrl(
    "Hi Amii Ma'am, reaching out via FinTalent Partners website!"
  );

  const navItemClass = (active: boolean) => {
    if (active) {
      return isDark
        ? 'bg-[#C8FF32] text-[#090B10] shadow-xs'
        : 'bg-[#0D1017] text-[#C8FF32]';
    }
    return isDark
      ? 'hover:bg-white/10 text-slate-200 hover:text-[#C8FF32]'
      : 'hover:bg-[#FAF7F0] text-[#0D1017]';
  };

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 pb-2 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto rounded-2xl px-4 sm:px-5 h-16 flex items-center justify-between gap-3 backdrop-blur-xl transition-all pointer-events-auto ${
          isDark
            ? 'bg-[#0E111B]/90 border border-white/14 text-white shadow-[0_14px_38px_-12px_rgba(0,0,0,0.75)]'
            : 'bg-white/95 border-[1.5px] border-[#0D1017] text-[#0D1017] shadow-[4px_4px_0px_0px_#0D1017]'
        }`}
      >
        {/* Brand Logo -> Always Goes Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group shrink-0 outline-none rounded-xl text-left cursor-pointer"
          aria-label="FinTalent Partners Home"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:-rotate-6 ${
              isDark
                ? 'bg-[#C8FF32] text-[#090B10]'
                : 'bg-[#0D1017] text-[#C8FF32]'
            }`}
          >
            <span className="font-display font-extrabold text-lg tracking-tighter leading-none">
              FT
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A] absolute top-1.5 right-1.5" />
          </div>
          <div className="leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight">
                FinTalent
              </span>
              <span
                className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-md ${
                  isDark
                    ? 'bg-[#FF6B4A]/20 text-[#FF8A70] border border-[#FF6B4A]/30'
                    : 'bg-[#C8FF32] text-[#0D1017] border border-[#0D1017]/20'
                }`}
              >
                INDIA
              </span>
            </div>
            <p
              className={`text-[11px] font-medium mt-0.5 hidden 2xl:block ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              CA · Tax · Audit · CFO Search
            </p>
          </div>
        </button>

        {/* Clean Multi-Page Navigation Pills */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Primary Navigation"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${navItemClass(
              currentPage === 'home'
            )}`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('jobs')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${navItemClass(
              currentPage === 'jobs'
            )}`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Jobs</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                currentPage === 'jobs'
                  ? 'bg-black/20 text-current'
                  : isDark
                  ? 'bg-[#C8FF32]/20 text-[#C8FF32]'
                  : 'bg-[#0D1017] text-[#C8FF32]'
              }`}
            >
              {openRolesCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('talent')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${navItemClass(
              currentPage === 'talent'
            )}`}
          >
            <Users className="w-3.5 h-3.5 text-[#3B5BFF]" />
            <span>Talent Pool</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('apply')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${navItemClass(
              currentPage === 'apply'
            )}`}
          >
            <Zap className="w-3.5 h-3.5 text-[#12B886]" />
            <span>Apply</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('hire')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${navItemClass(
              currentPage === 'hire'
            )}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Hire 48h</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('domains')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${navItemClass(
              currentPage === 'domains'
            )}`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Domains</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${navItemClass(
              currentPage === 'about'
            )}`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenTracker}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition cursor-pointer min-h-[40px] ${
              isDark
                ? 'bg-white/6 hover:bg-white/12 text-white border-white/15'
                : 'bg-[#FAF7F0] hover:bg-amber-100/60 text-[#0D1017] border-[#0D1017]/25'
            }`}
          >
            <Search
              className={`w-3.5 h-3.5 ${
                isDark ? 'text-[#C8FF32]' : 'text-[#3B5BFF]'
              }`}
            />
            <span className="hidden sm:inline">Status</span>
            <span className="w-2 h-2 rounded-full bg-[#12B886] animate-pulse" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition cursor-pointer ${
              isDark
                ? 'bg-white/6 hover:bg-white/12 text-[#C8FF32] border-white/15'
                : 'bg-[#FAF7F0] hover:bg-slate-200/70 text-[#0D1017] border-[#0D1017]/25'
            }`}
            aria-label={isDark ? 'Switch to Cream Light Mode' : 'Switch to Acid Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`neo-btn-pop inline-flex items-center gap-2 px-4 h-10 rounded-xl text-xs font-display font-extrabold cursor-pointer ${
              isDark
                ? 'bg-[#C8FF32] hover:bg-[#b8f21e] text-[#090B10]'
                : 'bg-[#C8FF32] hover:bg-[#b8f21e] text-[#0D1017] border-[1.5px] border-[#0D1017] shadow-[2px_2px_0px_0px_#0D1017]'
            }`}
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer ${
              isDark
                ? 'bg-white/6 text-white border-white/15'
                : 'bg-[#FAF7F0] text-[#0D1017] border-[#0D1017]/25'
            }`}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden max-w-7xl mx-auto mt-2 rounded-2xl p-4 space-y-2 pointer-events-auto backdrop-blur-xl ${
            isDark
              ? 'bg-[#0E111B]/95 border border-white/15 text-white shadow-2xl'
              : 'bg-white border-[1.5px] border-[#0D1017] text-[#0D1017] shadow-[4px_4px_0px_0px_#0D1017]'
          }`}
        >
          {(
            [
              { id: 'home', label: 'Main Home Page' },
              { id: 'jobs', label: `Open Finance Roles (${openRolesCount})` },
              { id: 'talent', label: 'Pre-Vetted Talent Pool (For Recruiters)' },
              { id: 'domains', label: '6 Finance Verticals & Salaries' },
              { id: 'about', label: "Amii Ma'am Leadership & FAQs" },
            ] as { id: AppRoute; label: string }[]
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(item.id);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between cursor-pointer ${
                currentPage === item.id
                  ? 'bg-[#C8FF32] text-[#090B10]'
                  : isDark
                  ? 'bg-white/5 hover:bg-white/10'
                  : 'bg-[#FAF7F0] hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </button>
          ))}

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('apply');
              }}
              className="py-3 px-4 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-xs text-center cursor-pointer"
            >
              60s Candidate Apply
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('hire');
              }}
              className="py-3 px-4 rounded-xl bg-[#FF6B4A] text-white font-display font-extrabold text-xs text-center cursor-pointer"
            >
              Hire Talent (48h)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
