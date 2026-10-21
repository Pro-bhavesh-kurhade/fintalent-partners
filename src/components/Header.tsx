import React, { useState } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenTracker: () => void;
  onNavigateCandidate: () => void;
  onNavigateEmployer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTracker,
  onNavigateCandidate,
  onNavigateEmployer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const WHATSAPP_URL =
    "https://wa.me/919821262613?text=Hi%20Amii%20Ma%27am%2C%20reaching%20out%20via%20FinTalent%20Partners";

  const isDark = theme === 'dark';

  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 ${
        isDark 
          ? 'bg-[#101426]/90 border-white/10 text-white' 
          : 'bg-[#F7F6F2]/95 border-slate-200 shadow-xs text-[#101426]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Custom CSS Logo Mark & Brand Title */}
        <a 
          href="#" 
          className="flex items-center gap-3.5 group shrink-0 focus-visible:ring-2 focus-visible:ring-[#4563FF] rounded-xl outline-none"
          aria-label="FinTalent Partners Home"
        >
          {/* Custom geometric logo mark */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#4563FF] via-[#101426] to-[#D4FF5A] p-0.5 shadow-md shadow-[#4563FF]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#101426] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,255,90,0.2),transparent_70%)]" />
              <span className="font-display font-extrabold text-lg text-white tracking-tighter">
                F<span className="text-[#D4FF5A]">T</span>
              </span>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#10B981] rounded-full ring-2 ring-[#101426]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className={`font-display font-extrabold text-xl sm:text-2xl tracking-tight ${
                isDark ? 'text-white' : 'text-[#101426]'
              }`}>
                FinTalent
              </span>
              <span className="font-display font-extrabold text-xl sm:text-2xl text-[#4563FF]">
                Partners
              </span>
            </div>
            <p className={`text-[11px] font-medium tracking-wide mt-1 hidden sm:block ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Executive Search · CA, Tax & Finance
            </p>
          </div>
        </a>

        {/* Center: Exactly 3 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
          <button
            onClick={onNavigateCandidate}
            className={`text-sm font-semibold py-1 cursor-pointer relative group transition-colors focus-visible:ring-2 focus-visible:ring-[#4563FF] rounded-md outline-none ${
              isDark ? 'text-slate-300 hover:text-[#D4FF5A]' : 'text-slate-700 hover:text-[#4563FF]'
            }`}
          >
            <span>For Candidates</span>
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
              isDark ? 'bg-[#D4FF5A]' : 'bg-[#4563FF]'
            }`} />
          </button>

          <button
            onClick={onNavigateEmployer}
            className={`text-sm font-semibold py-1 cursor-pointer relative group transition-colors focus-visible:ring-2 focus-visible:ring-[#4563FF] rounded-md outline-none ${
              isDark ? 'text-slate-300 hover:text-[#D4FF5A]' : 'text-slate-700 hover:text-[#4563FF]'
            }`}
          >
            <span>For Employers</span>
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
              isDark ? 'bg-[#D4FF5A]' : 'bg-[#4563FF]'
            }`} />
          </button>

          <button
            onClick={onOpenTracker}
            className={`text-sm font-semibold py-1.5 px-3.5 rounded-xl cursor-pointer flex items-center gap-2 border transition-all focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10' 
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-2xs'
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'}`} />
            <span>Track Status</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          </button>
        </nav>

        {/* Right Actions: Dark/Light Mode Switch + WhatsApp Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Funky Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
              isDark
                ? 'bg-white/10 hover:bg-white/15 text-[#D4FF5A] border-white/15'
                : 'bg-white hover:bg-slate-100 text-[#4563FF] border-slate-300 shadow-2xs'
            }`}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#D4FF5A] animate-in spin-in-90 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-[#4563FF] animate-in spin-in-90 duration-300" />
            )}
            <span className="text-xs font-bold font-display uppercase tracking-wider hidden lg:inline">
              {isDark ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Desktop WhatsApp Desk CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2.5 bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-md shadow-[#D4FF5A]/20 hover:shadow-[#D4FF5A]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-display min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>WhatsApp Desk</span>
          </a>

          {/* Mobile WhatsApp Quick Action (Min 44x44px touch target) */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden flex items-center justify-center bg-[#D4FF5A] text-[#101426] min-w-[44px] min-h-[44px] rounded-xl text-xs font-bold shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
            aria-label="WhatsApp Desk"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
          </a>

          {/* Mobile Drawer Toggle (Min 44x44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl border cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none ${
              isDark 
                ? 'text-slate-300 hover:text-white bg-white/5 border-white/10' 
                : 'text-slate-700 hover:text-[#101426] bg-white border-slate-300 shadow-2xs'
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className={`md:hidden border-b px-4 pt-3 pb-6 space-y-2.5 shadow-2xl animate-in slide-in-from-top-3 ${
            isDark ? 'bg-[#101426] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateCandidate();
            }}
            className={`w-full text-left px-4 min-h-[48px] rounded-xl text-sm font-bold flex justify-between items-center border transition-colors cursor-pointer ${
              isDark 
                ? 'bg-white/5 text-slate-200 hover:text-[#D4FF5A] border-white/5' 
                : 'bg-slate-50 text-slate-800 hover:text-[#4563FF] border-slate-200'
            }`}
          >
            <span>For Candidates</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateEmployer();
            }}
            className={`w-full text-left px-4 min-h-[48px] rounded-xl text-sm font-bold flex justify-between items-center border transition-colors cursor-pointer ${
              isDark 
                ? 'bg-white/5 text-slate-200 hover:text-[#D4FF5A] border-white/5' 
                : 'bg-slate-50 text-slate-800 hover:text-[#4563FF] border-slate-200'
            }`}
          >
            <span>For Employers</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className={`w-full text-left px-4 min-h-[48px] rounded-xl text-sm font-bold border flex items-center justify-between cursor-pointer ${
              isDark
                ? 'bg-[#4563FF]/20 text-white border-[#4563FF]/40'
                : 'bg-[#4563FF]/10 text-[#4563FF] border-[#4563FF]/30'
            }`}
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#D4FF5A]" />
              Track Application Status
            </span>
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                toggleTheme();
              }}
              className={`w-full flex items-center justify-center gap-2 min-h-[48px] rounded-xl border text-sm font-bold font-display cursor-pointer ${
                isDark 
                  ? 'bg-white/10 text-white border-white/20' 
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#D4FF5A]" /> : <Moon className="w-4 h-4 text-[#4563FF]" />}
              <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-[#D4FF5A] text-[#101426] text-sm font-bold font-display shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp with Amii Ma'am</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
